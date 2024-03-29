const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const ImageExts = Object.keys(require('gatsby-transformer-sharp/supported-extensions').supportedExtensions)
const { contentPath } = require('../../config/site')
const TYPES = require('./types')

function getNodeNamespace(node, mime, getNode) {
  if (node.internal.type !== 'File') {
    const parent = getNode && getNode(node.parent)
    if (!parent) {
      return false
    }

    return getNodeNamespace(parent, mime, getNode)
  }

  let namespace, file
  if (node.sourceInstanceName === 'content') {
    const segments = path.normalize(node.relativePath).split(path.sep)
    if (segments.length > 1) {
      [namespace, ...file] = segments
      file = path.join(...file)
    }
  }

  const types = TYPES.namespaces[namespace]
  return {
    namespace,
    types,
    file,
    get type() {
      if (!mime || !types || !types[mime]) {
        return null
      }

      const mimeTypes = types[mime]
      if (typeof mimeTypes === 'string') {
        return mimeTypes
      }

      if (mimeTypes[file]) {
        return mimeTypes[file]
      }

      let dir = file
      do {
        dir = path.dirname(dir)
        if (mimeTypes[dir]) {
          return mimeTypes[dir]
        }
      } while (dir !== '.')

      return null
    },
  }
}

function prepareNodeFields(node, type, { namespace, file }) {
  const { fields } = TYPES.create.find(def => typeof def.name === 'string' && def.name === type) || {}
  if (!fields) {
    throw new Error(`Unable to find valid type definition for '${type}'.`)
  }

  const defaults = TYPES.defaults[type]
  if (defaults) {
    _.defaults(node, defaults)
  }

  if (fields.slug && !node.slug) {
    const parsedRelPath = path.parse(file)
    node.slug = parsedRelPath.dir === ''
      ? parsedRelPath.name
      : _.kebabCase(parsedRelPath.name === 'index'
        ? parsedRelPath.dir
        : `${parsedRelPath.dir}/${parsedRelPath.name}`
      )
  }

  if (fields.image) {
    const nsPath = path.join(contentPath, namespace)
    if (!node.image) {
      const pathNoExt = path.join(nsPath, file.slice(0, file.lastIndexOf('.') + 1 || undefined))
      for (const ext of ImageExts) {
        if (fs.existsSync(pathNoExt + ext)) {
          node.image = pathNoExt + ext
          break
        }
      }
    }
    if (fields.hasImage) {
      node.hasImage = Boolean(node.image)
    }
    if (!node.image) {
      let dir = path.join(nsPath, file);
      do {
        dir = path.dirname(dir)
        const imgFile = path.join(dir, 'placeholder.png')
        if (fs.existsSync(imgFile)) {
          node.image = imgFile
        }
      } while (!node.image && dir !== nsPath)
    }
  }

  return node
}

async function createChildMdxNode({ node, getNode, actions, createNodeId, createContentDigest }) {
  const ns = getNodeNamespace(node, 'mdx', getNode)
  const { type } = ns
  if (!type) {
    return
  }

  const fmt = prepareNodeFields(node.frontmatter, type, ns)
  const newNode = {
    ...fmt,
    id: createNodeId(`${node.id} >> ${type}`),
    parent: node.id,
    children: [],
    internal: {
      type,
      description: `${type}: ${fmt.title}`,
    },
  }

  newNode.internal.contentDigest = createContentDigest(newNode)
  await actions.createNode(newNode)
  actions.createParentChildLink({ parent: node, child: getNode(newNode.id) })
}

function shouldCreateChildMdxNode({ node }) {
  return node.internal.type === 'Mdx'
}

exports.getYamlTypename = ({ node, object, isArray }) => {
  function tn(name, ext = true) {
    return _.upperFirst(_.camelCase(name + (ext ? ' Yaml' : '')))
  }

  if (node.internal.type !== 'File') {
    return tn(node.internal.type)
  }

  const ns = getNodeNamespace(node, 'yaml')
  const { namespace, type, file } = ns
  if (!namespace) {
    return tn(isArray ? path.basename(node.dir) : node.name)
  }

  if (!type) {
    return tn(`${namespace} ${file}`, false)
  }

  prepareNodeFields(object, type, ns)
  return type
}

exports.createTypes = ({ actions, schema }) => {
  actions.createTypes(TYPES.create.map(def =>
    typeof def === 'string'
      ? def
      : schema.buildObjectType(def)
  ))
}

exports.extendTypes = ({ type }) => {
  return TYPES.extend[type.name] || {}
}

exports.shouldOnCreateNode = args => {
  return shouldCreateChildMdxNode(args)
}

exports.onCreateNode = async args => {
  if (shouldCreateChildMdxNode(args)) {
    await createChildMdxNode(args)
  }
}

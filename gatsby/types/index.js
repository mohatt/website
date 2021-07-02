const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const ImageExts = Object.keys(require('gatsby-transformer-sharp/supported-extensions').supportedExtensions)
const { contentPath } = require('../../config/site')
const types = require('./types')

function getNodeNamespace(node, getNode) {
  if (node.internal.type !== 'File') {
    const parent = getNode(node.parent)
    if (!parent) {
      return null
    }

    return getNodeNamespace(parent, getNode)
  }

  let namespace, file
  if (node.sourceInstanceName === 'content') {
    const segments = path.normalize(node.relativePath).split(path.sep)
    if (segments.length > 1) {
      [namespace, ...file] = segments
      file = path.join(...file)
    }
  }

  return [namespace, file]
}

function getTypeFields(type) {
  const def = types.definitions.find(def => typeof def.name === 'string' && def.name === type)
  if (!def) {
    throw new Error(`Unable to find valid type definition for '${type}'.`)
  }
  return Object.keys(def.fields)
}

async function createChildMdxNode({ node, getNode, actions, createNodeId, createContentDigest }) {
  const [namespace, relPath] = getNodeNamespace(node, getNode)
  if (!namespace || !(namespace in types.namespaceTypeMap)) {
    return
  }

  const type = types.namespaceTypeMap[namespace].mdx
  const fields = getTypeFields(type)
  const fmt = node.frontmatter

  if (fields.includes('slug') && !fmt.slug) {
    const parsedRelPath = path.parse(relPath)
    fmt.slug = parsedRelPath.dir === ''
      ? parsedRelPath.name
      : _.kebabCase(parsedRelPath.name === 'index'
        ? parsedRelPath.dir
        : `${parsedRelPath.dir}/${parsedRelPath.name}`
      )
  }

  if (fields.includes('cover')) {
    if (!fmt.cover) {
      const pathNoExt = path.join(contentPath, namespace, relPath.slice(0, relPath.lastIndexOf('.') + 1 || undefined))
      for (const ext of ImageExts) {
        if (fs.existsSync(pathNoExt + ext)) {
          fmt.cover = pathNoExt + ext
          break
        }
      }
    }
    if (fields.includes('hasCover')) {
      fmt.hasCover = Boolean(fmt.cover)
    }
    if (!fmt.cover) {
      fmt.cover = path.join(contentPath, namespace, 'placeholder.png')
    }
  }

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

exports.createTypes = ({ actions, schema }) => {
  actions.createTypes(types.definitions.map(def =>
    typeof def === 'string'
      ? def
      : schema.buildObjectType(def)
  ))
}

exports.extendTypes = function ({ type }) {
  if (type.name in types.extendTypes) {
    return types.extendTypes[type.name]
  }

  return {}
}

exports.shouldOnCreateNode = function (args) {
  return shouldCreateChildMdxNode(args)
}

exports.onCreateNode = async function (args) {
  if (shouldCreateChildMdxNode(args)) {
    await createChildMdxNode(args)
  }
}

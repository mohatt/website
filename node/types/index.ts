import path from 'path'
import fs from 'fs'
import _ from 'lodash'
import type { GatsbyNode, Node, CreateNodeArgs, NodeInput } from 'gatsby'
import { supportedExtensions } from 'gatsby-transformer-sharp/supported-extensions'
import site from '../../config/site'
import * as TYPES from './types'

const ImageExts = Object.keys(supportedExtensions)

interface Namespace {
  namespace?: string
  types?: TYPES.ContentNamespaceTypes
  file?: string
  type?: string
}

const getNodeNamespace = (
  node: Node & Record<string, any>,
  mime: keyof TYPES.ContentNamespaceTypes,
  getNode?: (id: string) => Node,
): Namespace => {
  if (node.internal.type !== 'File') {
    const parent = getNode?.(node.parent)
    if (!parent) {
      return null
    }

    return getNodeNamespace(parent, mime, getNode)
  }

  let namespace: string, file: string
  if (node.sourceInstanceName === 'content') {
    const segments = path.normalize(node.relativePath).split(path.sep)
    if (segments.length > 1) {
      let rest: string[]
      ;[namespace, ...rest] = segments
      file = path.join(...rest)
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

const prepareNodeFields = (
  object: Record<string, any>,
  type: string,
  ns: Namespace,
  mutate = false,
) => {
  const { fields } =
    TYPES.create.find((def) => typeof def.name === 'string' && def.name === type) || {}
  if (!fields) {
    throw new Error(`Unable to find valid type definition for '${type}'.`)
  }

  const { namespace, file } = ns
  const node = mutate ? object : { ...object }
  const defaults = TYPES.defaults[type]
  if (defaults) {
    _.defaults(node, defaults)
  }

  if (fields.slug && !node.slug) {
    const parsedRelPath = path.parse(file)
    node.slug =
      parsedRelPath.dir === ''
        ? parsedRelPath.name
        : _.kebabCase(
            parsedRelPath.name === 'index'
              ? parsedRelPath.dir
              : `${parsedRelPath.dir}/${parsedRelPath.name}`,
          )
  }

  if (fields.image) {
    const nsPath = path.join(site.contentPath, namespace)
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
      let dir = path.join(nsPath, file)
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

const createChildMdxNode = async ({
  node,
  getNode,
  actions,
  createNodeId,
  createContentDigest,
}: CreateNodeArgs) => {
  const ns = getNodeNamespace(node, 'mdx', getNode)
  const { type } = ns
  if (!type) {
    return
  }

  const fmt = prepareNodeFields(node.frontmatter, type, ns)
  const newNode: NodeInput = {
    ...fmt,
    id: createNodeId(`${node.id} >> ${type}`),
    parent: node.id,
    children: [],
    internal: {
      type,
      description: `${type}: ${fmt.title as string}`,
      contentDigest: createContentDigest(fmt),
    },
  }

  await actions.createNode(newNode)
  actions.createParentChildLink({ parent: node, child: getNode(newNode.id) })
}

const shouldCreateChildMdxNode = (node: Node) => {
  return node.internal.type === 'Mdx'
}

export const getYamlTypename = ({
  node,
  object,
  isArray,
}: {
  node: Node & Record<string, any>
  object: Record<string, any>
  isArray: boolean
}) => {
  function tn(name: string, ext = true) {
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

  // We mutate `object` here
  // gatsby-transformer-yaml doesn't provide a way to transform YAML nodes.
  // This is a bit of a hack to ensure that the defaults are applied on YAML nodes
  prepareNodeFields(object, type, ns, true)
  return type
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({
  actions,
  schema,
}) => {
  actions.createTypes(
    TYPES.create.map((def) => (typeof def === 'string' ? def : schema.buildObjectType(def))),
  )
}

export const setFieldsOnGraphQLNodeType: GatsbyNode['setFieldsOnGraphQLNodeType'] = ({ type }) => {
  return TYPES.extend[type.name] ?? {}
}

export const shouldOnCreateNode: GatsbyNode['shouldOnCreateNode'] = (args) => {
  return shouldCreateChildMdxNode(args.node as Node)
}

export const onCreateNode: GatsbyNode['onCreateNode'] = async (args) => {
  if (shouldCreateChildMdxNode(args.node)) {
    await createChildMdxNode(args)
  }
}

const path = require('path')
const _ = require('lodash')
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

async function createChildMdxNodes({ node, getNode, actions, createNodeId, createContentDigest }) {
  const [namespace, relPath] = getNodeNamespace(node, getNode)
  if (!namespace || !(namespace in types.namespaceTypeMap)) {
    return
  }

  const type = types.namespaceTypeMap[namespace].mdx
  const parsedRelPath = path.parse(relPath)

  const newNode = {
    slug: parsedRelPath.dir === ''
      ? parsedRelPath.name
      : _.kebabCase(parsedRelPath.dir),
    draft: false,
    ...node.frontmatter,
    id: createNodeId(`${node.id} >> ${type}`),
    parent: node.id,
    children: [],
    internal: {
      type,
      description: `${type}: ${node.frontmatter.title}`,
    },
  }

  newNode.internal.contentDigest = createContentDigest(newNode)
  await actions.createNode(newNode)
  actions.createParentChildLink({ parent: node, child: getNode(newNode.id) })
}

exports.createTypes = ({ actions, schema }) => {
  actions.createTypes(types.definitions.map(def =>
    typeof def === 'string'
      ? def
      : schema.buildObjectType(def)
  ))
}

exports.createChildNodes = async function (args) {
  if (args.node.internal.type === 'Mdx') {
    await createChildMdxNodes(args)
  }
}

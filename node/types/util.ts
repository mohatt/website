import type { Node } from 'gatsby'
import type { GraphQLObjectType } from 'gatsby/graphql'
import type { GatsbyResolver } from 'gatsby/dist/schema/type-definitions'
import _ from 'lodash'

export const createParentFieldResolver = (
  field: string,
  defaultValue = null,
): GatsbyResolver<Node> => {
  return function (source, args, context, info) {
    return (
      context.nodeModel.getNodeById({ id: source.parent })[field || info.fieldName] || defaultValue
    )
  }
}

export const createParentFieldResolverProxy = (
  field: string,
  defaultValue = null,
): GatsbyResolver<Node> => {
  return async function (source, args, context, info) {
    const fieldName = field || info.fieldName
    const parentNode: Node = context.nodeModel.getNodeById({ id: source.parent })
    const schemaType = info.schema.getType(parentNode.internal.type) as GraphQLObjectType
    const resolver = schemaType.getFields()[fieldName].resolve
    const result = await resolver(parentNode, args, context, { fieldName } as any)
    return result || defaultValue
  }
}

export const createResolver = <S = Record<string, any>, A = Record<string, any>>(
  fn: GatsbyResolver<Node & S, A>,
) => fn

export const createSimpleIconsResolver = () =>
  createResolver((source) => {
    if (!source.icon || source.icon.length >= 32) {
      return source.icon
    }
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const icons = require('simple-icons')
    const icon = icons[`si${_.upperFirst(source.icon)}`]
    return icon?.path ?? source.icon
  })

const createPlatformHandle = require('./create-platform-handle')

exports.createParentFieldResolver = function ({ field, defaultValue = null }) {
  return function (source, args, context, info) {
    return context.nodeModel
      .getNodeById({ id: source.parent })[field || info.fieldName] || defaultValue
  }
}

exports.createParentFieldResolverProxy = function ({ field, defaultValue = null }) {
  return async function (source, args, context, info) {
    const fieldName = field || info.fieldName
    const parentNode = context.nodeModel.getNodeById({ id: source.parent })
    const schemaType = info.schema.getType(parentNode.internal.type)
    const resolver = schemaType.getFields()[fieldName].resolve
    const result = await resolver(parentNode, args, context, { fieldName })
    return result || defaultValue
  }
}

exports.createPlatformHandleResolver = function () {
  return function (source, args, context, info) {
    const fieldValue = source[info.fieldName]
    if (!fieldValue) {
      return null
    }

    if (Array.isArray(fieldValue)) {
      return fieldValue.map(createPlatformHandle)
    }

    return createPlatformHandle(fieldValue)
  }
}

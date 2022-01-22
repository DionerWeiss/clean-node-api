import { makeAuthMiddleware } from '@/main/factories'
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import { ForbiddenError } from 'apollo-server-express'
import { GraphQLSchema } from 'graphql'

export const authDirectiveTransformer = (schema: GraphQLSchema): GraphQLSchema => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (filedConfig) => {
      const authDirective = getDirective(schema, filedConfig, 'auth')
      if (authDirective) {
        const { resolve } = filedConfig
        filedConfig.resolve = async (parent, args, context, info) => {
          const request = {
            accessToken: context?.req?.headers?.['x-access-token']
          }
          const httpResponse = await makeAuthMiddleware().handle(request)
          if (httpResponse.statusCode === 200) {
            Object.assign(context.req, httpResponse.body)
            return resolve.call(this, parent, args, context, info)
          } else {
            throw new ForbiddenError(httpResponse.body.message)
          }
        }
      }
      return filedConfig
    }
  })
}

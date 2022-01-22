import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupStaticFiles from './static-files'
import setupSwagger from './swagger'
import express, { Express } from 'express'
import { setupApolloServer } from '@/main/graphql/apollo'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  const server = setupApolloServer()
  await server.start()
  setupSwagger(app)
  setupStaticFiles(app)
  setupMiddlewares(app)
  setupRoutes(app)

  server.applyMiddleware({ app })
  return app
}

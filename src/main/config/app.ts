import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupStaticFiles from './static-files'
import setupSwagger from './config-swagger'
import express from 'express'

const app = express()
setupSwagger(app)
setupStaticFiles(app)
setupMiddlewares(app)
setupRoutes(app)
export default app

import {
  badRequest,
  forbiden,
  notFound,
  serverError,
  unauthorized
} from './components/'

import { apiKeyAuthSchema } from './schemas/'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest,
  forbiden,
  notFound,
  serverError,
  unauthorized
}

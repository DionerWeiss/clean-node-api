import { loginPath, surveyPath, signUpPath } from './paths'
import {
  badRequest,
  forbiden,
  notFound,
  serverError,
  unauthorized
} from './components'
import {
  loginParamsSchema,
  accountSchema,
  errorSchema,
  surveyAnswerSchema,
  surveySchema,
  surveysSchema,
  apiKeyAuthSchema,
  signUpParamsSchema,
  addSurveyParamsSchema
} from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'API do curso do Mango para realizar enquetes entre programadores',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }, {
    name: 'Enquete'
  }],
  paths: {
    '/login': loginPath,
    '/signup': signUpPath,
    '/surveys': surveyPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signUpParams: signUpParamsSchema,
    error: errorSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema,
    addSurveyParams: addSurveyParamsSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    forbiden,
    notFound,
    serverError,
    unauthorized
  }
}

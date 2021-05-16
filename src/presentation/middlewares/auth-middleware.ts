import { forbiden } from '../helpers/http/httpHelper'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'
import { AccessDeniedError } from '../errors'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = forbiden(new AccessDeniedError())
    return new Promise(resolve => resolve(error))
  }
}

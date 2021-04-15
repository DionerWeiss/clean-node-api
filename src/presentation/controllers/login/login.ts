import { MissingParamError } from '../../../presentation/errors'
import { badRequest } from '../../../presentation/helpers/httpHelper'
import { Controller, HttpRequest, HttpResponse } from '../../../presentation/protocols'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
  }
}

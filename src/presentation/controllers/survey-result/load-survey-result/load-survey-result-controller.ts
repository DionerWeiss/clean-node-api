import { InvalidParamError } from '@/presentation/errors'
import { forbiden } from '@/presentation/helpers/http/httpHelper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveyById
} from './load-survey-result-controller-protocols'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId)
    if (!survey) {
      return forbiden(new InvalidParamError('surveyId'))
    }
    return Promise.resolve(null)
  }
}

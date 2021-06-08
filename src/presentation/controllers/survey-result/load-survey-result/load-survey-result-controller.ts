import { InvalidParamError } from '@/presentation/errors'
import { forbiden, serverError } from '@/presentation/helpers/http/httpHelper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveyById,
  LoadSurveyResult
} from './load-survey-result-controller-protocols'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbiden(new InvalidParamError('surveyId'))
      }
      await this.loadSurveyResult.load(surveyId)
      return Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}

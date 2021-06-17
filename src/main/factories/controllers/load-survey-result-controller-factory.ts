import { makeLogControllerDecorator, makeDbLoadSurveyResult } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { LoadSurveyResultController } from '@/presentation/controllers'
import { makeDbCheckSurveyById } from '@/main/factories/usecases'

export const makeLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(makeDbCheckSurveyById(), makeDbLoadSurveyResult())
  return makeLogControllerDecorator(controller)
}

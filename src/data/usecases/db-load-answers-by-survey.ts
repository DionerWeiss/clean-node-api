import { LoadAnswersBySurvey } from '@/domain/usecases'
import { LoadAnswersBySurveyRepository } from '@/data/protocols'

export class DbLoadAnswersBySurvey implements LoadAnswersBySurvey {
  constructor (private readonly loadAnsersBySurveyRepository: LoadAnswersBySurveyRepository) {}
  async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Result> {
    return await this.loadAnsersBySurveyRepository.loadAnswers(id)
  }
}

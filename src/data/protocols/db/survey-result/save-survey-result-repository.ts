import { SaveSurveyResult } from '@/domain/usecases'

export interface SaveSurveyResultRepository {
  save (data: LoadSurveyResultRepository.Params): Promise<void>
}

export namespace LoadSurveyResultRepository {
  export type Params = SaveSurveyResult.Params
}

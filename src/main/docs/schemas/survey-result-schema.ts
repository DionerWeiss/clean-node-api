export const surveyResultSchema = {
  type: 'object',
  properties: {
    surveId: {
      type: 'string'
    },
    question: {
      type: 'string'
    },
    answers: {
      type: 'array',
      items: {
        $ref: '#/schemas/surveyResultAnswer'
      }
    },
    date: {
      type: 'string'
    }
  },
  required: ['question', 'surveyId', 'answers', 'date']
}

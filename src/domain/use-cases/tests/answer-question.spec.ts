import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from '../answer-question.js'
import type { AnswerRepository } from '@/domain/repositories/answer-repository.js'
import type { Answer } from '@/domain/entities/answer.js'

const fakeAnswerRepository: AnswerRepository = {
  create: async (answer: Answer) => { return; }
}

test('Create a answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

  const answer = await answerQuestion.execute({
    instructorId: 'i-01',
    questionId: 'q-01',
    content: 'test'
  })

  expect(answer.id).toEqual(expect.stringMatching(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i))
  expect(answer.content).toEqual('test')
  expect(answer.authorId).toEqual('i-01')
  expect(answer.questionId).toEqual('q-01')
})
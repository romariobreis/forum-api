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
    instructorId: '3bbc81b5-70bf-4e89-ad05-b7efefbe32ae',
    questionId: '3bbc81b5-69bf-4e89-7f05-b7efefbe32ae',
    content: 'test'
  })

  console.log({ answer })

  expect(answer.id).toEqual(expect.stringMatching(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i))
  expect(answer.content).toEqual('test')
  expect(answer.authorId).toEqual('3bbc81b5-70bf-4e89-ad05-b7efefbe32ae')
  expect(answer.questionId).toEqual('3bbc81b5-69bf-4e89-7f05-b7efefbe32ae')
})
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryAnswerRepository } from '../../../../../../test/repositories/in-memory-answer-repository.js';
import { AnswerQuestionUseCase } from '../answer-question.js';

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe('Create a question', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('should be able to create a answer question', async () => {
    const result = await sut.execute({
      instructorId: '3bbc81b5-70bf-4e89-ad05-b7efefbe32ae',
      questionId: '3bbc81b5-69bf-4e89-7f05-b7efefbe32ae',
      content: 'test'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.answer.id).toEqual(expect.stringMatching(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i))
    expect(result.value?.answer.content).toEqual('test')
    expect(result.value?.answer.authorId).toEqual('3bbc81b5-70bf-4e89-ad05-b7efefbe32ae')
    expect(result.value?.answer.questionId).toEqual('3bbc81b5-69bf-4e89-7f05-b7efefbe32ae')
  })
})
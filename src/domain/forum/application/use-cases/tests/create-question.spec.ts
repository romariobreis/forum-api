import { beforeEach, describe, expect, it } from 'vitest'
import { CreateQuestionUseCase } from '../create-question.js';
import { InMemoryQuestionRepository } from '../../../../../../test/repositories/in-memory-question-repository.js';

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

describe('Create a question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: '3bbc81b5-70bf-4e89-ad05-b7efefbe32ae',
      title: 'First question',
      content: 'test question'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.question.slug.value).toEqual('first-question')
    expect(result.value?.question.title).toEqual('First question')
    expect(result.value?.question.content).toEqual('test question')
    expect(result.value?.question.authorId).toEqual('3bbc81b5-70bf-4e89-ad05-b7efefbe32ae')
  })
})

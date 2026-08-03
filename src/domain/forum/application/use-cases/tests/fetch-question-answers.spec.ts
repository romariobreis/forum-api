import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryAnswerRepository } from '../../../../../../test/repositories/in-memory-answer-repository.js';
import { makeAnswer } from '../../../../../../test/factories/make-answer.js';
import { FetchQuestionAnswersUseCase } from '../fetch-question-answers.js';
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js';

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswerRepository)
  })

  it('should be able to fetch question answers', async () => {
    inMemoryAnswerRepository.create(makeAnswer({
      questionId: new UniqueEntityId('dbab5e10-eab5-4f0c-8b87-2557727ff9f2')
    }))
    inMemoryAnswerRepository.create(makeAnswer({
      questionId: new UniqueEntityId('dbab5e10-eab5-4f0c-8b87-2557727ff9f2')
    }))
    inMemoryAnswerRepository.create(makeAnswer({
      questionId: new UniqueEntityId('dbab5e10-eab5-4f0c-8b87-2557727ff9f2')
    }))

    const result = await sut.execute({ questionId: 'dbab5e10-eab5-4f0c-8b87-2557727ff9f2', page: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to fetch paginated question answers', async () => {
    for (let index = 1; index <= 22; index++) {
      inMemoryAnswerRepository.create(makeAnswer({
        questionId: new UniqueEntityId('dbab5e10-eab5-4f0c-8b87-2557727ff9f2')
      }))
    }

    const result = await sut.execute({ questionId: 'dbab5e10-eab5-4f0c-8b87-2557727ff9f2', page: 2 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.answers).toHaveLength(2)
  })
})

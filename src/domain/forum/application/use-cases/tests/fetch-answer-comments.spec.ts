import { beforeEach, describe, expect, it } from 'vitest'
import { FetchAnswerCommentsUseCase } from '../fetch-answer-comments.js';
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js';
import { InMemoryAnswerCommentRepository } from '../../../../../../test/repositories/in-memory-answer-comment-repository.js';
import { makeAnswerComment } from '../../../../../../test/factories/make-answer-comment.js';

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentRepository)
  })

  it('should be able to fetch answer comments', async () => {
    inMemoryAnswerCommentRepository.create(makeAnswerComment({
      answerId: new UniqueEntityId('dbab5e10-eab5-4f0c-8b87-2557727ff9f2')
    }))
    inMemoryAnswerCommentRepository.create(makeAnswerComment({
      answerId: new UniqueEntityId('dbab5e10-eab5-4f0c-8b87-2557727ff9f2')
    }))
    inMemoryAnswerCommentRepository.create(makeAnswerComment({
      answerId: new UniqueEntityId('dbab5e10-eab5-4f0c-8b87-2557727ff9f2')
    }))

    const result = await sut.execute({ answerId: 'dbab5e10-eab5-4f0c-8b87-2557727ff9f2', page: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.answerComments).toHaveLength(3)
  })

  it('should be able to fetch paginated answer comments', async () => {
    for (let index = 1; index <= 22; index++) {
      inMemoryAnswerCommentRepository.create(makeAnswerComment({
        answerId: new UniqueEntityId('dbab5e10-eab5-4f0c-8b87-2557727ff9f2')
      }))
    }

    const result = await sut.execute({ answerId: 'dbab5e10-eab5-4f0c-8b87-2557727ff9f2', page: 2 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.answerComments).toHaveLength(2)
  })
})

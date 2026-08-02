import { beforeEach, describe, expect, it } from 'vitest'
import { makeAnswer } from '../../../../../../test/factories/make-answer.js';
import { FetchQuestionCommentsUseCase } from '../fetch-question-comments.js';
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js';
import { InMemoryQuestionCommentRepository } from '../../../../../../test/repositories/in-memory-question-comment-repository.js';
import { makeQuestionComment } from '../../../../../../test/factories/make-question-comment.js';

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentRepository)
  })

  it('should be able to fetch question comments', async () => {
    inMemoryQuestionCommentRepository.create(makeQuestionComment({
      questionId: new UniqueEntityId('dbab5e10-eab5-4f0c-8b87-2557727ff9f2')
    }))
    inMemoryQuestionCommentRepository.create(makeQuestionComment({
      questionId: new UniqueEntityId('dbab5e10-eab5-4f0c-8b87-2557727ff9f2')
    }))
    inMemoryQuestionCommentRepository.create(makeQuestionComment({
      questionId: new UniqueEntityId('dbab5e10-eab5-4f0c-8b87-2557727ff9f2')
    }))

    const { questionComments } = await sut.execute({ questionId: 'dbab5e10-eab5-4f0c-8b87-2557727ff9f2', page: 1 })

    expect(questionComments).toHaveLength(3)
  })

  it('should be able to fetch paginated question comments', async () => {
    for (let index = 1; index <= 22; index++) {
      inMemoryQuestionCommentRepository.create(makeQuestionComment({
        questionId: new UniqueEntityId('dbab5e10-eab5-4f0c-8b87-2557727ff9f2')
      }))
    }

    const { questionComments } = await sut.execute({ questionId: 'dbab5e10-eab5-4f0c-8b87-2557727ff9f2', page: 2 })

    expect(questionComments).toHaveLength(2)
  })
})

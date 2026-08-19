import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryQuestionCommentRepository } from '../../../../../../test/repositories/in-memory-question-comment-repository.js'
import { DeleteQuestionCommentUseCase } from '../delete-question-comment.js'
import { makeQuestionComment } from '../../../../../../test/factories/make-question-comment.js'

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: DeleteQuestionCommentUseCase

describe('delete a question comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentRepository)
  })

  it('should be able to delete a question comment', async () => {
    const newQuestionComment = makeQuestionComment()

    inMemoryQuestionCommentRepository.create(newQuestionComment)

    expect(inMemoryQuestionCommentRepository.questionComments).toHaveLength(1)

    await sut.execute({
      questionCommentId: newQuestionComment.id,
      authorId: newQuestionComment.authorId,
    })

    expect(inMemoryQuestionCommentRepository.questionComments).toHaveLength(0)
  })
})

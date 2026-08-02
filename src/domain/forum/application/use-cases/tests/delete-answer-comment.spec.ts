import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryAnswerCommentRepository } from '../../../../../../test/repositories/in-memory-answer-comment-repository.js'
import { DeleteAnswerCommentUseCase } from '../delete-answer-comment.js'
import { makeAnswerComment } from '../../../../../../test/factories/make-answer-comment.js'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: DeleteAnswerCommentUseCase

describe('delete a answer comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentRepository)
  })

  it('should be able to delete a answer comment', async () => {
    const newAnswerComment = makeAnswerComment()

    inMemoryAnswerCommentRepository.create(newAnswerComment)

    expect(inMemoryAnswerCommentRepository.answerComments).toHaveLength(1)

    await sut.execute({
      answerCommentId: newAnswerComment.id,
      authorId: newAnswerComment.authorId,
    })

    expect(inMemoryAnswerCommentRepository.answerComments).toHaveLength(0)
  })
})

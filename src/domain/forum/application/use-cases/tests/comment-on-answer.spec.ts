import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryAnswerRepository } from '../../../../../../test/repositories/in-memory-answer-repository.js'
import { makeAnswer } from '../../../../../../test/factories/make-answer.js'
import { CommentOnAnswerUseCase } from '../comment-on-answer.js'
import { faker } from '@faker-js/faker'
import { InMemoryAnswerCommentRepository } from '../../../../../../test/repositories/in-memory-answer-comment-repository.js'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: CommentOnAnswerUseCase

describe('Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new CommentOnAnswerUseCase(inMemoryAnswerRepository, inMemoryAnswerCommentRepository)
  })

  it('should be able to comment on answer', async () => {
    const newAnswer = makeAnswer()

    inMemoryAnswerRepository.create(newAnswer)

    const newContent = faker.lorem.text()

    const { answerComment } = await sut.execute({
      authorId: newAnswer.authorId.toString(),
      answerId: newAnswer.id,
      content: newContent
    })

    expect(answerComment.content).toEqual(newContent)
  })
})

import { beforeEach, describe, expect, it } from 'vitest'
import { makeAnswer } from '../../../../../../test/factories/make-answer.js'
import { InMemoryQuestionRepository } from '../../../../../../test/repositories/in-memory-question-repository.js'
import { makeQuestion } from '../../../../../../test/factories/make-question.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { CommentOnQuestionUseCase } from '../comment-on-question.js'
import { InMemoryQuestionCommentRepository } from '../../../../../../test/repositories/in-memory-question-comment-repository.js'
import { faker } from '@faker-js/faker'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new CommentOnQuestionUseCase(inMemoryQuestionRepository, inMemoryQuestionCommentRepository)
  })

  it('should be able to comment on question', async () => {
    const newQuestion = makeQuestion()

    inMemoryQuestionRepository.create(newQuestion)

    const newContent = faker.lorem.text()

    const { questionComment } = await sut.execute({
      authorId: newQuestion.authorId.toString(),
      questionId: newQuestion.id,
      content: newContent
    })

    expect(questionComment.content).toEqual(newContent)
  })
})

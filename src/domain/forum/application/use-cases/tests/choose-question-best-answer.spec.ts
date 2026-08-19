import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryAnswerRepository } from '../../../../../../test/repositories/in-memory-answer-repository.js'
import { makeAnswer } from '../../../../../../test/factories/make-answer.js'
import { InMemoryQuestionRepository } from '../../../../../../test/repositories/in-memory-question-repository.js'
import { ChooseQuestionBestAnswerUseCase } from '../choose-question-best-answer.js'
import { makeQuestion } from '../../../../../../test/factories/make-question.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose question best answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new ChooseQuestionBestAnswerUseCase(inMemoryAnswerRepository, inMemoryQuestionRepository)
  })

  it('should be able to choose question best answer', async () => {
    const newQuestion = makeQuestion()
    const newAnswer = makeAnswer({
      questionId: new UniqueEntityId(newQuestion.id)
    })

    inMemoryQuestionRepository.create(newQuestion)
    inMemoryAnswerRepository.create(newAnswer)

    const result = await sut.execute({ answerId: newAnswer.id.toString(), authorId: newQuestion.authorId })

    expect(result.isRight()).toBe(true)
    expect(result.value.question.bestAnswerId).toEqual(newAnswer.id)
  })
})

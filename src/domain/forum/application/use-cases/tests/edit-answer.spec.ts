import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryAnswerRepository } from '../../../../../../test/repositories/in-memory-answer-repository.js';
import { makeAnswer } from '../../../../../../test/factories/make-answer.js';
import { faker } from '@faker-js/faker';
import { EditAnswerUseCase } from '../edit-anwer.js';
import { NotAllowedError } from '../errors/not-allowed-error.js';

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: EditAnswerUseCase

describe('Edit a Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new EditAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer()
    const newAnswer2 = makeAnswer()

    inMemoryAnswerRepository.create(newAnswer)
    inMemoryAnswerRepository.create(newAnswer2)

    expect(inMemoryAnswerRepository.answers[0]?.content).toEqual(newAnswer.content)

    const newContent = faker.lorem.text()

    let result = await sut.execute({ answerId: newAnswer.id.toString(), authorId: newAnswer.authorId, content: newContent })

    if (result.isRight()) {
      expect(result.value.answer.content).toEqual(newContent)
    } else {
      throw new Error('Expected result to be right')
    }

    result = await sut.execute({
      answerId: newAnswer2.id.toString(),
      authorId: newAnswer.authorId,
      content: newContent
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})

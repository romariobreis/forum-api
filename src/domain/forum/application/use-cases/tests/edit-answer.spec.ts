import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryAnswerRepository } from '../../../../../../test/repositories/in-memory-answer-repository.js';
import { makeAnswer } from '../../../../../../test/factories/make-answer.js';
import { faker } from '@faker-js/faker';
import { EditAnswerUseCase } from '../edit-anwer.js';

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

    const { answer } = await sut.execute({ answerId: newAnswer.id.toString(), authorId: newAnswer.authorId, content: newContent })

    expect(answer.content).toEqual(newContent)
    await expect(() =>
      sut.execute({
        answerId: newAnswer2.id.toString(),
        authorId: newAnswer.authorId,
        content: newContent
      })
    ).rejects.toBeInstanceOf(Error)
  })
})

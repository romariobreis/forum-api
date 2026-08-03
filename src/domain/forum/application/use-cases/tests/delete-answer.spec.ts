import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryAnswerRepository } from '../../../../../../test/repositories/in-memory-answer-repository.js'
import { makeAnswer } from '../../../../../../test/factories/make-answer.js'
import { DeleteAnswerUseCase } from '../delete-answer.js'
import { NotAllowedError } from '../errors/not-allowed-error.js'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: DeleteAnswerUseCase

describe('Delete a Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer()
    const newAnswer2 = makeAnswer()

    inMemoryAnswerRepository.create(newAnswer)
    inMemoryAnswerRepository.create(newAnswer2)

    await sut.execute({ answerId: newAnswer.id.toString(), authorId: newAnswer.authorId })

    expect(inMemoryAnswerRepository.answers).toHaveLength(1)

    const result = await sut.execute({
      answerId: newAnswer2.id.toString(),
      authorId: newAnswer.authorId
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})

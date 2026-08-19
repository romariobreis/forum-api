import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryQuestionRepository } from '../../../../../../test/repositories/in-memory-question-repository.js';
import { makeQuestion } from '../../../../../../test/factories/make-question.js';
import { DeleteQuestionUseCase } from '../delete-question.js';
import { NotAllowedError } from '../errors/not-allowed-error.js';

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: DeleteQuestionUseCase

describe('Delete a Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion()
    const newQuestion2 = makeQuestion()

    inMemoryQuestionRepository.create(newQuestion)
    inMemoryQuestionRepository.create(newQuestion2)

    await sut.execute({ questionId: newQuestion.id.toString(), authorId: newQuestion.authorId })

    expect(inMemoryQuestionRepository.questions).toHaveLength(1)

    const result = await sut.execute({
      questionId: newQuestion2.id.toString(),
      authorId: newQuestion.authorId
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})

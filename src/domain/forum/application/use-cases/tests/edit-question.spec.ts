import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryQuestionRepository } from '../../../../../../test/repositories/in-memory-question-repository.js';
import { makeQuestion } from '../../../../../../test/factories/make-question.js';
import { EditQuestionUseCase } from '../edit-question.js';
import { faker } from '@faker-js/faker';
import { NotAllowedError } from '../errors/not-allowed-error.js';

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: EditQuestionUseCase

describe('Edit a Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion()
    const newQuestion2 = makeQuestion()

    inMemoryQuestionRepository.create(newQuestion)
    inMemoryQuestionRepository.create(newQuestion2)

    expect(inMemoryQuestionRepository.questions[0]?.title).toEqual(newQuestion.title)
    expect(inMemoryQuestionRepository.questions[0]?.content).toEqual(newQuestion.content)

    const newTitle = faker.lorem.sentence()
    const newContent = faker.lorem.text()

    let result = await sut.execute({ questionId: newQuestion.id.toString(), authorId: newQuestion.authorId, title: newTitle, content: newContent })

    expect(result.isRight()).toBe(true)
    expect(result.value.question.title).toEqual(newTitle)
    expect(result.value.question.content).toEqual(newContent)

    result = await sut.execute({
      questionId: newQuestion2.id.toString(),
      authorId: newQuestion.authorId,
      title: newTitle,
      content: newContent
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})

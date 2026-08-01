import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryQuestionRepository } from '../../../../../../test/repositories/in-memory-question-repository.js';
import { makeQuestion } from '../../../../../../test/factories/make-question.js';
import { EditQuestionUseCase } from '../edit-question.js';
import { faker } from '@faker-js/faker';

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

    const { question } = await sut.execute({ questionId: newQuestion.id.toString(), authorId: newQuestion.authorId, title: newTitle, content: newContent })

    expect(question.title).toEqual(newTitle)
    expect(question.content).toEqual(newContent)
    await expect(() =>
      sut.execute({
        questionId: newQuestion2.id.toString(),
        authorId: newQuestion.authorId,
        title: newTitle,
        content: newContent
      })
    ).rejects.toBeInstanceOf(Error)
  })
})

import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryQuestionRepository } from '../../../../../../test/repositories/in-memory-question-repository.js';
import { GetQuestionBySlugUseCase } from '../get-question-by-slug.js';
import { makeQuestion } from '../../../../../../test/factories/make-question.js';

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })

  it('should be able to get question by slug', async () => {
    const newQuestion = makeQuestion()

    inMemoryQuestionRepository.create(newQuestion)

    const result = await sut.execute({ slug: newQuestion.slug.value })

    expect(result.isRight()).toBe(true)
    expect(result.value.question.slug.value).toEqual(newQuestion.slug.value)
    expect(result.value.question.title).toEqual(newQuestion.title)
    expect(result.value.question.content).toEqual(newQuestion.content)
    expect(result.value.question.authorId).toEqual(newQuestion.authorId.toString())
  })
})

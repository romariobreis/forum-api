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

    const { question } = await sut.execute({ slug: 'first-question' })

    expect(question.slug.value).toEqual('first-question')
    expect(question.title).toEqual('First question')
    expect(question.content).toEqual('test question')
    expect(question.authorId).toEqual(question.authorId)
  })
})

import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryQuestionRepository } from '../../../../../../test/repositories/in-memory-question-repository.js';
import { makeQuestion } from '../../../../../../test/factories/make-question.js';
import { FetchRecentQuestionsUseCase } from '../fetch-recent-questions.js';

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionRepository)
  })

  it('should be able to fetch recent questions', async () => {
    inMemoryQuestionRepository.create(makeQuestion({
      createdAt: new Date(2026, 4, 13)
    }))
    inMemoryQuestionRepository.create(makeQuestion({
      createdAt: new Date(2026, 8, 1)
    }))
    inMemoryQuestionRepository.create(makeQuestion({
      createdAt: new Date(2026, 6, 26)
    }))

    const result = await sut.execute({ page: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2026, 8, 1) }),
      expect.objectContaining({ createdAt: new Date(2026, 6, 26) }),
      expect.objectContaining({ createdAt: new Date(2026, 4, 13) })
    ])
  })
  it('should be able to fetch paginated recent questions', async () => {
    for (let index = 1; index <= 22; index++) {
      inMemoryQuestionRepository.create(makeQuestion())
    }

    const result = await sut.execute({ page: 2 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.questions).toHaveLength(2)
  })
})

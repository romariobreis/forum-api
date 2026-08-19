import type { PaginationParams } from "@/core/repositories/pagination-params.js";
import type { QuestionRepository } from "@/domain/forum/application/repositories/question-repository.js";
import { Question } from "@/domain/forum/enterprise/entities/question.js";

export class InMemoryQuestionRepository implements QuestionRepository {
  public questions: Question[] = []

  async create(question: Question) {
    this.questions.push(question)
  }

  async findById(questionId: string) {
    const question = this.questions.find(question => question.id.toString() === questionId)

    if (!question) {
      throw new Error('Quest not found.')
    }

    return question
  }

  async findBySlug(slug: string) {
    return this.questions.find(question => question.slug.value === slug) ?? null
  }

  async findManyRecents({ page }: PaginationParams) {
    return this.questions
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)
  }

  async save(question: Question) {
    const itemIndex = this.questions.findIndex(item => item.id === question.id)

    this.questions[itemIndex] = question
  }

  async delete(question: Question) {
    const itemIndex = this.questions.findIndex(item => item.id === question.id)

    this.questions.splice(itemIndex, 1)
  }
}
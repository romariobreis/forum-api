import type { QuestionRepository } from "@/domain/forum/application/repositories/question-repository.js";
import { Question } from "@/domain/forum/enterprise/entities/question.js";

export class InMemoryQuestionRepository implements QuestionRepository {
  public questions: Question[] = []

  async create(question: Question) {
    this.questions.push(question)
  }

  async findBySlug(slug: string) {
    return this.questions.find(question => question.slug.value === slug) ?? null
  }
}
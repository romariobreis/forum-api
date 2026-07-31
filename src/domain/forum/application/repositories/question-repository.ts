import type { Question } from "../../enterprise/entities/question.js";

export interface QuestionRepository {
  create(question: Question): Promise<void>
  findById(questionId: string): Promise<Question>
  findBySlug(slug: string): Promise<Question | null>
  delete(question: Question): Promise<void>
}
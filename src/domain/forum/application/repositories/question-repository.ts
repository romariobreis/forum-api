import type { PaginationParams } from "@/core/repositories/pagination-params.js";
import type { Question } from "../../enterprise/entities/question.js";

export interface QuestionRepository {
  findById(questionId: string): Promise<Question>
  findBySlug(slug: string): Promise<Question | null>
  findManyRecents(params: PaginationParams): Promise<Question[]>
  create(question: Question): Promise<void>
  save(question: Question): Promise<void>
  delete(question: Question): Promise<void>
}
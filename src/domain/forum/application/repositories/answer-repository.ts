import type { Answer } from "../../enterprise/entities/answer.js";

export interface AnswerRepository {
  create(answer: Answer): Promise<void>
  findById(answerId: string): Promise<Answer>
  delete(answer: Answer): Promise<void>
}
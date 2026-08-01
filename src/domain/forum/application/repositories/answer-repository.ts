import type { Answer } from "../../enterprise/entities/answer.js";

export interface AnswerRepository {
  create(answer: Answer): Promise<void>
  findById(answerId: string): Promise<Answer>
  save(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
}
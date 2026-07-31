import type { Answer } from "../forum/enterprise/entities/answer.js";

export interface AnswerRepository {
  create(answer: Answer): Promise<void>
}
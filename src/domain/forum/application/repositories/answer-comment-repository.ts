import type { AnswerComment } from "../../enterprise/entities/answer-comment.js";

export interface AnswerCommentRepository {
  create(answerComment: AnswerComment): Promise<void>
  findById(answerCommentId: string): Promise<AnswerComment | null>
  delete(answerComment: AnswerComment): Promise<void>
}
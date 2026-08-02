import type { QuestionComment } from "../../enterprise/entities/question-comment.js";

export interface QuestionCommentRepository {
  findById(questionId: string): Promise<QuestionComment>
  create(questionComment: QuestionComment): Promise<void>
  delete(question: QuestionComment): Promise<void>
}
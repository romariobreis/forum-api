import type { QuestionCommentRepository } from "@/domain/forum/application/repositories/question-comment-repository.js";
import type { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment.js";

export class InMemoryQuestionCommentRepository implements QuestionCommentRepository {
  public questionComments: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.questionComments.push(questionComment)
  }
}
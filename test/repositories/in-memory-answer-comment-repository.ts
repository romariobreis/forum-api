import type { AnswerCommentRepository } from "@/domain/forum/application/repositories/answer-comment-repository.js";
import type { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment.js";

export class InMemoryAnswerCommentRepository implements AnswerCommentRepository {
  public answerComments: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.answerComments.push(answerComment)
  }
}
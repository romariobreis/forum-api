import type { PaginationParams } from "@/core/repositories/pagination-params.js";
import type { AnswerCommentRepository } from "@/domain/forum/application/repositories/answer-comment-repository.js";
import type { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment.js";

export class InMemoryAnswerCommentRepository implements AnswerCommentRepository {
  public answerComments: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.answerComments.push(answerComment)
  }

  async findById(answerCommentId: string) {
    const answerComment = this.answerComments.find(item => item.id.toString() === answerCommentId)

    if (!answerComment) {
      throw new Error('Answer answer not found.')
    }

    return answerComment
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    return this.answerComments
      .filter(item => item.answerId.toValue() === answerId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)
  }


  async delete(answerComment: AnswerComment) {
    const itemIndex = this.answerComments.findIndex(item => item.id === answerComment.id)

    this.answerComments.splice(itemIndex, 1)
  }
}
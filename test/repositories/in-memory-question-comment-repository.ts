import type { PaginationParams } from "@/core/repositories/pagination-params.js";
import type { QuestionCommentRepository } from "@/domain/forum/application/repositories/question-comment-repository.js";
import type { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment.js";

export class InMemoryQuestionCommentRepository implements QuestionCommentRepository {
  public questionComments: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.questionComments.push(questionComment)
  }

  async findById(questionId: string) {
    const questionComment = this.questionComments.find(item => item.id.toString() === questionId)

    if (!questionComment) {
      throw new Error('Quest comment not found.')
    }

    return questionComment
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    return this.questionComments
      .filter(item => item.questionId.toValue() === questionId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)
  }

  async delete(questionComment: QuestionComment) {
    const itemIndex = this.questionComments.findIndex(item => item.id === questionComment.id)

    this.questionComments.splice(itemIndex, 1)
  }
}
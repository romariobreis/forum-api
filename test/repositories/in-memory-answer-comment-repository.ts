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
      throw new Error('Question answer not found.')
    }

    return answerComment
  }

  async delete(answerComment: AnswerComment) {
    const itemIndex = this.answerComments.findIndex(item => item.id === answerComment.id)

    this.answerComments.splice(itemIndex, 1)
  }
}
import type { PaginationParams } from "@/core/repositories/pagination-params.js";
import type { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository.js";
import type { Answer } from "@/domain/forum/enterprise/entities/answer.js";

export class InMemoryAnswerRepository implements AnswerRepository {
  public answers: Answer[] = []

  async create(answer: Answer) {
    this.answers.push(answer)
  }

  async findById(answerId: string) {
    const answer = this.answers.find(answer => answer.id.toString() === answerId)

    if (!answer) {
      throw new Error('Quest not found.')
    }

    return answer
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    return this.answers
      .filter(answer => answer.questionId === questionId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)
  }

  async save(answer: Answer) {
    const itemIndex = this.answers.findIndex(item => item.id === answer.id)

    this.answers[itemIndex] = answer
  }

  async delete(answer: Answer) {
    const itemIndex = this.answers.findIndex(item => item.id === answer.id)

    this.answers.splice(itemIndex, 1)
  }
}
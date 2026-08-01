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

  async save(answer: Answer) {
    const itemIndex = this.answers.findIndex(item => item.id === answer.id)

    this.answers[itemIndex] = answer
  }

  async delete(answer: Answer) {
    const itemIndex = this.answers.findIndex(item => item.id === answer.id)

    this.answers.splice(itemIndex, 1)
  }
}
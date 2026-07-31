import { UniqueEntityId } from "@/core/entities/unique-entity-id.js"
import type { AnswerRepository } from "../repositories/answer-repository.js"
import { Answer } from "../../enterprise/entities/answer.js"

interface AnswerQuestionUseCaseRequest {
  instructorId: string,
  questionId: string
  content: string
}
interface AnswerQuestionUseCaseResponse {
  answer: Answer
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) { }

  async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
      content
    })
    await this.answerRepository.create(answer)

    return { answer }
  }
}
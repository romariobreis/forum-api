import type { AnswerRepository } from "../repositories/answer-repository.js"
import type { Question } from "../../enterprise/entities/question.js"
import type { QuestionRepository } from "../repositories/question-repository.js"
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js"
import { left, right, type Either } from "@/core/either.js"
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js"
import { NotAllowedError } from "./errors/not-allowed-error.js"

interface ChooseQuestionBestAnswerUseCaseRequest {
  answerId: string
  authorId: string,
}
type ChooseQuestionBestAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { question: Question }>

export class ChooseQuestionBestAnswerUseCase {
  constructor(private answerRepository: AnswerRepository, private questionRepository: QuestionRepository) { }

  async execute({ answerId, authorId }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionRepository.findById(answer.questionId.toString())

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (question.authorId !== authorId) {
      return left(new NotAllowedError())
    }

    question.bestAnswerId = new UniqueEntityId(answerId)

    return right({ question })
  }
}
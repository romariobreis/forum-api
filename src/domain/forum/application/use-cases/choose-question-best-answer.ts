import type { AnswerRepository } from "../repositories/answer-repository.js"
import type { Question } from "../../enterprise/entities/question.js"
import type { QuestionRepository } from "../repositories/question-repository.js"
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js"

interface ChooseQuestionBestAnswerUseCaseRequest {
  answerId: string
  authorId: string,
}
interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(private answerRepository: AnswerRepository, private questionRepository: QuestionRepository) { }

  async execute({ answerId, authorId }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    const question = await this.questionRepository.findById(answer.questionId.toString())

    if (!question) {
      throw new Error('Question not found.')
    }
    console.log({ question_authorId: question.authorId, authorId })
    if (question.authorId !== authorId) {
      throw new Error('Not allowed.')
    }

    question.bestAnswerId = new UniqueEntityId(answerId)

    return { question }
  }
}
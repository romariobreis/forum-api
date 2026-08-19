import { UniqueEntityId } from "@/core/entities/unique-entity-id.js"
import type { QuestionRepository } from "../repositories/question-repository.js";
import { Question } from "../../enterprise/entities/question.js";
import { right, type Either } from "@/core/either.js";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment.js";

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  attachmentIds: string[]
}

type CreateQuestionUseCaseResponse = Either<null, { question: Question }>

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) { }

  async execute({
    authorId,
    title,
    content,
    attachmentIds
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({ authorId: new UniqueEntityId(authorId), title, content })

    const questionAttachments = attachmentIds.map((attachmentId) => QuestionAttachment.create({ attachmentId: new UniqueEntityId(attachmentId).toValue(), questionId: question.id }))

    question.attachments = questionAttachments

    await this.questionRepository.create(question)

    return right({ question })
  }
}
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { Question, type QuestionProps } from "@/domain/forum/enterprise/entities/question.js";

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  return Question.create({
    authorId: new UniqueEntityId(),
    title: 'First question',
    content: 'test question',
    ...override
  })
}
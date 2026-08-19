import { faker } from '@faker-js/faker'
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { Question, type QuestionProps } from "@/domain/forum/enterprise/entities/question.js";

export function makeQuestion(override: Partial<QuestionProps> = {}, id?: UniqueEntityId) {
  return Question.create({
    authorId: new UniqueEntityId(),
    title: faker.lorem.sentence(),
    content: faker.lorem.text(),
    ...override
  }, id)
}
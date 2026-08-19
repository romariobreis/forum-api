import { faker } from '@faker-js/faker'
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { Answer, type AnswerProps } from '@/domain/forum/enterprise/entities/answer.js';

export function makeAnswer(override: Partial<AnswerProps> = {}, id?: UniqueEntityId) {
  return Answer.create({
    authorId: new UniqueEntityId(),
    questionId: new UniqueEntityId(),
    content: faker.lorem.text(),
    ...override
  }, id)
}
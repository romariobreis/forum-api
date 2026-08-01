import { Entity } from "@/core/entities/entity.js"
import type { UniqueEntityId } from "@/core/entities/unique-entity-id.js"
import type { Optional } from "@/core/types/optional.js"

export interface AnswerProps {
  authorId: UniqueEntityId,
  questionId: UniqueEntityId
  content: string,
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId.toValue()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get questionId() {
    return this.props.questionId.toValue()
  }

  get excerpt() {
    return this.props.content.trim().substring(0, 120).concat('...')
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<AnswerProps, 'createdAt'>, id?: UniqueEntityId) {
    return new Answer({
      ...props,
      createdAt: new Date()
    }, id)
  }
}
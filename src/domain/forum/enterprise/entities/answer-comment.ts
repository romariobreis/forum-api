import { Entity } from "@/core/entities/entity.js"
import type { UniqueEntityId } from "@/core/entities/unique-entity-id.js"
import type { Optional } from "@/core/types/optional.js"

export interface AnswerCommentProps {
  answerId: UniqueEntityId
  authorId: UniqueEntityId,
  content: string,
  createdAt: Date
  updatedAt?: Date
}

export class AnswerComment extends Entity<AnswerCommentProps> {
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

  get answerId() {
    return this.props.answerId.toValue()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<AnswerCommentProps, 'createdAt'>, id?: UniqueEntityId) {
    return new AnswerComment({
      ...props,
      createdAt: props.createdAt ?? new Date()
    }, id)
  }
}
import type { UniqueEntityId } from "@/core/entities/unique-entity-id.js"
import type { Slug } from "./value-objects/slug.js"
import { Entity } from "@/core/entities/entity.js"
import type { Optional } from "@/core/types/optional.js"

interface QuestionProps {
  authorId: UniqueEntityId
  bestAnswerId: UniqueEntityId
  title: string
  slug: Slug
  content: string
  createdAt: Date
  updatedAt?: Date

}

export class Question extends Entity<QuestionProps> {
  get title() {
    return this.props.title
  }
  get slug() {
    return this.props.slug
  }
  get content() {
    return this.props.content
  }
  get authorId() {
    return this.props.authorId.toValue()
  }

  static create(props: Optional<QuestionProps, 'createdAt'>, id?: UniqueEntityId) {
    return new Question({
      ...props,
      createdAt: new Date()
    }, id)
  }
}
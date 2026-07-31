import type { UniqueEntityId } from "@/core/entities/unique-entity-id.js"
import { Slug } from "./value-objects/slug.js"
import { Entity } from "@/core/entities/entity.js"
import type { Optional } from "@/core/types/optional.js"
import dayjs from "dayjs"

interface QuestionProps {
  authorId: UniqueEntityId
  // bestAnswerId: UniqueEntityId
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

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  // get bestAnswerId() {
  //   return this.props.bestAnswerId
  // }

  get isNew() {
    return dayjs().diff(this.props.createdAt, 'days') <= 3
  }

  // set bestAnswerId(bestAnswerId: UniqueEntityId) {
  //   this.props.bestAnswerId = bestAnswerId
  //   this.touch()
  // }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<QuestionProps, 'createdAt' | 'slug'>, id?: UniqueEntityId) {
    return new Question({
      ...props,
      createdAt: new Date(),
      slug: props.slug ?? Slug.createFromText(props.title)
    }, id)
  }
}
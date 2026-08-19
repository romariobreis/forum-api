import { Entity } from "@/core/entities/entity.js";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id.js";

interface QuestionAttachmentProps {
  questionId: string
  attachmentId: string
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps> {
  get questionId() {
    return this.props.questionId
  }

  get attachmetId() {
    return this.props.attachmentId
  }

  static create(props: QuestionAttachmentProps, id?: UniqueEntityId) {
    return new QuestionAttachment(props, id)
  }
}
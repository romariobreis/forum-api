import { Entity } from "@/core/entities/entity.js";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id.js";

interface AttachmentProps {
  title: string,
  link: string
}

export class Attachments extends Entity<AttachmentProps> {
  get title() {
    return this.props.title
  }

  get liink() {
    return this.props.link
  }

  static create(props: AttachmentProps, id?: UniqueEntityId) {
    return new Attachments(props, id)
  }
}
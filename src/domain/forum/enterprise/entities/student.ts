import { Entity } from "@/core/entities/entity.js"
import type { UniqueEntityId } from "@/core/entities/unique-entity-id.js"

interface StudentProps {
  name: string
}

export class Student extends Entity<StudentProps> {
  public get name() {
    return this.props.name
  }

  static create(props: StudentProps, id?: UniqueEntityId) {
    return new Student({
      ...props,
    }, id)
  }
}
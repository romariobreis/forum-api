import type { UseCaseError } from "@/core/errors/use-case-errors.js";

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resource not found.')
  }
}
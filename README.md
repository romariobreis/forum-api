# Forum API

A forum application built with Node.js and TypeScript to study and practice Domain-Driven Design (DDD), Clean Architecture, and use-case-driven development.

The project models a questions-and-answers forum with students, instructors, questions, answers, and comments. Its primary focus is domain organization, business rules, and application testability.

## Study goals

- [x] Practice modeling entities and aggregates;
- [x] Apply Value Objects such as `Slug` and unique identifiers;
- [x] Separate business rules from infrastructure details;
- [x] Organize the application into layers following Clean Architecture principles;
- [x] Implement use cases independently from frameworks and databases;
- [x] Use the `Either` pattern to represent success and failure;
- [x] Write unit tests to validate domain behavior;
- [x] Work with repositories through abstractions and in-memory implementations.

## Domain features

- [x] Create questions;
- [x] Edit and delete questions;
- [x] Fetch recent questions;
- [x] Find a question by slug;
- [x] Answer questions;
- [x] Edit and delete answers;
- [x] Choose the best answer for a question;
- [x] Comment on questions and answers;
- [x] Delete comments;
- [x] List answers and comments with pagination.

## Entities and concepts

- `Student` and `Instructor`: forum participants;
- `Question`: an aggregate representing a question, its author, slug, content, and attachments;
- `Answer`: an answer associated with a question and an author;
- `QuestionComment` and `AnswerComment`: comments associated with questions and answers;
- `QuestionAttachment` and `AnswerAttachment`: attachments related to forum content;
- `Slug`: a Value Object used for human-readable question identification;
- `UniqueEntityId`: a unique identifier shared by entities;
- `Either`: a structure for returning success or failure without relying on exceptions for expected flow.

## Business rules

- [x] Only the author can edit or delete their question;
- [x] Only the author can edit or delete their answer;
- [x] Only the author can delete their comment;
- [x] A question must exist before it can receive answers or comments;
- [x] An answer must exist before it can receive comments;
- [x] Only an answer belonging to the question can be selected as its best answer;
- [x] Editing content updates its modification date;
- [x] Questions are considered new during the first three days after creation.

## Use cases

The use cases are located in `src/domain/forum/application/use-cases` and represent the actions the system can perform:

- `CreateQuestionUseCase`
- `EditQuestionUseCase`
- `DeleteQuestionUseCase`
- `FetchRecentQuestionsUseCase`
- `GetQuestionBySlugUseCase`
- `AnswerQuestionUseCase`
- `EditAnswerUseCase`
- `DeleteAnswerUseCase`
- `FetchQuestionAnswersUseCase`
- `ChooseQuestionBestAnswerUseCase`
- `CommentOnQuestionUseCase`
- `DeleteQuestionCommentUseCase`
- `FetchQuestionCommentsUseCase`
- `CommentOnAnswerUseCase`
- `DeleteAnswerCommentUseCase`
- `FetchAnswerCommentsUseCase`

## Project structure

```text
src/
	core/                         # shared abstractions and resources
		either.ts                   # typed success or failure result
		entities/                   # Entity, AggregateRoot, and UniqueEntityId
		errors/                     # use-case error contracts
		repositories/               # shared repository contracts
		types/                      # utility types
	domain/
		forum/
			application/              # repository interfaces and use cases
			enterprise/               # entities, aggregates, and Value Objects
test/
	factories/                    # test object factories
	repositories/                 # in-memory repositories
```

### Clean Architecture in practice

- **Enterprise:** contains entities, aggregates, and essential domain rules;
- **Application:** coordinates use cases and depends on repository interfaces;
- **Core:** provides shared abstractions such as entities, identifiers, pagination, and `Either`;
- **Tests:** validates use cases with in-memory repositories and no external infrastructure dependency.

## Technologies

- Node.js
- TypeScript
- Vitest
- Faker.js
- Day.js

## Getting started

Install the dependencies:

```bash
npm install
```

Run the tests:

```bash
npm test
```

Run the tests in watch mode:

```bash
npm run test:watch
```

## Project status

This repository is a study project. The current implementation prioritizes the domain, use cases, and unit tests. HTTP entry points and a production persistence layer can be added as future architecture exercises.

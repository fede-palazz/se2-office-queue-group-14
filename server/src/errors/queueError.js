const QUEUE_NOT_FOUND = "Queue not found";
const QUEUE_ALREADY_EXISTS = "Queue already exists";

/**
 * Represents an error that occurs when a queue is not found.
 */
class QueueNotFound extends Error {
  constructor() {
    super();
    this.customMessage = QUEUE_NOT_FOUND;
    this.customCode = 404;
  }
}

/**
 * Represents an error that occurs when a queue already exists.
 */
class QueueAlreadyExistsError extends Error {
  constructor() {
    super();
    this.customMessage = QUEUE_ALREADY_EXISTS;
    this.customCode = 409;
  }
}

export { QueueNotFound, QueueAlreadyExistsError };

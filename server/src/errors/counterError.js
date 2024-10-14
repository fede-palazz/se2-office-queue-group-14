const COUNTER_NOT_FOUND = "Counter not found";
const COUNTER_ALREADY_EXISTS = "Counter already exists";

/**
 * Represents an error that occurs when a counter is not found.
 */
class CounterNotFound extends Error {
  constructor() {
    super();
    this.customMessage = COUNTER_NOT_FOUND;
    this.customCode = 404;
  }
}

/**
 * Represents an error that occurs when a counter already exists.
 */
class CounterAlreadyExistsError extends Error {
  constructor() {
    super();
    this.customMessage = COUNTER_ALREADY_EXISTS;
    this.customCode = 409;
  }
}



export { CounterNotFound, CounterAlreadyExistsError };

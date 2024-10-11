const SERVICE_NOT_FOUND = "Service not found";
const SERVICE_ALREADY_EXISTS = "Service already exists";

/**
 * Represents an error that occurs when a service is not found.
 */
class ServiceNotFound extends Error {
  constructor() {
    super();
    this.customMessage = SERVICE_NOT_FOUND;
    this.customCode = 404;
  }
}

/**
 * Represents an error that occurs when a service already exists.
 */
class ServiceAlreadyExistsError extends Error {
  constructor() {
    super();
    this.customMessage = SERVICE_ALREADY_EXISTS;
    this.customCode = 409;
  }
}

export { ServiceNotFound, ServiceAlreadyExistsError };

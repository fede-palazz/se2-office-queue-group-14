const USER_NOT_AUTHENTICATED = "Incorrect user id and/or password";
const USER_NOT_FOUND = "User not found";

/**
 * Represents an error that occurs when a user is not authenticated.
 */
class UserNotAuthenticated extends Error {
  constructor() {
    super();
    this.customMessage = { username: USER_NOT_AUTHENTICATED, password: USER_NOT_AUTHENTICATED };
    this.customCode = 401;
  }
}

/**
 * Represents an error that occurs when a user is not found.
 */
class UserNotFound extends Error {
  constructor() {
    super();
    this.customMessage = USER_NOT_FOUND;
    this.customCode = 404;
  }
}


export { UserNotAuthenticated, UserNotFound };
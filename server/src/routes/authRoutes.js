import express from "express";
import { body } from "express-validator";
import { validateRequest } from "../helpers.js";

/**
 * Represents a class that defines the authentication routes for the application.
 */
class AuthRoutes {
  /**
   * Constructs a new instance of the AuthRoute class.
   * @param authenticator - The authenticator object used for authentication.
   */
  constructor(authenticator) {
    this.authService = authenticator;
    this.router = express.Router();
    this.initRoutes();
  }

  getRouter() {
    return this.router;
  }

  /**
   * Initializes the authentication routes.
   *
   * @remarks
   * This method sets up the HTTP routes for login, logout, and retrieval of the logged in user.
   */
  initRoutes() {
    /**
     * Route for logging in a user.
     * It does not require authentication.
     * It expects the following body parameters:
     * - username: string. It cannot be empty.
     * - password: string. It cannot be empty.
     * It returns an error if the username represents a non-existing user or if the password is incorrect.
     * It returns the logged in user.
     */
    this.router.post(
      "/",
      body("username")
        .notEmpty()
        .withMessage("User_id cannot be empty")
        .isAscii()
        .withMessage("User_id cannot contain emojis"), // The request body must contain a string non-empty attribute called "username"
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password has to be at least 6 characters long")
        .isAscii()
        .withMessage("Password cannot contain emojis"), // The request body must contain a string non-empty attribute called "password"
      validateRequest,
      (req, res, next) =>
        this.authService
          .login(req, res, next)
          .then((user) => res.status(200).json(user))
          .catch((err) => {
            console.log(err);
            next(err);
          })
    );

    /**
     * Route for logging out the currently logged in user.
     * It expects the user to be logged in.
     * It returns a 200 status code.
     */
    this.router.delete(
      "/current",
      this.authService.isLoggedIn, // The user must be logged in
      (req, res, next) =>
        this.authService
          .logout(req, res, next)
          .then(() => res.status(200).end())
          .catch((err) => next(err))
    );

    /**
     * Route for retrieving the currently logged in user.
     * It expects the user to be logged in.
     * It returns the logged in user.
     */
    this.router.get(
      "/current",
      this.authService.isLoggedIn, // The user must be logged in
      (req, res) => res.status(200).json(req.user)
    );
  }
}

export { AuthRoutes };

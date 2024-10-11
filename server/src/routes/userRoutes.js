import express from "express";
import { validateRequest } from "../helpers.js";
import { body } from "express-validator";
import UserController from "../controllers/userController.js";
import { Role } from "../models/User.js";

/**
 * Represents a class that defines the routes for handling users.
 */
class UserRoutes {
  /**
   * Constructs a new instance of the UserRoutes classs.
   * @param authenticator The authenticator object used for authentication.
   */
  constructor(authenticator) {
    this.authService = authenticator;
    this.router = express.Router();
    this.controller = new UserController();
    this.initRoutes();
  }

  /**
   * Get the router instance.
   * @returns The router instance.
   */
  getRouter() {
    return this.router;
  }

  /**
   * Initializes the routes for the user router.
   *
   * @remarks
   * This method sets up the HTTP routes for handling user's operations.
   */
  initRoutes() {
    /**
     * Route for creating a user.
     * It does not require authentication.
     * It requires the following body parameters:
     * - user_id: string. It cannot be empty and it must be unique (an existing user_id cannot be used to create a new user)
     * - name: string. It cannot be empty.
     * - email: string. It cannot be empty.
     * - password: string. It cannot be empty.
     * - role: string. It cannot be empty.
     * It returns a 200 status code.
     */
    this.router.post(
      "/",
      body("user_id")
        .notEmpty()
        .withMessage("User_id cannot be empty")
        .isAscii()
        .withMessage("User_id cannot contain emojis"), // The request body must contain a string non-empty attribute called "user_id"
      body("name")
        .notEmpty()
        .withMessage("Name cannot be empty")
        .isAscii()
        .withMessage("Name cannot contain emojis"), // The request body must contain a string non-empty attribute called "name"
      body("email")
        .notEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("The parameter has to be a valid email"), // The request body must contain a string non-empty attribute called "email"
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password has to be at least 6 characters long")
        .isAscii()
        .withMessage("Password cannot contain emojis"), // The request body must contain a string non-empty attribute called "password"
      body("role")
        .notEmpty()
        .withMessage("Role cannot be empty")
        .isIn(Object.values(Role)), // The request body must contain a string non-empty attribute called "role"
      validateRequest,
      (req, res, next) => {
        this.controller
          .createUser(
            req.body.user_id,
            req.body.name,
            req.body.email,
            req.body.password,
            req.body.role
          )
          .then(() => res.status(200).end())
          .catch((err) => next(err));
      }
    );
  }
}

export { UserRoutes };

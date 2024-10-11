jest.mock("../../src/controllers/userController.mjs");
jest.mock("../../auth.mjs");
jest.mock("../../src/helpers.js");
import { test, expect, jest, describe, afterEach } from "@jest/globals";
import request from "supertest";
import express from "express";
import { app } from "../../index.mjs";
import { User, Role } from "../../src/models/User.mjs";
import UserController from "../../src/controllers/userController.mjs";
import {
  UserNotAuthenticated,
  UserNotFound,
  UserAlreadyExistsError,
} from "../../src/errors/userError.mjs";

const baseURL = "/officequeue";

function registerErrorHandler(router) {
  router.use((err, req, res, next) => {
    return res.status(err.customCode || 503).json({
      error: err.customMessage || "Internal Server Error",
      status: err.customCode || 503,
    });
  });
}
registerErrorHandler(app);

let testAdmin = new User("admin", "admin", "admin@polito.it", Role.ADMIN);
let testManager = new User(
  "manager",
  "manager",
  "manager@polito.it",
  Role.MANAGER
);
let testOfficer = new User(
  "officer",
  "officer",
  "officer@polito.it",
  Role.OFFICER
);

describe("POST /users", () => {
  //All inputs are valid, successfull creation

  test("It should return a 200 success code", async () => {
    const testUser = {
      user_id: "test",
      name: "test",
      email: "admin@polito.it",
      password: "test",
      role: Role.ADMIN,
    };
    jest
      .spyOn(UserController.prototype, "createUser")
      .mockResolvedValueOnce(true);

    /*jest.mock("express-validator", () => ({
      body: jest.fn().mockImplementation(() => ({
        isAscii: () => {},
        isIn: () => {},
        notEmpty: () => {},
        isLength: () => {},
        isEmail: () => {},
      })),
    }));*/

    jest
      .spyOn(ErrorHandler.prototype, "validateRequest")
      .mockImplementation((req, res, next) => {
        return next();
      });

    const response = await request(app)
      .post(baseURL + "/users")
      .send(testUser);
    expect(response.status).toBe(200);
    expect(UserController.prototype.createUser).toHaveBeenCalledTimes(1);
    expect(UserController.prototype.createUser).toHaveBeenCalledWith(
      testUser.user_id,
      testUser.name,
      testUser.email,
      testUser.role,
      testUser.password
    );
  });

  //At least one input is invalid

  test("It should return a 422 error code", async () => {
    const testUser = {
      user_id: "test",
      name: "test",
      email: "admin",
      password: "test",
      role: Role.ADMIN,
    };

    /*jest.mock("express-validator", () => ({
      body: jest.fn().mockImplementation(() => ({
        isAscii: () => {},
        isIn: () => {},
        notEmpty: () => {},
        isLenght: () => {},
        isEmail: () => {},
      })),
    }));*/

    jest
      .spyOn(ErrorHandler.prototype, "validateRequest")
      .mockImplementation((req, res, next) => {
        return res.status(422).json({ error: "Data error" });
      });

    const response = await request(app)
      .post(baseURL + "/users")
      .send(testUser);
    expect(response.status).toBe(422);
    expect(UserController.prototype.createUser).toHaveBeenCalledTimes(0);
  });

  //Valid inputs but already existing user

  test("It should return a 409 error code", async () => {
    const testUser = {
      user_id: "test",
      name: "test",
      surname: "test",
      password: "test",
      role: Role.MANAGER,
    };
    jest
      .spyOn(UserController.prototype, "createUser")
      .mockRejectedValue(new UserAlreadyExistsError());

    /*jest.mock("express-validator", () => ({
      body: jest.fn().mockImplementation(() => ({
        isAscii: () => {},
        isIn: () => {},
        notEmpty: () => {},
        isLenght: () => {},
        isEmail: () => {},
      })),
    }));*/

    jest
      .spyOn(ErrorHandler.prototype, "validateRequest")
      .mockImplementation((req, res, next) => {
        return next();
      });

    const response = await request(app)
      .post(baseURL + "/users")
      .send(testUser);
    expect(response.status).toBe(409);
    expect(UserController.prototype.createUser).toHaveBeenCalledTimes(1);
    expect(UserController.prototype.createUser).toHaveBeenCalledWith(
      testUser.user_id,
      testUser.name,
      testUser.email,
      testUser.role,
      testUser.password
    );
  });

  //Execute after each test

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });
});
/*
describe("POST ezelectronics/sessions", () => {
  const testBody = { user_id: "admin", password: "password" };

  //Nominal login

  test("It should return 200 success code", async () => {
    jest.spyOn(Authenticator.prototype, "login").mockResolvedValue(testAdmin);

    jest.mock("express-validator", () => ({
      body: jest.fn().mockImplementation(() => ({
        isAscii: () => {},
        isLenght: () => {},
        notEmpty: () => {},
      })),
    }));

    jest
      .spyOn(ErrorHandler.prototype, "validateRequest")
      .mockImplementation((req, res, next) => {
        return next();
      });

    const response = await request(app)
      .post(baseURL + "/sessions")
      .send(testBody);
    expect(response.status).toBe(200);
    expect(Authenticator.prototype.login).toHaveBeenCalledTimes(1);
  });

  //Not existing username or wrong password

  test("It should return 401 error code", async () => {
    jest.spyOn(Authenticator.prototype, "login").mockRejectedValue(false);

    jest.mock("express-validator", () => ({
      body: jest.fn().mockImplementation(() => ({
        isString: () => {},
        notEmpty: () => {},
      })),
    }));

    jest
      .spyOn(ErrorHandler.prototype, "validateRequest")
      .mockImplementation((req, res, next) => {
        return next();
      });

    const response = await request(app)
      .post(baseURL + "/sessions")
      .send(testBody);
    expect(response.status).toBe(401);
    expect(Authenticator.prototype.login).toHaveBeenCalledTimes(1);
  });

  //Execute after each test

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });
});

describe("DELETE ezelectronics/sessions/current", () => {
  //Nominal logout

  test("It should return 200 success code", async () => {
    jest
      .spyOn(Authenticator.prototype, "isLoggedIn")
      .mockImplementation((req, res, next) => {
        return next();
      });

    jest.spyOn(Authenticator.prototype, "logout").mockResolvedValue(null);

    const response = await request(app).delete(baseURL + "/sessions/current");
    expect(response.status).toBe(200);
    expect(Authenticator.prototype.logout).toHaveBeenCalledTimes(1);
  });

  //Not logged user

  test("It should return 401 error code", async () => {
    jest
      .spyOn(Authenticator.prototype, "isLoggedIn")
      .mockImplementation((req, res, next) => {
        return res
          .status(401)
          .json({ error: "Unauthenticated user", status: 401 });
      });

    const response = await request(app).delete(baseURL + "/sessions/current");
    expect(response.status).toBe(401);
    expect(Authenticator.prototype.logout).toHaveBeenCalledTimes(0);
  });

  //Execute after each test

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });
});

describe("GET ezelectronics/sessions/current", () => {
  //Nominal getting

  test("It should return 200 success code", async () => {
    jest
      .spyOn(Authenticator.prototype, "isLoggedIn")
      .mockImplementation((req, res, next) => {
        return next();
      });

    const response = await request(app).get(baseURL + "/sessions/current");
    expect(response.status).toBe(200);
  });

  //Not logged user

  test("It should return 401 error code", async () => {
    jest
      .spyOn(Authenticator.prototype, "isLoggedIn")
      .mockImplementation((req, res, next) => {
        return res
          .status(401)
          .json({ error: "Unauthenticated user", status: 401 });
      });

    const response = await request(app).get(baseURL + "/sessions/current");
    expect(response.status).toBe(401);
  });

  //Execute after each test

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });
});*/

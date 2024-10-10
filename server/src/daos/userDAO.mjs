import db from "../db/db.js";
import crypto from "crypto";
import { UserNotFound, UserNotAuthenticated } from "../errors/userError.mjs";
import { User, Role } from "../models/User.mjs";

class UserDAO {
  /**
   * Checks whether the information provided during login (user_id and password) is correct.
   * @param user_id The user_id of the user.
   * @param plainPassword The password of the user (in plain text).
   * @returns A Promise that resolves the user if he is authenticated.
   */
  authenticateUser(user_id, plainPassword) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * 
                     FROM User 
                     WHERE user_id = ?;`;
        db.get(sql, [user_id], (err, row) => {
          if (err) {
            reject(err);
            return;
          }
          //If there is no user with the given user_id the user is not authenticated (Not existing user).
          if (!row) {
            reject(new UserNotAuthenticated());
          } else {
            //Hashes the plain password using the salt and then compares it with the hashed password stored in the database
            const hashedPassword = crypto.scryptSync(
              plainPassword,
              row.salt,
              16
            );
            const passwordHex = Buffer.from(row.password, "hex");
            if (!crypto.timingSafeEqual(passwordHex, hashedPassword)) {
              reject(new UserNotAuthenticated());
            }
            resolve(new User(row.user_id, row.name, row.email, row.role));
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Creates a new user and saves its information in the database
   * @param user_id The user_id of the user. It must be unique.
   * @param name The name of the user
   * @param email The email of the user
   * @param role The role of the user
   * @param password The password of the user.
   * @returns A Promise that resolves to true if the user has been created.
   */
  createUser(user_id, name, email, role, password) {
    return new Promise((resolve, reject) => {
      try {
        const salt = crypto.randomBytes(16);
        const hashedPassword = crypto.scryptSync(password, salt, 16);
        const sql = `INSERT INTO User(user_id, name, email, role, password, salt) 
                     VALUES(?,?,?,?,?,?);`;
        db.run(
          sql,
          [user_id, name, email, role, hashedPassword, salt],
          (err) => {
            if (err) {
              if (
                err.message.includes("UNIQUE constraint failed: users.username")
              )
                reject(new UserAlreadyExistsError());
              reject(err);
              return;
            }
            resolve(true);
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Returns a user object from the database based on the username.
   * @param user_id The user_id of the user to retrieve
   * @returns A Promise that resolves the information of the requested user
   */
  getUserByUserID(user_id) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * 
                             FROM User 
                             WHERE user_id = ?;`;
        db.get(sql, [user_id], (err, row) => {
          if (err) {
            reject(err);
            return;
          }
          if (!row) {
            reject(new UserNotFound());
            return;
          }
          resolve(new User(row.user_id, row.name, row.email, row.role));
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default UserDAO;

import UserDAO from "./src/daos/userDAO.js";

// Passport-related imports
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";

class Authenticator {
  /**
   * Constructs a new instance of the Authenticator class.
   * @param app - The Express application.
   */
  constructor(app) {
    this.app = app;
    this.dao = new UserDAO();
    this.initAuth();
  }

  /**
   * Initializes the authentication middleware and sets up passport strategies.
   */
  initAuth() {
    this.app.use(
      session({
        secret: "This is the secret for officequeue",
        resave: false,
        saveUninitialized: false,
      })
    );

    this.app.use(passport.authenticate("session"));

    /**
     * Sets up the local strategy for passport.
     * The local strategy uses the UserDAO to check if the user is authenticated by retrieving the user from the database and comparing the two passwords.
     * If the user is authenticated, the user is returned, otherwise an error message is returned.
     */
    passport.use(
      new LocalStrategy((username, password, done) => {
        this.dao
          .authenticateUser(username, password)
          .then((user) => {
            return done(null, user);
          })
          .catch((err) => {
            return done(null, false, err);
          });
      })
    );

    /**
     * Serializes the user to the session.
     * This method is called when a user is authenticated and the user is serialized to the session.
     */
    passport.serializeUser((user, done) => {
      done(null, user);
    });

    /**
     * Deserializes the user from the session.
     * This method is called when a user is deserialized from the session.
     * It retrieves the user from the database and returns it.
     * If the user is not found, an error is returned.
     */
    passport.deserializeUser((user, done) => {
      this.dao
        .getUserByUserID(user.username)
        .then((user) => {
          done(null, user);
        })
        .catch((err) => {
          done(null, err);
        });
    });
  }

  /**
   * Logs in a user.
   * @param  req - The request object.
   * @param  res - The response object.
   * @param next - The next function.
   * @returns A Promise that resolves to the logged in user or rejects with an error message.
   * @remarks This method uses the passport.authenticate method to log in a user.
   * It returns a Promise that resolves to the logged in user or rejects with an error message.
   * If the user is logged in, the user is serialized to the session.
   * If the user is not logged in, an error message is returned.
   */
  login(req, res, next) {
    return new Promise((resolve, reject) => {
      console.log(req.body.username + req.body.password);
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          return reject(err);
        }
        if (!user) {
          return reject(info);
        }

        req.login(user, (err) => {
          if (err) {
            return reject(err);
          }
          return resolve(req.user);
        });
      })(req, res, next);
    });
  }

  /**
   * Logs out the user.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next middleware function.
   * @returns A Promise that resolves to null.
   */
  logout(req, res, next) {
    return new Promise((resolve, reject) => {
      req.logout(() => resolve(null));
    });
  }

  /**
   * Middleware function to check if the user is logged in.
   *
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next middleware function.
   * If the user is authenticated, it calls the next middleware function. Otherwise, it returns a 401 error response.
   */
  isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(401).json({ error: "Unauthenticated user", status: 401 });
  }
}

export default Authenticator;

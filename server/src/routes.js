import Authenticator from "../auth.js";
import { AuthRoutes } from "./routes/authRoutes.js";
import { UserRoutes } from "./routes/userRoutes.js";

const PREFIX = "/officequeue";

function initRoutes(app) {
  const authenticator = new Authenticator(app);
  const authRoutes = new AuthRoutes(authenticator);
  const userRoutes = new UserRoutes(authenticator);

  app.use(`${PREFIX}/sessions`, authRoutes.getRouter());
  app.use(`${PREFIX}/users`, userRoutes.getRouter());
}

export default initRoutes;

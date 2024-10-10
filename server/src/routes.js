import Authenticator from "../auth.mjs";
import { AuthRoutes } from "./routes/authRoutes.mjs";

const PREFIX = "/officequeue";

function initRoutes(app) {
  const authenticator = new Authenticator(app);
  const authRoutes = new AuthRoutes(authenticator);

  app.use(`${PREFIX}/auth`, authRoutes.getRouter());
}

export default initRoutes;

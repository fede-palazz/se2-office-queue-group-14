import Authenticator from "../auth.js";
import { AuthRoutes } from "./routes/authRoutes.js";
import { UserRoutes } from "./routes/userRoutes.js";
import { TicketRoutes } from "./routes/ticketRoutes.js";


const PREFIX = "/officequeue";

function initRoutes(app) {
  const ticketRoutes = new TicketRoutes();
  const authenticator = new Authenticator(app);
  const authRoutes = new AuthRoutes(authenticator);
  const userRoutes = new UserRoutes(authenticator);

  app.use(`${PREFIX}/api/tickets`, ticketRoutes.getRouter());
  app.use(`${PREFIX}/sessions`, authRoutes.getRouter());
  app.use(`${PREFIX}/users`, userRoutes.getRouter());
}

export default initRoutes;

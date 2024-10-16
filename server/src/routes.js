import Authenticator from "../auth.js";
import { AuthRoutes } from "./routes/authRoutes.js";
import { UserRoutes } from "./routes/userRoutes.js";
import TicketRoutes from "./routes/ticketRoutes.js";
import QueueRoutes from "./routes/queueRoutes.js";
import ServiceRoutes from "./routes/serviceRoutes.js";
import CounterRoutes from "./routes/counterRoutes.js";

const PREFIX = "/officequeue";

function initRoutes(app) {
  const authenticator = new Authenticator(app);
  const ticketRoutes = new TicketRoutes(authenticator);
  const authRoutes = new AuthRoutes(authenticator);
  const userRoutes = new UserRoutes(authenticator);

  app.use(`${PREFIX}/tickets`, ticketRoutes.getRouter());
  app.use(`${PREFIX}/sessions`, authRoutes.getRouter());
  app.use(`${PREFIX}/users`, userRoutes.getRouter());
  app.use(`${PREFIX}/api/queues`, new QueueRoutes(authenticator).getRouter());
<<<<<<< HEAD
  app.use(`${PREFIX}/api/services`, new ServiceRoutes(authenticator).getRouter());
  app.use(`${PREFIX}/api/counters`, new CounterRoutes(authenticator).getRouter());
=======
  app.use(`${PREFIX}/services`, new ServiceRoutes(authenticator).getRouter());
  app.use(`${PREFIX}/counters`, new CounterRoutes(authenticator).getRouter());
>>>>>>> main
}

export default initRoutes;


import TicketRoutes from "./routes/ticketRoutes.js";

const PREFIX = "/officequeue";

function initRoutes(app) {
  const ticketRoutes = new TicketRoutes();

  app.use(`${PREFIX}/api/tickets`, ticketRoutes.getRouter());
}

export default initRoutes;

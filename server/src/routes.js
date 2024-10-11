import ExampleRoutes from "./routes/exampleRoutes.js";
import TicketRoutes from "./routes/ticketRoutes.js";

const PREFIX = "/api";

function initRoutes(app) {
  const exampleRoutes = new ExampleRoutes();
  const ticketRoutes = new TicketRoutes();

  app.use(`${PREFIX}/example`, exampleRoutes.getRouter());
  app.use(`${PREFIX}/tickets`, ticketRoutes.getRouter());
}

export default initRoutes;

import express from "express";
import ticketController from "../controllers/ticketController.js";
import { validateRequest } from "../helpers.js";
import { param, body } from "express-validator";

function TicketRoutes(authenticator) {
  this.router = express.Router();
  this.ticketController = new ticketController();
  this.authenticator = authenticator;

  this.getRouter = () => this.router;

    this.initRoutes = function () {

        this.router.get("/:id", (req, res, next) => {
          this.ticketController
            .getTicketById(req.params.id)
            .then((result) => {
              res.status(200).send(result);
            })
            .catch((err) => {
              err.message = "Ticket not found";
              res.status(404).send(err);
            });
        });

        // Create a new ticket.
        // Body needs this fields: ticket_code, service_id
        this.router.post("/", (req, res, next) => {
          this.ticketController
            .createTicket(req.body.ticket_code, req.body.service_id)
            .then((result) => {
              res.status(200).send(result);
            })
            .catch((err) => {
              res.send("Error here: ", err);
            });
        });
      };

      // CHange ticket status to custom status
      this.router.put("/:id", [body("status").isString()], (req, res, next) => {
        this.ticketController
          .changeTicketStatus(req.params.id, body.status)
          .then((result) => { res.status(200).send(result);})
          .catch((err) => { res.send("Error here: ", err); });
      });

      // Get all tickets in progress
      this.router.get("/in_progress", (req, res, next) => {
        this.ticketController
          .getTicketsInProgress()
          .then((result) => { res.status(200).send(result);})
          .catch((err) => { res.send("Error here: ", err); });
      });

      // Update counter_id
      this.router.put("/:id/counter", [body("counter_id").isInt()], (req, res, next) => {
        this.ticketController
          .updateCounterId(req.params.id, body.counter_id)
          .then((result) => { res.status(200).send(result);})
          .catch((err) => { res.send("Error here: ", err); });
      });

      // Get estimated wait time
      this.router.get("/:id/estimated_wait_time", (req, res, next) => {
        this.ticketController
          .getEstimatedWaitTime(req.params.id)
          .then((result) => { res.status(200).send(result);})
          .catch((err) => { res.send("Error here: ", err); });
      });

      this.initRoutes();
}

export default TicketRoutes;
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
    // Body needs this fields:service_id
    this.router.post("/", (req, res, next) => {
      this.ticketController
        .createTicket(req.body.service_id)
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          next();
        });
    });
  };

  // CHange ticket status to custom status
  this.router.put("/:id", [body("status").isString()], (req, res, next) => {
    this.ticketController
      .changeTicketStatus(req.params.id, body.status)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.send("Error here: ", err);
      });
  });

  this.initRoutes();
}

export default TicketRoutes;

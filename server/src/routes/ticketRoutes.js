import express from "express";
import ticketController from "../controllers/ticketController.js";
import { validateRequest } from "../helpers.js";
import { param, body } from "express-validator";

function TicketRoutes() {
    this.router = express.Router();
    this.ticketController = new ticketController();

    this.getRouter = () => this.router;

    this.initRoutes = function () {
      this.router.post("/", (req, res, next) => {
        this.ticketController
          .createTicket(req.body)
          .then((result) => {
            res.status(200).send(result);
          })
          .catch((err) => {
            res.send(err);
          });
      });

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

      };

    
      this.initRoutes();

}

export default TicketRoutes;
import express from "express";
import ticketController from "../controllers/ticketController.js";
import { validateRequest } from "../helpers.js";
import { param, body } from "express-validator";

function TicketRoutes() {
    this.router = express.Router();
    this.ticketController = new ticketController();

    this.getRouter = () => this.router;

    this.initRoutes = function () {
        this.router.get("./ticket/:id", (req, res, next) => {
          this.ticketController
            .getTicketById(req.params.id)
            .then((result) => {
              res.status(200).send(result);
            })
            .catch((err) => {
              next(err);
            });
        });

        this.router.post("./ticket", (req, res, next) => {
          this.ticketController
            .createTicket(req.body)
            .then((result) => {
              res.status(200).send(result);
            })
            .catch((err) => {
              next(err);
            });
        });
      };

    
      this.initRoutes();

}

export default TicketRoutes;
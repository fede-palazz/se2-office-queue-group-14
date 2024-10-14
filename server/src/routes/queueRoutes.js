import express from "express";
import queueController from "../controllers/queueController.js";
import { body } from "express-validator";
import { validateRequest } from "../helpers.js";

function QueueRoutes(authenticator) {
    this.router = express.Router();
    this.queueController = new queueController();
    this.authenticator = authenticator;
    
    this.getRouter = () => this.router;
    
    this.initRoutes = function () {

        // Add a ticket to the queue
        //  GET TICKET STORY
        this.router.post("/add", [
            body("service_id").isString(),
            body("ticket_id").isString(),
            validateRequest,
            ], (req, res, next) => {
        this.queueController
            .addToQueue(req.body.service_id, req.body.ticket_id)
            .then((result) => {
            res.status(200).send(result);
            })
            .catch((err) => {
            res.send("Error here: ", err);
            });
        });
    
        // Get the next ticket in the queue
        //  NEXT CUSTOMER STORY
        this.router.get("/next/:service_id", (req, res, next) => {
        this.queueController
            .getNextTicket(req.params.service_id)
            .then((result) => {
            res.status(200).send(result);
            })
            .catch((err) => {
            res.send("Error here: ", err);
            });
        });
    };
    
    this.initRoutes();
    }

export default QueueRoutes;
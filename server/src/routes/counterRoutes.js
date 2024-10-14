import express from "express";
import counterController from "../controllers/counterController.js";
import { body } from "express-validator";
import { validateRequest } from "../helpers.js";

function CounterRoutes(authenticator) {

    this.router = express.Router();
    this.counterController = new counterController();
    this.authenticator = authenticator;
    
    this.getRouter = () => this.router;
    
    this.initRoutes = function () {
    
        this.router.get("/:id", (req, res, next) => {
        this.counterController
            .getCounterById(req.params.id)
            .then((result) => {
            res.status(200).send(result);
            })
            .catch((err) => {
            res.send("Error here: ", err);
            });
        });
    
        //Body needs this fields: counter_id, counter_name
        this.router.post("/", (req, res, next) => {
        this.counterController
            .createCounter(req.body)
            .then((result) => {
            res.status(200).send(result);
            })
            .catch((err) => {
            res.send("Error here: ", err);
            });
        });
    
        //Change counterId , counterName
        this.router.put("/", (req, res, next) => {
        this.counterController
            .updateCounter(req.body)
            .then((result) => {
            res.status(200).send(result);
            })
            .catch((err) => {
            res.send("Error here: ", err);
            });
        });
        
        //Delete counter, needs counterId
        this.router.delete("/:id", (req, res, next) => {
        this.counterController
            .deleteCounter(req.params.id)
            .then((result) => {
            res.status(200).send(result);
            })
            .catch((err) => {
            res.send("Error here: ", err);
            });
        });
        
        // Assign service to counter, needs counterId, serviceId
        this.router.post("/assignService", (req, res, next) => {
        this.counterController
            .assignServiceToCounter(req.body)
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

export default CounterRoutes;
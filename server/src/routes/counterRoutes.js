import express from "express";
import counterController from "../controllers/counterController.js";
import { body, param } from "express-validator";
import { validateRequest } from "../helpers.js";

function CounterRoutes(authenticator) {

    this.router = express.Router();
    this.counterController = new counterController();
    this.authenticator = authenticator;
    
    this.getRouter = () => this.router;
    
    this.initRoutes = function () {
    
        /* this.router.get("/:id", (req, res, next) => {
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
            .createCounter(req.body.counter_id, req.body.counter_name)
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
            .updateCounter(req.body.counter_id, req.body.counter_name)
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
            .assignServiceToCounter(req.body.counter_id, req.body.service_id)
            .then((result) => {
            res.status(200).send(result);
            })
            .catch((err) => {
            res.send("Error here: ", err);
            });
        }); */

        //Route for retrieving all counters, returns an array of counters objects
        this.router.get("/", 
            (req, res, next) => {
                this.counterController.getAllCounters()
                .then((counters) => res.status(200).json(counters))
                .catch((err) => next(err));
            }
        );

        //Route for retrieving the list of services that are configured to be served by the given counter, returns an array of service objects
        this.router.get("/:counter_id",
            param("counter_id").notEmpty().isInt(),
            validateRequest,
            (req, res, next) => {
                this.counterController.getConfiguredServices(req.params.counter_id)
                .then((services) => res.status(200).json(services))
                .catch((err) => next(err));
            }
        );

        //Route for adding one or more service to a given counter
        this.router.post("/",
            body("counter_id").notEmpty().isInt(),
            body("services").isArray(),
            validateRequest,
            this.authenticator.isAdmin,
            (req, res, next) => {
                this.counterController.addServicesToCounter(req.body.counter_id, req.body.services)
                .then(() => res.status(200).end())
                .catch((err) => next(err));
            }
        );
    };
    
    this.initRoutes();
    }

export default CounterRoutes;
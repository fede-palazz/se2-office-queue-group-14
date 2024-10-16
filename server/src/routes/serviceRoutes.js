import express from "express";
import serviceController from "../controllers/serviceController.js";
import { body } from "express-validator";
import { validateRequest } from "../helpers.js";

function ServiceRoutes(authenticator) {
    //needs validation
    this.router = express.Router();
    this.serviceController = new serviceController();
    this.authenticator = authenticator;

    this.getRouter = () => this.router;

    this.initRoutes = function () {
        //Get an existing service information
        this.router.get("/:id",(req, res, next) => {
            this.serviceController
                .getServiceById(req.params.id)
                .then((result) => {
                    res.status(200).send(result);
                })
                .catch((err) => {
                    res.send("Error here: ", err);
                });
        });

        // Create a new service.
        //Body needs this fields: service_name, avg_service_time
        this.router.post("/", 
            body("service_name").notEmpty().isString(),
            body("avg_service_time").notEmpty(),
            validateRequest,
            this.authenticator.isAdmin,
            (req, res, next) => {
            this.serviceController
                .createService(req.body.serviceName, req.body.avg_service_time)
                .then(() => res.status(200).end())
                .catch((err) => next(err));
        });

        //Change serviceId , serviceName
        this.router.put("/", 
            [body("service_id").isString(),
            body("service_name").isString(),
            ]
            ,(req, res, next) => {
            this.serviceController
                .updateService(req.body.serviceId, req.body.serviceName)
                .then((result) => {
                    res.status(200).send(result);
                })
                .catch((err) => {
                    res.send("Error here: ", err);
                });
        });

        //Delete service, needs serviceId
        this.router.delete("/:id",
            [body("service_id").isString()]
            ,(req, res, next) => {
            this.serviceController
                .deleteService(req.params.id)
                .then((result) => {
                    res.status(200).send(result);
                })
                .catch((err) => {
                    res.send("Error here: ", err);
                });
        });

        // Get counter assigned to a service, needs serviceId
        this.router.get("/counters/:id",
            [body("service_id").isNumeric()]
            ,(req, res, next) => {
            this.serviceController
                .getCountersAssignedToService(req.params.id)
                .then((result) => {
                    res.status(200).send(result);
                })
                .catch((err) => {
                    res.send("Error here: ", err);
                });
        });

        // add service time to update the average service time
        this.router.post("/addServiceTime",
            [body("serviceId").isString(),
            body("service_time").isString(),
            ]
            ,(req, res, next) => {
            this.serviceController
                .addServiceTime(req.body.serviceId, req.body.service_time)
                .then((result) => {
                    res.status(200).send(result);
                })
                .catch((err) => {
                    res.send("Error here: ", err);
                });
        });

        // get all services
        this.router.get("/", (req, res, next) => {
            this.serviceController
                .getAllServices()
                .then((result) => {
                    res.status(200).send(result);
                })
                .catch((err) => next(err));
        });
    }

    this.initRoutes();
}

export default ServiceRoutes;
import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import clientSchema from "../schemas/clients.schema.js";
import { clientsController } from "../controllers/clients.controller.js";

const clientsRouter = Router();

clientsRouter
    .post('/clients', validateSchema(clientSchema, 'client'), clientsController.create)
    .get('/clients', clientsController.getClients)

export default clientsRouter;
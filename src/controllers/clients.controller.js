import httpStatus from "http-status";
import { clientsService } from "../services/clients.service.js";

async function create(req, res){
    const client = req.body;
    await clientsService.create(client)
    res.sendStatus(httpStatus.CREATED)
}

async function getClients(req, res){
    const clients = await clientsService.getClients()
    res.status(httpStatus.OK).send(clients)
}

export const clientsController = {
    create,
    getClients
}
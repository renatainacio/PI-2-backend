import { clientsRepository } from "../repositories/clients.repository.js";

async function create(client){
    await clientsRepository.create(client)
}

async function getClients() {
    return await clientsRepository.queryAllClients()
}

export const clientsService = {
    create,
    getClients
}
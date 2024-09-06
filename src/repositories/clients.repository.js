import { db } from "../config/database.js"

async function create(client){
    await db.query(
        `INSERT INTO clients (name, email, phone) VALUES ($1, $2, $3)`, [
            client.name,
            client.email,
            client.phone
        ]
    )
}

async function queryAllClients(){
    const clients = await db.query('SELECT * FROM clients')
    return clients.rows
}


export const clientsRepository = {
    create,
    queryAllClients
}
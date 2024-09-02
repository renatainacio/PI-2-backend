import {MongoClient} from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.DATABASE_URL);
try{
    console.log('Conectando ao banco de dados ...')
    await client.connect();
    console.log('Banco de dados conectado com sucesso !')
} catch(err){
    console.log(err);
}

export const db = mongoClient.db();
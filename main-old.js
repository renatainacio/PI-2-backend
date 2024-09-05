// Iniciando 
const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const app = express()


// Para conexão MongDB
const dbUrl = 'mongodb+srv://mongo_user_1:KMAYJQkgoMMgYWaJ@mongonode-0.an8z1gw.mongodb.net'
const dbName = 'Stars'
const client = new MongoClient(dbUrl)


async function main(){
  console.log('Conectando ao banco de dados ...')
  await client.connect()
  console.log('Banco de dados conectado com sucesso !')


  app.get('/', function (req, res) {
    res.send('Backend PI2')
  })


  const db = client.db(dbName)
  const collection = db.collection('stars')


  // Read All - [GET] /item
  app.get('/item', async (req, res) => {
    // Obter todos os documentos da collection
    const documentos = await collection.find().toArray()

    // Pegamos os documentos e enviamos como resposta HTTP
    res.send(documentos)
  })


  app.listen(3000)


}


main()
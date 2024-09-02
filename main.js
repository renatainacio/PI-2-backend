// Iniciando 
const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const app = express()


// Para conexão MongDB
const dbUrl = 'mongodb://natan_bronzatto_orion:27012587@20.127.168.116:27020/?directConnection=true&serverSelectionTimeoutMS=2000&authSource=OrionIntegracao&appName=mongosh+2.1.1'
const dbName = 'notes'
const client = new MongoClient(dbUrl)


async function main(){
  console.log('Conectando ao banco de dados ...')
  await client.connect()
  console.log('Banco de dados conectado com sucesso !')


  app.get('/', function (req, res) {
    res.send('Backend PI2')
  })


  const db = client.db(dbName)
  const collection = db.collection('item')

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
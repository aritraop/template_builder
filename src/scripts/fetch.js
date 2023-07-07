/**
 * The script fetches the mentioned types of email templates from the given db connection url, db 
 * name and collection name and stores it in the data folder as fetched.json
 */



const { MongoClient } = require('mongodb');
const fs = require('fs')
const path = require('path')
const { DB_NAME, COLLECTION_NAME, MONGO_CONNECTION_URI, TEMPLATE_TYPES } = require('../config/fetch').fetchConfig

//instantiate the db client
const dbClient = new MongoClient(MONGO_CONNECTION_URI)


async function pickFromDataBaseAndStoreInServer() {
  //connect to the db
  await dbClient.connect()
  console.log('Database connection established...')

  const db = dbClient.db(DB_NAME)
  const collection = db.collection(COLLECTION_NAME)

  console.log('network call started...')
  const templates = await collection.find({ type: { $in: TEMPLATE_TYPES }, company_id: null }).toArray()
  console.log(templates.length + ' data received')

  //dump the collection to a local file
  const fetchedPath = path.join(__dirname + '/..' + '/data/fetched.json')
  // console.log(fetchedPath)
  fs.writeFileSync(fetchedPath, JSON.stringify(templates))
  console.log('done')
  process.exit(0)
}
pickFromDataBaseAndStoreInServer().catch(e => console.log(e))
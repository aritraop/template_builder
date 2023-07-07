/**
 * The following script reads the final data from the data folder (final.json) and deletes the old data
 * from the db for each combination of db name and env and uploads the final data in the server
 */


const { MongoClient } = require('mongodb');
const fs = require('fs')
const path = require('path')
const { DB_NAMES, ENVS, MONGO_CONNECTION_URI, COLLECTION_NAME, TEMPLATE_TYPES } = require('../config/upload').uploadConfig

//instantiate the db client
const dbClient = new MongoClient(MONGO_CONNECTION_URI)


async function helper(dbName, data) {
  console.log('Running helper for db: ' + dbName)
  const db = dbClient.db(dbName)
  const collection = db.collection(COLLECTION_NAME)

  //delete old ones
  const result = await collection.deleteMany({ type: { $in: TEMPLATE_TYPES }, company_id: null })
  console.log(result.deletedCount + ' items deleted from ' + dbName)

  //upload new ones
  const insertResult = await collection.insertMany(data)
  console.log(`insertion done`)
}


async function main() {
  //connect to the db
  await dbClient.connect()

  //read the final data
  const final = path.join(__dirname + '/..' + '/data/final.json')
  const newTemplate = fs.readFileSync(final, { encoding: 'utf-8' })
  console.log('new template reading successful')
  const parsed = JSON.parse(newTemplate)

  for (const dbPrefix of DB_NAMES) {
    for (const env of ENVS) {
      await helper(`${dbPrefix}_${env}`, parsed)
    }
  }
  dbClient.close()
  process.exit(0)
}
main()
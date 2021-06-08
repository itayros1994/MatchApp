const MongoClient = require('mongodb').MongoClient;
const logger = require('./logger.service.js');
const config = require('../config');

module.exports = {
  getCollection,
};

const dbURL =
  'mongodb+srv://gil:Frd9jTZB2VPJkK9@cluster0.x383m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const dbName = 'matchapp_db';
var dbConn = null;

async function getCollection(collectionName) {
  try {
    const db = await connect();
    const collection = await db.collection(collectionName);
    return collection;
  } catch (err) {
    logger.error('Failed to get Mongo collection', err);
    throw err;
  }
}

async function connect() {
  if (dbConn) return dbConn;
  try {
    const client = await MongoClient.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    dbConn = db;
    return db;
  } catch (err) {
    logger.error('Cannot Connect to DB', err);
    throw err;
  }
}

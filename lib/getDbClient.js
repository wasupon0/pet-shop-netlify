const { MongoClient } = require("mongodb");

async function getDbClient() {
  const client = new MongoClient(process.env.MONGO_KEY);
  await client.connect();
  return client;
}

module.exports = getDbClient;

const { MongoClient } = require("mongodb");

const handler = async () => {
  const client = new MongoClient(process.env.MONGO_KEY);

  await client.connect();

  const pets = await client.db().collection("pets").find().toArray();

  await client.close();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(pets),
  };
};

module.exports = { handler };

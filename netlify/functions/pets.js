const getDbClient = require("../../lib/getDbClient");

const handler = async () => {
  const client = await getDbClient();

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

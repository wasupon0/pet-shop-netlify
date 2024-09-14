const { MongoClient, ObjectId } = require("mongodb");
const isAdmin = require("../../lib/isAdmin");
const escape = require("escape-html");

const cookie = require("cookie");

const handler = async (event) => {
  if (isAdmin(event)) {
    const client = new MongoClient(process.env.MONGO_KEY);
    await client.connect();

    const body = JSON.parse(event.body);

    const pet = await client
      .db()
      .collection("pets")
      .findOne({ _id: ObjectId.createFromHexString(body.id) });
    await client.close();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ success: true, pet }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ success: false }),
  };
};

module.exports = { handler };

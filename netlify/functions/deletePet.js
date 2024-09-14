const { ObjectId } = require("mongodb");
const isAdmin = require("../../lib/isAdmin");
const getDbClient = require("../../lib/getDbClient");

const escape = require("escape-html");

const handler = async (event) => {
  if (isAdmin(event)) {
    const body = JSON.parse(event.body);

    if (!ObjectId.isValid(body.id)) {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ success: false }),
      };
    }

    const client = await getDbClient();

    await client
      .db()
      .collection("pets")
      .deleteOne({ _id: ObjectId.createFromHexString(body.id) });
    await client.close();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ success: true }),
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

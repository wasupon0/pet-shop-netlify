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
        body: JSON.stringify({}),
      };
    }

    const client = await getDbClient();

    const pet = await client
      .db()
      .collection("pets")
      .findOne({ _id: ObjectId.createFromHexString(body.id) });
    await client.close();

    pet.name = escape(pet.name);
    pet.birthYear = escape(pet.birthYear);
    pet.species = escape(pet.species);
    pet.description = escape(pet.description);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(pet),
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

const sanitizeHTML = require("sanitize-html");
const getDbClient = require("../../lib/getDbClient");
const isAdmin = require("../../lib/isAdmin");
const { ObjectId } = require("mongodb");

function cleanUp(x) {
  return sanitizeHTML(x, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

const handler = async (event) => {
  const body = JSON.parse(event.body);

  if (typeof body.name != "string") {
    body.name = "";
  }

  if (typeof body.description != "string") {
    body.description = "";
  }

  let pet = {
    name: cleanUp(body.name),
    species: cleanUp(body.species),
    description: cleanUp(body.description),
    birthYear: new Date().getFullYear(),
  };

  if (body.birthYear > 999 && body.birthYear < new Date().getFullYear()) {
    pet.birthYear = body.birthYear;
  }

  if (pet.species !== "cat" && pet.species !== "dog") {
    pet.species = "dog";
  }

  if (isAdmin(event)) {
    // save to db
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
      .findOneAndUpdate({ _id: new ObjectId(body.id) }, { $set: pet });

    await client.close();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ success: true }),
    };
  }

  // no permission to db
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ success: false }),
  };
};

module.exports = { handler };

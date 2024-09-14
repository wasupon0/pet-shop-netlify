const sanitizeHTML = require("sanitize-html");
const getDbClient = require("../../lib/getDbClient");
const isAdmin = require("../../lib/isAdmin");

function cleanUp(x) {
  return sanitizeHTML(x, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

const handler = async (event) => {
  const body = JSON.parse(event.body);

  let pet = {
    name: body.name,
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
    const client = await getDbClient();
    await client.db().collection("pets").insertOne(pet);

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

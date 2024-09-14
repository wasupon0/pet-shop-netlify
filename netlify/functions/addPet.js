const cloudinary = require("cloudinary").v2;
const sanitizeHTML = require("sanitize-html");
const getDbClient = require("../../lib/getDbClient");
const isAdmin = require("../../lib/isAdmin");

const cloudinaryConfig = cloudinary.config({
  cloud_name: "for-next-image",
  api_key: "697732345467119",
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true,
});

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

  const expectedSignature = cloudinary.utils.api_sign_request(
    {
      public_id: body.public_id,
      version: body.version,
    },
    cloudinaryConfig.api_secret
  );

  if (expectedSignature === body.signature) {
    pet.photo = body.public_id;
  }

  if (isAdmin(event)) {
    // save to db
    const client = await getDbClient();
    await client.db().collection("pets").insertOne(pet);
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

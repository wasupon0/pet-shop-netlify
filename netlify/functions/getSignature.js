const cloudinary = require("cloudinary").v2;
const getDbClient = require("../../lib/getDbClient");
const isAdmin = require("../../lib/isAdmin");
const escape = require("escape-html");

const cloudinaryConfig = cloudinary.config({
  cloud_name: "for-next-image",
  api_key: "697732345467119",
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true,
});

const handler = async (event) => {
  if (isAdmin(event)) {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      { timestamp },
      cloudinaryConfig.api_secret
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ timestamp, signature }),
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

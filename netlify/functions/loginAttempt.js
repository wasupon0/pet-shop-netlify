const cookie = require("cookie");

const handler = async (event) => {
  const body = JSON.parse(event.body);

  if (body.username == "learn" && body.password == "javascript") {
    const myCookie = cookie.serialize(
      "petshoplogin",
      "sadfsaf21987364871236498763287kasdhf",
      {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        maxAge: 1 * 60 * 60 * 24,
      }
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": myCookie,
        Location: "/",
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

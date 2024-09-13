const cookie = require("cookie");

const handler = async (event) => {
  const myCookie = cookie.serialize("petshoplogin", "-", {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    maxAge: 0,
  });

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": myCookie,
    },
    body: JSON.stringify({ success: false }),
  };
};

module.exports = { handler };

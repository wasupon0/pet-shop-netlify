const cookie = require("cookie");

function isAdmin(event) {
  const incomingCookies = cookie.parse(event.headers.cookie || "");

  if (incomingCookies?.petshoplogin == "sadfsaf21987364871236498763287kasdhf") {
    return true;
  } else {
    return false;
  }
}

module.exports = isAdmin;

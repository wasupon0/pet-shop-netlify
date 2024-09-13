const { MongoClient } = require("mongodb");

const cookie = require("cookie");

const handler = async (event) => {
  const incomingCookies = cookie.parse(event.headers.cookie || "");

  if (incomingCookies?.petshoplogin == "sadfsaf21987364871236498763287kasdhf") {
    const client = new MongoClient(process.env.MONGO_KEY);
    await client.connect();

    const pets = await client.db().collection("pets").find().toArray();
    await client.close();

    const petsHTML = generateHTML(pets);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ success: true, pets: petsHTML }),
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

function generateHTML(pets) {
  let htmlContent = `<div class="list-of-pets">`;
  htmlContent += pets
    .map((pet) => {
      return `<div class="pet-card">
            <div class="pet-card-text">
              <h3>${pet.name}</h3>
              <p class="pet-description">${pet.description}</p>
              <div class="action-buttons">
                <a class="action-btn" href="/edit/${pet._id}">Edit</a>
                <button class="action-btn" data-id="${pet._id}">Delete</button>
            </div>
            <div class="pet-card-photo">
              <img src="/images/fallback.jpg" alt="A ${pet.species}" named ${pet.name} />
            </div>
          </div>`;
    })
    .join("");
  htmlContent += "</div>";
  return htmlContent;
}

module.exports = { handler };

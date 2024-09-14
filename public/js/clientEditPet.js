const urlVariables = new URLSearchParams(window.location.search);

const id = urlVariables.get("id");

console.log(id);

async function getEditPet() {
  const petPromise = await fetch("/.netlify/functions/getSinglePet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const pet = await petPromise.json();
  console.log(pet);

  if (!pet.name) {
    window.location = "/admin";
  }

  document.querySelector("#petname").value = pet.name;
  document.querySelector("#birthYear").value = pet.birthYear;
  document.querySelector("#species").value = pet.species;
  document.querySelector("#description").value = pet.description;

  document.querySelector("#edit-pet-form").classList.remove("form-is-loading");
  document.querySelector("#petname").focus();
}

getEditPet();

document
  .querySelector("#edit-pet-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const pet = {
      id,
      name: document.querySelector("#petname").value,
      birthYear: document.querySelector("#birthYear").value,
      species: document.querySelector("#species").value,
      description: document.querySelector("#description").value,
    };

    document.querySelector("#edit-pet-form").classList.add("form-is-loading");

    const petPromise = await fetch("/.netlify/functions/saveChanges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pet),
    });

    const petResponse = await petPromise.json();

    if (petResponse.success) {
      window.location = "/admin";
    }
  });

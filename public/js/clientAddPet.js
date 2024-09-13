document
  .querySelector("#add-new-pet-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const pet = {
      name: document.querySelector("#petname").value,
      birthYear: document.querySelector("#birthYear").value,
      species: document.querySelector("#species").value,
      description: document.querySelector("#description").value,
    };

    const petPromise = await fetch("/.netlify/functions/addPet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pet),
    });

    const petResponse = await petPromise.json();
    window.location = "/admin";
  });

document
  .querySelector("#add-new-pet-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    if (isFormLocked) {
      return null;
    }

    isFormLocked = true;

    const pet = {
      name: document.querySelector("#petname").value,
      birthYear: document.querySelector("#birthYear").value,
      species: document.querySelector("#species").value,
      description: document.querySelector("#description").value,
    };

    if (cloudinaryReturnObject) {
      pet.public_id = cloudinaryReturnObject.public_id;
      pet.version = cloudinaryReturnObject.version;
      pet.signature = cloudinaryReturnObject.signature;
    }

    document
      .querySelector("#add-new-pet-form")
      .classList.add("form-is-loading");

    const petPromise = await fetch("/.netlify/functions/addPet", {
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

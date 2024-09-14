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
}

getEditPet();

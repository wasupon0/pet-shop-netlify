async function start() {
  const netlifyPromise = await fetch("/.netlify/functions/adminDashboard");
  const netlifyData = await netlifyPromise.json();

  if (netlifyData.success) {
    console.log(netlifyData);
    document.querySelector(".render-here").innerHTML = netlifyData.pets;
  } else {
    window.location = "/login";
  }
}
start();

function handleDelete(id, element) {
  element.closest(".pet-card").remove();

  fetch("/.netlify/functions/deletePet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
}

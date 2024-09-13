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

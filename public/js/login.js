document.querySelector("#login-form").addEventListener("submit", handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();

  const loginPromise = await fetch("/.netlify/functions/loginAttempt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: document.querySelector("#username").value,
      password: document.querySelector("#password").value,
    }),
  });

  const loginData = await loginPromise.json();
  if (loginData.success) {
    window.location = "/admin";
  } else {
    console.log("try again");
  }
}

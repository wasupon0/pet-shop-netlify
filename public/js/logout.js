document.querySelector(`#logout`).addEventListener(`click`, async () => {
  const logoutPromise = await fetch(`/.netlify/functions/logout`);

  window.location = `/`;
});

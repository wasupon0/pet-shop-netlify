let serverSignature;
let serverTimestamp;

async function getSignature() {
  const signaturePromise = await fetch("/.netlify/functions/getSignature");
  const response = await signaturePromise.json();
  serverSignature = response.signature;
  serverTimestamp = response.timestamp;

  console.log(response);
}

getSignature();

document
  .querySelector("#file-field")
  .addEventListener("change", async function () {
    const data = new FormData();
    data.append("file", document.querySelector("#file-field").files[0]);
    data.append("api_key", "697732345467119");
    data.append("signature", serverSignature);
    data.append("timestamp", serverTimestamp);

    // send signature to cloudinary
    const cloudinaryResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/for-next-image/auto/upload`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: function (e) {
          console.log(e.loaded / e.total);
        },
      }
    );

    console.log(cloudinaryResponse.data);
    document.querySelector(
      "#photo-preview"
    ).innerHTML = `<img src="https://res.cloudinary.com/for-next-image/image/upload/w_190,h_190,c_fill/${cloudinaryResponse.data.public_id}.jpg" />`;
  });

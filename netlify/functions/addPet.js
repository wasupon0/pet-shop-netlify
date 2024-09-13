const handler = async (event) => {
  const body = JSON.parse(event.body);
  console.log(body);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ success: true }),
  };
};

module.exports = { handler };

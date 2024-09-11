const handler = async () => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/plain",
    },
    body: "john".toUpperCase(),
  };
};

module.exports = { handler };

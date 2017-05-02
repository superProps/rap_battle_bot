const getRandomRap = require('./getRandomRap');

module.exports.getRap = (event, context) => {
  // context.callbackWaitsForEmptyEventLoop = false;
  
  const keyWord = event.pathParameters.keyword;
  getRandomRap(keyWord, (lyrics) => {
  const response = {
    statusCode: 200,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({lyrics: lyrics})
  };

  context.succeed(response);
  });
};
'use strict';
const getRandomRap = require('./getRandomRap');

module.exports.getRap = (event, context) => {
  const keyWord = event.pathParameters.keyword;
  getRandomRap(keyWord, function (lyrics) {
  const response = {
    statusCode: 200,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({lyrics: lyrics})
  };

  context.succeed(response);
  });
};
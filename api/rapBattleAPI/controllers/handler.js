const guarenteeRandomRap = require('./guaranteeRandomRap');

module.exports.getRap = (event, context) => {  
  const keyWord = event.pathParameters.keyword;
  guarenteeRandomRap(keyWord, (lyrics) => {
  const response = {
    statusCode: 200,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({lyrics: lyrics})
  };
  context.succeed(response);
  });
};
const guarenteeRandomRap = require('./guaranteeRandomRap');

module.exports.handler = (event, context) => { 
  const keyWord = event.pathParameters.keyword;
  guarenteeRandomRap(keyWord, (err, lyrics) => {
    if (err) return context.fail(err);
    const response = {
      statusCode: 200,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({lyrics: lyrics})
    };
    context.succeed(response);
  });
};
const guarenteeRandomRap = require('./guaranteeRandomRap');
const postRapToTwitter = require('../twitter-bot/postRapToTwitter');

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

module.exports.postRapToTweet = (event, context) => {
  const body = event.body;
  postRapToTwitter(body, () => {
    const response = {
      statusCode: 200,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({message: 'sorted it'})
    };
    context.succeed(response);
  });

};
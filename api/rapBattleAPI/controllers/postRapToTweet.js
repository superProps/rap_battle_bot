const postRapToTwitter = require('../twitter-bot/postRapToTwitter');

module.exports.handler = (event, context) => {
  const body = JSON.parse(event.Records[0].Sns.Message);
  postRapToTwitter(body, () => {
    const response = {
      statusCode: 200,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({message: 'tweet posted'})
    };
    context.succeed(response);
  });
};
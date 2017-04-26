var fs = require('fs');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

var nlu = new NaturalLanguageUnderstandingV1({
  "username": "f683016e-5f47-41d9-b7f3-82fdc1b81db1",
  "password": "ZKAF5rQkLmGE",
  version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
});

var lines = fs.readFileSync(__dirname + '/hold_me_down.txt', 'utf8').split('\n');

function createNluPromise (line) {
  return new Promise((resolve, reject) => {
    nlu.analyze({
      'html': line,
      'features': {
        'keywords': {}
      }
    }, function(err, response) {
        if (err)
          reject(err);
        else
          resolve(response)
    });
  });
}

const NUM_LINES = 5

Promise.all(
  lines.slice(0, NUM_LINES).map(createNluPromise)
).then(responses => {
  lines.slice(0, NUM_LINES).forEach((line, i) => {
    console.log(line)
    console.log(responses[i].keywords)
  })
})
.catch(console.log)
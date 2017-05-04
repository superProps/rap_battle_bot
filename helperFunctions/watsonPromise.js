
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var config = require('../config/.config');

var nlu = new NaturalLanguageUnderstandingV1({
    'username': config.josh1Credentials.username,
    'password': config.josh1Credentials.password,
    version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
});

module.exports = function createNluPromise (line) {
    return new Promise((resolve, reject) => {
        // console.log(line);
        nlu.analyze({
            'html': line,
            'features': {
                'keywords': {}
            }
        }, function (err, response) {
            if (err) {
                console.log(err);
                // console.log("Erro line?", line);
                // reject(err);
                resolve();
            }
            else {
                // console.log(response);
                resolve(response);
            }
        });
    });
}
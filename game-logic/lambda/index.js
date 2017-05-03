var request = require('request');

// var data = require('./data');
// var request = require('request-promise');
var https = require('https');
var Alexa = require('alexa-sdk');
var _ = require('underscore');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var config = require('./config');
var async = require('async');

var nlu = new NaturalLanguageUnderstandingV1({
    'username': config.josh1Credentials.username,
    'password': config.josh1Credentials.password,
    version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
});

function createNluPromise(line) {
    return new Promise((resolve, reject) => {
        nlu.analyze({
            'html': line,
            'features': {
                'keywords': {}
            }
        }, function (err, response) {
            if (err) {
                // console.log(err);
                reject(err);
            }
            else {
                // console.log(response);
                resolve(response);
            }
        });
    });
}
// var keywords = createNluPromise('awodijaowidjoawidj');

// keywords.then((res) => {
//     var themes = _.flatten(res.keywords.map(function (el) {
//         return el.text;
//     }).map(function (el) {
//         if (el.includes(' ')) {
//             return el.split(' ');
//         }
//         return el;
//     }));
//     var rapper = getAPIData(themes[1]);
//     rapper.then((res) => {
//         var formattedRap = {};
//         // var rapData = _.shuffle(res)[0];
//         formattedRap[1] = res.lyrics.firstLine;
//         for (var i = 0; i < 3; i++) {
//             formattedRap[i + 2] = res.lyrics.newLines[i].raw;
//         }
//         console.log('***', formattedRap)
//         // this.emit(':ask', `${themes[0]} ${formattedRap[1]}`);
//     })
//         .catch((err) => {
//             if (err) {
//                 console.log('error')
//             }
//         });
// })
//     .catch((err) => {
//         if (err) {
//             var rapper = getAPIData('awoij');
//             rapper.then((res) => {
//                 var formattedRap = {};
//                 // var rapData = _.shuffle(res)[0];
//                 formattedRap[1] = res.lyrics.firstLine;
//                 for (var i = 0; i < 3; i++) {
//                     formattedRap[i + 2] = res.lyrics.newLines[i].raw;
//                 }
//                 console.log(formattedRap)
//                 // this.emit(':ask', `${themes[0]} ${formattedRap[1]}`);
//             })
//         }
//     })



exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers, startHandlers, battleHandlers);
    alexa.execute();
};

var HELP_MESSAGE = 'What\'s up homie, you want to challenge me to a rap battle? Just say a theme to begin';
var EXIT_MESSAGE = 'Cya later homie';


var states = {
    START: '_START',
    BATTLE: '_BATTLE'
};


var handlers = {
    'LaunchRequest': function () {
        this.handler.state = states.START;
        this.emitWithState('Start');
    },
    'Battle': function () {
        this.handler.state = states.BATTLE;
        this.emitWithState('getTheme');
    },
    'ResponseRap': function () {
        this.handlers.state = states.BATTLE;
        this.emitWithState('ResponseRap');
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', HELP_MESSAGE, HELP_MESSAGE);
    },
    'Unhandled': function () {
        this.handler.state = states.START;
        this.emitWithState('Start');
    }
};

var startHandlers = Alexa.CreateStateHandler(states.START, {
    'Start': function () {
        this.emit(':ask', 'Are you ready to battle homie? give me a theme and i\'ll start', 'Shall we begin?');
    },
    'ResponseRap': function () {
        this.handler.state = states.BATTLE;
        this.emitWithState('ResponseRap');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', EXIT_MESSAGE, EXIT_MESSAGE);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', EXIT_MESSAGE, EXIT_MESSAGE);
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', HELP_MESSAGE, HELP_MESSAGE);
    },
    'Unhandled': function () {
        this.emitWithState('Start');
    }
});

var battleHandlers = Alexa.CreateStateHandler(states.BATTLE, {
    'getTheme': function () {
        this.emitWithState('ResponseRap');
    },
    'Battle': function () {
        var sesh = this.event.session.attributes;
        var speech = sesh.response;
        this.emit(':ask', speech, 'bye');
    },
    'ResponseRap': function () {
        var theme = this.event.request.intent.slots.Themes.value;
        if (!theme) {
            this.handler.state = states.START;
            this.emitWithState('Start');
        } else {
            var sesh = this.event.session.attributes;
            sesh.theme = theme;
            var keywords = createNluPromise(theme);
            keywords.then((res) => {
                // THIS EMIT STATEMENT DEFIENITELY WORKS
                // this.emit(':ask', `resHERE ${res}`);
                var themes = _.flatten(res.keywords.map(function (el) {
                    return el.text;
                }).map(function (el) {
                    if (el.includes(' ')) {
                        return el.split(' ');
                    }
                    return el;
                }));
                // THIS ALSO DEFEINITELY WORKS an 'res money'
                // this.emit(':ask', `res ${themes[0]}`);
                var rapper = getAPIData(themes[0]);
                // this.emit(':ask', `rapper ${rapper}`);
                rapper.then((res) => {
                    // this.emit(':ask', `res ${res}`);
                    var formattedRap = {};
                    formattedRap[1] = res.lyrics.firstLine;
                    for (var i = 0; i < 3; i++) {
                        formattedRap[i + 2] = res.lyrics.newLines[i].raw;
                    }
                    var response = formattedRap[1] + ',' + formattedRap[2] + ',' + formattedRap[3] + ',' + formattedRap[4];
                    sesh.response = response;
                    this.emit(':ask', `${response}`);
                })
                    .catch((err) => {
                        this.emit(':ask', `ERROR[0] ${err}`);
                    })
            })
                .catch((err) => {
                    // error is definitely in this block, it runs the emit statement below, but not the rest of the code.
                    // this.emit(':ask', `err ${JSON.stringify(err)}`);
                    // this.emit(':ask', `err 3 ${JSON.stringify(err)}`);


                    var rapper = getAPIData('getMeARandomRapPlease');
                    // the line below currently shows an empty object when you run it with ksbdfksdbfkhsdbfksdfb
                    // this.emit(':ask', `rapper ${JSON.stringify(rapper)}`);
                    rapper.then((res) => {

                        // THIS WORDS, when you enter kdsjgbsjfboeubeourb, it gets the correct response on the line below!
                        // this.emit(':ask', `res2 ${JSON.stringify(res.lyrics)}`);
                        // var firstLine = res.lyrics.firstLine;
                        // this.emit(':ask', `res2 ${JSON.stringify(res)}`);

                        var formattedRap = {};
                        formattedRap[1] = res.lyrics.firstLine;
                        for (var i = 0; i < 3; i++) {
                            formattedRap[i + 2] = res.lyrics.newLines[i].raw;
                        }
                        // this.emit(':ask', `formattedRap ${JSON.stringify(formattedRap)}`);

                        var response = formattedRap[1] + ',' + formattedRap[2] + ',' + formattedRap[3] + ',' + formattedRap[4];
                        sesh.response = response;
                    this.emit(':ask', `${response}`);
                    })
                        .catch((err) => {
                            // never reaches this...
                            this.emit(':ask', `err ${JSON.stringify(err)}`);

                        });
                });
            // this.emit(':ask', `last thinginginging`);

        }
        // else {
        //     // sesh.data = _.shuffle(data)[0];
        // async.waterfall([
        //     async.apply(getKeywordsFromTheme, 'money love nigga guns drugs women gangster'),
        //     getRandomRapFromAPI
        // ], function (err, res) {
        // var formattedRap = {};
        // var rapData = _.shuffle(res)[0];
        // formattedRap[1] = rapData.lyrics.firstLine;
        // for (var i = 0; i < 3; i++){
        //     formattedRap[i + 2] = rapData.lyrics.newLines[i].raw;
        // }
        // if (err) this.emit(':tell', 'fuck sake, sigh, something went wrong');
        // var speech = formattedRap[1];
        // this.emit(':ask', 'speech');
        // });


        // }
    },
    'AMAZON.StartOverIntent': function () {
        this.emitWithState('Start');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', EXIT_MESSAGE);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', EXIT_MESSAGE);
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', HELP_MESSAGE, HELP_MESSAGE);
    },

    'Unhandled': function () {
        this.emitWithState('ResponseRap');
    }
});


// function getKeywordsFromTheme (themes, next) {
//     var keywords = createNluPromise(themes);
//     keywords.then((res) => {
//         var usersKeywords = _.flatten(res.keywords.map(function (el) {
//             return el.text;
//         }).map(function (el) {
//             if (el.includes(' ')) {
//                 return el.split(' ');
//             }
//             return el;
//         }));
//             next(null, usersKeywords);                                                          
//     });
// }

// function getRandomRapFromAPI (usersKeyWords, next) {
//     var keyword = usersKeyWords[0];
//     console.log(keyword)
//     var data = getAPIData(keyword);
//     data.then((res) => {
//         console.log(res);
//         next(null, res.lyrics.firstLine);
//     });
// }

// function getAPIData (usersKeywords) {
//     Promise.all (

//     )
//             .then((response) => {
//                 console.log(response)
//                 resolve(response);
//             })
//             .catch((error) => {
//                 console.log('8****8888**')
//                 // API Error
//                 reject('API Error: ', error);
//             });
//     });
// }

// function createPromise (usersKeyWord) {
//         return new Promise((resolve, reject) => {
//             console.log('***', usersKeywords)
//         request({
//             url: `https://1ceaj2gv49.execute-api.us-east-1.amazonaws.com/dev/rap/${usersKeyWords}`,
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         }, function (err, response) {
//             resolve(response);
//         }
// }

function getAPIData(el) {


    return new Promise((resolve, reject) => {
        // request(`https://1ceaj2gv49.execute-api.us-east-1.amazonaws.com/dev/rap/${el}`, function (error, response, body) {
        //     console.log('error:', error); // Print the error if one occurred 
        //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
        //     console.log('body:', body); // Print the HTML for the Google homepage.
        //     if (error) reject(error);
        //     else resolve(response);
        // });

        var rapData = '';
        https.get(`https://1ceaj2gv49.execute-api.us-east-1.amazonaws.com/dev/rap/${el}`, function (res) {
            res.on('data', function (chunk) {
                rapData += chunk;
                rapData = JSON.parse(rapData);
                resolve(rapData);
            });
        });
    });
}

// request(`https://1ceaj2gv49.execute-api.us-east-1.amazonaws.com/dev/rap/${el}`, function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred 
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
//   console.log('body:', body); // Print the HTML for the Google homepage. 
// });


// function getRandomRapFromAPI (usersKeywords, next) {
//     Promise.all(
//         usersKeywords.map(getAPIData)
//     ).then(response => {

//         next(null, response);
//     });
// }
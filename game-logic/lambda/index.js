
// const data = require('./data');
const request = require('request-promise');
const https = require('https');
const Alexa = require('alexa-sdk');
const _ = require('underscore');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const config = require('./config');
const async = require('async');

var nlu = new NaturalLanguageUnderstandingV1({
    'username': config.josh1Credentials.username,
    'password': config.josh1Credentials.password,
    version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
});

function createNluPromise (line) {
    return new Promise((resolve, reject) => {
        nlu.analyze({
            'html': line,
            'features': {
                'keywords': {}
            }
        }, function (err, response) {
            if (err) {
                console.log(err);
                // reject(err);
            }
            else {
                // console.log(response);
                resolve(response);
            }
        });
    });
}

async.waterfall([
                async.apply(getKeywordsFromTheme, 'money love nigga guns drugs women gangster'),
                getRandomRapFromAPI
            ], function (err, res) {
                let formattedRap = {};
                let rapData =_.shuffle(res)[0];
                formattedRap[1] = rapData.lyrics.firstLine;
                for(var i = 0; i < 3; i++){
                    formattedRap[i + 2] = rapData.lyrics.newLines[i].raw;
                }
                // if (err) this.emit(':tell', 'fuck sake, sigh, something went wrong');
                // this.emit(':ask', `${res}`);
                console.log(formattedRap)
            });


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


const handlers = {
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
        this.emit(':ask', speech + sesh.theme, 'bye');
    },
    'ResponseRap': function () {
        const theme = this.event.request.intent.slots.Themes.value;
        if (!theme) {
            this.handler.state = states.START;
            this.emitWithState('Start');
        }
        else {
            const sesh = this.event.session.attributes;
            sesh.theme = theme;
            // sesh.data = _.shuffle(data)[0];
            async.waterfall([
                async.apply(getKeywordsFromTheme, theme),
                getRandomRapFromAPI
            ], function (err, res) {
                let formattedRap = {};
                let rapData = _.shuffle(res)[0];
                formattedRap[1] = rapData.lyrics.firstLine;
                for (var i = 0; i < 3; i++){
                    formattedRap[i + 2] = rapData.lyrics.newLines[i].raw;
                }
                if (err) this.emit(':tell', 'fuck sake, sigh, something went wrong');
                let speech = formattedRap[1];
                this.emit(':ask', 'speech');
            });

            // var response = sesh.data[1] + ',' + sesh.data[2] + ',' + sesh.data[3] + ',' + sesh.data[4];
            // sesh.response = response;

            // this.emitWithState('Battle');
        }
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


function getKeywordsFromTheme (themes, next) {
    let keywords = createNluPromise(themes);
    keywords.then((res) => {
        var usersKeywords = _.flatten(res.keywords.map(function (el) {
            return el.text;
        }).map(function (el) {
            if (el.includes(' ')) {
                return el.split(' ');
            }
            return el;
        }));
            next(null, usersKeywords);                                                          
    });
}

// function getRandomRapFromAPI (usersKeyWords, next) {
//     let keyword = usersKeyWords[0];
//     console.log(keyword)
//     let data = getAPIData(keyword);
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

function getAPIData (el) {
    return new Promise ((resolve) => {
        let rapData = '';
        https.get(`https://1ceaj2gv49.execute-api.us-east-1.amazonaws.com/dev/rap/${el}`, function (res) {
            res.on('data', function (chunk) {
                rapData += chunk;
                rapData = JSON.parse(rapData);
                resolve(rapData);
            });
        });
    });
}

function getRandomRapFromAPI (usersKeywords, next) {
    Promise.all(
        usersKeywords.map(getAPIData)
    ).then(response => {

        next(null, response);
    });
}
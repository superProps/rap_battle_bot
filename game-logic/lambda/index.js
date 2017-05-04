let data = require('./data');
var https = require('https');
var Alexa = require('alexa-sdk');
var _ = require('underscore');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var config = require('./config');
// var async = require('async');

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
                reject(err);
            }
            else {
                resolve(response);
            }
        });
    });
}

exports.handler = function (event, context) {
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
            if (theme.split(' ').length === 1) {
                var rapper = getAPIData(theme);
                rapper.then((res) => {
                    var formattedRap = {};
                    formattedRap[1] = res.lyrics.firstLine;
                    for (var i = 0; i < 3; i++) {
                        formattedRap[i + 2] = res.lyrics.newLines[i].raw;
                    }
                    var response = formattedRap[1] + ', ' + formattedRap[2] + ', ' + formattedRap[3] + ', ' + formattedRap[4];
                    sesh.response = response;
                    this.emitWithState('Battle');
                })
                    .catch((err) => {
                        this.emit(':ask', `ERROR[0] ${err}`);
                    });
            }
            var keywords = createNluPromise(theme);
            keywords.then((res) => {
                var themes = _.flatten(res.keywords.map(function (el) {
                    return el.text;
                }).map(function (el) {
                    if (el.includes(' ')) {
                        return el.split(' ');
                    }
                    return el;
                }));
                var rapper = getAPIData(themes[0]);
                rapper.then((res) => {
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
                    });
            })
                .catch((err) => {
                    var rapper = getAPIData('getMeARandomRapPlease');
                    rapper.then((res) => {
                        var formattedRap = {};
                        formattedRap[1] = res.lyrics.firstLine;
                        for (var i = 0; i < 3; i++) {
                            formattedRap[i + 2] = res.lyrics.newLines[i].raw;
                        }
                        var response = formattedRap[1] + ',' + formattedRap[2] + ',' + formattedRap[3] + ',' + formattedRap[4];
                        sesh.response = response;
                        this.emitWithState('Battle');
                    })
                        .catch((err) => {
                            this.emit(':ask', `err ${JSON.stringify(err)}`);

                        });
                });
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

function getAPIData(el) {
    return new Promise((resolve, reject) => {
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
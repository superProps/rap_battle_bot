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

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers, startHandlers, battleHandlers);
    alexa.execute();
};

var HELP_MESSAGE = 'What\'s up homie, you want to challenge me to a rap battle? Just say a theme to begin';
var EXIT_MESSAGE = 'See you later you fkin pussy, come back when youve got some balls';


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
        this.emit(':ask', `Warning, this game may contain strong language that some users may find offensive. <break time="2s">, ${HELP_MESSAGE}`, 'Go on, what you saying?');
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
        var speech = sesh.speechResponse;
        var cardTitle = 'Alexa spits: ';
        var cardContent = sesh.cardResponse;
        // var imageObj = {
        //     smallImageUrl: 'http://www.billboard.com/files/styles/article_main_image/public/media/Eazy-E-1990-billboard-650.jpg',
        //     largeImageUrl: 'http://www.billboard.com/files/styles/article_main_image/public/media/Eazy-E-1990-billboard-650.jpg'
        // }
        this.emit(':askWithCard', speech, 'what you saying?', cardTitle, cardContent);
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
                    var response = res.lyrics.map(function (el) {
                        return el.line;
                    });
                    var cardResponse = response[0] + '\n' + response[1] + '\n' + response[2] + '\n' + response[3];
                    var speechResponse = response[0] + '<break time="0.5s" />' + response[1] + '<break time="0.5s" />' + response[2] + '<break time="0.5s" />' + response[3];
                    sesh.speechResponse = speechResponse;
                    sesh.cardResponse = cardResponse;
                    this.emitWithState('Battle');
                })
                    .catch((err) => {
                        this.emit(':ask', '');
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
                var rapper = getAPIData(themes[themes.length - 1]);
                rapper.then((res) => {
                    var response = res.lyrics.map(function (el) {
                        return ' ' + el.line;
                    });
                    var cardResponse = response[0] + '\n' + response[1] + '\n' + response[2] + '\n' + response[3];
                    var speechResponse = response[0] + '<break time="0.5s" />' + response[1] + '<break time="0.5s" />' + response[2] + '<break time="0.5s" />' + response[3];
                    sesh.speechResponse = speechResponse;
                    sesh.cardResponse = cardResponse;
                    this.emitWithState('Battle');
                })
                    .catch((err) => {
                        this.emit(':ask', 'You need to speak properly bro, I cant understand you');
                    });
            })
                .catch((err) => {
                    var rapper = getAPIData('getMeARandomRapPlease');
                    rapper.then((res) => {
                        var response = res.lyrics.map(function (el) {
                            return el.line + ', ';
                        });
                        var cardResponse = response[0] + '\n' + response[1] + '\n' + response[2] + '\n' + response[3];
                        var speechResponse = response[0] + '<break time="0.5s" />' + response[1] + '<break time="0.5s" />' + response[2] + '<break time="0.5s" />' + response[3];
                        sesh.speechResponse = speechResponse;
                        sesh.cardResponse = cardResponse;
                        this.emitWithState('Battle');
                    })
                        .catch((err) => {
                            this.emit(':ask', 'You need to speak properly bro, I cant understand you');

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

let data = require('./data');
var Alexa = require('alexa-sdk');
const _ = require('underscore');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const config = require('./config');


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
        var theme = this.event.request.intent.slots.Themes.value;
        if (!theme) {
            this.handler.state = states.START;
            this.emitWithState('Start');
        }
        else {
            var sesh = this.event.session.attributes;
            sesh.theme = theme;
            sesh.data = _.shuffle(data)[0];
            var response = sesh.data[1] + ',' + sesh.data[2] + ',' + sesh.data[3] + ',' + sesh.data[4];
            sesh.response = response;
            let keywords = createNluPromise(sesh.theme)
            keywords.then((res) => {
                let themes = _.flatten(res.keywords.map(function (el) {
                    return el.text;
                }).map(function (el) {
                    if (el.includes(' ')) {
                        return el.split(' ');
                    }
                    return el;
                }));

                this.emit(':ask', `${themes[0]} ${themes[1]}`);

            })
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

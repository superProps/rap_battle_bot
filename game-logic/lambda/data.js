const _ = require('underscore');
const data = {
    1: {
        firstLine: 'Niggazz just don\'t give a fuck about a niggaaa like me right?',
        lastWord: 'right',
        newLines:
        [{
            _id: '59033858d7629f09cedb3ad9',
            raw: 'Stop Climaxing, You Got Your Fight',
            artist: 'busta rhymes',
            syllables: 5,
            lastWord: 'Fight',
            __v: 0,
            rhymes: [Object],
            keywords: [Object]
        },
        {
            _id: '59030fbe7fcf48f1bf7eaae7',
            raw: 'Lookin at a fuckked up black and white',
            artist: 'ice cube',
            syllables: 7,
            lastWord: 'white',
            __v: 0,
            rhymes: [Object],
            keywords: [Object]
        },
        {
            _id: '59030fbe7fcf48f1bf7eaac7',
            raw: 'Well, alright',
            artist: 'ice cube',
            syllables: 3,
            lastWord: 'alright',
            __v: 0,
            rhymes: [Object],
            keywords: [Object]
        }]
    },
    2: {
        firstLine: 'Niggass goin\' out just to talk to these hoes',
        lastWord: 'hoes',
        newLines:
        [{
            _id: '59033fed256e820d2aadec06',
            raw: 'I leveled up, bitchhh, I switch flows',
            artist: 'lil wayne',
            syllables: 8,
            lastWord: 'flows',
            __v: 0,
            rhymes: [Object],
            keywords: [Object]
        },
        {
            _id: '59031d116d5218f8eefc0191',
            raw: 'Hand me a nine and I\'ll defeat foes',
            artist: 'nas',
            syllables: 9,
            lastWord: 'foes',
            __v: 0,
            rhymes: [Object],
            keywords: [Object]
        },
        {
            _id: '59031d116d5218f8eefc01fb',
            raw: 'Cocaine, sniffin\' up drugs all in her nose,',
            artist: 'nas',
            syllables: 8,
            lastWord: 'nose',
            __v: 0,
            rhymes: [Object],
            keywords: [Object]
        }]
    },
    3: {
        firstLine: 'I say go buy a pie, the girl would go bake it',
        lastWord: 'it',
        newLines:
        [{
            _id: '590325ce91c7effe1411d85b',
            raw: 'An\' report to the pit, the gravel pit',
            artist: 'wu-tang clan',
            syllables: 9,
            lastWord: 'pit',
            __v: 0,
            rhymes: [Object],
            keywords: [Object]
        },
        {
            _id: '59031d106d5218f8eefc014e',
            raw: 'That you shoot with, count your loot wit\'',
            artist: 'nas',
            syllables: 7,
            lastWord: 'wit',
            __v: 0,
            rhymes: [Object],
            keywords: [Object]
        },
        {
            _id: '59033cf4933d870bbedba4d6',
            raw: 'I\'m never on some switching sides shit',
            artist: 'big sean',
            syllables: 9,
            lastWord: 'shit',
            __v: 0,
            rhymes: [Object],
            keywords: [Object]
        }]
    }

}



let raps = [];
function getRapFromData(obj) {

    for (var key in obj) {
        let rap = {};
        rap[1] = obj[key].firstLine;
        for (var i = 0; i < 3; i++) {
            rap[(i + 2)] = obj[key].newLines[i].raw;
        }
        raps.push(rap);
    }
}
getRapFromData(data);

module.exports = _.shuffle(raps);
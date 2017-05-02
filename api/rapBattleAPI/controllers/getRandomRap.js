const mongoose = require('mongoose');
const LyricsModel = require('./lyricsSchema');
const db = 'mongodb://admin:password@54.198.104.223/rapBattleLyrics';
const _ = require('underscore');
const async = require('async');

// Maybe grab other random lines for safety. If there are results then just push in random lyrics

function getRandomRap (keyWord, cb) {

    console.log('****GET RANDOM RAP CALLED*****');
    console.log('**DATABASE**', db);
    console.log('**KEYWORD PASSED DOWN**', keyWord);
    console.log('**CB**', cb);

    mongoose.connect(db, (err) => {
        console.log('**IM INSIDE THE MONGOOSE CONNECT PLZ FIND ME**');
        if (err) {
            console.log(err);
        }
        else console.log(`connected to ${db}`);
    });

    async.waterfall([
        getFirstLineAndLastWord,
        getRap
    ], function (err, results) {
        if (err) console.log(err);
        cb(results);
    });

    function getFirstLineAndLastWord (next) {
        LyricsModel.find({
            keywords: {$all: [keyWord]}
        }, function (error, data) {
            if (error) return console.log(error);
            data = _.shuffle(data);
            var lastWord = data[0].lastWord;
            var firstLine = data[0].raw;
            next(null, {firstLine, lastWord});
        });
    }

    function getRap (lastWordLyric, next) {
        LyricsModel.find({
            rhymes: {$all: [lastWordLyric.lastWord]}
        }, function (error, data) {
            if (error) return console.log(error);
            data = _.shuffle(data);
            var newLines = data.slice(0,3);
            lastWordLyric.newLines = newLines;
            next(null, lastWordLyric);
        });
    }

}

module.exports = getRandomRap;
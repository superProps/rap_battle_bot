const mongoose = require('mongoose');
const LyricsModel = require('./lyricsSchema');
const db = 'mongodb://admin:password@54.198.104.223/rapBattleLyrics';
const _ = require('underscore');
const async = require('async');

const defaultKeywords = ['money', 'drink', 'girls', 'gun', 'titty', 'hood', 'lyrics'];

function guaranteeRandomRap (keyWord, cb) {
    let counter = 0;
    keyWord = keyWord.toLowerCase();

    mongoose.connect(db, (err) => {
        if (err) {
            console.log('**ERROR IN MONGOOSE CONNECT**', err);
        }
        else console.log(`connected to ${db}`);
    });
    return getRandomRap(keyWord);

    function getRandomRap (keyWord) {
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
                else if (data.length === 0) return getRandomRap(defaultKeywords[Math.floor(Math.random() * defaultKeywords.length)]);
                else {
                    data = _.shuffle(data);
                    const lastWord = data[0].lastWord;
                    const firstLine = data[0].raw;
                    const artist = data[0].artist;
                    next(null, {firstLine, artist, lastWord});                
                }
            });
        }

        function getRap (lastWordLyric, next) {
            LyricsModel.find({
                rhymes: {$all: [lastWordLyric.lastWord]}
            }, function (error, data) {
                if (error) return console.log(error);
                else if (data.length < 3 && counter < 3) {
                    counter ++;
                    return getRandomRap(keyWord);
                }
                else if (data.length < 3) return getRandomRap(defaultKeywords[Math.floor(Math.random() * defaultKeywords.length)]);
                else {
                    data = _.shuffle(data);
                    const newLines = data.slice(0,3);
                    lastWordLyric.newLines = newLines;
                    next(null, lastWordLyric);
                }
            });
        }
    }
}

module.exports = guaranteeRandomRap;
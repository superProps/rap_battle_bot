const mongoose = require('mongoose');
const LyricsModel = require('./lyricsSchema');
const _ = require('underscore');
const async = require('async');
const AWS = require('aws-sdk');

const defaultKeywords = ['money', 'bullit', 'his', 'funny', 'pressure', 'weather', 'nurse', 'suck', 'butt', 'long', 'hair', 'mouth', 'south', 'street', 'church', 'border', 'smoke', 'trading', 'coward', 'drink', 'girls', 'gun', 'hood', 'lyrics'];

function guaranteeRandomRap (keyWord, cb) {
    let counter = 0;
    keyWord = keyWord.toLowerCase();

    mongoose.connect(process.env.DB, (err) => {
        if (err) {
            console.log('**ERROR IN MONGOOSE CONNECT**', err);
        }
        else console.log(`connected to ${process.env.DB}`);
    });
    return getRandomRap(keyWord);
    
    function getRandomRap (keyWord) {
        async.waterfall([
            getFirstLineAndLastWord,
            getRap
        ], function (err, results) {
            if (err) console.log(err);
            publishToSNS(results, (err) => {
                if (err) return cb(err);
                cb(null, results);
            });
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
                    counter++;
                    return getRandomRap(keyWord);
                }
                else if (data.length < 3) return getRandomRap(defaultKeywords[Math.floor(Math.random() * defaultKeywords.length)]);
                else {
                    data = _.shuffle(data);
                    const newLines = data.slice(0, 3);
                    lastWordLyric.newLines = newLines;
                    next(null, lastWordLyric);
                }
            });
        }
    }
}

function getLineArtistPairs (rap) {
    const result = [];
    result.push({
        line: rap.firstLine,
        artist: rap.artist
    });
    rap.newLines.forEach((line) => {
        result.push({
            line: line.raw,
            artist: line.artist
        });
    });
    return result;
}

function publishToSNS (rap, cb) {
    var sns = new AWS.SNS();
    var params = {
        Message: JSON.stringify(getLineArtistPairs(rap)),
        Subject: 'Rap from API',
        TopicArn: 'arn:aws:sns:us-east-1:929569807000:tweet'
    };
    sns.publish(params, cb);
}

module.exports = guaranteeRandomRap;
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
                    let rap = [];
                    let lastWordsArray = [];
                    let i = 0;
                    let dataDefined = true;
                    data = _.shuffle(data);
                    rap.push({line: lastWordLyric.firstLine, artist: lastWordLyric.artist});

                    lastWordsArray.push(lastWordLyric.lastWord.toLowerCase());

                    let unduplicatedData = getCommonRapsPromise();
                    unduplicatedData.then((res) => {
                        while (rap.length < 4) {
                            if (!data[i]) {
                                data = res;
                                dataDefined = false;
                                if (rap.length > 1) {
                                    rap = rap.slice(0, 2);
                                }
                            }
                            if (!_.contains(lastWordsArray, data[i].lastWord.toLowerCase())) {
                                rap.push({line: data[i].raw, artist: data[i].artist});
                                lastWordsArray.push(data[i].lastWord.toLowerCase());
                            }
                            i++;
                        }
                        // swaps first line for second, to improve rap flow and rhyming pattern
                        if (dataDefined === false) {
                            let temp1 = rap[0];
                            let temp2 = rap[1];
                            rap[0] = temp2;
                            rap[1] = temp1;
                        }
                        next(null, rap);
                    })
                        .catch((err) => {
                            console.log(err);
                            return getRandomRap(keyWord);
                        });
                }
            });
        }
    }
}

function publishToSNS (rap, cb) {
    var sns = new AWS.SNS();
    var params = {
        Message: JSON.stringify(rap),
        Subject: 'Rap from API',
        TopicArn: 'arn:aws:sns:us-east-1:929569807000:tweet'
    };
    sns.publish(params, cb);
}

function getCommonRapsPromise () {
    const defaultKeywords = ['money', 'sling', 'er', 'tick', 'south', 'blue', 'invoke'];
    return new Promise(function (resolve, reject) {
        let randomWord = defaultKeywords[Math.floor(Math.random() * defaultKeywords.length)];
        LyricsModel.find({
            rhymes: {$all: [randomWord]}
        }, function (error, data) {
            if (error) reject(error);
            resolve(data);
        });
    });
}

module.exports = guaranteeRandomRap;
const mongoose = require('mongoose');
const LyricsModel = require('./lyricsSchema');
// const db = 'mongodb://admin:password@54.198.104.223/rapBattleLyrics';
const db = 'mongodb://localhost:27017/lyricsRapBattle';
const _ = require('underscore');
const async = require('async');

const defaultKeywords = ['money', 'dick', 'bling', 'hood', 'streets', 'vodka', 'got', 'hello', 'my', 'to'];

// make sure that each last word of the rap is unique

// function guaranteeRandomRap (keyWord, cb) {
//     let counter = 0;

mongoose.connect(db, (err) => {
    if (err) {
        console.log('**ERROR IN MONGOOSE CONNECT**', err);
    }
    else console.log(`connected to ${db}`);
});

function getRandomRap(keyWord) {
    // return getRandomRap(keyWord);
    let counter = 0;

    async.waterfall([
        getFirstLineAndLastWord,
        getRap
    ], function (err, results) {
        if (err) console.log(err);
        // console.log(results);
        return results;
    });

    function getFirstLineAndLastWord(next) {
        LyricsModel.find({
            keywords: { $all: [keyWord] }
        }, function (error, data) {

            if (error) return console.log(error);
            else if (data.length === 0) return getRandomRap(defaultKeywords[Math.floor(Math.random() * defaultKeywords.length)]);
            else {
                data = _.shuffle(data);
                const lastWord = data[0].lastWord;
                const firstLine = data[0].raw;
                const artist = data[0].artist;
                next(null, { firstLine, artist, lastWord });
            }
        });
    }

    function getRap(lastWordLyric, next) {
        LyricsModel.find({
            rhymes: { $all: [lastWordLyric.lastWord] }
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
                let counter = 0;

                data = _.shuffle(data);
                rap.push(lastWordLyric.firstLine);

                lastWordsArray.push(lastWordLyric.lastWord);

                while (rap.length < 4) {
                    if (!data[counter]) {
                        console.log("Data length was undefined");
                        // console.log("RAP SO FAR", rap);
                        let randomWord = defaultKeywords[Math.floor(Math.random() * defaultKeywords.length)];
                        console.log(randomWord);
                        LyricsModel.find({
                            rhymes: { $all: [randomWord] }
                        }, function (error, data) {
                            if (error) return console.log(error);
                            console.log("DATA!!!!!!!", data);
                            if (rap.length === 1) {
                                // push in three random lyrics that rhyme together
                                rap.push(data.slice(0, 3));
                                counter += 4;
                            }
                            else {
                                // take two from rap 
                                // add two random ones => getRandomRap(defaultKeywords[Math.floor(Math.random() * defaultKeywords.length)]
                                rap.push(data.slice(0, 2));
                                counter += 4;
                            }
                        });
                    }
                    else if (!_.contains(lastWordsArray, data[counter].lastWord)) {
                        rap.push(data[counter].raw);
                        lastWordsArray.push(data[counter].lastWord);
                    }
                    counter++;
                }
                console.log("OUR RAP", rap);
                const newLines = data.slice(0, 3);
                lastWordLyric.newLines = newLines;
                next(null, lastWordLyric);
            }
        });
    }
}
// }

getRandomRap('guns');

// module.exports = guaranteeRandomRap;
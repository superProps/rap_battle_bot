const mongoose = require('mongoose');
const LyricsModel = require('./lyrics_schema');
const db = 'mongodb://localhost:27017/lyrics';

function getRandomRap (keyWord) {
    mongoose.connect(db, (err) => {
        if (err) {
            console.log(err);
        }
        else console.log(`connected to ${db}`);
    });
    // find all lyrics with the keyword find
    // pick one at random
    // get the lastWord of this random lyric
    // search db for all lyrics whose rhymes array contains last word 
    // pick three at random
    // return rap!
    lyricsModel.find({ }, function (error, data) {
        if (error) return console.log(error);
        let sessionLyrics = [];
        return sessionLyrics;
    });
}

module.exports = getRandomRap;
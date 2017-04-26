const mongoose = require('mongoose');
const LyricsModel = require('./lyrics_schema');
const data = require('./data');
const db = 'mongodb://localhost:27017/lyrics';

mongoose.connect(db, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`connected to ${db}`);
    data.forEach((lyric, i) => {
        let lyricNew = new LyricsModel (lyric);
        lyricNew.save(function (err, doc) {
            if (err) {
                return console.log(err);
            }
            console.log(`Lyric ${i} ${doc.lyric} saved to db`);
        });
    });

});
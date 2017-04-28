const data = require('./exportingCleanData');
const db = 'mongodb://localhost:27017/lyrics2';
const LyricsModel = require('./newSchema');
const mongoose = require('mongoose');

// console.log(data);


mongoose.connect(db, (err) => {
    if (err) {
        console.log('aha')
        // console.log(err);
    }
    else {
        data.forEach((el) => {
            console.log("SEEDED EL", el)
            el.forEach(function (lyric, i) {

                let lyricNew = new LyricsModel(lyric);
                lyricNew.save(function (err, doc) {
                    if (err) {
                        // return console.log(err);
                    }
                    console.log(`Lyric ${i} ${doc.raw} saved to db`);
                });
            });
        });

    }
})

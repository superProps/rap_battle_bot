const db = 'mongodb://localhost:27017/lyricsRapBattle';
const LyricsModel = require('./newSchema');
const mongoose = require('mongoose');
var fs = require('fs');

let numberOfFiles = 6;

mongoose.connect(db, (err) => {
  if (err) {
    console.log(err);
  }
  else {
    for (var i = numberOfFiles; i > 0; i--) {
      var text = fs.readFileSync(`../data/cleanData${i}.txt`, "utf8");
      let data = JSON.parse(text);
      data.forEach((el) => {
        el.forEach(function (lyric, i) {
          let lyricNew = new LyricsModel(lyric);
          lyricNew.save(function (err, doc) {
            if (err) {
              // return?
              console.log(err);
            }
            console.log(`Lyric ${i} ${doc.raw} saved to db`);
          });
        });
      });
    }
  }
});




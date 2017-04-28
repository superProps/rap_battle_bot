// const lyricsByArtist = require('./data');
// const phonemenon = require('phonemenon');
// // const types = require('phoneme-types');

// console.log(lyricsByArtist);

// lyricsByArtist.forEach(function (el) {
//     el.forEach(function (el) {
//         // console.log(el.lastWord, el.rhymes);
//         // here el.rhymes is an array of all the rhymes => need to condense these down into phonemes!
//     })
// })

// console.log(phonemenon.textToPhonemeStream);

// var setUpDatabase = require('word-phoneme-map').setUpDatabase;
// setUpDatabase(
//   {
//     dbLocation: __dirname + '/phonemes/test.db'
//   },
//   done
// );

// function done(error) {
//   if (error) {
//     return console.log(error)
//   }
//     console.log('Successfully set up database.');

// }

var createWordPhonemeMap = require('word-phoneme-map').createWordPhonemeMap;
var wordPhonemeMap = createWordPhonemeMap({
  dbLocation: __dirname + '/phonemes/test.db'
}, function (error, wordPhonemeMap) {
    console.log('****', arguments);
    Promise.all (
        createPhonemePromise('MONEY', wordPhonemeMap)
    ).then(responses => {
        console.log("RESPONSES", responses)
    })
    // wordPhonemeMap.phonemeSequencesForWord('PROST', showPhonemes);
});

// wordPhonemeMap.phonemeSequencesForWord('ARK', showPhonemes);

function createPhonemePromise (word, wordPhonemeMap) {
    console.log("CREATEPROMISE WITH ", word, wordPhonemeMap)
    return new Promise ((resolve, reject) => {
            console.log("*&(*(*&(*&", wordPhonemeMap.phonemeSequencesForWord(word, showPhonemes));
    }, function (err, response) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                console.log(response);
                resolve(response);
            }
        });
}


function showPhonemes(error, phonemeSequences) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(phonemeSequences);
  }
}
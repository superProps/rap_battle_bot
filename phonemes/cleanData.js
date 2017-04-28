const DBdata = require('./dataToClean');
const findPhoneme = require('./findPhoneme');
const fs = require("fs");
const _ = require('underscore');

function cleanData (DBdata) {
    DBdata.forEach(function (el) {
        el.forEach(function (el) {
            console.log(el);
            // add phoneme to element
            let phonemeInfo = findPhoneme(el.lastWord.toUpperCase())
            // if there is no phoneme information, then we will add in the most popular phonemes (so that this lyric gets used randomly by the getRandomRap function)
            console.log(phonemeInfo);
            let newInfo = {};
            if (phonemeInfo === undefined) {
                newInfo.majorPhonemes = ['EH1', 'AH0', 'AH1', 'AE1', 'AO', 'IH', 'AH'];
                // set to 0 so that we can find the entries where there were no phoneme matches
                newInfo.numberOfPhonemes = 0;
            }
            else {
                newInfo = phonemeInfo;
            }
            el.majorPhonemes = newInfo.majorPhonemes;
            el.numberOfPhonemes = newInfo.numberOfPhonemes;
            // artist names uniform => all lower case, take out special characters
            el.artist = el.artist.toLowerCase();
            // go into keywords, make sure that each element is one word (rather than a phase). Also make these lowercase and clean data
            var newKeywords = el.keywords.map(function (el) {
                // sometimes the keyWord is a phrase
                if (el.includes(" ")) {
                    el = el.split(" ");
                }
                if (Array.isArray(el)) {
                    return el.map(function (el) {
                        return el.toLowerCase().replace(/[^a-z+]+/gi, '');    
                    })
                }
                else {
                    return el.toLowerCase().replace(/[^a-z+]+/gi, '');
                }
            })
            el.keywords = _.uniq(_.flatten(newKeywords));
            // add lastWord to keyWord (this expands the words that can be said by users)
            if (!_.contains(el.keywords, el.lastWord)) {
                el.keywords.push(el.lastWord);
            }
            console.log(el);
    });
    fs.appendFileSync("cleanData.txt", JSON.stringify(DBdata), "UTF-8", { "flags": 'a+' })    
    });
}

cleanData(DBdata);


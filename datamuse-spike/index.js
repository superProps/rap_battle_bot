var SyllaRhyme = require('syllarhyme');
var data = require('./data');
// var Rhymez = require('rhymez');
// let rhymez = new Rhymez()
// await rhymez.load();
var https = require("https");

var options2 = {
    host: 'https://api.datamuse.com',
    port: 80,
    path: '/words?rel_rhy=forgetful',
    method: 'GET'
};


var options = {
    host: 'https://api.datamuse.com',
    path: '/words?rel_rhy=forgetful',
};

https.get('https://api.datamuse.com/words?rel_rhy=forgetful', function (res) {
    console.log("Got response: " + res.statusCode);

    res.on("data", function (chunk) {
        console.log("BODY: " + chunk);
    });
    res.on("end", function (res) {
        console.log("***", res);
    })
}).on('error', function (e) {
    console.log("Got error: " + e.message);
});


// var req = http.get(options2, function (res) {
//     console.log('STATUS: ' + res.statusCode);
//     console.log('HEADERS: ' + JSON.stringify(res.headers));

//     // Buffer the body entirely for processing as a whole.
//     var bodyChunks = [];
//     res.on('data', function (chunk) {
//         // You can process streamed parts here...
//         bodyChunks.push(chunk);
//     }).on('end', function () {
//         var body = Buffer.concat(bodyChunks);
//         console.log('BODY: ' + body);
//         // ...and/or process the entire body here.
//     })
// });

// req.on('error', function (e) {
//     console.log('ERROR: ' + e.message);
// });

// let options = {
//     isLoose: false, // Ignore vowel sound differences (EH1 and EH2 are considered identical) 
//     assonance: false, // Ignore consonants 
//     multiword: false
// }

function getRandomRap(data) {
    let randomRap = [];
    var firstLineArr = getRandomLine(data).split(' ');
    var useableWords = firstLineArr.reduce(function (acc, el) {
        var formattedWord = el.replace(/\W+/g, "");
        if (el.length !== 0) {
            acc.push(formattedWord);
        }
        return acc;
    }, []);
    randomRap.push(useableWords);
    var lastWord = useableWords[useableWords.length - 1];
    // console.log(randomRap);
    var possibleRhymes = [];
    console.log(lastWord);
    findRhymes(lastWord)
        .then(possibleRhymes => {
            console.log("HERE", possibleRhymes)
            // console.log("***", possibleRhymes[0][0]);
            var counter = 0;
            while (randomRap.length < 4 && counter < possibleRhymes.length) {
                data.forEach(function (el) {
                    // console.log("**", el);
                    // console.log(possibleRhymes[counter]);
                    if (el.includes(possibleRhymes[counter])) randomRap.push(el);
                });
                counter++;
            }
            // console.log(randomRap);
        });
        return randomRap;
    // console.log("***", possibleRhymes)
    // while (randomRap.length < 4 || counter < possibleRhymes.length) {
    //     counter = 0;
    //     data.forEach(function (el) {
    //         console.log("**", el);
    //         console.log(possibleRhymes[counter]);
    //         if (el.includes(possibleRhymes[counter])) randomRap.push(el);
    //     });
    //     counter++;
    // }
    // console.log(randomRap);
}

function getRandomLine(data) {
    var index = Math.floor(Math.random() * (data.length + 1));
    return data[index];
}

function findRhymes(word) {
    return new Promise(function (resolve) {
        const possibleRhymes = [];
        https.get(`https://api.datamuse.com/words?rel_rhy=${word}`, function (res) {
            console.log("Got response: " + res.statusCode);

            res.on("data", function (chunk) {
                console.log("BODY: " + chunk);
            });
            res.on("end", function (res) {
                console.log("***", res);
            })
        }).on('error', function (e) {
            console.log("Got error: " + e.message);
        });
        // SyllaRhyme(function (sr) {
        //     possibleRhymes.push(sr.rhymes(word));
        //     resolve(possibleRhymes);
        // });
        resolve(possibleRhymes);
    })
}

getRandomRap(data);





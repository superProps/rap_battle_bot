const Jimp = require('jimp');
const Filter = require('bad-words');
const filter = new Filter();
const Twit = require('twit');
const fs = require('fs');
const async = require('async');
const path = require('path');

function postRapToTwitter (rapObject) {
    console.log('POST RAP TO TWITTER HAS BEEN CALLED');
    let artists = [rapObject.artist, rapObject.newLines[0].artist, rapObject.newLines[1].artist, rapObject.newLines[2].artist];
    artists = artists.map((artist) => artist.replace(/\s+|\-/g,''));
    
    async.waterfall(
        [
        createRapImage,
        createTweet,
        ], 
        function (error) {
            if (error) console.log(error);
            else {
                console.log('Process Complete');
            }
        }
    );

    function createRapImage (callback) {
        console.log('CREATE IMAGE CALLED');
        let loadedImage;
        const templates = ['newtemp1.jpg','newtemp2.jpg', 'newtemp3.jpg', 'newtemp4.jpg'];
        const background = templates[Math.floor(Math.random() * templates.length)];
        Jimp.read(path.join(__dirname, background))
            .then(function (image) {
                loadedImage = image;
                return Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
            })
            .then(function (font) {
                return new Promise(function (resolve) {
                    return loadedImage
                    .print(font, 120, 70, filter.clean(rapObject.firstLine + ','), 480)
                    .print(font, 120, 120, filter.clean(rapObject.newLines[0].raw + ','), 480)
                    .print(font, 120, 170, filter.clean(rapObject.newLines[1].raw + ','), 480)
                    .print(font, 120, 220, filter.clean(rapObject.newLines[2].raw), 480)
                    .write('/tmp/newRap.jpg', function () {
                        resolve();
                    });
                });
            })
            .then(function () {
                console.log('Image Created');
                callback();
            })
            .catch(function (err) {
                console.error(err);
            });
    }

    function createTweet (callback) {
        console.log('CREATE TWEET CALLED');
        const T = new Twit({
            consumer_key: process.env.CONSUMER_KEY,
            consumer_secret: process.env.CONSUMER_SECRET,
            access_token: process.env.ACCESS_TOKEN,
            access_token_secret: process.env.ACCESS_TOKEN_SECRET
        });
        const b64content = fs.readFileSync('/tmp/newRap.jpg', {encoding: 'base64'});
        
        T.post('media/upload', {media_data: b64content}, function (err, data) {
            const mediaIdStr = data.media_id_string;
            const altText = 'Rap produced by Alexa Rap Battle Skill.';
            const meta_params = {media_id: mediaIdStr, alt_text: {text: altText}};

            T.post('media/metadata/create', meta_params, function (err) {
                if (!err) {

                const params = {status: `#${artists[0]} #${artists[1]} #${artists[2]} #${artists[3]}`, media_ids: [mediaIdStr]};

                T.post('statuses/update', params, function () {
                    console.log('Tweet Posted!');
                    var filePath = '/tmp/newRap.jpg'; 
                    fs.unlinkSync(filePath);
                    console.log('Image Deleted from File System!');
                    callback();
                });
                }
            });

        });
    }

}

module.exports = postRapToTwitter;


const Jimp = require('jimp');
const file = 'temp1.png';

Jimp.read(file).then(function (lenna) {
    lenna.resize(600, 350)                  // resize
         .quality(100)                      // set JPEG quality
         .write('newtemp1.jpg');            // save
}).catch(function (err) {
    console.error(err);
});
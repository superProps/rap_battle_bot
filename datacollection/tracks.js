// let MusixmatchApi = require('../../build/javascript-client/src/index')
let MusixmatchApi = require('./build/javascript-client/src/index');
let defaultClient = MusixmatchApi.ApiClient.instance;
let key = defaultClient.authentications['key'];
key.apiKey = '0e33db5e8d277a212d13ded17755c930'; // {String} 
let opts = {
    format: 'json',
    pageSize: 200
};
let albumId = 20892376; // {number}
(new MusixmatchApi.TrackApi()).albumTracksGetGet(albumId, opts, (error, data, response) => {
    if (error) {
        console.error(error);
    } else if (response.text) {
        data = JSON.parse(response.text);
    }
    else {
        throw new Error('bad response');
    }
});

// album.tracks.get?album_id=13750844&page=1&page_size=2
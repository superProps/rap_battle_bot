// var MusixmatchApi = require('../../build/javascript-client/src/index')
var MusixmatchApi = require('./build/javascript-client/src/index');
var defaultClient = MusixmatchApi.ApiClient.instance;
var key = defaultClient.authentications['key'];
key.apiKey = '0e33db5e8d277a212d13ded17755c930'; // {String} 
var opts = {
    format: 'json',
    qArtist: 'action bronson',
    pageSize: 10
};
// let trackId = 15445219; // {number}
(new MusixmatchApi.ArtistApi()).artistSearchGet(opts, (error, data, response) => {
    if (error) {
        console.error(error);
    } else if (response.text) {

        data = JSON.parse(response.text);
        data.message.body.artist_list.forEach(function(el) {
            console.log(el.artist.artist_name, el.artist.artist_id);
        });
    }
    else {
        console.log('hello')
        
        throw new Error('bad response');   
    }
});


/// album.tracks.get?album_id=13750844&page=1&page_size=2
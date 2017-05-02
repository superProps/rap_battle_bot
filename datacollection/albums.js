// let MusixmatchApi = require('../../build/javascript-client/src/index')
let MusixmatchApi = require('./build/javascript-client/src/index');
let defaultClient = MusixmatchApi.ApiClient.instance;
let key = defaultClient.authentications['key'];
key.apiKey = '0e33db5e8d277a212d13ded17755c930'; // {String} 
let opts = {
    format: 'json',
    sReleaseDate:'desc',
    gAlbumName: 1
};
let artistId = 14094854; // {number}
const hello = new MusixmatchApi.AlbumApi();
hello.artistAlbumsGetGet(artistId, opts, (error, data, response) => {
    if (error) {
        
        console.error(error);
    } else if (response.text) {
        let res = [];
        data = JSON.parse(response.text);
        data.message.body.album_list.forEach(function (el) {
            res.push(el.album.album_id);

            console.log(el.album.album_name);
        });    
        console.log(res);
        return res;
    }
    else {
        throw new Error('bad response');   
    }
});

// / album.tracks.get?album_id=13750844&page=1&page_size=2
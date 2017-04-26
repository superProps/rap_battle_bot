const axios = require('axios');

function getLyrics() {
    axios({
        method: 'get',
        url: 'http://api.musixmatch.com/ws/1.1/',
        data: {
            apikey: '0e33db5e8d277a212d13ded17755c930'
        }
    })
        .then (function(response) {
            console.log(response.data);
        })

}

getLyrics();
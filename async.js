const async = require('async');
const MusixmatchApi = require('./build/javascript-client/src/index');
const defaultClient = MusixmatchApi.ApiClient.instance;
const key = defaultClient.authentications['key'];
const _ = require('underscore');
key.apiKey = '0e33db5e8d277a212d13ded17755c930'; // {String} 



const artists = new MusixmatchApi.ArtistApi();
const albums = new MusixmatchApi.AlbumApi();
const tracks = new MusixmatchApi.TrackApi();
const lyrics = new MusixmatchApi.LyricsApi();


async.waterfall([
    getArtistId,
    getAlbumsFromId,
    getTracksFromAlbums,
    getLyricsFromTracks,
    getKeywordsFromLyrics
],

    function (err, results) { if (err) console.log('aha'); });









function getArtistId (next) {
    const ArtistOpts = {
            format: 'json',
            qArtist: 'biggie',
            pageSize: 1
        };
        artists.artistSearchGet(ArtistOpts, (error, data, response) => {
            if (error) {
                // console.error(error);
            } else if (response.text) {
                data = JSON.parse(response.text);
                next(null, data.message.body.artist_list[0].artist.artist_id);
            }
            else {
                throw new Error('bad response');
            }
        });
}

function getAlbumsFromId(id, next) {
        let albumOpts = {
            format: 'json',
            sReleaseDate: 'desc',
            gAlbumName: 1
        };
        albums.artistAlbumsGetGet(id, albumOpts, (error, data, response) => {
            if (error) {

                // console.error(error);
            } else if (response.text) {
                let res = [];
                data = JSON.parse(response.text);
                data.message.body.album_list.forEach(function (el) {
                    res.push(el.album.album_id);
                });

                next(null, res);
            }
            else {
                throw new Error('bad response');
            }
        });
    }

    function getTracksFromAlbums (albumIds, next) {
        async.mapSeries(albumIds, function (id, done) {
            var trackOpts = {
                format: 'json',
                pageSize: 1
            };
            tracks.albumTracksGetGet(id, trackOpts, (error, data, response) => {
                if (error) {
                    console.error(error);
                } else if (response.text) {
                    data = JSON.parse(response.text);
                    let trackz = [];
                    data.message.body.track_list.forEach(function (el) {
                        trackz.push(el.track.track_id);
                    });
                    done(null, trackz);
                }
                else {
                    throw new Error('bad response');
                }
            });
        }, function (error, results) {
            if (error) console.log(error);
            next(null, _.flatten(results));
        });

    }

    function getLyricsFromTracks(tracks, next) {
        async.mapSeries(tracks, function (eachTrack, done) {
            var lyricsOpts = {
                format: 'json',
            };
            lyrics.trackLyricsGetGet(eachTrack, lyricsOpts, (error, data, response) => {
                if (error) {
                    console.error(error);
                } else if (response.text) {
                    data = JSON.parse(response.text);
                    if (data.message.header.status_code === 200) {
                        var lyric = data.message.body.lyrics.lyrics_body.split('\n');
                    }
                    done(null, lyric);
                }
                else {
                    throw new Error('bad response');
                }
            });


        }, function (error, results) {
            results = results.filter(function(el){
                return el !== undefined;
            })
            results = results.map(function(el) {

                el = el.filter(function(line) {
                    return line.length > 3;
                })
                el.pop();
                return _.uniq(el);
            })
            results = _.uniq(_.flatten(results));
            next(null, results);
        });
    }


    function getKeywordsFromLyrics (lyricsArray, next) {
        
    }
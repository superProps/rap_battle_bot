/**
 * Musixmatch API
 * Musixmatch lyrics API is a robust service that permits you to search and retrieve lyrics in the simplest possible way. It just works.  Include millions of licensed lyrics on your website or in your application legally.  The fastest, most powerful and legal way to display lyrics on your website or in your application.  #### Read musixmatch API Terms & Conditions and the Privacy Policy: Before getting started, you must take a look at the [API Terms & Conditions](http://musixmatch.com/apiterms/) and the [Privacy Policy](https://developer.musixmatch.com/privacy). We’ve worked hard to make this service completely legal so that we are all protected from any foreseeable liability. Take the time to read this stuff.  #### Register for an API key: All you need to do is [register](https://developer.musixmatch.com/signup) in order to get your API key, a mandatory parameter for most of our API calls. It’s your personal identifier and should be kept secret:  ```   https://api.musixmatch.com/ws/v1.1/track.get?apikey=YOUR_API_KEY ``` #### Integrate the musixmatch service with your web site or application In the most common scenario you only need to implement two API calls:  The first call is to match your catalog to ours using the [track.search](#!/Track/get_track_search) function and the second is to get the lyrics using the [track.lyrics.get](#!/Lyrics/get_track_lyrics_get) api. That’s it!  ## API Methods What does the musiXmatch API do?  The musiXmatch API allows you to read objects from our huge 100% licensed lyrics database.  To make your life easier we are providing you with one or more examples to show you how it could work in the wild. You’ll find both the API request and API response in all the available output formats for each API call. Follow the links below for the details.  The current API version is 1.1, the root URL is located at https://api.musixmatch.com/ws/1.1/  Supported input parameters can be found on the page [Input Parameters](https://developer.musixmatch.com/documentation/input-parameters). Use UTF-8 to encode arguments when calling API methods.  Every response includes a status_code. A list of all status codes can be consulted at [Status Codes](https://developer.musixmatch.com/documentation/status-codes).  ## Music meta data The musiXmatch api is built around lyrics, but there are many other data we provide through the api that can be used to improve every existent music service.  ## Track Inside the track object you can get the following extra information:  ### TRACK RATING  The track rating is a score 0-100 identifying how popular is a song in musixmatch.  You can use this information to sort search results, like the most popular songs of an artist, of a music genre, of a lyrics language.  ### INSTRUMENTAL AND EXPLICIT FLAGS  The instrumental flag identifies songs with music only, no lyrics.  The explicit flag identifies songs with explicit lyrics or explicit title. We're able to identify explicit words and set the flag for the most common languages.  ### FAVOURITES  How many users have this song in their list of favourites.  Can be used to sort tracks by num favourite to identify more popular tracks within a set.  ### MUSIC GENRE  The music genere of the song.  Can be used to group songs by genre, as input for similarity alghorithms, artist genre identification, navigate songs by genere, etc.  ### SONG TITLES TRANSLATIONS  The track title, as translated in different lanauages, can be used to display the right writing for a given user, example:  LIES (Bigbang) becomes 在光化門 in chinese HALLELUJAH (Bigbang) becomes ハレルヤ in japanese   ## Artist Inside the artist object you can get the following nice extra information:  ### COMMENTS AND COUNTRY  An artist comment is a short snippet of text which can be mainly used for disambiguation.  The artist country is the born country of the artist/group  There are two perfect search result if you search by artist with the keyword \"U2\". Indeed there are two distinct music groups with this same name, one is the most known irish group of Bono Vox, the other is a less popular (world wide speaking) group from Japan.  Here's how you can made use of the artist comment in your search result page:  U2 (Irish rock band) U2 (あきやまうに) You can also show the artist country for even better disambiguation:  U2 (Irish rock band) from Ireland U2 (あきやまうに) from Japan ARTIST TRANSLATIONS  When you create a world wide music related service you have to take into consideration to display the artist name in the user's local language. These translation are also used as aliases to improve the search results.  Let's use PSY for this example.  Western people know him as PSY but korean want to see the original name 싸이.  Using the name translations provided by our api you can show to every user the writing they expect to see.  Furthermore, when you search for \"psy gangnam style\" or \"싸이 gangnam style\" with our search/match api you will still be able to find the song.  ### ARTIST RATING  The artist rating is a score 0-100 identifying how popular is an artist in musixmatch.  You can use this information to build charts, for suggestions, to sort search results. In the example above about U2, we use the artist rating to show the irish band before the japanese one in our serp.  ### ARTIST MUSIC GENRE  We provide one or more main artist genre, this information can be used to calculate similar artist, suggestions, or the filter a search by artist genre.    ## Album Inside the album object you can get the following nice extra information:  ### ALBUM RATING  The album rating is a score 0-100 identifying how popular is an album in musixmatch.  You can use this information to sort search results, like the most popular albums of an artist.  ### ALBUM RATING  The album rating is a score 0-100 identifying how popular is an album in musixmatch.  You can use this information to sort search results, like the most popular albums of an artist.  ### ALBUM COPYRIGHT AND LABEL  For most of our albums we can provide extra information like for example:  Label: Universal-Island Records Ltd. Copyright: (P) 2013 Rubyworks, under license to Columbia Records, a Division of Sony Music Entertainment. ALBUM TYPE AND RELEASE DATE  The album official release date can be used to sort an artist's albums view starting by the most recent one.  Album can also be filtered or grouped by type: Single, Album, Compilation, Remix, Live. This can help to build an artist page with a more organized structure.  ### ALBUM MUSIC GENRE  For most of the albums we provide two groups of music genres. Primary and secondary. This information can be used to help user navigate albums by genre.  An example could be:  Primary genere: POP Secondary genre: K-POP or Mandopop 
 *
 * OpenAPI spec version: 1.1.0
 * Contact: info@musixmatch.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/TrackPrimaryGenres', 'model/TrackSecondaryGenres'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./TrackPrimaryGenres'), require('./TrackSecondaryGenres'));
  } else {
    // Browser globals (root is window)
    if (!root.MusixmatchApi) {
      root.MusixmatchApi = {};
    }
    root.MusixmatchApi.Track = factory(root.MusixmatchApi.ApiClient, root.MusixmatchApi.TrackPrimaryGenres, root.MusixmatchApi.TrackSecondaryGenres);
  }
}(this, function(ApiClient, TrackPrimaryGenres, TrackSecondaryGenres) {
  'use strict';




  /**
   * The Track model module.
   * @module model/Track
   * @version 1.1.0
   */

  /**
   * Constructs a new <code>Track</code>.
   * a song in the Musixmatch database
   * @alias module:model/Track
   * @class
   */
  var exports = function() {
    var _this = this;




































  };

  /**
   * Constructs a <code>Track</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Track} obj Optional instance to populate.
   * @return {module:model/Track} The populated <code>Track</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('instrumental')) {
        obj['instrumental'] = ApiClient.convertToType(data['instrumental'], 'Number');
      }
      if (data.hasOwnProperty('album_coverart_350x350')) {
        obj['album_coverart_350x350'] = ApiClient.convertToType(data['album_coverart_350x350'], 'String');
      }
      if (data.hasOwnProperty('first_release_date')) {
        obj['first_release_date'] = ApiClient.convertToType(data['first_release_date'], 'String');
      }
      if (data.hasOwnProperty('track_isrc')) {
        obj['track_isrc'] = ApiClient.convertToType(data['track_isrc'], 'String');
      }
      if (data.hasOwnProperty('explicit')) {
        obj['explicit'] = ApiClient.convertToType(data['explicit'], 'Number');
      }
      if (data.hasOwnProperty('track_edit_url')) {
        obj['track_edit_url'] = ApiClient.convertToType(data['track_edit_url'], 'String');
      }
      if (data.hasOwnProperty('num_favourite')) {
        obj['num_favourite'] = ApiClient.convertToType(data['num_favourite'], 'Number');
      }
      if (data.hasOwnProperty('album_coverart_500x500')) {
        obj['album_coverart_500x500'] = ApiClient.convertToType(data['album_coverart_500x500'], 'String');
      }
      if (data.hasOwnProperty('album_name')) {
        obj['album_name'] = ApiClient.convertToType(data['album_name'], 'String');
      }
      if (data.hasOwnProperty('track_rating')) {
        obj['track_rating'] = ApiClient.convertToType(data['track_rating'], 'Number');
      }
      if (data.hasOwnProperty('track_share_url')) {
        obj['track_share_url'] = ApiClient.convertToType(data['track_share_url'], 'String');
      }
      if (data.hasOwnProperty('track_soundcloud_id')) {
        obj['track_soundcloud_id'] = ApiClient.convertToType(data['track_soundcloud_id'], 'Number');
      }
      if (data.hasOwnProperty('artist_name')) {
        obj['artist_name'] = ApiClient.convertToType(data['artist_name'], 'String');
      }
      if (data.hasOwnProperty('album_coverart_800x800')) {
        obj['album_coverart_800x800'] = ApiClient.convertToType(data['album_coverart_800x800'], 'String');
      }
      if (data.hasOwnProperty('album_coverart_100x100')) {
        obj['album_coverart_100x100'] = ApiClient.convertToType(data['album_coverart_100x100'], 'String');
      }
      if (data.hasOwnProperty('track_name_translation_list')) {
        obj['track_name_translation_list'] = ApiClient.convertToType(data['track_name_translation_list'], ['String']);
      }
      if (data.hasOwnProperty('track_name')) {
        obj['track_name'] = ApiClient.convertToType(data['track_name'], 'String');
      }
      if (data.hasOwnProperty('restricted')) {
        obj['restricted'] = ApiClient.convertToType(data['restricted'], 'Number');
      }
      if (data.hasOwnProperty('has_subtitles')) {
        obj['has_subtitles'] = ApiClient.convertToType(data['has_subtitles'], 'Number');
      }
      if (data.hasOwnProperty('updated_time')) {
        obj['updated_time'] = ApiClient.convertToType(data['updated_time'], 'String');
      }
      if (data.hasOwnProperty('subtitle_id')) {
        obj['subtitle_id'] = ApiClient.convertToType(data['subtitle_id'], 'Number');
      }
      if (data.hasOwnProperty('lyrics_id')) {
        obj['lyrics_id'] = ApiClient.convertToType(data['lyrics_id'], 'Number');
      }
      if (data.hasOwnProperty('track_spotify_id')) {
        obj['track_spotify_id'] = ApiClient.convertToType(data['track_spotify_id'], 'String');
      }
      if (data.hasOwnProperty('has_lyrics')) {
        obj['has_lyrics'] = ApiClient.convertToType(data['has_lyrics'], 'Number');
      }
      if (data.hasOwnProperty('artist_id')) {
        obj['artist_id'] = ApiClient.convertToType(data['artist_id'], 'Number');
      }
      if (data.hasOwnProperty('album_id')) {
        obj['album_id'] = ApiClient.convertToType(data['album_id'], 'Number');
      }
      if (data.hasOwnProperty('artist_mbid')) {
        obj['artist_mbid'] = ApiClient.convertToType(data['artist_mbid'], 'String');
      }
      if (data.hasOwnProperty('secondary_genres')) {
        obj['secondary_genres'] = TrackSecondaryGenres.constructFromObject(data['secondary_genres']);
      }
      if (data.hasOwnProperty('commontrack_vanity_id')) {
        obj['commontrack_vanity_id'] = ApiClient.convertToType(data['commontrack_vanity_id'], 'String');
      }
      if (data.hasOwnProperty('track_id')) {
        obj['track_id'] = ApiClient.convertToType(data['track_id'], 'Number');
      }
      if (data.hasOwnProperty('track_xboxmusic_id')) {
        obj['track_xboxmusic_id'] = ApiClient.convertToType(data['track_xboxmusic_id'], 'String');
      }
      if (data.hasOwnProperty('primary_genres')) {
        obj['primary_genres'] = TrackPrimaryGenres.constructFromObject(data['primary_genres']);
      }
      if (data.hasOwnProperty('track_length')) {
        obj['track_length'] = ApiClient.convertToType(data['track_length'], 'Number');
      }
      if (data.hasOwnProperty('track_mbid')) {
        obj['track_mbid'] = ApiClient.convertToType(data['track_mbid'], 'String');
      }
      if (data.hasOwnProperty('commontrack_id')) {
        obj['commontrack_id'] = ApiClient.convertToType(data['commontrack_id'], 'Number');
      }
    }
    return obj;
  }

  /**
   * 
   * @member {Number} instrumental
   */
  exports.prototype['instrumental'] = undefined;
  /**
   * 
   * @member {String} album_coverart_350x350
   */
  exports.prototype['album_coverart_350x350'] = undefined;
  /**
   * 
   * @member {String} first_release_date
   */
  exports.prototype['first_release_date'] = undefined;
  /**
   * 
   * @member {String} track_isrc
   */
  exports.prototype['track_isrc'] = undefined;
  /**
   * 
   * @member {Number} explicit
   */
  exports.prototype['explicit'] = undefined;
  /**
   * 
   * @member {String} track_edit_url
   */
  exports.prototype['track_edit_url'] = undefined;
  /**
   * 
   * @member {Number} num_favourite
   */
  exports.prototype['num_favourite'] = undefined;
  /**
   * 
   * @member {String} album_coverart_500x500
   */
  exports.prototype['album_coverart_500x500'] = undefined;
  /**
   * 
   * @member {String} album_name
   */
  exports.prototype['album_name'] = undefined;
  /**
   * 
   * @member {Number} track_rating
   */
  exports.prototype['track_rating'] = undefined;
  /**
   * 
   * @member {String} track_share_url
   */
  exports.prototype['track_share_url'] = undefined;
  /**
   * 
   * @member {Number} track_soundcloud_id
   */
  exports.prototype['track_soundcloud_id'] = undefined;
  /**
   * 
   * @member {String} artist_name
   */
  exports.prototype['artist_name'] = undefined;
  /**
   * 
   * @member {String} album_coverart_800x800
   */
  exports.prototype['album_coverart_800x800'] = undefined;
  /**
   * 
   * @member {String} album_coverart_100x100
   */
  exports.prototype['album_coverart_100x100'] = undefined;
  /**
   * @member {Array.<String>} track_name_translation_list
   */
  exports.prototype['track_name_translation_list'] = undefined;
  /**
   * 
   * @member {String} track_name
   */
  exports.prototype['track_name'] = undefined;
  /**
   * 
   * @member {Number} restricted
   */
  exports.prototype['restricted'] = undefined;
  /**
   * 
   * @member {Number} has_subtitles
   */
  exports.prototype['has_subtitles'] = undefined;
  /**
   * 
   * @member {String} updated_time
   */
  exports.prototype['updated_time'] = undefined;
  /**
   * 
   * @member {Number} subtitle_id
   */
  exports.prototype['subtitle_id'] = undefined;
  /**
   * 
   * @member {Number} lyrics_id
   */
  exports.prototype['lyrics_id'] = undefined;
  /**
   * 
   * @member {String} track_spotify_id
   */
  exports.prototype['track_spotify_id'] = undefined;
  /**
   * 
   * @member {Number} has_lyrics
   */
  exports.prototype['has_lyrics'] = undefined;
  /**
   * 
   * @member {Number} artist_id
   */
  exports.prototype['artist_id'] = undefined;
  /**
   * 
   * @member {Number} album_id
   */
  exports.prototype['album_id'] = undefined;
  /**
   * 
   * @member {String} artist_mbid
   */
  exports.prototype['artist_mbid'] = undefined;
  /**
   * @member {module:model/TrackSecondaryGenres} secondary_genres
   */
  exports.prototype['secondary_genres'] = undefined;
  /**
   * 
   * @member {String} commontrack_vanity_id
   */
  exports.prototype['commontrack_vanity_id'] = undefined;
  /**
   * 
   * @member {Number} track_id
   */
  exports.prototype['track_id'] = undefined;
  /**
   * 
   * @member {String} track_xboxmusic_id
   */
  exports.prototype['track_xboxmusic_id'] = undefined;
  /**
   * @member {module:model/TrackPrimaryGenres} primary_genres
   */
  exports.prototype['primary_genres'] = undefined;
  /**
   * 
   * @member {Number} track_length
   */
  exports.prototype['track_length'] = undefined;
  /**
   * 
   * @member {String} track_mbid
   */
  exports.prototype['track_mbid'] = undefined;
  /**
   * 
   * @member {Number} commontrack_id
   */
  exports.prototype['commontrack_id'] = undefined;



  return exports;
}));



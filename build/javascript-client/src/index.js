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

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Album', 'model/AlbumPrimaryGenres', 'model/AlbumPrimaryGenresMusicGenre', 'model/AlbumPrimaryGenresMusicGenreList', 'model/Artist', 'model/ArtistArtistAliasList', 'model/ArtistArtistCredits', 'model/ArtistArtistNameTranslation', 'model/ArtistArtistNameTranslationList', 'model/ArtistPrimaryGenres', 'model/ArtistPrimaryGenresMusicGenre', 'model/ArtistPrimaryGenresMusicGenreList', 'model/ArtistSecondaryGenres', 'model/InlineResponse200', 'model/InlineResponse2001', 'model/InlineResponse20010', 'model/InlineResponse20010Message', 'model/InlineResponse20010MessageBody', 'model/InlineResponse2001Message', 'model/InlineResponse2001MessageBody', 'model/InlineResponse2001MessageHeader', 'model/InlineResponse2002', 'model/InlineResponse2002Message', 'model/InlineResponse2002MessageBody', 'model/InlineResponse2002MessageHeader', 'model/InlineResponse2003', 'model/InlineResponse2003Message', 'model/InlineResponse2003MessageBody', 'model/InlineResponse2004', 'model/InlineResponse2004Message', 'model/InlineResponse2004MessageBody', 'model/InlineResponse2005', 'model/InlineResponse2005Message', 'model/InlineResponse2005MessageHeader', 'model/InlineResponse2006', 'model/InlineResponse2006Message', 'model/InlineResponse2006MessageBody', 'model/InlineResponse2006MessageBodyTrackList', 'model/InlineResponse2007', 'model/InlineResponse2007Message', 'model/InlineResponse2007MessageBody', 'model/InlineResponse2008', 'model/InlineResponse2008Message', 'model/InlineResponse2008MessageBody', 'model/InlineResponse2009', 'model/InlineResponse2009Message', 'model/InlineResponse200Message', 'model/InlineResponse200MessageBody', 'model/InlineResponse200MessageHeader', 'model/Lyrics', 'model/Snippet', 'model/Subtitle', 'model/Track', 'model/TrackPrimaryGenres', 'model/TrackPrimaryGenresMusicGenre', 'model/TrackPrimaryGenresMusicGenreList', 'model/TrackSecondaryGenres', 'model/TrackSecondaryGenresMusicGenre', 'model/TrackSecondaryGenresMusicGenreList', 'api/AlbumApi', 'api/ArtistApi', 'api/LyricsApi', 'api/SnippetApi', 'api/SubtitleApi', 'api/TrackApi'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('./ApiClient'), require('./model/Album'), require('./model/AlbumPrimaryGenres'), require('./model/AlbumPrimaryGenresMusicGenre'), require('./model/AlbumPrimaryGenresMusicGenreList'), require('./model/Artist'), require('./model/ArtistArtistAliasList'), require('./model/ArtistArtistCredits'), require('./model/ArtistArtistNameTranslation'), require('./model/ArtistArtistNameTranslationList'), require('./model/ArtistPrimaryGenres'), require('./model/ArtistPrimaryGenresMusicGenre'), require('./model/ArtistPrimaryGenresMusicGenreList'), require('./model/ArtistSecondaryGenres'), require('./model/InlineResponse200'), require('./model/InlineResponse2001'), require('./model/InlineResponse20010'), require('./model/InlineResponse20010Message'), require('./model/InlineResponse20010MessageBody'), require('./model/InlineResponse2001Message'), require('./model/InlineResponse2001MessageBody'), require('./model/InlineResponse2001MessageHeader'), require('./model/InlineResponse2002'), require('./model/InlineResponse2002Message'), require('./model/InlineResponse2002MessageBody'), require('./model/InlineResponse2002MessageHeader'), require('./model/InlineResponse2003'), require('./model/InlineResponse2003Message'), require('./model/InlineResponse2003MessageBody'), require('./model/InlineResponse2004'), require('./model/InlineResponse2004Message'), require('./model/InlineResponse2004MessageBody'), require('./model/InlineResponse2005'), require('./model/InlineResponse2005Message'), require('./model/InlineResponse2005MessageHeader'), require('./model/InlineResponse2006'), require('./model/InlineResponse2006Message'), require('./model/InlineResponse2006MessageBody'), require('./model/InlineResponse2006MessageBodyTrackList'), require('./model/InlineResponse2007'), require('./model/InlineResponse2007Message'), require('./model/InlineResponse2007MessageBody'), require('./model/InlineResponse2008'), require('./model/InlineResponse2008Message'), require('./model/InlineResponse2008MessageBody'), require('./model/InlineResponse2009'), require('./model/InlineResponse2009Message'), require('./model/InlineResponse200Message'), require('./model/InlineResponse200MessageBody'), require('./model/InlineResponse200MessageHeader'), require('./model/Lyrics'), require('./model/Snippet'), require('./model/Subtitle'), require('./model/Track'), require('./model/TrackPrimaryGenres'), require('./model/TrackPrimaryGenresMusicGenre'), require('./model/TrackPrimaryGenresMusicGenreList'), require('./model/TrackSecondaryGenres'), require('./model/TrackSecondaryGenresMusicGenre'), require('./model/TrackSecondaryGenresMusicGenreList'), require('./api/AlbumApi'), require('./api/ArtistApi'), require('./api/LyricsApi'), require('./api/SnippetApi'), require('./api/SubtitleApi'), require('./api/TrackApi'));
  }
}(function(ApiClient, Album, AlbumPrimaryGenres, AlbumPrimaryGenresMusicGenre, AlbumPrimaryGenresMusicGenreList, Artist, ArtistArtistAliasList, ArtistArtistCredits, ArtistArtistNameTranslation, ArtistArtistNameTranslationList, ArtistPrimaryGenres, ArtistPrimaryGenresMusicGenre, ArtistPrimaryGenresMusicGenreList, ArtistSecondaryGenres, InlineResponse200, InlineResponse2001, InlineResponse20010, InlineResponse20010Message, InlineResponse20010MessageBody, InlineResponse2001Message, InlineResponse2001MessageBody, InlineResponse2001MessageHeader, InlineResponse2002, InlineResponse2002Message, InlineResponse2002MessageBody, InlineResponse2002MessageHeader, InlineResponse2003, InlineResponse2003Message, InlineResponse2003MessageBody, InlineResponse2004, InlineResponse2004Message, InlineResponse2004MessageBody, InlineResponse2005, InlineResponse2005Message, InlineResponse2005MessageHeader, InlineResponse2006, InlineResponse2006Message, InlineResponse2006MessageBody, InlineResponse2006MessageBodyTrackList, InlineResponse2007, InlineResponse2007Message, InlineResponse2007MessageBody, InlineResponse2008, InlineResponse2008Message, InlineResponse2008MessageBody, InlineResponse2009, InlineResponse2009Message, InlineResponse200Message, InlineResponse200MessageBody, InlineResponse200MessageHeader, Lyrics, Snippet, Subtitle, Track, TrackPrimaryGenres, TrackPrimaryGenresMusicGenre, TrackPrimaryGenresMusicGenreList, TrackSecondaryGenres, TrackSecondaryGenresMusicGenre, TrackSecondaryGenresMusicGenreList, AlbumApi, ArtistApi, LyricsApi, SnippetApi, SubtitleApi, TrackApi) {
  'use strict';

  /**
   * Musixmatch_lyrics_API_is_a_robust_service_that_permits_you_to_search_and_retrieve_lyrics_in_the_simplest_possible_way__It_just_works_Include_millions_of_licensed_lyrics_on_your_website_or_in_your_application_legally_The_fastest_most_powerful_and_legal_way_to_display_lyrics_on_your_website_or_in_your_application__Read_musixmatch_API_Terms__Conditions_and_the_Privacy_PolicyBefore_getting_started_you_must_take_a_look_at_the__API_Terms__Conditions_httpmusixmatch_comapiterms_and_the__Privacy_Policy_httpsdeveloper_musixmatch_comprivacy__Weve_worked_hard_to_make_this_service_completely_legal_so_that_we_are_all_protected_from_any_foreseeable_liability__Take_the_time_to_read_this_stuff__Register_for_an_API_keyAll_you_need_to_do_is__register_httpsdeveloper_musixmatch_comsignup_in_order_to_get_your_API_key_a_mandatory_parameter_for_most_of_our_API_calls__Its_your_personal_identifier_and_should_be_kept_secret__httpsapi_musixmatch_comwsv1_1track_getapikeyYOUR_API_KEY_Integrate_the_musixmatch_service_with_your_web_site_or_applicationIn_the_most_common_scenario_you_only_need_to_implement_two_API_calls_The_first_call_is_to_match_your_catalog_to_ours_using_the__track_search_Trackget_track_search_function_and_the_second_is_to_get_the_lyrics_using_the__track_lyrics_get_Lyricsget_track_lyrics_get_api__Thats_it_API_MethodsWhat_does_the_musiXmatch_API_doThe_musiXmatch_API_allows_you_to_read_objects_from_our_huge_100_licensed_lyrics_database_To_make_your_life_easier_we_are_providing_you_with_one_or_more_examples_to_show_you_how_it_could_work_in_the_wild__Youll_find_both_the_API_request_and_API_response_in_all_the_available_output_formats_for_each_API_call__Follow_the_links_below_for_the_details_The_current_API_version_is_1_1_the_root_URL_is_located_at_httpsapi_musixmatch_comws1_1Supported_input_parameters_can_be_found_on_the_page__Input_Parameters_httpsdeveloper_musixmatch_comdocumentationinput_parameters__Use_UTF_8_to_encode_arguments_when_calling_API_methods_Every_response_includes_a_status_code__A_list_of_all_status_codes_can_be_consulted_at__Status_Codes_httpsdeveloper_musixmatch_comdocumentationstatus_codes__Music_meta_dataThe_musiXmatch_api_is_built_around_lyrics_but_there_are_many_other_data_we_provide_through_the_api_that_can_be_used_to_improve_every_existent_music_service__TrackInside_the_track_object_you_can_get_the_following_extra_information_TRACK_RATINGThe_track_rating_is_a_score_0_100_identifying_how_popular_is_a_song_in_musixmatch_You_can_use_this_information_to_sort_search_results_like_the_most_popular_songs_of_an_artist_of_a_music_genre_of_a_lyrics_language__INSTRUMENTAL_AND_EXPLICIT_FLAGSThe_instrumental_flag_identifies_songs_with_music_only_no_lyrics_The_explicit_flag_identifies_songs_with_explicit_lyrics_or_explicit_title__Were_able_to_identify_explicit_words_and_set_the_flag_for_the_most_common_languages__FAVOURITESHow_many_users_have_this_song_in_their_list_of_favourites_Can_be_used_to_sort_tracks_by_num_favourite_to_identify_more_popular_tracks_within_a_set__MUSIC_GENREThe_music_genere_of_the_song_Can_be_used_to_group_songs_by_genre_as_input_for_similarity_alghorithms_artist_genre_identification_navigate_songs_by_genere_etc__SONG_TITLES_TRANSLATIONSThe_track_title_as_translated_in_different_lanauages_can_be_used_to_display_the_right_writing_for_a_given_user_exampleLIES__Bigbang_becomes__in_chineseHALLELUJAH__Bigbang_becomes__in_japanese_ArtistInside_the_artist_object_you_can_get_the_following_nice_extra_information_COMMENTS_AND_COUNTRYAn_artist_comment_is_a_short_snippet_of_text_which_can_be_mainly_used_for_disambiguation_The_artist_country_is_the_born_country_of_the_artistgroupThere_are_two_perfect_search_result_if_you_search_by_artist_with_the_keyword_U2__Indeed_there_are_two_distinct_music_groups_with_this_same_name_one_is_the_most_known_irish_group_of_Bono_Vox_the_other_is_a_less_popular__world_wide_speaking_group_from_Japan_Heres_how_you_can_made_use_of_the_artist_comment_in_your_search_result_pageU2__Irish_rock_bandU2__You_can_also_show_the_artist_country_for_even_better_disambiguationU2__Irish_rock_band_from_IrelandU2___from_JapanARTIST_TRANSLATIONSWhen_you_create_a_world_wide_music_related_service_you_have_to_take_into_consideration_to_display_the_artist_name_in_the_users_local_language__These_translation_are_also_used_as_aliases_to_improve_the_search_results_Lets_use_PSY_for_this_example_Western_people_know_him_as_PSY_but_korean_want_to_see_the_original_name__Using_the_name_translations_provided_by_our_api_you_can_show_to_every_user_the_writing_they_expect_to_see_Furthermore_when_you_search_for_psy_gangnam_style_or__gangnam_style_with_our_searchmatch_api_you_will_still_be_able_to_find_the_song__ARTIST_RATINGThe_artist_rating_is_a_score_0_100_identifying_how_popular_is_an_artist_in_musixmatch_You_can_use_this_information_to_build_charts_for_suggestions_to_sort_search_results__In_the_example_above_about_U2_we_use_the_artist_rating_to_show_the_irish_band_before_the_japanese_one_in_our_serp__ARTIST_MUSIC_GENREWe_provide_one_or_more_main_artist_genre_this_information_can_be_used_to_calculate_similar_artist_suggestions_or_the_filter_a_search_by_artist_genre__AlbumInside_the_album_object_you_can_get_the_following_nice_extra_information_ALBUM_RATINGThe_album_rating_is_a_score_0_100_identifying_how_popular_is_an_album_in_musixmatch_You_can_use_this_information_to_sort_search_results_like_the_most_popular_albums_of_an_artist__ALBUM_RATINGThe_album_rating_is_a_score_0_100_identifying_how_popular_is_an_album_in_musixmatch_You_can_use_this_information_to_sort_search_results_like_the_most_popular_albums_of_an_artist__ALBUM_COPYRIGHT_AND_LABELFor_most_of_our_albums_we_can_provide_extra_information_like_for_exampleLabel_Universal_Island_Records_Ltd_Copyright__P_2013_Rubyworks_under_license_to_Columbia_Records_a_Division_of_Sony_Music_Entertainment_ALBUM_TYPE_AND_RELEASE_DATEThe_album_official_release_date_can_be_used_to_sort_an_artists_albums_view_starting_by_the_most_recent_one_Album_can_also_be_filtered_or_grouped_by_type_Single_Album_Compilation_Remix_Live__This_can_help_to_build_an_artist_page_with_a_more_organized_structure__ALBUM_MUSIC_GENREFor_most_of_the_albums_we_provide_two_groups_of_music_genres__Primary_and_secondary__This_information_can_be_used_to_help_user_navigate_albums_by_genre_An_example_could_bePrimary_genere_POPSecondary_genre_K_POP_or_Mandopop.<br>
   * The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
   * <p>
   * An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
   * <pre>
   * var MusixmatchApi = require('index'); // See note below*.
   * var xxxSvc = new MusixmatchApi.XxxApi(); // Allocate the API class we're going to use.
   * var yyyModel = new MusixmatchApi.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
   * and put the application logic within the callback function.</em>
   * </p>
   * <p>
   * A non-AMD browser application (discouraged) might do something like this:
   * <pre>
   * var xxxSvc = new MusixmatchApi.XxxApi(); // Allocate the API class we're going to use.
   * var yyy = new MusixmatchApi.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * </p>
   * @module index
   * @version 1.1.0
   */
  var exports = {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient: ApiClient,
    /**
     * The Album model constructor.
     * @property {module:model/Album}
     */
    Album: Album,
    /**
     * The AlbumPrimaryGenres model constructor.
     * @property {module:model/AlbumPrimaryGenres}
     */
    AlbumPrimaryGenres: AlbumPrimaryGenres,
    /**
     * The AlbumPrimaryGenresMusicGenre model constructor.
     * @property {module:model/AlbumPrimaryGenresMusicGenre}
     */
    AlbumPrimaryGenresMusicGenre: AlbumPrimaryGenresMusicGenre,
    /**
     * The AlbumPrimaryGenresMusicGenreList model constructor.
     * @property {module:model/AlbumPrimaryGenresMusicGenreList}
     */
    AlbumPrimaryGenresMusicGenreList: AlbumPrimaryGenresMusicGenreList,
    /**
     * The Artist model constructor.
     * @property {module:model/Artist}
     */
    Artist: Artist,
    /**
     * The ArtistArtistAliasList model constructor.
     * @property {module:model/ArtistArtistAliasList}
     */
    ArtistArtistAliasList: ArtistArtistAliasList,
    /**
     * The ArtistArtistCredits model constructor.
     * @property {module:model/ArtistArtistCredits}
     */
    ArtistArtistCredits: ArtistArtistCredits,
    /**
     * The ArtistArtistNameTranslation model constructor.
     * @property {module:model/ArtistArtistNameTranslation}
     */
    ArtistArtistNameTranslation: ArtistArtistNameTranslation,
    /**
     * The ArtistArtistNameTranslationList model constructor.
     * @property {module:model/ArtistArtistNameTranslationList}
     */
    ArtistArtistNameTranslationList: ArtistArtistNameTranslationList,
    /**
     * The ArtistPrimaryGenres model constructor.
     * @property {module:model/ArtistPrimaryGenres}
     */
    ArtistPrimaryGenres: ArtistPrimaryGenres,
    /**
     * The ArtistPrimaryGenresMusicGenre model constructor.
     * @property {module:model/ArtistPrimaryGenresMusicGenre}
     */
    ArtistPrimaryGenresMusicGenre: ArtistPrimaryGenresMusicGenre,
    /**
     * The ArtistPrimaryGenresMusicGenreList model constructor.
     * @property {module:model/ArtistPrimaryGenresMusicGenreList}
     */
    ArtistPrimaryGenresMusicGenreList: ArtistPrimaryGenresMusicGenreList,
    /**
     * The ArtistSecondaryGenres model constructor.
     * @property {module:model/ArtistSecondaryGenres}
     */
    ArtistSecondaryGenres: ArtistSecondaryGenres,
    /**
     * The InlineResponse200 model constructor.
     * @property {module:model/InlineResponse200}
     */
    InlineResponse200: InlineResponse200,
    /**
     * The InlineResponse2001 model constructor.
     * @property {module:model/InlineResponse2001}
     */
    InlineResponse2001: InlineResponse2001,
    /**
     * The InlineResponse20010 model constructor.
     * @property {module:model/InlineResponse20010}
     */
    InlineResponse20010: InlineResponse20010,
    /**
     * The InlineResponse20010Message model constructor.
     * @property {module:model/InlineResponse20010Message}
     */
    InlineResponse20010Message: InlineResponse20010Message,
    /**
     * The InlineResponse20010MessageBody model constructor.
     * @property {module:model/InlineResponse20010MessageBody}
     */
    InlineResponse20010MessageBody: InlineResponse20010MessageBody,
    /**
     * The InlineResponse2001Message model constructor.
     * @property {module:model/InlineResponse2001Message}
     */
    InlineResponse2001Message: InlineResponse2001Message,
    /**
     * The InlineResponse2001MessageBody model constructor.
     * @property {module:model/InlineResponse2001MessageBody}
     */
    InlineResponse2001MessageBody: InlineResponse2001MessageBody,
    /**
     * The InlineResponse2001MessageHeader model constructor.
     * @property {module:model/InlineResponse2001MessageHeader}
     */
    InlineResponse2001MessageHeader: InlineResponse2001MessageHeader,
    /**
     * The InlineResponse2002 model constructor.
     * @property {module:model/InlineResponse2002}
     */
    InlineResponse2002: InlineResponse2002,
    /**
     * The InlineResponse2002Message model constructor.
     * @property {module:model/InlineResponse2002Message}
     */
    InlineResponse2002Message: InlineResponse2002Message,
    /**
     * The InlineResponse2002MessageBody model constructor.
     * @property {module:model/InlineResponse2002MessageBody}
     */
    InlineResponse2002MessageBody: InlineResponse2002MessageBody,
    /**
     * The InlineResponse2002MessageHeader model constructor.
     * @property {module:model/InlineResponse2002MessageHeader}
     */
    InlineResponse2002MessageHeader: InlineResponse2002MessageHeader,
    /**
     * The InlineResponse2003 model constructor.
     * @property {module:model/InlineResponse2003}
     */
    InlineResponse2003: InlineResponse2003,
    /**
     * The InlineResponse2003Message model constructor.
     * @property {module:model/InlineResponse2003Message}
     */
    InlineResponse2003Message: InlineResponse2003Message,
    /**
     * The InlineResponse2003MessageBody model constructor.
     * @property {module:model/InlineResponse2003MessageBody}
     */
    InlineResponse2003MessageBody: InlineResponse2003MessageBody,
    /**
     * The InlineResponse2004 model constructor.
     * @property {module:model/InlineResponse2004}
     */
    InlineResponse2004: InlineResponse2004,
    /**
     * The InlineResponse2004Message model constructor.
     * @property {module:model/InlineResponse2004Message}
     */
    InlineResponse2004Message: InlineResponse2004Message,
    /**
     * The InlineResponse2004MessageBody model constructor.
     * @property {module:model/InlineResponse2004MessageBody}
     */
    InlineResponse2004MessageBody: InlineResponse2004MessageBody,
    /**
     * The InlineResponse2005 model constructor.
     * @property {module:model/InlineResponse2005}
     */
    InlineResponse2005: InlineResponse2005,
    /**
     * The InlineResponse2005Message model constructor.
     * @property {module:model/InlineResponse2005Message}
     */
    InlineResponse2005Message: InlineResponse2005Message,
    /**
     * The InlineResponse2005MessageHeader model constructor.
     * @property {module:model/InlineResponse2005MessageHeader}
     */
    InlineResponse2005MessageHeader: InlineResponse2005MessageHeader,
    /**
     * The InlineResponse2006 model constructor.
     * @property {module:model/InlineResponse2006}
     */
    InlineResponse2006: InlineResponse2006,
    /**
     * The InlineResponse2006Message model constructor.
     * @property {module:model/InlineResponse2006Message}
     */
    InlineResponse2006Message: InlineResponse2006Message,
    /**
     * The InlineResponse2006MessageBody model constructor.
     * @property {module:model/InlineResponse2006MessageBody}
     */
    InlineResponse2006MessageBody: InlineResponse2006MessageBody,
    /**
     * The InlineResponse2006MessageBodyTrackList model constructor.
     * @property {module:model/InlineResponse2006MessageBodyTrackList}
     */
    InlineResponse2006MessageBodyTrackList: InlineResponse2006MessageBodyTrackList,
    /**
     * The InlineResponse2007 model constructor.
     * @property {module:model/InlineResponse2007}
     */
    InlineResponse2007: InlineResponse2007,
    /**
     * The InlineResponse2007Message model constructor.
     * @property {module:model/InlineResponse2007Message}
     */
    InlineResponse2007Message: InlineResponse2007Message,
    /**
     * The InlineResponse2007MessageBody model constructor.
     * @property {module:model/InlineResponse2007MessageBody}
     */
    InlineResponse2007MessageBody: InlineResponse2007MessageBody,
    /**
     * The InlineResponse2008 model constructor.
     * @property {module:model/InlineResponse2008}
     */
    InlineResponse2008: InlineResponse2008,
    /**
     * The InlineResponse2008Message model constructor.
     * @property {module:model/InlineResponse2008Message}
     */
    InlineResponse2008Message: InlineResponse2008Message,
    /**
     * The InlineResponse2008MessageBody model constructor.
     * @property {module:model/InlineResponse2008MessageBody}
     */
    InlineResponse2008MessageBody: InlineResponse2008MessageBody,
    /**
     * The InlineResponse2009 model constructor.
     * @property {module:model/InlineResponse2009}
     */
    InlineResponse2009: InlineResponse2009,
    /**
     * The InlineResponse2009Message model constructor.
     * @property {module:model/InlineResponse2009Message}
     */
    InlineResponse2009Message: InlineResponse2009Message,
    /**
     * The InlineResponse200Message model constructor.
     * @property {module:model/InlineResponse200Message}
     */
    InlineResponse200Message: InlineResponse200Message,
    /**
     * The InlineResponse200MessageBody model constructor.
     * @property {module:model/InlineResponse200MessageBody}
     */
    InlineResponse200MessageBody: InlineResponse200MessageBody,
    /**
     * The InlineResponse200MessageHeader model constructor.
     * @property {module:model/InlineResponse200MessageHeader}
     */
    InlineResponse200MessageHeader: InlineResponse200MessageHeader,
    /**
     * The Lyrics model constructor.
     * @property {module:model/Lyrics}
     */
    Lyrics: Lyrics,
    /**
     * The Snippet model constructor.
     * @property {module:model/Snippet}
     */
    Snippet: Snippet,
    /**
     * The Subtitle model constructor.
     * @property {module:model/Subtitle}
     */
    Subtitle: Subtitle,
    /**
     * The Track model constructor.
     * @property {module:model/Track}
     */
    Track: Track,
    /**
     * The TrackPrimaryGenres model constructor.
     * @property {module:model/TrackPrimaryGenres}
     */
    TrackPrimaryGenres: TrackPrimaryGenres,
    /**
     * The TrackPrimaryGenresMusicGenre model constructor.
     * @property {module:model/TrackPrimaryGenresMusicGenre}
     */
    TrackPrimaryGenresMusicGenre: TrackPrimaryGenresMusicGenre,
    /**
     * The TrackPrimaryGenresMusicGenreList model constructor.
     * @property {module:model/TrackPrimaryGenresMusicGenreList}
     */
    TrackPrimaryGenresMusicGenreList: TrackPrimaryGenresMusicGenreList,
    /**
     * The TrackSecondaryGenres model constructor.
     * @property {module:model/TrackSecondaryGenres}
     */
    TrackSecondaryGenres: TrackSecondaryGenres,
    /**
     * The TrackSecondaryGenresMusicGenre model constructor.
     * @property {module:model/TrackSecondaryGenresMusicGenre}
     */
    TrackSecondaryGenresMusicGenre: TrackSecondaryGenresMusicGenre,
    /**
     * The TrackSecondaryGenresMusicGenreList model constructor.
     * @property {module:model/TrackSecondaryGenresMusicGenreList}
     */
    TrackSecondaryGenresMusicGenreList: TrackSecondaryGenresMusicGenreList,
    /**
     * The AlbumApi service constructor.
     * @property {module:api/AlbumApi}
     */
    AlbumApi: AlbumApi,
    /**
     * The ArtistApi service constructor.
     * @property {module:api/ArtistApi}
     */
    ArtistApi: ArtistApi,
    /**
     * The LyricsApi service constructor.
     * @property {module:api/LyricsApi}
     */
    LyricsApi: LyricsApi,
    /**
     * The SnippetApi service constructor.
     * @property {module:api/SnippetApi}
     */
    SnippetApi: SnippetApi,
    /**
     * The SubtitleApi service constructor.
     * @property {module:api/SubtitleApi}
     */
    SubtitleApi: SubtitleApi,
    /**
     * The TrackApi service constructor.
     * @property {module:api/TrackApi}
     */
    TrackApi: TrackApi
  };

  return exports;
}));

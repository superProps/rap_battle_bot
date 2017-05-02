# MusixmatchApi.TrackApi

All URIs are relative to *https://api.musixmatch.com/ws/1.1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**albumTracksGetGet**](TrackApi.md#albumTracksGetGet) | **GET** /album.tracks.get | 
[**chartTracksGetGet**](TrackApi.md#chartTracksGetGet) | **GET** /chart.tracks.get | 
[**matcherTrackGetGet**](TrackApi.md#matcherTrackGetGet) | **GET** /matcher.track.get | 
[**trackGetGet**](TrackApi.md#trackGetGet) | **GET** /track.get | 
[**trackSearchGet**](TrackApi.md#trackSearchGet) | **GET** /track.search | 


<a name="albumTracksGetGet"></a>
# **albumTracksGetGet**
> InlineResponse2001 albumTracksGetGet(albumId, opts)





### Example
```javascript
var MusixmatchApi = require('musixmatch_api');
var defaultClient = MusixmatchApi.ApiClient.default;

// Configure API key authorization: key
var key = defaultClient.authentications['key'];
key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//key.apiKeyPrefix = 'Token';

var apiInstance = new MusixmatchApi.TrackApi();

var albumId = "albumId_example"; // String | The musiXmatch album id

var opts = { 
  'format': "json", // String | output format: json, jsonp, xml.
  'callback': "callback_example", // String | jsonp callback
  'fHasLyrics': "fHasLyrics_example", // String | When set, filter only contents with lyrics
  'page': 3.4, // Number | Define the page number for paginated results
  'pageSize': 3.4 // Number | Define the page size for paginated results.Range is 1 to 100.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.albumTracksGetGet(albumId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **albumId** | **String**| The musiXmatch album id | 
 **format** | **String**| output format: json, jsonp, xml. | [optional] [default to json]
 **callback** | **String**| jsonp callback | [optional] 
 **fHasLyrics** | **String**| When set, filter only contents with lyrics | [optional] 
 **page** | **Number**| Define the page number for paginated results | [optional] 
 **pageSize** | **Number**| Define the page size for paginated results.Range is 1 to 100. | [optional] 

### Return type

[**InlineResponse2001**](InlineResponse2001.md)

### Authorization

[key](../README.md#key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="chartTracksGetGet"></a>
# **chartTracksGetGet**
> InlineResponse2006 chartTracksGetGet(opts)





### Example
```javascript
var MusixmatchApi = require('musixmatch_api');
var defaultClient = MusixmatchApi.ApiClient.default;

// Configure API key authorization: key
var key = defaultClient.authentications['key'];
key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//key.apiKeyPrefix = 'Token';

var apiInstance = new MusixmatchApi.TrackApi();

var opts = { 
  'format': "json", // String | output format: json, jsonp, xml.
  'callback': "callback_example", // String | jsonp callback
  'page': 3.4, // Number | Define the page number for paginated results
  'pageSize': 3.4, // Number | Define the page size for paginated results.Range is 1 to 100.
  'country': "us", // String | A valid ISO 3166 country code
  'fHasLyrics': "fHasLyrics_example" // String | When set, filter only contents with lyrics
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.chartTracksGetGet(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **format** | **String**| output format: json, jsonp, xml. | [optional] [default to json]
 **callback** | **String**| jsonp callback | [optional] 
 **page** | **Number**| Define the page number for paginated results | [optional] 
 **pageSize** | **Number**| Define the page size for paginated results.Range is 1 to 100. | [optional] 
 **country** | **String**| A valid ISO 3166 country code | [optional] [default to us]
 **fHasLyrics** | **String**| When set, filter only contents with lyrics | [optional] 

### Return type

[**InlineResponse2006**](InlineResponse2006.md)

### Authorization

[key](../README.md#key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="matcherTrackGetGet"></a>
# **matcherTrackGetGet**
> InlineResponse2009 matcherTrackGetGet(opts)





### Example
```javascript
var MusixmatchApi = require('musixmatch_api');
var defaultClient = MusixmatchApi.ApiClient.default;

// Configure API key authorization: key
var key = defaultClient.authentications['key'];
key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//key.apiKeyPrefix = 'Token';

var apiInstance = new MusixmatchApi.TrackApi();

var opts = { 
  'format': "json", // String | output format: json, jsonp, xml.
  'callback': "callback_example", // String | jsonp callback
  'qArtist': "qArtist_example", // String | The song artist
  'qTrack': "qTrack_example", // String | The song title
  'fHasLyrics': 3.4, // Number | When set, filter only contents with lyrics
  'fHasSubtitle': 3.4 // Number | When set, filter only contents with subtitles
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.matcherTrackGetGet(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **format** | **String**| output format: json, jsonp, xml. | [optional] [default to json]
 **callback** | **String**| jsonp callback | [optional] 
 **qArtist** | **String**| The song artist | [optional] 
 **qTrack** | **String**| The song title | [optional] 
 **fHasLyrics** | **Number**| When set, filter only contents with lyrics | [optional] 
 **fHasSubtitle** | **Number**| When set, filter only contents with subtitles | [optional] 

### Return type

[**InlineResponse2009**](InlineResponse2009.md)

### Authorization

[key](../README.md#key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="trackGetGet"></a>
# **trackGetGet**
> InlineResponse2009 trackGetGet(trackId, opts)





### Example
```javascript
var MusixmatchApi = require('musixmatch_api');
var defaultClient = MusixmatchApi.ApiClient.default;

// Configure API key authorization: key
var key = defaultClient.authentications['key'];
key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//key.apiKeyPrefix = 'Token';

var apiInstance = new MusixmatchApi.TrackApi();

var trackId = "trackId_example"; // String | The musiXmatch track id

var opts = { 
  'format': "json", // String | output format: json, jsonp, xml.
  'callback': "callback_example" // String | jsonp callback
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.trackGetGet(trackId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **trackId** | **String**| The musiXmatch track id | 
 **format** | **String**| output format: json, jsonp, xml. | [optional] [default to json]
 **callback** | **String**| jsonp callback | [optional] 

### Return type

[**InlineResponse2009**](InlineResponse2009.md)

### Authorization

[key](../README.md#key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="trackSearchGet"></a>
# **trackSearchGet**
> InlineResponse2006 trackSearchGet(opts)





### Example
```javascript
var MusixmatchApi = require('musixmatch_api');
var defaultClient = MusixmatchApi.ApiClient.default;

// Configure API key authorization: key
var key = defaultClient.authentications['key'];
key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//key.apiKeyPrefix = 'Token';

var apiInstance = new MusixmatchApi.TrackApi();

var opts = { 
  'format': "json", // String | output format: json, jsonp, xml.
  'callback': "callback_example", // String | jsonp callback
  'qTrack': "qTrack_example", // String | The song title
  'qArtist': "qArtist_example", // String | The song artist
  'qLyrics': "qLyrics_example", // String | Any word in the lyrics
  'fArtistId': 3.4, // Number | When set, filter by this artist id
  'fMusicGenreId': 3.4, // Number | When set, filter by this music category id
  'fLyricsLanguage': 3.4, // Number | Filter by the lyrics language (en,it,..)
  'fHasLyrics': 3.4, // Number | When set, filter only contents with lyrics
  'sArtistRating': "sArtistRating_example", // String | Sort by our popularity index for artists (asc|desc)
  'sTrackRating': "sTrackRating_example", // String | Sort by our popularity index for tracks (asc|desc)
  'quorumFactor': 1, // Number | Search only a part of the given query string.Allowed range is (0.1 – 0.9)
  'pageSize': 3.4, // Number | Define the page size for paginated results.Range is 1 to 100.
  'page': 3.4 // Number | Define the page number for paginated results
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.trackSearchGet(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **format** | **String**| output format: json, jsonp, xml. | [optional] [default to json]
 **callback** | **String**| jsonp callback | [optional] 
 **qTrack** | **String**| The song title | [optional] 
 **qArtist** | **String**| The song artist | [optional] 
 **qLyrics** | **String**| Any word in the lyrics | [optional] 
 **fArtistId** | **Number**| When set, filter by this artist id | [optional] 
 **fMusicGenreId** | **Number**| When set, filter by this music category id | [optional] 
 **fLyricsLanguage** | **Number**| Filter by the lyrics language (en,it,..) | [optional] 
 **fHasLyrics** | **Number**| When set, filter only contents with lyrics | [optional] 
 **sArtistRating** | **String**| Sort by our popularity index for artists (asc|desc) | [optional] 
 **sTrackRating** | **String**| Sort by our popularity index for tracks (asc|desc) | [optional] 
 **quorumFactor** | **Number**| Search only a part of the given query string.Allowed range is (0.1 – 0.9) | [optional] [default to 1]
 **pageSize** | **Number**| Define the page size for paginated results.Range is 1 to 100. | [optional] 
 **page** | **Number**| Define the page number for paginated results | [optional] 

### Return type

[**InlineResponse2006**](InlineResponse2006.md)

### Authorization

[key](../README.md#key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


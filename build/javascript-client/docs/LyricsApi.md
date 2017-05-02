# MusixmatchApi.LyricsApi

All URIs are relative to *https://api.musixmatch.com/ws/1.1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**matcherLyricsGetGet**](LyricsApi.md#matcherLyricsGetGet) | **GET** /matcher.lyrics.get | 
[**trackLyricsGetGet**](LyricsApi.md#trackLyricsGetGet) | **GET** /track.lyrics.get | 


<a name="matcherLyricsGetGet"></a>
# **matcherLyricsGetGet**
> InlineResponse2007 matcherLyricsGetGet(opts)





### Example
```javascript
var MusixmatchApi = require('musixmatch_api');
var defaultClient = MusixmatchApi.ApiClient.default;

// Configure API key authorization: key
var key = defaultClient.authentications['key'];
key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//key.apiKeyPrefix = 'Token';

var apiInstance = new MusixmatchApi.LyricsApi();

var opts = { 
  'format': "json", // String | output format: json, jsonp, xml.
  'callback': "callback_example", // String | jsonp callback
  'qTrack': "qTrack_example", // String | The song title
  'qArtist': "qArtist_example" // String | The song artist
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.matcherLyricsGetGet(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **format** | **String**| output format: json, jsonp, xml. | [optional] [default to json]
 **callback** | **String**| jsonp callback | [optional] 
 **qTrack** | **String**| The song title | [optional] 
 **qArtist** | **String**| The song artist | [optional] 

### Return type

[**InlineResponse2007**](InlineResponse2007.md)

### Authorization

[key](../README.md#key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="trackLyricsGetGet"></a>
# **trackLyricsGetGet**
> InlineResponse2007 trackLyricsGetGet(trackId, opts)





### Example
```javascript
var MusixmatchApi = require('musixmatch_api');
var defaultClient = MusixmatchApi.ApiClient.default;

// Configure API key authorization: key
var key = defaultClient.authentications['key'];
key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//key.apiKeyPrefix = 'Token';

var apiInstance = new MusixmatchApi.LyricsApi();

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
apiInstance.trackLyricsGetGet(trackId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **trackId** | **String**| The musiXmatch track id | 
 **format** | **String**| output format: json, jsonp, xml. | [optional] [default to json]
 **callback** | **String**| jsonp callback | [optional] 

### Return type

[**InlineResponse2007**](InlineResponse2007.md)

### Authorization

[key](../README.md#key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


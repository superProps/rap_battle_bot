# MusixmatchApi.SubtitleApi

All URIs are relative to *https://api.musixmatch.com/ws/1.1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**matcherSubtitleGetGet**](SubtitleApi.md#matcherSubtitleGetGet) | **GET** /matcher.subtitle.get | 
[**trackSubtitleGetGet**](SubtitleApi.md#trackSubtitleGetGet) | **GET** /track.subtitle.get | 


<a name="matcherSubtitleGetGet"></a>
# **matcherSubtitleGetGet**
> InlineResponse2008 matcherSubtitleGetGet(opts)





### Example
```javascript
var MusixmatchApi = require('musixmatch_api');
var defaultClient = MusixmatchApi.ApiClient.default;

// Configure API key authorization: key
var key = defaultClient.authentications['key'];
key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//key.apiKeyPrefix = 'Token';

var apiInstance = new MusixmatchApi.SubtitleApi();

var opts = { 
  'format': "json", // String | output format: json, jsonp, xml.
  'callback': "callback_example", // String | jsonp callback
  'qTrack': "qTrack_example", // String | The song title
  'qArtist': "qArtist_example", // String |  The song artist
  'fSubtitleLength': 3.4, // Number | Filter by subtitle length in seconds
  'fSubtitleLengthMaxDeviation': 3.4 // Number | Max deviation for a subtitle length in seconds
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.matcherSubtitleGetGet(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **format** | **String**| output format: json, jsonp, xml. | [optional] [default to json]
 **callback** | **String**| jsonp callback | [optional] 
 **qTrack** | **String**| The song title | [optional] 
 **qArtist** | **String**|  The song artist | [optional] 
 **fSubtitleLength** | **Number**| Filter by subtitle length in seconds | [optional] 
 **fSubtitleLengthMaxDeviation** | **Number**| Max deviation for a subtitle length in seconds | [optional] 

### Return type

[**InlineResponse2008**](InlineResponse2008.md)

### Authorization

[key](../README.md#key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="trackSubtitleGetGet"></a>
# **trackSubtitleGetGet**
> InlineResponse2008 trackSubtitleGetGet(trackId, opts)





### Example
```javascript
var MusixmatchApi = require('musixmatch_api');
var defaultClient = MusixmatchApi.ApiClient.default;

// Configure API key authorization: key
var key = defaultClient.authentications['key'];
key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//key.apiKeyPrefix = 'Token';

var apiInstance = new MusixmatchApi.SubtitleApi();

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
apiInstance.trackSubtitleGetGet(trackId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **trackId** | **String**| The musiXmatch track id | 
 **format** | **String**| output format: json, jsonp, xml. | [optional] [default to json]
 **callback** | **String**| jsonp callback | [optional] 

### Return type

[**InlineResponse2008**](InlineResponse2008.md)

### Authorization

[key](../README.md#key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


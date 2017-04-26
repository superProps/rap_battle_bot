# MusixmatchApi.SnippetApi

All URIs are relative to *https://api.musixmatch.com/ws/1.1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**trackSnippetGetGet**](SnippetApi.md#trackSnippetGetGet) | **GET** /track.snippet.get | 


<a name="trackSnippetGetGet"></a>
# **trackSnippetGetGet**
> InlineResponse20010 trackSnippetGetGet(trackId, opts)





### Example
```javascript
var MusixmatchApi = require('musixmatch_api');
var defaultClient = MusixmatchApi.ApiClient.default;

// Configure API key authorization: key
var key = defaultClient.authentications['key'];
key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//key.apiKeyPrefix = 'Token';

var apiInstance = new MusixmatchApi.SnippetApi();

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
apiInstance.trackSnippetGetGet(trackId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **trackId** | **String**| The musiXmatch track id | 
 **format** | **String**| output format: json, jsonp, xml. | [optional] [default to json]
 **callback** | **String**| jsonp callback | [optional] 

### Return type

[**InlineResponse20010**](InlineResponse20010.md)

### Authorization

[key](../README.md#key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


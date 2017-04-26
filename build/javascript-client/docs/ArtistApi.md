# MusixmatchApi.ArtistApi

All URIs are relative to *https://api.musixmatch.com/ws/1.1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**artistGetGet**](ArtistApi.md#artistGetGet) | **GET** /artist.get | 
[**artistRelatedGetGet**](ArtistApi.md#artistRelatedGetGet) | **GET** /artist.related.get | 
[**artistSearchGet**](ArtistApi.md#artistSearchGet) | **GET** /artist.search | 
[**chartArtistsGetGet**](ArtistApi.md#chartArtistsGetGet) | **GET** /chart.artists.get | 


<a name="artistGetGet"></a>
# **artistGetGet**
> InlineResponse2003 artistGetGet(artistId, opts)





### Example
```javascript
var MusixmatchApi = require('musixmatch_api');
var defaultClient = MusixmatchApi.ApiClient.default;

// Configure API key authorization: key
var key = defaultClient.authentications['key'];
key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//key.apiKeyPrefix = 'Token';

var apiInstance = new MusixmatchApi.ArtistApi();

var artistId = "artistId_example"; // String |  The musiXmatch artist id

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
apiInstance.artistGetGet(artistId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **artistId** | **String**|  The musiXmatch artist id | 
 **format** | **String**| output format: json, jsonp, xml. | [optional] [default to json]
 **callback** | **String**| jsonp callback | [optional] 

### Return type

[**InlineResponse2003**](InlineResponse2003.md)

### Authorization

[key](../README.md#key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="artistRelatedGetGet"></a>
# **artistRelatedGetGet**
> InlineResponse2004 artistRelatedGetGet(artistId, opts)





### Example
```javascript
var MusixmatchApi = require('musixmatch_api');
var defaultClient = MusixmatchApi.ApiClient.default;

// Configure API key authorization: key
var key = defaultClient.authentications['key'];
key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//key.apiKeyPrefix = 'Token';

var apiInstance = new MusixmatchApi.ArtistApi();

var artistId = "artistId_example"; // String | The musiXmatch artist id

var opts = { 
  'format': "json", // String | output format: json, jsonp, xml.
  'callback': "callback_example", // String | jsonp callback
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
apiInstance.artistRelatedGetGet(artistId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **artistId** | **String**| The musiXmatch artist id | 
 **format** | **String**| output format: json, jsonp, xml. | [optional] [default to json]
 **callback** | **String**| jsonp callback | [optional] 
 **pageSize** | **Number**| Define the page size for paginated results.Range is 1 to 100. | [optional] 
 **page** | **Number**| Define the page number for paginated results | [optional] 

### Return type

[**InlineResponse2004**](InlineResponse2004.md)

### Authorization

[key](../README.md#key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="artistSearchGet"></a>
# **artistSearchGet**
> InlineResponse2004 artistSearchGet(opts)





### Example
```javascript
var MusixmatchApi = require('musixmatch_api');
var defaultClient = MusixmatchApi.ApiClient.default;

// Configure API key authorization: key
var key = defaultClient.authentications['key'];
key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//key.apiKeyPrefix = 'Token';

var apiInstance = new MusixmatchApi.ArtistApi();

var opts = { 
  'format': "json", // String | output format: json, jsonp, xml.
  'callback': "callback_example", // String | jsonp callback
  'qArtist': "qArtist_example", // String | The song artist
  'fArtistId': 3.4, // Number | When set, filter by this artist id
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
apiInstance.artistSearchGet(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **format** | **String**| output format: json, jsonp, xml. | [optional] [default to json]
 **callback** | **String**| jsonp callback | [optional] 
 **qArtist** | **String**| The song artist | [optional] 
 **fArtistId** | **Number**| When set, filter by this artist id | [optional] 
 **page** | **Number**| Define the page number for paginated results | [optional] 
 **pageSize** | **Number**| Define the page size for paginated results.Range is 1 to 100. | [optional] 

### Return type

[**InlineResponse2004**](InlineResponse2004.md)

### Authorization

[key](../README.md#key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="chartArtistsGetGet"></a>
# **chartArtistsGetGet**
> InlineResponse2005 chartArtistsGetGet(opts)





### Example
```javascript
var MusixmatchApi = require('musixmatch_api');
var defaultClient = MusixmatchApi.ApiClient.default;

// Configure API key authorization: key
var key = defaultClient.authentications['key'];
key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//key.apiKeyPrefix = 'Token';

var apiInstance = new MusixmatchApi.ArtistApi();

var opts = { 
  'format': "json", // String | output format: json, jsonp, xml.
  'callback': "callback_example", // String | jsonp callback
  'page': 3.4, // Number | Define the page number for paginated results
  'pageSize': 3.4, // Number | Define the page size for paginated results.Range is 1 to 100.
  'country': "us" // String | A valid ISO 3166 country code
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.chartArtistsGetGet(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **format** | **String**| output format: json, jsonp, xml. | [optional] [default to json]
 **callback** | **String**| jsonp callback | [optional] 
 **page** | **Number**| Define the page number for paginated results | [optional] 
 **pageSize** | **Number**| Define the page size for paginated results.Range is 1 to 100. | [optional] 
 **country** | **String**| A valid ISO 3166 country code | [optional] [default to us]

### Return type

[**InlineResponse2005**](InlineResponse2005.md)

### Authorization

[key](../README.md#key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


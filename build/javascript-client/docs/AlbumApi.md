# MusixmatchApi.AlbumApi

All URIs are relative to *https://api.musixmatch.com/ws/1.1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**albumGetGet**](AlbumApi.md#albumGetGet) | **GET** /album.get | 
[**artistAlbumsGetGet**](AlbumApi.md#artistAlbumsGetGet) | **GET** /artist.albums.get | 


<a name="albumGetGet"></a>
# **albumGetGet**
> InlineResponse200 albumGetGet(albumId, opts)





### Example
```javascript
var MusixmatchApi = require('musixmatch_api');
var defaultClient = MusixmatchApi.ApiClient.default;

// Configure API key authorization: key
var key = defaultClient.authentications['key'];
key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//key.apiKeyPrefix = 'Token';

var apiInstance = new MusixmatchApi.AlbumApi();

var albumId = "albumId_example"; // String | The musiXmatch album id

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
apiInstance.albumGetGet(albumId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **albumId** | **String**| The musiXmatch album id | 
 **format** | **String**| output format: json, jsonp, xml. | [optional] [default to json]
 **callback** | **String**| jsonp callback | [optional] 

### Return type

[**InlineResponse200**](InlineResponse200.md)

### Authorization

[key](../README.md#key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="artistAlbumsGetGet"></a>
# **artistAlbumsGetGet**
> InlineResponse2002 artistAlbumsGetGet(artistId, opts)





### Example
```javascript
var MusixmatchApi = require('musixmatch_api');
var defaultClient = MusixmatchApi.ApiClient.default;

// Configure API key authorization: key
var key = defaultClient.authentications['key'];
key.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//key.apiKeyPrefix = 'Token';

var apiInstance = new MusixmatchApi.AlbumApi();

var artistId = "artistId_example"; // String | The musiXmatch artist id

var opts = { 
  'format': "json", // String | output format: json, jsonp, xml.
  'callback': "callback_example", // String | jsonp callback
  'sReleaseDate': "sReleaseDate_example", // String | Sort by release date (asc|desc)
  'gAlbumName': "gAlbumName_example", // String | Group by Album Name
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
apiInstance.artistAlbumsGetGet(artistId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **artistId** | **String**| The musiXmatch artist id | 
 **format** | **String**| output format: json, jsonp, xml. | [optional] [default to json]
 **callback** | **String**| jsonp callback | [optional] 
 **sReleaseDate** | **String**| Sort by release date (asc|desc) | [optional] 
 **gAlbumName** | **String**| Group by Album Name | [optional] 
 **pageSize** | **Number**| Define the page size for paginated results.Range is 1 to 100. | [optional] 
 **page** | **Number**| Define the page number for paginated results | [optional] 

### Return type

[**InlineResponse2002**](InlineResponse2002.md)

### Authorization

[key](../README.md#key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


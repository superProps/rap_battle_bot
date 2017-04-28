var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LyricsSchema = new Schema({
  raw: String,
  keywords: Array,
  artist: String,
  lastWord: String,
  syllables: Number,
  rhymes: Array,
  majorPhonemes: Array,
  numberOfPhonemes: Number
});

module.exports = mongoose.model('lyrics', LyricsSchema);
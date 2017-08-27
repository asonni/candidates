var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Elections = new Schema({
  name: { type: String}
});

Elections.plugin(timestamps);
Elections.index({ name: 'text'});
exports.Elections = mongoose.model('Elections', Elections);
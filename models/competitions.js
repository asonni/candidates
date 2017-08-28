var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Competition = new Schema({
  name: { type: String},
  election :{type: Schema.Types.ObjectId , ref: 'Election'}
});

Competition.plugin(timestamps);
Competition.index({ attachment: 'text'});
exports.Competition = mongoose.model('Competition', Competition);
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Attachment = new Schema({
  name: { type: String},
  election :{type: Schema.Types.ObjectId , ref: 'Election'}
});

Attachment.plugin(timestamps);
Attachment.index({ name: 'text'});
exports.Attachment = mongoose.model('Attachment', Attachment);
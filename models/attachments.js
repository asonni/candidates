var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Attachment = new Schema({
  attachment: { type: String},
  election :{type: Schema.Types.ObjectId , ref: 'Election'}
});

Attachment.plugin(timestamps);
Attachment.index({ attachment: 'text'});
exports.Attachment = mongoose.model('Attachment', Attachment);
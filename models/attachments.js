const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const Attachment = new Schema({
  name: { type: String },
  election: { type: Schema.Types.ObjectId, ref: 'Election' },
  status: {type: Number, default:1}
});

Attachment.plugin(timestamps);
Attachment.index({ name: 'text' });
exports.Attachment = mongoose.model('Attachment', Attachment);

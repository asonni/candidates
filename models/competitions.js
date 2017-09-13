const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const Competition = new Schema({
  name: { type: String },
  election: { type: Schema.Types.ObjectId, ref: 'Election' }
});

Competition.plugin(timestamps);
Competition.index({ name: 'text' });
exports.Competition = mongoose.model('Competition', Competition);

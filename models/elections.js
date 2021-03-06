const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const Elections = new Schema({
  name: { type: String },
  status: {type: Number, default:1}
});

Elections.plugin(timestamps);
Elections.index({ name: 'text' });
exports.Elections = mongoose.model('Elections', Elections);

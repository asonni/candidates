const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const Subconstituency = new Schema({
  subconstituency_id :{type : Number},
  name_ar: { type: String },
  name_en: { type: String },
  office: { type: Schema.Types.ObjectId, ref: 'Office' },
  status: {type: Number, default:1}
});

Subconstituency.plugin(timestamps);
Subconstituency.index({ name_ar: 'text' });
exports.Subconstituency = mongoose.model('Subconstituency', Subconstituency);

const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const Center = new Schema({
  center_id : {type :Number},
  name_ar: { type: String },
  office: { type: Schema.Types.ObjectId, ref: 'Office' },
  subconstituency :{ type: Schema.Types.ObjectId, ref: 'Subconstituency' },
  status: {type: Number, default:1}
});

Center.plugin(timestamps);
Center.index({ name_ar: 'text' });
exports.Centers = mongoose.model('Center', Center);

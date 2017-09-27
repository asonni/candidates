const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const Candidates = new Schema({
  nid: { type: String, index: true },
  cra: { type: String },
  f_name: { type: String },
  p_name: { type: String },
  g_name: { type: String },
  l_name: { type: String },
  gender: { type: Number },
  birth_day: { type: Date },
  mother_name: { type: String },
  phone: { type: String },
  work_phone: { type: String },
  email: { type: String, unique: true, required: true },
  qualification: { type: String },
  specialty: { type: String },
  account_number: { type: String },
  office: { type: Schema.Types.ObjectId, ref: 'Office' },
  subconstituency :{ type: Schema.Types.ObjectId, ref: 'Subconstituency' },
  center :{ type: Schema.Types.ObjectId, ref: 'Center' },
  attachment: [{type: Schema.Types.ObjectId, ref: 'Attachment' }],
  competition: { type: Schema.Types.ObjectId, ref: 'Competition' },
  status: {type: Number, default:1}
});

Candidates.plugin(timestamps);
Candidates.index({ f_name: 'text' });
exports.Candidates = mongoose.model('Candidates', Candidates);

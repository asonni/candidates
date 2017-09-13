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
  qualification: { type: Number },
  specialty: { type: String },
  account_number: { type: String },
  office: { type: Number },
  election: [{ type: Schema.Types.ObjectId, ref: 'Election' }],
  competition: { type: Schema.Types.ObjectId, ref: 'Competition' }
});

Candidates.plugin(timestamps);
Candidates.index({ f_name: 'text' });
exports.Candidates = mongoose.model('Candidates', Candidates);

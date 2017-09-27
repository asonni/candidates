const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const Office = new Schema({
  office_id : {type : Number},
  name_ar: { type: String },
  name_en: { type: String },
  status: {type: Number, default:1}
});

Office.plugin(timestamps);
Office.index({ name_ar: 'text' });
exports.Office = mongoose.model('Office', Office);

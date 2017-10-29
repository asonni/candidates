const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const Log = new Schema({
  user_iduser: { type: Schema.Types.ObjectId, ref: 'User' },
  office: { type: Schema.Types.ObjectId, ref: 'Office' },
  election: { type: Schema.Types.ObjectId, ref: 'Election' },
  type : { type: String },
  table :{ type: String },
  desc :{type: String},
  table_idtable :{type : String},
  value :{type: String},
  status: {type: Number, default:1}
});

Log.plugin(timestamps);
exports.Log = mongoose.model('Log', Log);

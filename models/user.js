var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var User = new Schema({
   name: { type: String, index: true, default: "Unknown user"},
   password: { type: String, required: true},
   salt: String,
   email: { type: String, unique : true, required : true},
   phone: {
      type: String,
      default:"NULL"
   },
   office: { type: Number},
   level: { type: Number, default:1},
   status: {type: Number, default:1}
});

User.plugin(timestamps);
User.index({ name: 'text'});
exports.User = mongoose.model('User', User);
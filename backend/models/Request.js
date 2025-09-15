const mongoose = require('mongoose');
const requestSchema = new mongoose.Schema({
  userId: String,
  appId: String,
  status: String
});
module.exports = mongoose.model('Request', requestSchema);

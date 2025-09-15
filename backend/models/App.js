const mongoose = require('mongoose');
const appSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  status: String
});
module.exports = mongoose.model('App', appSchema);

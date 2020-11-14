const mongoose = require("../connection");

const restaurantSchema = new mongoose.Schema({
  restaurant_key: String,
  templateLink: String,
  templateImg: String,
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
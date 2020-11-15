const mongoose = require("../connection");

const orderSchema = new mongoose.Schema({
  id:  Number,
  accepted_at: String,
  updated_at: String,
  restaurant_id: Number,
  company_account_id: Number,
  restaurant_name: String,
  restaurant_key: String,
  restaurant_token: String,
  currency: String,
  client_id: Number,
  client_first_name: String,
  client_last_name: String,
  client_email: String,
  client_marketing_consent: Boolean,
  total_price: Number,
  sub_total_price: Number,
  tax_value: Number,
  client_last_name: String,
  items: [
    {
      id: Number,
      name: String,
      total_item_price: Number,
      price: Number,
      quantity: Number,
      options: [
        {
          id: Number,
          name: String,
          group_name: String,
          type_id: Number,
          quantity: Number,
          price: Number
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Order', orderSchema);
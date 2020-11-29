const Order = require("../schemas/order");

function OrderRepository() {
  return {
    async create(order) {
      const newOrder = new Order(order);
      newOrder.save(function (err) {
        if (err) {
          console.log(err);
        }
      });
      return newOrder;
    },
    async findByOrderId(id) {
      return await Order.findOne({ id }).exec();
    },
    async findByRestaurantKey(key) {
      return await Order.find({ restaurant_key: key }).exec();
    },
    async findByRestaurantKeyAndDate(key, startDate, endDate) {
      return await Order.find({
        restaurant_key: key,
        $and: [
          { accepted_at: { $gte: startDate } },
          { accepted_at: { $lte: endDate } },
        ],
      }).exec();
    },
  };
}

module.exports = OrderRepository;

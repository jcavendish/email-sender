const Order = require("../schemas/order");

function OrderRepository() {
  return {
    async create(order) {
      const newOrder = new Order(order)
      newOrder.save(function (err) {
        if (err) {
          console.log(err);
        }
      });
      return newOrder;
    },
    async findByOrderId(id) {
      return await Order.findOne({id}).exec();
    }
  }
}

module.exports = OrderRepository;
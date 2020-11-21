const orderRepository = require("../repositories/OrderRepository");

module.exports = {
  async index(request, response) {
    const { key } = request.params;
    try {
      const orders = await orderRepository().findByRestaurantKey(key);
      response.send(orders);
    } catch (err) {
      console.log(err);
      response.status(400).send("Error fetching orders for this restaurant");
    }
  }
}
const orderRepository = require("../repositories/OrderRepository");
const restaurantRepository = require("../repositories/RestaurantRepository");

function CreateOrderService() {
  return {
    async execute(order) {

      const findRestaurant = await restaurantRepository().findByRestaurantKey(order.restaurant_key);

      if (!findRestaurant) {
        throw new Error("Restaurant does not exist");
      }

      const findOrder = await orderRepository().findByOrderId(order.id);

      if (findOrder) {
        throw new Error("Order already placed");
      }

      return await orderRepository().create(order);
    }
  }
}

module.exports = CreateOrderService;
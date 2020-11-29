const restaurantRepository = require("../repositories/RestaurantRepository");
const orderRepository = require("../repositories/OrderRepository");

module.exports = {
  async create(request, response) {
    try {
      const restaurant = await restaurantRepository().create(request.body);

      return response.send(
        `<p>Restaurant with key: ${restaurant.restaurant_key} successfuly added.</p>`
      );
    } catch (err) {
      console.log(err);
      return response.status(400).send("An error occurred");
    }
  },
  async find(request, response) {
    const { restaurantKey } = request.params;
    try {
      const orders = await orderRepository().findByRestaurantKey(restaurantKey);

      return response.send({
        name: orders[0] ? orders[0].restaurant_name : "",
      });
    } catch (err) {
      console.log(err);
      return response.status(400).send("An error occurred");
    }
  },
};

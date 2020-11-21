const restaurantRepository = require("../repositories/RestaurantRepository");

module.exports = {
  async create(request, response) {
    try {
      const restaurant = await restaurantRepository().create(request.body);

      response.send(`<p>Restaurant with key: ${restaurant.restaurant_key} successfuly added.</p>`);
    } catch (err) {
      console.log(err);
      response.status(400).send(`<p>An error occurred</p>`);
    }
  }
}
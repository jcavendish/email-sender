const Restaurant = require("../schemas/restaurant");

function RestaurantRepository() {
  return {
    async create(restaurant) {
      const findRestaurant = await this.findByRestaurantKey(restaurant.restaurant_key);

      if (findRestaurant) {
        throw new Error("The restaurant already exists");
      }

      const newRestaurant = new Restaurant(restaurant)
      newRestaurant.save(function (err) {
        if (err) {
          console.log(err);
        }
      });

      return newRestaurant;
    },
    async findByRestaurantKey(key) {
      return await Restaurant.findOne({ restaurant_key: key }).exec();
    }
  }
}

module.exports = RestaurantRepository;
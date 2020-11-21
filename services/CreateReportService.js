const csvProvider = require("../providers/CsvProvider");
const orderRepository = require("../repositories/OrderRepository");

function createOrderService() {
  return {
    async execute(restaurantKey) {
      const orders = await orderRepository().findByRestaurantKey(restaurantKey);

      const parsedOrders = orders.items.map(item => {
        return {
          ...item,
          options: item.options.reduce((prev, curr) => `- ${prev}${curr}\n`, "")
        }
      })
      return csvProvider.toCsv(parsedOrders);
    }
  }
}

module.exports = createOrderService;
const { options } = require('mongoose');
const csvProvider = require("../providers/CsvProvider");
const orderRepository = require("../repositories/OrderRepository");

function createOrderService() {
  return {
    async execute(restaurantKey) {
      const orders = await orderRepository().findByRestaurantKey(restaurantKey);

      const copyItems =  orders.flatMap(order => order.items).map(item => {
        const { id, name, total_item_price, price, quantity, options } = item;
        return { 
          id, 
          name, 
          total_item_price, 
          price, 
          quantity, 
          options 
        }
      });

      const itemMap = copyItems.reduce((prev, curr) => {
        if (!!prev[curr.id]) {
          return {
            ...prev,
            [curr.id]: {
              ...prev[curr.id],
              quantity: prev[curr.id].quantity + curr.quantity,
              total: prev[curr.id].price + curr.price,
              options: [...prev[curr.id].options, curr.options]
            } 
          }
        }

        return {
          ...prev,
          [curr.id]: {
            ...curr,
            total: curr.price
          }
        }

      }, {});
      
      const parsedOrders = Object.keys(itemMap).map(key => itemMap[key]).map(item => {
        return {
          ...item,
          options: item.options.reduce((prev, curr) => `${prev}${curr}\n`, "")
        }
      })

      return csvProvider().toCsv(parsedOrders);      
    }
  }
}

module.exports = createOrderService;
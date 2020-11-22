const googleSpreadsheetProvider = require('../providers/GoogleSpreadsheetProvider');
const orderRepository = require("../repositories/OrderRepository");


function createOrderService() {
  return {
    async execute(code, spreadsheetId, restaurantKey) {
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
          options: item.options.reduce((prev, curr) => `${prev}${curr.name}: ${curr.quantity}\n`, "")
        }
      })

      const titles = ['Name', 'Price', 'Total Item Price', 'Quantity', 'Options', 'Total'];
      const rows = parsedOrders.map(order => {
        return [
          order.name,
          order.price,
          order.total_item_price,
          order.quantity,
          JSON.stringify(order.options),
          order.total
        ]
      });

      const provider = googleSpreadsheetProvider();
      await provider.authenticate(code);
      await provider.append(spreadsheetId, [titles, rows]);
    
    }
  }
}

module.exports = createOrderService;
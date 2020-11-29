const orderRepository = require("../repositories/OrderRepository");
const fns = require("date-fns");

function createOrderService() {
  return {
    async execute(restaurantKey, { day, month, year }) {
      let orders = null;
      if (day && month && year) {
        const startDate = new Date(year, month, day, 6);
        const endDate = fns.subSeconds(fns.addDays(startDate, 1), 1);
        const formattedStartDate = fns.format(
          startDate,
          "yyyy-MM-dd'T'HH-mm-ss"
        );
        const formattedEndDate = fns.format(endDate, "yyyy-MM-dd'T'HH-mm-ss");
        console.log(formattedStartDate, formattedEndDate);

        orders = await orderRepository().findByRestaurantKeyAndDate(
          restaurantKey,
          formattedStartDate,
          formattedEndDate
        );
      } else {
        orders = await orderRepository().findByRestaurantKey(restaurantKey);
      }

      const totalPrice = orders.reduce(
        (prev, curr) => prev + curr.total_price,
        0
      );

      const copyItems = orders
        .flatMap((order) => order.items)
        .map((item) => {
          // Return object not managed by mongoose
          const { id, name, quantity, options } = item;
          return {
            id,
            name,
            quantity,
            options: options.map((option) => ({
              id: option.id,
              name: option.name,
              quantity: option.quantity,
              price: option.price,
            })),
          };
        });

      const itemMap = copyItems.reduce((prev, curr) => {
        if (prev[curr.name]) {
          return {
            ...prev,
            [curr.name]: {
              ...prev[curr.name],
              quantity: prev[curr.name].quantity + curr.quantity,
              options: [...prev[curr.name].options, ...curr.options],
            },
          };
        }

        return {
          ...prev,
          [curr.name]: {
            ...curr,
          },
        };
      }, {});

      const items = Object.keys(itemMap)
        .map((key) => itemMap[key])
        .map((item) => {
          const optionsMap = item.options.reduce((prev, curr) => {
            if (prev[curr.name]) {
              return {
                ...prev,
                [curr.name]: {
                  ...prev[curr.name],
                  quantity: prev[curr.name].quantity + curr.quantity,
                },
              };
            }

            return {
              ...prev,
              [curr.name]: {
                ...curr,
              },
            };
          }, {});

          const options = Object.keys(optionsMap).map((key) => optionsMap[key]);

          return {
            ...item,
            options,
          };
        });

      return {
        totalPrice,
        items: items
          .flatMap((item) => item.options)
          .reduce((prev, curr) => [...prev, curr], items)
          .map((item) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
          })),
      };
    },
  };
}

module.exports = createOrderService;

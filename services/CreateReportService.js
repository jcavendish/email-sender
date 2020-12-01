const orderRepository = require("../repositories/OrderRepository");
const fns = require("date-fns");

function createOrderService() {
  return {
    async execute(restaurantKey, { startDate, endDate }) {
      let orders = null;
      if (startDate && endDate) {
        const formattedStartDate = fns.format(
          new Date(startDate),
          "yyyy-MM-dd'T06-00-00'"
        );
        const formattedEndDate = fns.format(
          fns.addDays(new Date(endDate), 1),
          "yyyy-MM-dd'T'05-59-59"
        );
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

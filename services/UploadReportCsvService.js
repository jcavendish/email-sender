const { format } = require("date-fns");
const fs = require("fs");
const upload = require("../config/upload");
const csvProvider = require("../providers/CsvProvider");
const orderRepository = require("../repositories/OrderRepository");

function uploadReportCsvService() {
  return {
    async execute({ restaurantKey, items, startDate, endDate }) {
      const csv = await csvProvider().toCsv(
        items.map((item) => ({ name: item.name, quantity: item.quantity }))
      );

      const [{ restaurant_name }] = await orderRepository().findByRestaurantKey(
        restaurantKey
      );

      const fileName = `${restaurant_name}${format(
        new Date(startDate),
        "'-'dd-MM-yyyy"
      )}${format(new Date(endDate), "'-to-'dd-MM-yyyy")}.csv`;

      await fs.promises.writeFile(`${upload.path}/${fileName}`, csv, "utf-8");

      return `${process.env.BASE_URL}/files/${fileName}`;
    },
  };
}

module.exports = uploadReportCsvService;

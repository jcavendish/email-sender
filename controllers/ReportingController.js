const createReportService = require("../services/CreateReportService");
const uploadReportCsvService = require("../services/UploadReportCsvService");

module.exports = {
  async create(request, response) {
    const { restaurantKey } = request.params;
    const { items, startDate, endDate } = request.body;

    try {
      const fileUrl = await uploadReportCsvService().execute({
        restaurantKey,
        startDate,
        endDate,
        items,
      });

      return response.send(fileUrl);
    } catch (err) {
      console.log(err);
      return response.status(400).send();
    }
  },
  async index(request, response) {
    const { restaurantKey } = request.params;
    const { startDate, endDate } = request.query;
    try {
      console.log(startDate, endDate);
      const report = await createReportService().execute(restaurantKey, {
        startDate,
        endDate,
      });
      return response.send(report);
    } catch (err) {
      console.log(err);
      return response.status(400).send("Error generating the report");
    }
  },
};

const createReportService = require("../services/CreateReportService");

module.exports = {
  async index(request, response) {
    const { restaurantKey } = request.params;
    const { startDate, endDate } = request.query;
    try {
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

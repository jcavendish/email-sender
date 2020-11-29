const createReportService = require("../services/CreateReportService");

module.exports = {
  async index(request, response) {
    const { restaurantKey } = request.params;
    const { day, month, year } = request.query;
    try {
      const report = await createReportService().execute(restaurantKey, {
        day,
        month,
        year,
      });
      return response.send(report);
    } catch (err) {
      console.log(err);
      return response.status(400).send("Error generating the report");
    }
  },
};

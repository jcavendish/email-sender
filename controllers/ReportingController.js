const createReportService = require("../services/CreateReportService");

module.exports = {
  async create(request, response) {
    const { restaurantKey } = request.params;

    try {
      await createReportService().execute(restaurantKey);
      return response.send();
    } catch (err) {
      console.log(err);
      return response.status(400).send("Error generating the report");
    }
  }
}
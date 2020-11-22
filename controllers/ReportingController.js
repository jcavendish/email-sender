const createReportService = require("../services/CreateReportService");

module.exports = {
  async create(request, response) {
    const { restaurantKey, spreadsheetId } = request.body;
    const { code } = request.query;
    try {
      await createReportService().execute(code, spreadsheetId, restaurantKey);

      return response.send();
    } catch (err) {
      console.log(err);
      return response.status(400).send("Error generating the report");
    }
  }
}
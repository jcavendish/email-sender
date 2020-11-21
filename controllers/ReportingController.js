const { create } = require('handlebars');
const createReportService = require("../services/CreateReportService");

module.exports = {
  async create(request, response) {
    const { key } = request.params;
    try {
      const report = await createReportService().execute(key);
      return response.send(report);
    } catch (err) {
      console.log(err);
      return response.status(400).send("Error generating the report");
    }
  }
}
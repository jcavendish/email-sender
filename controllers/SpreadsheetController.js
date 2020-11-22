const googleSpreadsheetProvider = require('../providers/GoogleSpreadsheetProvider');
const createReportService = require("../services/CreateReportService");

module.exports = {
  init(request, response) {
    const authUrl = googleSpreadsheetProvider().init();
    return response.send({authUrl});
  },
  async create(request, response) {
    const { code, spreadsheetId, restaurantKey } = request.query;
    const provider = googleSpreadsheetProvider();
    await provider.authenticate(code);
    await provider.create();
    await createReportService().execute(provider, spreadsheetId, restaurantKey);

    return response.send();
  }
}
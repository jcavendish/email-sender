const googleSpreadsheetProvider = require('../providers/GoogleSpreadsheetProvider');

module.exports = {
  init(request, response) {
    return response.send(googleSpreadsheetProvider().init());
  },
  async create(request, response) {
    await googleSpreadsheetProvider().create(request.query.code);
    return response.sendStatus(201);
  }
}
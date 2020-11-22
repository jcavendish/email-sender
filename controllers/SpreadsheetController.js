const googleSpreadsheetProvider = require('../providers/GoogleSpreadsheetProvider');

module.exports = {
  init(request, response) {
    googleSpreadsheetProvider().open();
    return response.send();
  },
  async create(request, response) {
    await googleSpreadsheetProvider().create(request.query.code);
    return response.sendStatus(201);
  }
}
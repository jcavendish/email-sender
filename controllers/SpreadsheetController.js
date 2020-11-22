const googleSpreadsheetProvider = require('../providers/GoogleSpreadsheetProvider');

module.exports = {
  init(request, response) {
    return response.send(googleSpreadsheetProvider().init());
  },
  async create(request, response) {
    const provider = googleSpreadsheetProvider();
    await provider.authenticate(request.query.code, provider.create);
    return response.sendStatus(201);
  }
}
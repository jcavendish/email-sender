const googleSpreadsheetProvider = require('../providers/GoogleSpreadsheetProvider');

module.exports = {
  init(request, response) {
    const authUrl = googleSpreadsheetProvider().init();
    return response.send({authUrl});
  },
  async create(request, response) {
    const provider = googleSpreadsheetProvider();
    await provider.authenticate(request.query.code, provider.create);
    return response.send();
  }
}
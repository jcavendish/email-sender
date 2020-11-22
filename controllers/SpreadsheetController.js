const googleSpreadsheetProvider = require('../providers/GoogleSpreadsheetProvider');

module.exports = {
  init(request, response) {
    const authUrl = googleSpreadsheetProvider().init();
    return response.send({authUrl});
  },
  async create(request, response) {
    const { code } = request.query;
    const provider = googleSpreadsheetProvider();
    await provider.authenticate(code);
    await provider.create();

    return response.send({code});
  }
}
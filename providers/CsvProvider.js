const csvjson = require("csvjson");

function csvProvider() {
  return {
    async toCsv(json) {
      return csvjson.toCSV(json);
    }
  }
}

module.exports = csvProvider;
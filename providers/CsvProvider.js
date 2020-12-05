const csvjson = require("csvjson");

function csvProvider() {
  return {
    async toCsv(json) {
      return csvjson.toCSV(json, { headers: "key", delimiter: "," });
    },
  };
}

module.exports = csvProvider;

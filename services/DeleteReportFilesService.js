const fs = require("fs");
const path = require("path");
const upload = require("../config/upload");

function deleteReportFilesService() {
  return {
    async execute() {
      const files = await fs.promises.readdir(upload.path);
      for (const file of files) {
        fs.promises.unlink(path.join(upload.path, file));
      }
    },
  };
}

module.exports = deleteReportFilesService;

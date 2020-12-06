const s3StorageProvider = require("../providers/S3StorageProvider");

function deleteReportFilesService() {
  return {
    async execute() {
      s3StorageProvider().deleteFile();
    },
  };
}

module.exports = deleteReportFilesService;

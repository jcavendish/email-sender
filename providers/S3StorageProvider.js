const { S3 } = require("aws-sdk");
const aws = require("aws-sdk");

function s3StorageProvider() {
  const client = new aws.S3({
    region: "us-east-1",
  });

  return {
    async storeFile({ fileName, contentType, fileContent }) {
      if (!contentType) {
        throw new Error("File not found");
      }

      await client
        .putObject({
          Bucket: "restinvent-bucket",
          Key: fileName,
          ACL: "public-read",
          Body: fileContent,
          ContentType: contentType,
        })
        .promise();

      return fileName;
    },

    async deleteFile() {
      await client
        .listObjects({
          Bucket: "restinvent-bucket",
        })
        .promise()
        .then((data) => {
          const objects = data.Contents.map((content) => ({
            Key: content.Key,
          }));
          client.deleteObjects({
            Bucket: "restinvent-bucket",
            Delete: { Objects: objects },
          });
        });
    },
  };
}

module.exports = s3StorageProvider;

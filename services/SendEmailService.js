const path = require("path");
const emailProvider = require("../providers/SESMailProvider");

function SendEmailService() {
  const templateFile = path.resolve(__dirname, "..", "views", "template.hbs");

  return {
    execute: async (credentials, { subject, from, to }) => {
      await emailProvider(credentials).sendEmail({
        to,
        from,
        subject,
        templateData: {
          file: templateFile,
          variables: {
            name: to.name,
            senderName: from.name
          }
        }
      });
    }
  };
}

module.exports = SendEmailService;

const path = require("path");
const emailProvider = require("../providers/SESMailProvider");

function SendEmailService() {
  const templateFile = path.resolve(__dirname, "..", "views", "template.hbs");

  return {
    execute: async ({ provider, from, to }) => {
      await emailProvider(provider).sendEmail({
        to,
        from,
        templateData: {
          file: templateFile,
          variables: {
            clientName: to.name,
            senderName: from.name
          }
        }
      });
    }
  };
}

module.exports = SendEmailService;

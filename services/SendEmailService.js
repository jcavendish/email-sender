const path = require("path");
const emailProvider = require("../providers/SESMailProvider");

function SendEmailService() {
  const templateFile = path.resolve(__dirname, "..", "views", "template.hbs");

  return {
    execute: async (credentials, { from, to }) => {
      await emailProvider(credentials).sendEmail({
        to,
        from,
        subject: "[GoBarber] Recuperação de senha",
        templateData: {
          file: templateFile,
          variables: {
            name: from.name,
            senderName: from.signature
          }
        }
      });
    }
  };
}

module.exports = SendEmailService;

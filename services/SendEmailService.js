const path = require("path");
const emailProvider = require("../providers/SESMailProvider");

function SendEmailService() {
  const templateFile = path.resolve(__dirname, "..", "views", "template.hbs");

  return {
    execute: async ({ subject, from, to }) => {
      await emailProvider().sendEmail({
        to,
        from,
        subject,
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

const aws = require("aws-sdk");
const nodemailer = require("nodemailer");
const emailTemplateProvider = require("./HandlebarsTemplateProvider");

function SESEmailProvider({ accessKeyId, secretAccessKey }) {
  const client = nodemailer.createTransport({
    SES: new aws.SES({
      apiVersion: "2010-12-01",
      region: "eu-west-1",
      credentials: {
        accessKeyId,
        secretAccessKey
      }
    })
  });

  return {
    sendEmail: async ({ to, from, subject, templateData }) => {
      console.log(to, from);
      await client.sendMail({
        from: {
          name: from.name,
          address: from.email
        },
        to: {
          name: to.name,
          address: to.email
        },
        subject,
        html: await emailTemplateProvider(templateData).then((provider) =>
          provider.parse()
        )
      });
    }
  };
}

module.exports = SESEmailProvider;

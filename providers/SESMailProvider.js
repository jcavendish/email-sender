const aws = require("aws-sdk");
const nodemailer = require("nodemailer");
const emailTemplateProvider = require("./HandlebarsTemplateProvider");
const mailConfig = require("../config/mail");


function SESEmailProvider(provider) {
  const client = nodemailer.createTransport({
    SES: new aws.SES({
      apiVersion: "2010-12-01",
      region: "eu-west-1",
      credentials: {
        accessKeyId: mailConfig[provider]?.credentials.accessKeyId,
        secretAccessKey: mailConfig[provider]?.credentials.secretAccessKey
      }
    })
  });

  return {
    sendEmail: async ({ to, from, templateData }) => {
      await client.sendMail({
        from: {
          name: from.name,
          address: mailConfig[provider]?.email
        },
        to: {
          name: to.name,
          address: to.email
        },
        subject: mailConfig[provider]?.subject,
        html: await emailTemplateProvider(templateData).then((provider) =>
          provider.parse()
        )
      });
    }
  };
}

module.exports = SESEmailProvider;

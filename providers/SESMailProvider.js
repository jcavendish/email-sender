const aws = require("aws-sdk");
const nodemailer = require("nodemailer");
const emailTemplateProvider = require("./HandlebarsTemplateProvider");
const mailConfig = require("../config/mail");


function SESEmailProvider() {
  
  const client = nodemailer.createTransport({
    SES: new aws.SES({
      apiVersion: "2010-12-01",
      region: "eu-west-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    })
  });

  return {
    sendEmail: async ({ to, from, templateData }) => {
      await client.sendMail({
        from: {
          name: from.name,
          address: mailConfig.clienthall.email
        },
        to: {
          name: to.name,
          address: to.email
        },
        subject: mailConfig.clienthall.subject,
        attachments: [{
          filename: 'feedback-img.jpeg',
            path: __dirname +'/../static/img/feedback-img.jpeg',
            cid: 'feedback-img'
        }],
        html: await emailTemplateProvider(templateData).then((provider) =>
          provider.parse()
        )
      });
    }
  };
}

module.exports = SESEmailProvider;

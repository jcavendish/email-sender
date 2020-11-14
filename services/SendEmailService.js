const path = require("path");
const emailProvider = require("../providers/SESMailProvider");
const restaurantRepository = require("../repositories/RestaurantRepository");

function SendEmailService() {
  const templateFile = path.resolve(__dirname, "..", "views", "template.hbs");

  return {
    execute: async ({ key, consent, from, to }) => {
      if (!consent) {
        throw new Error("You don't have the client consent");
      }

      const restaurant = await restaurantRepository().findByRestaurantKey(key);

      await emailProvider().sendEmail({
        to,
        from,
        templateData: {
          file: templateFile,
          variables: {
            clientName: to.name,
            senderName: from.name,
            link: restaurant.templateLink
          }
        }
      });
    }
  };
}

module.exports = SendEmailService;

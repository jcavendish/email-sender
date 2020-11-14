const createOrderService = require("../services/CreateOrderService");
const sendEmailService = require("../services/SendEmailService");

module.exports = {
  create: async (request, response) => {
    try {
      const order = await createOrderService().execute(request.body);

      await sendEmailService().execute(
        {
          key: order.restaurant_key,
          consent: order.client_marketing_consent, 
          from: { 
            name: order.restaurant_name, 
          }, 
          to: { 
            name: order.client_first_name, 
            email: order.client_email 
          }
        }
      );

      response.send();
    } catch (err) {
      console.log(err);
      response.status(400).send();
    }
  }
}
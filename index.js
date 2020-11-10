const express = require("express");
const cors = require("cors");
const path = require("path");
const sendEmailService = require("./services/SendEmailService");

//create express app
const app = express();
app.use(express.json());
app.use(cors());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));

//port at which the server will run
const port = process.env.PORT || 4000;

//create end point
app.post("/", (request, response) => {
  const { subject, email, p1, p2 } = request.query;
  const [ order ] = request.body.orders;
  const { 
    client_marketing_consent, 
    restaurant_name, 
    client_first_name, 
    client_email 
  } = order;

  if (!client_marketing_consent) {
    response.status(500).send("Client did not consent with marketing");
  }

  await sendEmailService().execute(
    { 
      accessKeyId: p1, 
      secretAccessKey: p2 
    },
    {
      subject,
      from: { 
        name: restaurant_name, 
        email 
      }, 
      to: { 
        name: client_first_name, 
        email: client_email 
      }
    });

  response.send();
});

//create end point
app.get("/ping", (request, response) => {
  response.send({ message: "pong" });
});

//create end point
app.post("/debug", (request, response) => {
  request.body.orders.forEach((order) => console.log(order));
  response.send();
});

//start server and listen for the request
app.listen(port, () =>
  //a callback that will be called as soon as server start listening
  console.log(`server is listening at http://localhost:${port}`)
);

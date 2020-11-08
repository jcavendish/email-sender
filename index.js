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
const port = 4000;

//create end point
app.post("/", (request, response) => {
  const { credentials, from, to } = request.body;

  sendEmailService().execute(credentials, { from, to });
  response.send("E-mail sent");
});

//create end point
app.get("/ping", (request, response) => {
  response.send({ message: "pong" });
});

//start server and listen for the request
app.listen(port, () =>
  //a callback that will be called as soon as server start listening
  console.log(`server is listening at http://localhost:${port}`)
);

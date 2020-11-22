require("dotenv/config");
require("./connection");

const express = require("express");
const cors = require("cors");

const orderController = require("./controllers/OrderController");
const restaurantController = require("./controllers/RestaurantController");
const reportingController = require('./controllers/ReportingController');
const restaurantOrderController = require("./controllers/RestaurantOrderController");
const { response } = require('express');
const googleSpreadsheetProvider = require('./providers/GoogleSpreadsheetProvider');
const spreadsheetController = require('./controllers/SpreadsheetController');

//create express app
const app = express();
app.use(express.json());
app.use(cors());

//port at which the server will run
const port = process.env.PORT || 4000;

//create end point
app.post("/orders", orderController.create);
app.post("/restaurants", restaurantController.create);
app.post("/reports", reportingController.create);
app.get("/restaurants/:key/orders", restaurantOrderController.index);
app.get('/oauth2callback', spreadsheetController.create);
app.get('/google/auth', spreadsheetController.init);

//create end point
app.get("/ping", (request, response) => {
  response.send("pong");
});

//create end point
app.post("/debug", (request, response) => {
  console.log(request.body);
  response.send();
});

//start server and listen for the request
app.listen(port, () =>
  //a callback that will be called as soon as server start listening
  console.log(`server is listening at http://localhost:${port}`)
);

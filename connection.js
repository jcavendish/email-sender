const mongoose = require('mongoose');

mongoose.connect(
  `mongodb+srv://admin:${process.env.DATABASE_KEY}@cluster0.jht8g.mongodb.net/inventory?retryWrites=true&w=majority`, 
  {useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to db");
});

module.exports = mongoose;
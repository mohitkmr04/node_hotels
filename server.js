// const jsonString = '{"name":"John","age":30,"city":"New York"}';
// const  jsonObject = JSON.parse(jsonString); //Converts JSON string to object
// console.log(jsonObject.name);

// const objectToConvert = {
//     name: "Alice",
//     age: 25
// }
// const json = JSON.stringify(objectToConvert);
// console.log(json);
// console.log(typeof json);
// console.log(typeof objectToConvert);

const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // req.body

const Person = require("./models/Person");
const MenuItem = require('./models/MenuItem');

app.get("/", (req, res) => {
  res.send("Welcome to our Hotel !!!");
});

app.get("/chicken", (req, res) => {
  res.send("Sure Sir, I would love to serve chicken");
});
app.get("/idly", (req, res) => {
  var customised_idli = {
    name: "rava idli",
    size: "10cm diameter",
    is_sambhar: true,
    is_chutney: false,
  };
  res.send(customised_idli);
});
app.post("/items", (req, res) => {
  res.send("Data is saved");
});









//Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);

app.listen(3000, () => {
  console.log("Listening on Port 3000");
});

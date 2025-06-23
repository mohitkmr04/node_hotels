import express from  'express';
const app = express();
import db from './db.js';
import dotenv from 'dotenv';
import passport from "./auth.js";
import MenuItem from './models/MenuItem.js';
import bodyParser from "body-parser";
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 3000;

// MiddleWare Function
const logRequest = (req,res,next) => {
  // console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
  next(); // Move on the next phase
}


app.use(logRequest);



app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', {session:false});

app.get("/",(req, res) => {
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
import personRoutes from './routes/personRoutes.js';
import menuItemRoutes from './routes/menuItemRoutes.js';
app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);


app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

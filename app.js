// We can add the modules we imported from NPM using require
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const route = require("./routes/route");
const dotenv=require('dotenv');
require('dotenv').config();

// Calling express as a function we create a basic web server
const app = express();
const port = process.env.PORT || 4000;
const url=process.env.DATABASE_URL;

// use middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use("/route", route);
// app.use("/route", routeRead);



//Connecting to the database
// mongoose.connect(url, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useNewUrlParser: true,
//   useFindAndModify: false,

// });

mongoose.connect(
  url,
  async(err)=>{
      if(err) throw err;
      console.log("conncted to db")
  }
)

mongoose.connection
  .once("open", () => {
    console.log("Connected to database");
  })
  .on("error", (error) => {
    console.log("Error: ", error);
  })


// We make our webserver listen to an specific PORT
app.listen(
  port, 
  () => console.log(`app listening at http://localhost:${port}`)
);


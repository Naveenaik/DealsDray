const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const path = require('path');

const Register = require("./Routers/Register");
const Login = require("./Routers/Login");
const empRouter = require("./Routers/empRouter");



require("dotenv").config();

app.use(express.json());
app.use(cors(
  {
    origin: ['https://deals-dray-frontend-xi.vercel.app'],
    methods:["POST","GET","PUT","DELETE"],
    credentials:true
  }
));

const port = process.env.port || 3000;

// MongoDB atlas connection

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected successfully to Mongo DB.......");
  })
  .catch((err) => {
    console.log(err);
    console.log("Failed to connect Mongo DB.....");
  });

// MongoDB Compass connection
// MONGODB_URL = "mongodb://0.0.0.0/Employee";
// mongoose.connect(MONGODB_URL)
// const conn = mongoose.connection;

// conn.once('open',() => {
//   console.log("Connected successfully to Mongo DB.......");
// })

// conn.on('err',() => {
//   console.log("Failed to connect Mongo DB.....");
//   process.exit();
// })

app.get("/",async(req,res)=>{
  console.log("Hi");
});

app.use(Register);
app.use(Login);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(empRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}.......`);
});

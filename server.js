import express from "express";
import userRouter from "./routes/user.js";
import mongoose from "mongoose";
import cors from "cors";
// require('dotenv').config();
// const dotenv = require('dotenv');
// dotenv.config();



const app = express();

//Using middleware
app.use(express.json());
app.use(cors());
app.use(cors({
  origin: ['http://localhost:3000','https://campus-connect-frontend-6tk4.onrender.com']
}));

// Using routes
app.use(userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Connecting to database
mongoose
  .connect(
    // process.env.MONGO_URI
    "mongodb+srv://swapnilmakwana4:snj9Kdwl8mlmOvUt@firstone.pql6sso.mongodb.net/?retryWrites=true&w=majority&appName=firstOne"
  )
  .then(() => console.log("Connected to Database Successfully."))
  .catch((e) => console.log(e));

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});

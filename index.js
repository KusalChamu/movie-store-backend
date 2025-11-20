import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // load .env

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

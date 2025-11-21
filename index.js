import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config(); // load .env

const app = express();
app.use(express.json());
app.use(bodyParser.json())
app.use(cors())

app.use(
  (res,req,next) => {
    const tokenString = req.header("Authorization")
    if( tokenString !=null){
      const token = tokenString.replace("Bearer ","")

      jwt.verify(token,process.env.JWT_KEY,
        (err,decoded)=>{
          if(decoded != null){
            //send request of user with role and other decoded information
            req.user = decoded
            //pass next to middleware or exit the current middleware
            next()
          }
          else{
            res.status(403).json({
                message:"invalid token"
            })
          }
        }
      )


    }
    else{
      next()
    }
  }
)

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

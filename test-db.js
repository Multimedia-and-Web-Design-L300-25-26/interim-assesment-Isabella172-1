import mongoose from "mongoose";
import "dotenv/config";

const uri = process.env.MONGO_URI;

console.log("URI:", uri);

mongoose.connect(uri)
  .then(() => {
    console.log("Connected successfully");
    process.exit(0);
  })
  .catch(err => {
    console.error("Failed to connect:");
    console.error(err);
    process.exit(1);
  });

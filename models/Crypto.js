import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  change24h: {
    type: Number
  }
}, { timestamps: true });

export default mongoose.model("Crypto", cryptoSchema);
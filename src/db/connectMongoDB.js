import mongoose from 'mongoose';
import 'dotenv/config';
const {MONGO_URL} = process.env;
const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ MongoDB connection established successfully");

  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectMongoDB;

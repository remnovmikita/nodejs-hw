import mongoose from 'mongoose';
import 'dotenv/config';
const {DB_HOST} = process.env;
const connectMongoDB = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("✅ MongoDB connection established successfully");

  } catch (error) {
    console.log('Failed connect DB');
    throw error;
  }
};

export default connectMongoDB;

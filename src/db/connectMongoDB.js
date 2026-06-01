import mongoose from 'mongoose';
import 'dotenv/config';
import {Note} from '../models/note.js';
const {MONGO_URL} = process.env;
const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ MongoDB connection established successfully");
    await Note.syncIndexes();
    console.log('Indexes synced successfully');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectMongoDB;

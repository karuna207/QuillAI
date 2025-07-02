import {mongoose} from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on('connected',()=>{
      console.log("DB connected");
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/blogquillai`);
  } catch (err) {
    console.error("❌ Initial connection error:", err.message);
  }
};

export default connectDB;

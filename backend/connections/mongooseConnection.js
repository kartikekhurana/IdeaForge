import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log("mongodb connection successufll");
  } catch (error) {
    console.error("mongo error : ", error);
    process.exit(1);
  }
};
export default connectDB;

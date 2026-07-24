import dns from "dns"
import mongoose from "mongoose";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function connectDB() {
  try {
    mongoose.connection.on("connected", () => console.log("Connected to DB"));
    mongoose.connection.on("error", (error) =>
      console.log("Error Connecting to DB", error.message),
    );
    await mongoose.connect(`${process.env.MONGO_URI}/`)
  } catch (error) {
    console.log("Error :", error.message);
    process.exit(1)
  }
}

export default connectDB;

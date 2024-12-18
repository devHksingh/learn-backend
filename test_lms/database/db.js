import mongoose from "mongoose";

const MAX_RETRIES = 3;
const RETRY_INTERVAL = 5000; //5SEC

class DatabaseConnection {
  constructor() {
    this.retryCount = 0;
    this.isConnected = false;
    // configure mongoose settings
    mongoose.set("strictQuery", true);

    mongoose.connection.on("connected", () => {
      console.log("mongodb connected successfully");
      this.isConnected = true;
    });
    mongoose.connection.on("error", () => {
      console.log("connected");
      this.isConnected = false;
    });
    mongoose.connection.on("disconnected", () => {
      console.log("mongodb disconnected");
      this.isConnected = false;
      //   TODO:attempt a reconnection
    });
  }

  //   connection
  async connect() {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO db URI is not defined in env variables");
    }
    const connectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4
    };
    if (process.env.NODE_ENV === "development") {
      mongoose.set("debug", true);
    }

    await mongoose.connect(process.env.MONGO_URI, connectionOptions);
    this.retryCount = 0; // rest retry count on success
  }
}

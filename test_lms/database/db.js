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
      this.handleDisconnection()
    });
  }

  //   connection
  async connect() {
    try {
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
      this.retryCount = 0; // reset retry count on success
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error.message);
      await this.handleConnectionError();
    }
  }
  async handleConnectionError() {
    if (this.retryCount < MAX_RETRIES) {
      this.retryCount++;
      console.log(
        `Retrying connection ....... Attempt ${this.retryCount} of ${MAX_RETRIES}`
      );
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, RETRY_INTERVAL);
      });
      return this.connect();
    } else {
      console.error(
        `Failed to connect to MONGODB AFTER ${MAX_RETRIES} attempts`
      );
      process.exit(1);
    }
  }
  async handleDisconnection() {
    if (!this.isConnected) {
      console.log("Attempting to reconneted to mongodb....");
      this.connect();
    }
  }
  async handleAppTermination() {
    try {
      await mongoose.connection.close();
      console.log("MongoDB connection closed through app termination");
      process.exit(0);
    } catch (error) {
      console.error("Error during database disconnection", error);

      process.exit(1);
    }
  }

  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      name: mongoose.connection.name,
    };
  }
}

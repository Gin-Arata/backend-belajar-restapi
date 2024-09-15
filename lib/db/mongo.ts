import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("MongoDB is already connected");
    return;
  } else if (connectionState === 2) {
    console.log("MongoDB is connecting...");
    return;
  }

  try {
    mongoose.connect(MONGO_URI!, {
      dbName: "restAPINextJS14",
      bufferCommands: true,
    });

    console.log("MongoDB connected successfully");
  } catch (err: unknown) {
    console.log("Error connecting to MongoDB", err);
    throw new Error(`Error connecting to MongoDB: ${err}`);
  }
};

export default connect;

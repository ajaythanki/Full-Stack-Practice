import app from "./server.js";
import mongoose from "mongoose";
import ReviewsDAO from "./dao/reviewsDAO.js";
mongoose.Promise = global.Promise;
const port = 8000;
const uri = "mongodb://localhost/full_stack_practice_db";

mongoose.set("debug", true);
const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 50, // Maintain up to 10 socket connections
  wtimeoutMS: 2500,
  useNewUrlParser: true,
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4,
  dbName: "full_stack_practice_db",
  // strictQuery: true, // Use IPv4, skip trying IPv6
};

mongoose.connect(uri, options).then(
  async () => {
    console.log(`Connected to MongoDB: ${uri}`);
    await ReviewsDAO.injectDB(mongoose.connection);
    app.listen(port, () => {
      console.log(`Listing on port: ${port}`);
    });
  },
  (err) => {
    console.error(`MongoDB connection error: ${err}`);
  }
);

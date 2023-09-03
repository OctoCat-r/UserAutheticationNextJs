import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDb connected successfully");
    });

    connection.on("error", (err) => {
      console.log("There is an error somewhere " + err);
      process.exit();
    });
    
  } catch (error) {
    console.log("Something is not right here");
    console.log(error);
  }
}

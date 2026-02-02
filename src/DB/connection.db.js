import { MongoClient } from "mongodb";
import { DB_NAME, MONGO_URI } from "../../config/config.service.js";
const client = new MongoClient(MONGO_URI);

export const db = client.db(DB_NAME);
export const dbConnection = async () => {
  try {
    console.log("connected✅");
    await client.connect();
  } catch (err) {
    console.log("err in db connection", err);
  }
};

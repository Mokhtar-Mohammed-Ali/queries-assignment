import { db } from "../../DB/connection.db.js";

export const logsCollection = async () => {
  try {
    const logsCollection = await db.createCollection("log", {
      capped: true,
      size: 1024,
    });
    console.log(logsCollection);
    return { message: "logs collection created successfully" };
  } catch (error) {
    throw new Error("Unable to log collection action", {
      cause: { status: 500 },
    });
  }
};
const logsModel = db.collection("log");
export const insertLog = async (inputs) => {
  const result = await logsModel.insertOne({ ...inputs, timestamp: new Date() });
  return result;
};
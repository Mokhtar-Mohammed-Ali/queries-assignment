import { db } from "../../DB/connection.db.js";

export const insertAuthor = async (inputs) => {
  const { name } = inputs;

  if (!name || name.trim() === "") {
    throw new Error("Author name cannot be empty", { cause: { status: 400 } });
  }

  const result = await db.collection("authors").insertOne({ name });

  return { _id: result.insertedId, name };
};

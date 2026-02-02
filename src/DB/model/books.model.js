import { db } from "../connection.db.js";

export const booksModel = await db.createCollection("books", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title"],
      properties: {
        title: {
          bsonType: "string",
          minLength: 1,
          description: "title must be a non-empty string"
        }
      }
    }
  }
});

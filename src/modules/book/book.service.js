import { booksModel } from '../../DB/model/index.js';

export const insertBook = async (inputs) => {
  const { title,author,year,genres } = inputs;

  if (!title || title.trim() === "") {
    throw new Error("Title cannot be empty", { cause: { status: 400 } });
  }
  const existingBook = await booksModel.findOne({ title });
  if (existingBook) {
    throw new Error("A book with this title already exists", { cause: { status: 409 } });
  } 

  const result = await booksModel.insertOne({  title,author,year,genres });
  return { result};
};

export const insertBookWithUniqueIndex = async (inputs) => {
  const { title } = inputs;

  if (!title || title.trim() === "") {
    throw new Error("Title cannot be empty", { cause: { status: 400 } });
  }

  const result = await booksModel.insertOne({ title });
   await booksModel.createIndex({ title: 1 }, { unique: true });
  return { _id: result.insertedId, title };
};

// insert many books
export const insertManyBooks = async (inputs) => {
  const result = await booksModel.insertMany(inputs);
  return result;
};
//update book year to 2022 by title
export const updateBookYear = async (title) => {
  const result = await booksModel.updateOne(
    { title: title },
    { $set: { year: 2022 } }
  );
  return result;
};
//search book by title
export const findBookByTitle = async (title) => {
  return await booksModel.findOne({ title });
};
//find books between years
export const findBooksBetweenYears = async (from, to) => {
  return await booksModel.find({
    year: { $gte: parseInt(from), $lte: parseInt(to) }
  }).toArray();
};

// find books by genre
export const findByGenre = async (genre) => {
  return await booksModel.find({ genres: genre }).toArray();
};
// get books with skip and limit
export const getBooksSkipLimit = async () => {
  return await booksModel.find()
    .sort({ year: -1 })
    .skip(2)
    .limit(3)
    .toArray();
};
// find books where year is stored as integer
export const findYearAsInteger = async () => {
  return await booksModel.find({ year: { $type: "int" } }).toArray();
};
// exclude books of specific genres
export const excludeSpecificGenres = async () => {
  return await booksModel.find({
    genres: { $nin: ["Horror", "Science Fiction"] }
  }).toArray();
};
// delete books published before a certain year
export const deleteBooksBeforeYear = async (yearLimit) => {
  return await booksModel.deleteMany({ year: { $lt: parseInt(yearLimit) } });
};
// aggregate: filter books published after 2000 and sort by year descending
export const aggregateFilterAndSort = async () => {
  return await booksModel.aggregate([
    { $match: { year: { $gt: 2000 } } },
    { $sort: { year: -1 } }
  ]).toArray();
};

// aggregate: project specific fields
export const aggregateProjectFields = async () => {
  return await booksModel.aggregate([
    { $match: { year: { $gt: 2000 } } },
    { $project: { title: 1, author: 1, year: 1, _id: 0 } }
  ]).toArray();
};

// aggregate: unwind genres array
export const aggregateUnwindGenres = async () => {
  return await booksModel.aggregate([
    { $unwind: "$genres" }
  ]).toArray();
};
// aggregate: join books with logs collection
export const aggregateJoinBooksLogs = async () => {
  return await booksModel.aggregate([
    {
      $lookup: {
        from: "logs",
        localField: "title",
        foreignField: "bookTitle",
        as: "book_activity_logs"
      }
    }
  ]).toArray();
};
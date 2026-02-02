import { Router } from "express";
import {
  aggregateFilterAndSort,
  aggregateJoinBooksLogs,
  aggregateProjectFields,
  aggregateUnwindGenres,
  deleteBooksBeforeYear,
  excludeSpecificGenres,
  findBookByTitle,
  findBooksBetweenYears,
  findByGenre,
  findYearAsInteger,
  getBooksSkipLimit,
  insertBook,
  insertBookWithUniqueIndex,
  insertManyBooks,
  updateBookYear,
} from "./book.service.js";
const router = Router();

router.post("/books", async (req, res, next) => {
  const result = await insertBook(req.body);
  return res.status(201).json({ message: "created", result });
});
router.post("/books/index", async (req, res, next) => {
  const result = await insertBookWithUniqueIndex(req.body);
  return res.status(201).json({ message: "created with unique index", result });
});

// insert many
router.post("/books/batch", async (req, res) => {
  const result = await insertManyBooks(req.body);
  return res.status(201).json({ message: "Books added", result });
});

//update book year by title
router.patch("/books/title", async (req, res) => {
  const result = await updateBookYear(req.body.title);
  return res.status(200).json({ message: "Updated successfully", result });
});

//search book by title
router.get("/books/search-title", async (req, res) => {
  const result = await findBookByTitle(req.query.title);
  return res.status(200).json(result);
});
//find books between years
router.get("/books/year", async (req, res) => {
  const { from, to } = req.query;
  const result = await findBooksBetweenYears(from, to);
  return res.status(200).json(result);
});
//find books by genre
router.get("/books/genre", async (req, res) => {
  const result = await findByGenre(req.query.genre);
  return res.status(200).json(result);
});
//get books with skip and limit
router.get("/books/skip-limit", async (req, res) => {
  const result = await getBooksSkipLimit();
  return res.status(200).json(result);
});
//get year as integer
router.get("/books/year-integer", async (req, res) => {
  const result = await findYearAsInteger();
  return res.status(200).json(result);
});
// exclude specific genres
router.get("/books/exclude-genres", async (req, res) => {
  const result = await excludeSpecificGenres();
  return res.status(200).json(result);
});

router.get("/books/before-year", async (req, res) => {
  const result = await deleteBooksBeforeYear(req.query.year);
  return res.status(200).json({ message: "Deleted successfully", result });
});
// aggregation to filter and sort
router.get("/books/aggregate1", async (req, res) => {
  const result = await aggregateFilterAndSort();
  return res.status(200).json(result);
});

// aggregation to project fields
router.get("/books/aggregate2", async (req, res) => {
  const result = await aggregateProjectFields();
  return res.status(200).json(result);
});

// aggregation with unwind genres
router.get("/books/aggregate3", async (req, res) => {
  const result = await aggregateUnwindGenres();
  return res.status(200).json(result);
});

// aggregation with join books and logs
router.get("/books/aggregate4", async (req, res) => {
  const result = await aggregateJoinBooksLogs();
  return res.status(200).json(result);
});
export default router;

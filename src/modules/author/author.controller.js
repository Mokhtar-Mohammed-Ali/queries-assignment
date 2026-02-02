import { Router } from "express";
import { insertAuthor } from "./author.service.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const author = await insertAuthor(req.body);
    res.status(201).json({ message: "created", author });
  } catch (error) {
    console.log(error);
  }
});

export default router;
  
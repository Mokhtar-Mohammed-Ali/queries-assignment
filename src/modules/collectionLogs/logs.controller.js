import { Router } from "express";
import { logsCollection } from "./logs.service.js";
const router = Router();
router.post("/", async (req, res, next) => {
  try {
    const result = await logsCollection(req.body);
    return res
      .status(201)
      .json({ message: "logs collection created successfully" });
  } catch (error) {
    throw new Error(error.message);
  }
});

router.post("/", async (req, res) => {
  const result = await insertLog(req.body);
  return res.status(201).json({ message: "Log created", result });
});
export default router;

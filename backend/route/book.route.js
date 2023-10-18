import express from "express";
import {
  bookPost,
  deleteBook,
  getBook,
  getBookId,
  updateBook,
} from "../controller/book.controller.js";

const router = express.Router();

router.post("/books", bookPost);
router.get("/allbooks", getBook);
router.get("/book/:id", getBookId);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

export default router;

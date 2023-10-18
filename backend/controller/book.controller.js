import Book from "../models/bookstore.model.js";

export const bookPost = async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: "Send all required fields" });
    }
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    });
    await book.save();
    return res.status(201).json("created successfully");
  } catch (error) {
    next(error);
  }
};

export const getBook = async (req, res, next) => {
  try {
    const books = await Book.find({});
    res.status(200).json({ count: books.length, data: books });
  } catch (error) {
    next(error);
  }
};

export const getBookId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) return res.status(404).send({ message: "Book not Found" });

    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: "Send all required fields" });
    }

    return res.status(200).json("Book updated successfully");
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) return res.status(404).send({ message: "Book not Found" });

    return res.status(200).json("Book deleted successfully");
  } catch (error) {
    next(error);
  }
};

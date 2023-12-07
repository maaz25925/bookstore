import express from 'express';
import { Book } from '../models/bookModel.js';
const router = express.Router();

// Route for saving a new book
router.post('/', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res.status(400).send({ message: 'Missing fields' });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    res.status(201).send(book);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for getting all books from database
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to get one book from database by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).json({ book });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for updating a book
router.put('/:id', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res.status(400).send({ message: 'Missing fields' });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).send({ message: 'Book updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for deleting a book
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;

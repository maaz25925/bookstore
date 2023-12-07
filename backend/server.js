import express from 'express';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get('/', (req, res) => {
  console.log(req);
  res.json({ message: 'Welcome to the book store!' });
});

// Route for saving a new book
app.post('/books', async (req, res) => {
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
app.get('/books', async (req, res) => {
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
app.get('/books/:id', async (req, res) => {
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
app.put('/books/:id', async (req, res) => {
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
app.delete('/books/:id', async (req, res) => {
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

const MongoURI = process.env.MongoURI;

mongoose
  .connect(MongoURI)
  .then(() => console.log('MongoDB connection successful'))
  .catch((err) => console.error(`Error connecting to MongoDB: ${err.message}`));

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  !err
    ? console.log(`Server is running on port ${PORT}`)
    : console.error(`Error starting server: ${err.message}`);
});

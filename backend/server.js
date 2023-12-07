import express from 'express';
import mongoose from 'mongoose';
import booksRoute from './routes/bookRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get('/', (req, res) => {
  console.log(req);
  res.json({ message: 'Welcome to the book store!' });
});

app.use('/books', booksRoute);

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

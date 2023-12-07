import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  !err
    ? console.log(`Server is running on port ${PORT}`)
    : console.error(`Error starting server: ${err.message}`);
});

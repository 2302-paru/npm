const express = require('express');

const app = express();

const { connectDB } = require('./connection');
// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connecting to DB
connectDB('mongodb://127.0.0.1:27017/meow').then(() => {
  console.log('MongoDB Connected');
});

// Routes

module.exports = app;

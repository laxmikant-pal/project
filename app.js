const express = require('express');
const app = express();
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlerware/authMiddleware');

mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(express.json());

app.use('/products', authMiddleware.verifyToken, productRoutes);
app.use('/auth', authRoutes);

module.exports = app;

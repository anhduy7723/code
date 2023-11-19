const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Add this line
const orderRoutes = require('./routes/orders');
const Order = require('./models/order');

const app = express();
const port = 3000;

// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB URI)
mongoose.connect('mongodb://localhost:27017/product', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Routes
app.use('/orders', orderRoutes);

// Populate the database with sample data
const createSampleData = async () => {
  try {
    await mongoose.connection.dropCollection('orders'); // Drop existing orders collection

    const sampleOrders = [
      { productName: 'customer1@example.com', status: 0 },
      { productName: 'customer2@example.com', status: 1 },
      { productName: 'customer3@example.com', status: 2 },
      { productName: 'customer4@example.com', status: 3 },
    ];

    await Order.insertMany(sampleOrders);
    console.log('Sample data created successfully');
  } catch (error) {
    console.error('Error creating sample data:', error.message);
  }
};

// Create sample data only if the collection is empty
Order.countDocuments({})
  .then((count) => {
    if (count === 0) {
      return createSampleData();
    }
  })
  .catch((error) => {
    console.error('Error counting documents:', error.message);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

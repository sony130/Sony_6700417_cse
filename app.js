const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/students');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Log requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    console.log('Body:', req.body);
    next();
});

// Routes
app.use('/students', studentRoutes);  // Fixed line

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Student Record API is working!' });
});

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/studentDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port http://localhost:${PORT}`);
    });
})
.catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port http://localhost:${PORT} (without database)`);
    });
});

module.exports = app;

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const connectDB = require('./config/db');
// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const noteRoutes = require(require('path').join(__dirname, 'routes', 'noteRoutes'));

// Register routes
app.use('/api/notes', noteRoutes);

// Start server
const startServer = async () => {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};
startServer();
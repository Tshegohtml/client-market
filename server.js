// /backend/server.js
const express = require('express');
const dbRoutes = require("./routes/db");
const authRoutes = require("./routes/auth")
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Middleware to parse JSON request body
app.use(express.json());

// Set up the routes, using /api as the base URL
app.use('/api', dbRoutes);
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

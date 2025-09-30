const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const resourcesRoute = require('./routes/resources');
const videoRoutes = require('./routes/videos');
const userRoutes = require('./routes/users');
const rssRoutes = require('./routes/rssNews');

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth')); // Signup/Login
app.use('/api/resources', resourcesRoute);
app.use('/api/videos', videoRoutes);
app.use('/api/roadmap', require('./routes/roadmap'));
app.use('/api/users', userRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const express = require('express');
const mongoose = require('mongoose');
// const dotenv = require('dotenv')
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const app = express();
// dotenv.config()
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json())
app.use(cookieParser())

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/LoginAuthentication', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
const userRoutes = require('./routes/user');
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
});

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwr = require('jsonwebtoken')
const router = express.Router();

// Registration API
router.post('/register', async (req, res) => {
  const { name, dateOfBirth, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, dateOfBirth, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ id: user._id }, 'secret_password');
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Error registering new user' });
  }
});

// Login API
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, 'secret_password');
    // res.cookie('token', token, {httpOnly: true, maxAge: 360000 })
    // return res.json({ status: true, message: "logged-IN successfully" });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

module.exports = router;

import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Simple validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password, // plain text for now
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Debug log to check passwords
    //console.log('DB password:', user.password);
    //console.log('Entered password:', password);

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({message: "Invalid Password"});
    }
    res.status(200).json({ message: 'Login successful', user: { firstName: user.firstName, email: user.email } });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;

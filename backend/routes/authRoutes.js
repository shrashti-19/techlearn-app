import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {OAuth2Client} from "google-auth-library";

const router = express.Router();
const client = new OAuth2Client();

//jwt token generator
const generatorToken = (id)=>{
  return jwt.sign({id}, process.env.JWT_SECRET,{
    expiresIn: '7d',
  });
};

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

    const token = generatorToken(newUser._id);
    res.status(201).json({ message: 'User registered successfully' ,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        email: newUser.email,
      },
      token,
    });
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

    //generating the token 
    const token = generatorToken(user._id);
    
    res.status(200).json({
      message: 'Login successful',
      user:{
        id: user._id,
        firstName: user.firstName,
        email: user.email,
      },
      token,
    })
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

//google oauth login 
router.post("/google", async(req,res)=>{
  const {token} = req.body;

  try{
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const {email,name} = payload;

    let user = await User.findOne({email});

    if(!user){
      //creating user without password

      user = new User({
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1] || "",
        email,
        password: "",
      });

      await user.save();
    }

    const jwtToken = generatorToken(user._id);

    res.status(200).json({
      message: "Google login successful",
      token: jwtToken,
      user:{
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
    });
  }catch(error){
    console.error("Google login error: ",error);
    res.status(401).json({message: "Google authentication failed"});
    
  }
});

export default router;

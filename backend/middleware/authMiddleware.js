import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// const protect = async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     try {
//       token = req.headers.authorization.split(' ')[1];

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select('-password');
//       next();
//     } catch (error) {
//       res.status(401).json({ error: 'Not authorized, invalid token' });
//     }
//   }

//   if (!token) {
//     res.status(401).json({ error: 'Not authorized, no token' });
//   }
// };

// module.exports = {protect};

export const protect = async (req,res,next)=>{
  let token;

  if(
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ){
    try{
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    }catch(error){
      return res.status(401).json({error: 'Not authorized, invalid token'});
    }
  }

  return res.status(401).json({error : 'Not authorized, no token'});
};
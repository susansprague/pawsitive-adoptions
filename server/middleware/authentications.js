const { verify } =require('jsonwebtoken');

// Verify JWT token
const verifyToken = (token) => {
  try {
    if (!token) return null;
    const user = verify(token, process.env.JWT_SECRET);
    return user;
  } catch (error) {
    return null;
  }
};

export default {
  verifyToken,
};


const { verify } = require('jsonwebtoken');

// Verify JWT token
const verifyToken = (token) => {
  try {
    if (!token) return null;
    const user = verify(token, process.env.JWT_SECRET);
    return user;
  } catch (error) {
    return null;
  }
};

module.exports = verifyToken;

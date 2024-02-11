const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

function generateAccessToken(user) {
    const payload = {
      id: user.id,
      email: user.email
    };
    
    const secret = 'my-password';
    const options = { expiresIn: '1h' };
  
    return jwt.sign(payload, secret, options);
}

module.exports = generateAccessToken;

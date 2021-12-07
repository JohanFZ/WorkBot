const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
  return jwt.sign(payload, 'secret', {
    expiresIn: '24h',
  });
}

exports.generateToken = generateToken;
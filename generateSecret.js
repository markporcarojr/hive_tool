// generateSecret.js

const crypto = require('crypto');

const generateRandomString = (length) => {
    return crypto.randomBytes(length).toString('hex');
};

const secretKey = generateRandomString(32); // Generate a 32-character random string
console.log(secretKey);

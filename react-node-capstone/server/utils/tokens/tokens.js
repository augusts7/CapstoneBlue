const secret = 'shafasdavvvdah';
const jwt = require('jsonwebtoken');

function encode(value) {

     return jwt.sign(value, secret);
}

function decode (encodedToken) {
    try {
         return jwt.verify(encodedToken, secret);
    } catch (error) {
        return null;
    }
}

module.exports = {
    encode,
    decode
};
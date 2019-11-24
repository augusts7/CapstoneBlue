const secret = 'shafasdavvvdah';
const jwt = require('jsonwebtoken');

function encode(value) {

     return jwt.sign(value, secret);
}

function encodeWithExpiration(value, expirationTime, callback) {

    return jwt.sign({value}, secret, {expiresIn: expirationTime});
}

function decodeTokenWithExpiration (token) {
    try {
        let decodedToken = jwt.verify(token, secret);
        return decodedToken.value;
    } catch (error) {
        return null;
    }
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
    decode,
    encodeWithExpiration,
    decodeTokenWithExpiration
};
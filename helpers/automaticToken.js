const crypto = require('crypto');

const automaticToken = () => {
    // if (password && email) {
    const token = crypto.randomBytes(8).toString('hex');
    return token;
    // }
};

module.exports = automaticToken;
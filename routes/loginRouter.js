const express = require('express');

const router = express.Router();
const automaticToken = require('../helpers/automaticToken');
const { isValidEmail, isValidPassword } = require('../middlewares/validations');

router.post('/', isValidPassword, isValidEmail, (req, res) => {    
   const token = automaticToken();
    return res.status(200).send({ token: `${token}` });
});

module.exports = router;
const express = require('express');

const router = express.Router();
const automaticToken = require('../helpers/automaticToken');

router.post('/', (req, res) => {    
   const token = automaticToken();
    return res.status(200).send({ token: `${token}` });
});

module.exports = router;
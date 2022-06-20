const express = require('express');

const router = express.Router();
const { readContentFile } = require('../services/talkersService');

const PATH_FILE = './talker.json';

router.get('/', async (_req, res) => {
    const talker = await readContentFile(PATH_FILE) || [];
  
    res.status(200).json(talker);
  });

module.exports = router;
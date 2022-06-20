const express = require('express');

const router = express.Router();
const { readContentFile } = require('../services/talkersService');

const PATH_FILE = './talker.json';

router.get('/', async (_req, res) => {
    const talker = await readContentFile(PATH_FILE) || [];
    res.status(200).json(talker);
  });

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const talker = await readContentFile(PATH_FILE) || [];
    const validate = talker.find((person) => person.id === Number(id));
    if (!validate) {
        return res.status(404).json({
            message: 'Pessoa palestrante não encontrada',
          });
    }
    return res.status(200).json(validate);
});

module.exports = router;
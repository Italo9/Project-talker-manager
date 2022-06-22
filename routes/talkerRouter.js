const express = require('express');

const router = express.Router();
const { readContentFile, writeContentFile } = require('../services/talkersService');
const {
authToken,
authName, 
authAge, 
authTalk, 
authTalkAdditional } = require('../middlewares/validations');

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

router.post('/', authToken, authName, authAge, authTalk, authTalkAdditional, async (req, res) => {
  const talker = req.body;

  const talkers = await readContentFile(PATH_FILE) || [];
  // talkers.push({ id: talkers.length + 1, ...talker });
  // const newTalker = await readContentFile(PATH_FILE, JSON.stringify(talkers));
  // const addTalker = [{ ...talkers, talker }];
  const newTalker = await writeContentFile(PATH_FILE, { id: talkers.length + 1, ...talker });
  return res.status(201).json(newTalker);
});

module.exports = router;
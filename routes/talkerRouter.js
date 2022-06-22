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
  talkers.push({ id: talkers.length + 1, ...talker });
  await writeContentFile(PATH_FILE, talkers);
  return res.status(201).json(talkers[talkers.length - 1]);
});

router.put('/:id', authToken, authName, authAge, authTalk, authTalkAdditional, async (req, res) => {
  const { id } = req.params;
  const talkerEdit = req.body;
  const talkers = await readContentFile(PATH_FILE) || [];
  const editTalker = talkers.filter((talker) => (talker.id !== Number(id)));
  editTalker.push({ id: Number(id), ...talkerEdit });
  await writeContentFile(PATH_FILE, editTalker);
  console.log('editTalker', editTalker);
  return res.status(200).json(editTalker[editTalker.length - 1]);
});

module.exports = router;
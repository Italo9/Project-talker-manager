const isValidPassword = (req, res, next) => {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({
        message: 'O campo "password" é obrigatório',
      });
  } if (password.length < 6) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
};

const isValidEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
      return res.status(400).json({
        message: 'O campo "email" é obrigatório',
      });
  } if (!email.includes('@') || !email.includes('.com')) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }     
  next();
};

const authToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
 return res.status(401).json({
    message: 'Token não encontrado',
  }); 
}

  if (token.length > 16 || token.length < 16) {
      return res.status(401).json({ message: 'Token inválido' });
  }
 
  next();
};

const authName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name.length === 0) {
    return res.status(400).json({
    message: 'O campo "name" é obrigatório',
  });
} if (name.length < 3) {
    return res.status(400).json({
        message: 'O "name" deve ter pelo menos 3 caracteres',
      });
  }
 
  next();
};

const authAge = (req, res, next) => {
  const { age } = req.body;

  if (!age || age.length === 0) {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    }); 
  } 
  if (age < 18) {
    return res.status(400).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }
 
  next();
};

const authTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório',
    }); 
  } 
  if (!talk.watchedAt || talk.watchedAt.length === 0) {
    return res.status(400).json({
      message: 'O campo "watchedAt" é obrigatório',
    });
  }
  next();
};

const authTalkAdditional = (req, res, next) => {
  const { talk } = req.body;
  const formatDate = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  if (!formatDate.test(talk.watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
    if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
}
  if (!talk.rate) {
  return res.status(400).json({
    message: 'O campo "rate" é obrigatório',
  }); 
}
  next(); 
};

module.exports = {
    isValidEmail,
    isValidPassword,
    authToken,
    authName,
    authAge,
    authTalk,
    authTalkAdditional,
};
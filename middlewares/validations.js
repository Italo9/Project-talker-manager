const isValidEmail = (req, _res, _next) => {
    const { email } = req.headers;
  return email;
    // if(!email || !email.includes('@') || email.includes('.com')) {
    //     return res.status(400).
    // }
};
const isValidPassword = (req, _res, _next) => {
    const { password } = req.headers;
    return password;
};

module.exports = {
    isValidEmail,
    isValidPassword,
  };
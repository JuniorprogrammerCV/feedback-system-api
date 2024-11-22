const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Verifica se o usuário já existe
    let user = await User.findOne({ where: { username } });
    if (user) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Cria um novo usuário
    user = new User({ username, password });

    // Hash da senha antes de salvar no banco de dados
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: 'Login bem-sucedido' });
    });
  })(req, res, next);
};

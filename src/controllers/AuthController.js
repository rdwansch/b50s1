const { sequelize, QueryTypes } = require('../config/Sequelize');
const bcrypt = require('bcrypt');

const LoginPage = (req, res) => {
  res.render('login');
};

const PostLogin = async (req, res) => {
  try {
    const user = await sequelize.query('SELECT * FROM "Users" WHERE email = ? LIMIT 1', {
      replacements: [req.body.email],
      type: QueryTypes.SELECT,
    });

    if (user[0]) {
      const match = await bcrypt.compare(req.body.password, user[0].password);

      if (!match) {
        req.flash('danger', 'Username or Password is wrong');
        res.redirect('/auth/login');
        return;
      }

      req.session.isLogin = true;
      req.session.username = user[0].name;
      req.session.userId = user[0].id;

      req.flash('success', 'Login Successfoully');
      return res.redirect('/');
    }
    req.flash('danger', 'Username or Password is wrong');
    res.redirect('/auth/login');
  } catch (err) {
    console.log(err.message);
    res.send('Internal Server Error').status(500);
  }
};

const RegisterPage = (req, res) => {
  res.render('register');
};

const PostRegister = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await sequelize.query(
      'INSERT INTO "Users" (name, email, password, "createdAt", "updatedAt") VALUES (?,?,?,?,?)',
      {
        replacements: [req.body.name, req.body.email, hashedPassword, new Date(), new Date()],
        type: QueryTypes.INSERT,
      }
    );

    if (user[1]) {
      res.redirect('/auth/login');
    }
  } catch (err) {
    console.log(err.message);
    res.send('Internal Server Error').status(500);
  }
};

const Logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      res.send('Internal Server Error').status(500);
      return;
    }
    res.redirect('/');
  });
};

module.exports = {
  LoginPage,
  RegisterPage,
  PostLogin,
  PostRegister,
  Logout,
};

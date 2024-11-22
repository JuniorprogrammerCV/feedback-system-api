const express = require('express');
require("dotenv").config();
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
require('./passportConfig'); // Certifique-se de que a configuração do Passport está sendo importada
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const sequelize = require('./config/db');

const app = express();
app.use(bodyParser.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', authRoutes);
app.use('/api', feedbackRoutes);
app.use('/api', serviceRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});

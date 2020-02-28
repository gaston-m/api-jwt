const express = require ('express');
const app = express();
const morgan = require('morgan');

//------------ SETTINGS ------------------

app.set('port', process.env.PORT || 3000);

// -------------- MIDDLEWARES --------------

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(morgan('dev'));

//--------- ROUTES ----------------

app.use(require('./routes'));



module.exports = app;

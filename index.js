const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const hbs = require('hbs');
const router = require('./src/routers');

// setup engine
app.set('view engine', 'hbs');

// set views
app.set('views', path.join(__dirname, 'src/views'));

// add partials
hbs.registerPartials(path.join(__dirname, 'src/views/partials'));

hbs.registerHelper('compare', (one, compare, two) => eval(one + compare + two));
hbs.registerHelper('includes', (value, array) => array.includes(value));
hbs.registerHelper('countTime', (startDate, endDate) => {
  const diff = new Date(endDate) - new Date(startDate);
  const months = new Date(diff).getMonth();
  const date = new Date(diff).getDate();
  const years = new Date(endDate).getFullYear() - new Date(startDate).getFullYear();

  return `${years > 0 ? years + ' years' : ''} ${months > 0 ? months + ' months' : ''} ${date} days`;
});

// middleware for static file serving
// src/assets/css/style.css => /css/style.css
app.use(express.static('public/assets'));

// middleware for parsing request data
app.use(express.urlencoded({ extended: false }));

//
// app.use(express.json());

app.use('/', router.Home);
app.use('/project', router.Project);
app.use('/contact', router.Contact);
app.use('/testimonial', router.Testimonial);

app.listen(port, () => console.log('running on ::' + port));

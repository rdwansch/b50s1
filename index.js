const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const hbs = require('hbs');
const { minify } = require('html-minifier');

// setup engine
app.set('view engine', 'hbs');

// set views
app.set('views', path.join(__dirname, 'src/views'));

// add partials
hbs.registerPartials(path.join(__dirname, 'src/views/partials'));

// middleware for static file serving
// src/assets/css/style.css => /css/style.css
app.use(express.static('public/assets'));

// middleware for parsing request data
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) =>
  res.render('index', {}, (err, html) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error on render hbs');
    }

    res.send(
      minify(html, {
        collapseWhitespace: true,
        removeComments: true,
        collapseBooleanAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        minifyJS: true,
      })
    );
  })
);

app.get('/project', (req, res) =>
  res.render('project', {}, (err, html) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error on render hbs');
    }

    res.send(
      minify(html, {
        collapseWhitespace: true,
        removeComments: true,
        collapseBooleanAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        minifyJS: true,
      })
    );
  })
);

app.get('/contact', (req, res) =>
  res.render('contact', {}, (err, html) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error on render hbs');
    }

    res.send(
      minify(html, {
        collapseWhitespace: true,
        removeComments: true,
        collapseBooleanAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        minifyJS: true,
      })
    );
  })
);

app.get('/testimonial', (req, res) =>
  res.render('testimonial', {}, (err, html) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error on render hbs');
    }

    res.send(
      minify(html, {
        collapseWhitespace: true,
        removeComments: true,
        collapseBooleanAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        minifyJS: true,
      })
    );
  })
);

app.post('/project', (req, res) => {
  console.log(req.body);

  res.send('OK');
});

app.listen(port, () => console.log('running on ::' + port));

// setTimeout(() => {
//   console.clear();
//   console.log('running on ::' + port);
// }, 920);

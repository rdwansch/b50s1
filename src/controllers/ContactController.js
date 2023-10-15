const { minify } = require('html-minifier');

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const ContactPage = (req, res) =>
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
  });

module.exports = {
  Page: ContactPage,
};

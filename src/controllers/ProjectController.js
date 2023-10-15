const { minify } = require('html-minifier');
const Joi = require('joi');
const projects = require('../mocks/project');

const projectSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
  description: Joi.string().required(),
  technologies: Joi.array().required(),
  image: Joi.optional(),
});

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const ProjectPage = (req, res) => {
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
  });
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const PostProject = (req, res) => {
  const technologies = [req.body.technologies].flat();

  const { error, value } = projectSchema.validate({ ...req.body, technologies });

  if (error) {
    return res.status(400).json({ error: error.details });
  }

  projects.unshift(value);
  res.redirect('/');
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const EditPage = (req, res) => {
  const project = projects.find((_, idx) => req.params.id == idx);
  res.render('edit-project', { project });
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const EditProject = (req, res) => {
  const technologies = [req.body.technologies].flat();
  console.log(req.body.image);
  const { error, value } = projectSchema.validate({ ...req.body, technologies });

  if (error) {
    return res.status(400).json({ error: error.details });
  }

  projects.splice(req.params.id, 1, value);
  res.redirect('/');
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const DeleteProject = (req, res) => {
  const id = req.params.id;

  projects.splice(id, 1);
  res.redirect('/');
};

module.exports = {
  Page: ProjectPage,
  PostProject,
  EditPage,
  EditProject,
  DeleteProject,
};

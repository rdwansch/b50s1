/* eslint-disable indent */
const Joi = require('joi');
const { sequelize, QueryTypes } = require('../config/Sequelize');

const projectSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
  description: Joi.string().required(),
  technologies: Joi.array().required(),
  image: Joi.string().optional(),
});

const ProjectPage = async (req, res) => {
  res.render('project', { isLogin: req.session.isLogin, username: req.session.username, userId: req.session.userId });
};

const PostProject = async (req, res) => {
  const technologies = [req.body.technologies].flat();
  const { error, value } = projectSchema.validate({ ...req.body, image: req.file.filename, technologies });

  if (error) {
    return res.status(400).json({ error: error.details });
  }

  const techs = value.technologies.reduce((acc, currentValue) => {
    acc[currentValue] = true;
    return acc;
  }, {});

  try {
    const project = await sequelize.query(
      `INSERT INTO "Projects"
          ("userId", name, "startDate", "endDate", description, image, technologies, "createdAt", "updatedAt") 
          VALUES (?,?,?,?,?,?,?::json,?,?)`,
      {
        replacements: [
          req.session.userId,
          value.name,
          value.startDate,
          value.endDate,
          value.description,
          value.image,
          JSON.stringify(techs),
          new Date(),
          new Date(),
        ],
        type: QueryTypes.INSERT,
      }
    );

    console.log(project);

    if (project[1]) {
      res.redirect('/');
    }
  } catch (err) {
    console.log('Err PostProjects:', err.message);
    res.send('Internal Server Error').status(500);
  }
};

const EditPage = async (req, res) => {
  try {
    const project = await sequelize.query('SELECT * FROM "Projects" WHERE id = ?', {
      replacements: [req.params.id],
      type: QueryTypes.SELECT,
    });

    const newProject = project.map(p => ({ ...p, technologies: Object.keys(p.technologies) }));

    res.render('edit-project', {
      project: newProject[0],
      isLogin: req.session.isLogin,
      username: req.session.username,
      userId: req.session.userId,
    });
  } catch (err) {
    console.log('Err EditPage:', err.message);
    res.send('Internal Server Error').status(500);
  }
};

const EditProject = async (req, res) => {
  const technologies = [req.body.technologies].flat();
  const { error, value } = projectSchema.validate({ ...req.body, image: req?.file?.filename || 'x', technologies });

  if (error) {
    return res.status(400).json({ error: error.details });
  }

  const techs = value.technologies.reduce((acc, currentValue) => {
    acc[currentValue] = true;
    return acc;
  }, {});

  try {
    const project = await sequelize.query(
      `UPDATE "Projects" 
      SET name = ?, "startDate"=?, "endDate"=?, description=?${
        value.image !== 'x' ? `,image='${value.image}'` : ''
      }, technologies=?::json, "updatedAt"=? 
      WHERE id = ?
      `,
      {
        replacements: [
          value.name,
          value.startDate,
          value.endDate,
          value.description,
          JSON.stringify(techs),
          new Date(),
          req.params.id,
        ],
        type: QueryTypes.UPDATE,
      }
    );

    if (project[1]) {
      res.redirect('/');
    }
  } catch (err) {
    console.log('Err EditProject:', err.message);
    res.send('Internal Server Error').status(500);
  }
};

const DeleteProject = async (req, res) => {
  try {
    await sequelize.query('DELETE FROM "Projects" WHERE id = ?', {
      replacements: [req.params.id],
      type: QueryTypes.DELETE,
    });

    res.redirect('/');
  } catch (err) {
    console.log('Err DeleteProject:', err.message);
    res.send('Internal Server Error').status(500);
  }
};

const DetailProjectPage = async (req, res) => {
  const project = await sequelize.query('SELECT * FROM "Projects" WHERE id = ?', {
    replacements: [req.params.id],
    type: QueryTypes.SELECT,
  });
  const newProjects = project.map(project => ({ ...project, technologies: Object.keys(project.technologies) }));

  res.render('detail-project', { project: newProjects[0] });
};

module.exports = {
  Page: ProjectPage,
  PostProject,
  EditPage,
  EditProject,
  DeleteProject,
  DetailProjectPage,
};

const { sequelize, QueryTypes } = require('../config/Sequelize');

const HomeController = async (req, res) => {
  try {
    const projects = await sequelize.query(
      `
    SELECT p.name AS "projectName", p."startDate", p."endDate", p.description, p.technologies, p.id, p.image, u.name, u.id AS "authorId"
    FROM "Projects" p 
    INNER JOIN "Users" u 
    ON p."userId" = u.id
    ORDER BY p."updatedAt" DESC
    `,
      { type: QueryTypes.SELECT }
    );

    const newProjects = projects.map(project => ({ ...project, technologies: Object.keys(project.technologies) }));

    res.render('index', {
      projects: newProjects,
      isLogin: req.session.isLogin,
      username: req.session.username,
      userLoginId: req.session.userId,
    });
  } catch (err) {
    console.log('Err HomeController:', err.message);
    res.send('Internal Server Error').status(500);
  }
};

module.exports = { Page: HomeController };

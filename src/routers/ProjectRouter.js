const express = require('express');
const ProjectController = require('../controllers/ProjectController');
const router = express.Router();

router.get('/', ProjectController.Page);
router.post('/', ProjectController.PostProject);

router.get('/edit/:id', ProjectController.EditPage);
router.post('/edit/:id', ProjectController.EditProject);

router.get('/delete/:id', ProjectController.DeleteProject);

module.exports = router;

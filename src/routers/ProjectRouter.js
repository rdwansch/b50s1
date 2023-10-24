const express = require('express');
const ProjectController = require('../controllers/ProjectController');
const router = express.Router();
const upload = require('../middlewares/uploadFile');

router.get('/', ProjectController.Page);
router.post('/', upload.single('image'), ProjectController.PostProject);

router.get('/edit/:id', ProjectController.EditPage);
router.post('/edit/:id', upload.single('image'), ProjectController.EditProject);

router.get('/delete/:id', ProjectController.DeleteProject);

router.get('/detail/:id', ProjectController.DetailProjectPage);

module.exports = router;

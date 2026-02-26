const express = require('express');
const { getAllProjects, getProjectById } = require('../controllers/projectController');
const router = express.Router();

router.get('/', getAllProjects);
router.get('/:id', getProjectById);

module.exports = router;
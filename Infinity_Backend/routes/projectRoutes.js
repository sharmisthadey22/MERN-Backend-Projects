// const express = require('express');
// const router = express.Router();
// const projectCtrl = require('../controllers/projectController');

// // GET all projects (Public)
// router.get('/', projectCtrl.getAllProjects);

// // POST create project (Admin)
// router.post('/add', projectCtrl.createProject);

// module.exports = router;

const express = require('express');
const router = express.Router();
const projectCtrl = require('../controllers/projectController');
const upload = require('../middleware/multer'); // Multer import karna mat bhulna

// Sabko dikhane ke liye (Public)
router.get('/', projectCtrl.getAllProjects);

// Admin ke liye (Photo upload ke saath)
// 'photos' wahi naam hona chahiye jo frontend developer use karega
router.post('/add', upload.array('photos', 5), projectCtrl.createProject);

module.exports = router;
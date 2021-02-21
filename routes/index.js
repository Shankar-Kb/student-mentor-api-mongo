const express = require('express');
const router = express.Router();
const studentsRouter = require('./students');
const usersRouter = require('./users');
const mentorsRouter = require('./mentors');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', usersRouter);
router.use('/students', studentsRouter);
router.use('/mentors', mentorsRouter);

module.exports = router;

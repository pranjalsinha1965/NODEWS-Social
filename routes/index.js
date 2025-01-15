const express = require('express');
const router = express.Router();
const usersController = require('../controllers/home_controller');
console.log('router loaded');
router.get('/', users_Controller.home);
router.use('/users', require('./users'));
module.exports = router;
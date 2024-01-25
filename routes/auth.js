const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/', authController.handleSignIn);

module.exports = router;
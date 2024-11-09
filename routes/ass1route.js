const express = require('express');
const router = express.Router();
const { generateFibonacci } = require('../controller/ass1controller');  // Corrected path

router.get('/fibonacci/:num', generateFibonacci);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getFactorial } = require('../controller/ass3controller');

router.get('/factorial/:num', getFactorial);

module.exports = router;

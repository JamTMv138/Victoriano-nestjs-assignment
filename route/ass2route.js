const express = require('express');
const router = express.Router();
const { checkPrime } = require('../controller/ass2controller');

router.get('/prime/:num', checkPrime);

module.exports = router;

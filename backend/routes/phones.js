const router = require('express').Router();
const PhoneController = require('../controllers/PhoneController.js');

router.get('/', PhoneController.getAll);

module.exports = router;
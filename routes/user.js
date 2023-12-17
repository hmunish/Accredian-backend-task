const express = require('express');
const { signup, signin, sendUserDetails } = require('../controllers/user');
const { authorization } = require('../middlewares/authorization');

const router = express.Router();

router.post('/sign-up', signup);
router.post('/login', signin);
router.get('/', authorization, sendUserDetails);

module.exports = router;
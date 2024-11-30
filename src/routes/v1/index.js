const express = require('express');

const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const bookRoute = require('./book.route')

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/book', bookRoute);

module.exports = router;

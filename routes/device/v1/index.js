/**
 * index.js
 * @description :: index route file of device platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/device/auth',require('./auth'));
router.use(require('./categoryRoutes'));
router.use(require('./instructorRoutes'));
router.use(require('./courseRoutes'));
router.use(require('./userRoutes'));

module.exports = router;

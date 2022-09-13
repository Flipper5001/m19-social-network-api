const router = require('express').Router();
const userRoutes = require('./api/userRoutes');
const thoughtRoutes = require('./api/thoughtRoutes');

router.use('/api', userRoutes);
router.use('/api', thoughtRoutes);

module.exports = router;
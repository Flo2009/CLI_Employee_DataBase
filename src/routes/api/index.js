const router = require('express').Router();

const depRoutes = require('./departmentRoutes');
const roleRoutes = require('./roleRoutes');
const employeeRoutes = require('./employeeRoutes');

router.use('/departments', depRoutes);
router.use('/roles', roleRoutes);
router.use('/employees', employeeRoutes);

module.exports = router;
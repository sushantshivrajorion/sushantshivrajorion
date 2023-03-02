/**
 * instructorRoutes.js
 * @description :: CRUD API routes for instructor
 */

const express = require('express');
const router = express.Router();
const instructorController = require('../../../controller/device/v1/instructorController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/instructor/create').post(auth(PLATFORM.DEVICE),checkRolePermission,instructorController.addInstructor);
router.route('/device/api/v1/instructor/list').post(auth(PLATFORM.DEVICE),checkRolePermission,instructorController.findAllInstructor);
router.route('/device/api/v1/instructor/count').post(auth(PLATFORM.DEVICE),checkRolePermission,instructorController.getInstructorCount);
router.route('/device/api/v1/instructor/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,instructorController.getInstructor);
router.route('/device/api/v1/instructor/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,instructorController.updateInstructor);    
router.route('/device/api/v1/instructor/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,instructorController.partialUpdateInstructor);
router.route('/device/api/v1/instructor/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,instructorController.softDeleteInstructor);
router.route('/device/api/v1/instructor/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,instructorController.softDeleteManyInstructor);
router.route('/device/api/v1/instructor/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,instructorController.bulkInsertInstructor);
router.route('/device/api/v1/instructor/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,instructorController.bulkUpdateInstructor);
router.route('/device/api/v1/instructor/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,instructorController.deleteInstructor);
router.route('/device/api/v1/instructor/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,instructorController.deleteManyInstructor);

module.exports = router;

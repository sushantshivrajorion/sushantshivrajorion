/**
 * instructorRoutes.js
 * @description :: CRUD API routes for instructor
 */

const express = require('express');
const router = express.Router();
const instructorController = require('../../controller/admin/instructorController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/instructor/create').post(auth(PLATFORM.ADMIN),checkRolePermission,instructorController.addInstructor);
router.route('/admin/instructor/list').post(auth(PLATFORM.ADMIN),checkRolePermission,instructorController.findAllInstructor);
router.route('/admin/instructor/count').post(auth(PLATFORM.ADMIN),checkRolePermission,instructorController.getInstructorCount);
router.route('/admin/instructor/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,instructorController.getInstructor);
router.route('/admin/instructor/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,instructorController.updateInstructor);    
router.route('/admin/instructor/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,instructorController.partialUpdateInstructor);
router.route('/admin/instructor/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,instructorController.softDeleteInstructor);
router.route('/admin/instructor/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,instructorController.softDeleteManyInstructor);
router.route('/admin/instructor/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,instructorController.bulkInsertInstructor);
router.route('/admin/instructor/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,instructorController.bulkUpdateInstructor);
router.route('/admin/instructor/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,instructorController.deleteInstructor);
router.route('/admin/instructor/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,instructorController.deleteManyInstructor);

module.exports = router;

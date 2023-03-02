/**
 * courseRoutes.js
 * @description :: CRUD API routes for course
 */

const express = require('express');
const router = express.Router();
const courseController = require('../../controller/admin/courseController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/course/create').post(auth(PLATFORM.ADMIN),checkRolePermission,courseController.addCourse);
router.route('/admin/course/list').post(auth(PLATFORM.ADMIN),checkRolePermission,courseController.findAllCourse);
router.route('/admin/course/count').post(auth(PLATFORM.ADMIN),checkRolePermission,courseController.getCourseCount);
router.route('/admin/course/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,courseController.getCourse);
router.route('/admin/course/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,courseController.updateCourse);    
router.route('/admin/course/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,courseController.partialUpdateCourse);
router.route('/admin/course/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,courseController.softDeleteCourse);
router.route('/admin/course/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,courseController.softDeleteManyCourse);
router.route('/admin/course/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,courseController.bulkInsertCourse);
router.route('/admin/course/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,courseController.bulkUpdateCourse);
router.route('/admin/course/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,courseController.deleteCourse);
router.route('/admin/course/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,courseController.deleteManyCourse);

module.exports = router;

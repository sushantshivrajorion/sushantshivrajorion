/**
 * courseRoutes.js
 * @description :: CRUD API routes for course
 */

const express = require('express');
const router = express.Router();
const courseController = require('../../../controller/device/v1/courseController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/course/create').post(auth(PLATFORM.DEVICE),checkRolePermission,courseController.addCourse);
router.route('/device/api/v1/course/list').post(auth(PLATFORM.DEVICE),checkRolePermission,courseController.findAllCourse);
router.route('/device/api/v1/course/count').post(auth(PLATFORM.DEVICE),checkRolePermission,courseController.getCourseCount);
router.route('/device/api/v1/course/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,courseController.getCourse);
router.route('/device/api/v1/course/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,courseController.updateCourse);    
router.route('/device/api/v1/course/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,courseController.partialUpdateCourse);
router.route('/device/api/v1/course/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,courseController.softDeleteCourse);
router.route('/device/api/v1/course/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,courseController.softDeleteManyCourse);
router.route('/device/api/v1/course/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,courseController.bulkInsertCourse);
router.route('/device/api/v1/course/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,courseController.bulkUpdateCourse);
router.route('/device/api/v1/course/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,courseController.deleteCourse);
router.route('/device/api/v1/course/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,courseController.deleteManyCourse);

module.exports = router;

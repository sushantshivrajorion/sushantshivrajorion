/**
 * instructorController.js
 * @description : exports action methods for instructor.
 */

const Instructor = require('../../../model/instructor');
const instructorSchemaKey = require('../../../utils/validation/instructorValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Instructor in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Instructor. {status, message, data}
 */ 
const addInstructor = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      instructorSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Instructor(dataToCreate);
    let createdInstructor = await dbService.create(Instructor,dataToCreate);
    return res.success({ data : createdInstructor });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Instructor in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Instructors. {status, message, data}
 */
const bulkInsertInstructor = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    for (let i = 0;i < dataToCreate.length;i++){
      dataToCreate[i] = {
        ...dataToCreate[i],
        addedBy: req.user.id
      };
    }
    let createdInstructors = await dbService.create(Instructor,dataToCreate);
    createdInstructors = { count: createdInstructors ? createdInstructors.length : 0 };
    return res.success({ data:{ count:createdInstructors.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Instructor from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Instructor(s). {status, message, data}
 */
const findAllInstructor = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      instructorSchemaKey.findFilterKeys,
      Instructor.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Instructor, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundInstructors = await dbService.paginate( Instructor,query,options);
    if (!foundInstructors || !foundInstructors.data || !foundInstructors.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundInstructors });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Instructor from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Instructor. {status, message, data}
 */
const getInstructor = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundInstructor = await dbService.findOne(Instructor,query, options);
    if (!foundInstructor){
      return res.recordNotFound();
    }
    return res.success({ data :foundInstructor });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Instructor.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getInstructorCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      instructorSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedInstructor = await dbService.count(Instructor,where);
    return res.success({ data : { count: countedInstructor } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Instructor with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Instructor.
 * @return {Object} : updated Instructor. {status, message, data}
 */
const updateInstructor = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      instructorSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedInstructor = await dbService.updateOne(Instructor,query,dataToUpdate);
    if (!updatedInstructor){
      return res.recordNotFound();
    }
    return res.success({ data :updatedInstructor });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Instructor with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Instructors.
 * @return {Object} : updated Instructors. {status, message, data}
 */
const bulkUpdateInstructor = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    delete dataToUpdate['addedBy'];
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { 
        ...req.body.data,
        updatedBy : req.user.id
      };
    }
    let updatedInstructor = await dbService.updateMany(Instructor,filter,dataToUpdate);
    if (!updatedInstructor){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedInstructor } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Instructor with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Instructor.
 * @return {obj} : updated Instructor. {status, message, data}
 */
const partialUpdateInstructor = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    delete req.body['addedBy'];
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      instructorSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedInstructor = await dbService.updateOne(Instructor, query, dataToUpdate);
    if (!updatedInstructor) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedInstructor });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Instructor from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Instructor.
 * @return {Object} : deactivated Instructor. {status, message, data}
 */
const softDeleteInstructor = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedInstructor = await deleteDependentService.softDeleteInstructor(query, updateBody);
    if (!updatedInstructor){
      return res.recordNotFound();
    }
    return res.success({ data:updatedInstructor });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Instructor from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Instructor. {status, message, data}
 */
const deleteInstructor = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedInstructor;
    if (req.body.isWarning) { 
      deletedInstructor = await deleteDependentService.countInstructor(query);
    } else {
      deletedInstructor = await deleteDependentService.deleteInstructor(query);
    }
    if (!deletedInstructor){
      return res.recordNotFound();
    }
    return res.success({ data :deletedInstructor });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Instructor in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyInstructor = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedInstructor;
    if (req.body.isWarning) {
      deletedInstructor = await deleteDependentService.countInstructor(query);
    }
    else {
      deletedInstructor = await deleteDependentService.deleteInstructor(query);
    }
    if (!deletedInstructor){
      return res.recordNotFound();
    }
    return res.success({ data :deletedInstructor });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Instructor from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Instructor.
 * @return {Object} : number of deactivated documents of Instructor. {status, message, data}
 */
const softDeleteManyInstructor = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedInstructor = await deleteDependentService.softDeleteInstructor(query, updateBody);
    if (!updatedInstructor) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedInstructor });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addInstructor,
  bulkInsertInstructor,
  findAllInstructor,
  getInstructor,
  getInstructorCount,
  updateInstructor,
  bulkUpdateInstructor,
  partialUpdateInstructor,
  softDeleteInstructor,
  deleteInstructor,
  deleteManyInstructor,
  softDeleteManyInstructor    
};
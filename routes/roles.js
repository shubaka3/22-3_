var express = require('express');
var router = express.Router();
var roleController = require('../controllers/roles');
let { check_authentication, check_authorization } = require('../utils/check_auth');
let { CreateSuccessRes } = require('../utils/responseHandler');
let constants = require('../utils/constants');

/* Get all roles - không yêu cầu quyền */
router.get('/', async function (req, res, next) {
  try {
    let roles = await roleController.GetAllRoles();
    CreateSuccessRes(res, roles, 200);
  } catch (error) {
    next(error);
  }
});

/* Create a role - yêu cầu admin */
router.post('/', check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
  try {
    let newRole = await roleController.CreateARole(req.body.name);
    CreateSuccessRes(res, newRole, 201);
  } catch (error) {
    next(error);
  }
});

/* Update a role - yêu cầu admin */
router.put('/:id', check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
  try {
    let role = await roleController.UpdateRole(req.params.id, req.body);
    CreateSuccessRes(res, role, 200);
  } catch (error) {
    next(error);
  }
});

/* Delete a role - yêu cầu admin */
router.delete('/:id', check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
  try {
    let result = await roleController.DeleteRole(req.params.id);
    CreateSuccessRes(res, result, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

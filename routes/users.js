var express = require('express');
var router = express.Router();
var userController = require('../controllers/users');
let { check_authentication, check_authorization } = require('../utils/check_auth');
let { CreateSuccessRes } = require('../utils/responseHandler');
let constants = require('../utils/constants');

/* Get all users - yêu cầu mod */
router.get('/', check_authentication, check_authorization(constants.MOD_PERMISSION), async function (req, res, next) {
  try {
    let users = await userController.GetAllUsers();
    CreateSuccessRes(res, users, 200);
  } catch (error) {
    next(error);
  }
});

/* Get user by ID - chỉ cho phép lấy thông tin của user khác */
router.get('/:id', check_authentication, check_authorization(constants.MOD_PERMISSION), async function (req, res, next) {
  try {
    if (req.user.id === req.params.id) {
      return res.status(403).json({ message: "You cannot access your own data here" });
    }
    let user = await userController.GetUserById(req.params.id);
    CreateSuccessRes(res, user, 200);
  } catch (error) {
    next(error);
  }
});

/* Create a user - yêu cầu admin */
router.post('/', check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
  try {
    let user = await userController.CreateAnUser(req.body);
    CreateSuccessRes(res, user, 201);
  } catch (error) {
    next(error);
  }
});

/* Update a user - yêu cầu admin */
router.put('/:id', check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
  try {
    let user = await userController.UpdateAnUser(req.params.id, req.body);
    CreateSuccessRes(res, user, 200);
  } catch (error) {
    next(error);
  }
});

/* Delete a user - yêu cầu admin */
router.delete('/:id', check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
  try {
    let result = await userController.DeleteAnUser(req.params.id);
    CreateSuccessRes(res, result, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/categories');
let { check_authentication, check_authorization } = require('../utils/check_auth');
let { CreateSuccessRes } = require('../utils/responseHandler');
let constants = require('../utils/constants');

/* Get all categories - không yêu cầu đăng nhập */
router.get('/', async function (req, res, next) {
  try {
    let categories = await categoryController.GetAllCategories();
    CreateSuccessRes(res, categories, 200);
  } catch (error) {
    next(error);
  }
});

/* Create a category - yêu cầu mod */
router.post('/', check_authentication, check_authorization(constants.MOD_PERMISSION), async function (req, res, next) {
  try {
    let category = await categoryController.CreateCategory(req.body);
    CreateSuccessRes(res, category, 201);
  } catch (error) {
    next(error);
  }
});

/* Update a category - yêu cầu mod */
router.put('/:id', check_authentication, check_authorization(constants.MOD_PERMISSION), async function (req, res, next) {
  try {
    let category = await categoryController.UpdateCategory(req.params.id, req.body);
    CreateSuccessRes(res, category, 200);
  } catch (error) {
    next(error);
  }
});

/* Delete a category - yêu cầu admin */
router.delete('/:id', check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
  try {
    let result = await categoryController.DeleteCategory(req.params.id);
    CreateSuccessRes(res, result, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

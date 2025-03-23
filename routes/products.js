var express = require('express');
var router = express.Router();
var productController = require('../controllers/products');
let { check_authentication, check_authorization } = require('../utils/check_auth');
let { CreateSuccessRes } = require('../utils/responseHandler');
let constants = require('../utils/constants');

/* Get all products - không yêu cầu đăng nhập */
router.get('/', async function (req, res, next) {
  try {
    let products = await productController.GetAllProducts();
    CreateSuccessRes(res, products, 200);
  } catch (error) {
    next(error);
  }
});

/* Create a product - yêu cầu mod */
router.post('/', check_authentication, check_authorization(constants.MOD_PERMISSION), async function (req, res, next) {
  try {
    let product = await productController.CreateProduct(req.body);
    CreateSuccessRes(res, product, 201);
  } catch (error) {
    next(error);
  }
});

/* Update a product - yêu cầu mod */
router.put('/:id', check_authentication, check_authorization(constants.MOD_PERMISSION), async function (req, res, next) {
  try {
    let product = await productController.UpdateProduct(req.params.id, req.body);
    CreateSuccessRes(res, product, 200);
  } catch (error) {
    next(error);
  }
});

/* Delete a product - yêu cầu admin */
router.delete('/:id', check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
  try {
    let result = await productController.DeleteProduct(req.params.id);
    CreateSuccessRes(res, result, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

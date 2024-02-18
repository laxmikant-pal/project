const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const authMiddleware = require('../middlerware/authMiddleware');
console.log(authMiddleware.verifyToken);
router.post('/create', authMiddleware.verifyToken, productController.createProduct);
router.get('/displayall', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', authMiddleware.verifyToken, productController.updateProduct);
router.delete('/:id', authMiddleware.verifyToken, productController.deleteProduct);

module.exports = router;

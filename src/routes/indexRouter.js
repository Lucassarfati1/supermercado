const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

//home 2 listados, productos recientes visitados, productos en descuento

router.get('/', productController.home);

// Ruta para crear un producto
router.get('/products/create', productController.showFormCreate);

//Ruta para mandar formulario de crear producto
router.post('/products/',productController.createProduct);

// Ruta para listar todos los productos
router.get('/products', productController.listProducts);

//Ruta para mostrar el formulario de edicion
router.get('/products/edit/:id', productController.showFormEdit);

// Ruta para actualizar un producto por ID
router.put('/products/:id', productController.updateProduct);

// Ruta para eliminar un producto por ID
router.delete('/products/:id', productController.deleteProduct);

// Ruta para mostrar detalles de un producto por ID
router.get('/products/detail/:id', productController.productDetails);

module.exports = router;
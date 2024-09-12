const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

//home 2 listados, productos recientes visitados, productos en descuento

router.get('/', productController.home);

// Ruta para crear un producto
router.post('/productos/crear', productController.createProduct);

// Ruta para listar todos los productos
router.get('/productos/lista', productController.listProducts);

// Ruta para actualizar un producto por ID
router.put('/productos/actualizar/:id', productController.updateProduct);

// Ruta para eliminar un producto por ID
router.delete('/productos/eliminar/:id', productController.deleteProducto);

// Ruta para mostrar detalles de un producto por ID
router.get('/productos/detalle/:id', productController.productDetails);

module.exports = router;
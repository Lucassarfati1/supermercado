const express = require('express');
const router = express.Router();
const multer= require('multer');
const path = require('path');
const productController = require('../controllers/productController');



// Constante para aplicar la libreria multer, relacionamos el path de destino donde se van a guardar las imgenes en local
// tambien declaramos el metodo donde va designar el nombre de cada imagen.

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/images/products'));
  },
  filename: (req,file,cb) => {
    const newFileName =  'imgProduct-' + Date.now() + path.extname(file.originalname);
    cb(null, newFileName);
  }
});

const upload = multer({storage});


//home 2 listados, productos recientes visitados, productos en descuento

router.get('/', productController.home);

// Ruta para crear un producto
router.get('/products/create', productController.showFormCreate);

//Ruta para mandar formulario de crear producto
router.post('/products/', upload.single('img'), productController.createProduct);

// Ruta para listar todos los productos
router.get('/products', productController.listProducts);

//Ruta para mostrar el formulario de edicion
router.get('/products/edit/:id', productController.showFormEdit);

// Ruta para actualizar un producto por ID
router.put('/products/:id', upload.single('img'),  productController.updateProduct);

// Ruta para eliminar un producto por ID
router.delete('/products/:id', productController.deleteProduct);

// Ruta para mostrar detalles de un producto por ID
router.get('/products/detail/:id', productController.productDetails);

module.exports = router;

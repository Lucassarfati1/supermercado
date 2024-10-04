const express = require('express');
const router = express.Router();
const multer= require('multer');
const path = require('path');
const productController = require('../controllers/productController');
const {chek,validationResult,body} = require('express-validator');



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

const validationsCreate = [
  body('name').notEmpty().withMessage('Tienes que ingresar un nombre'),
  body('category').notEmpty().withMessage('Tienes que ingresar una categoria'),
  body('price')
  .notEmpty().withMessage('NO PODES DEJAR ESTO VACIO LOCO').bail()
  .isNumeric().withMessage('Tienes que ingresar un numero'),
  body('discount')
  .notEmpty().withMessage('NO PODES DEJAR ESTO VACIO LOCO').bail()
  .isNumeric().withMessage('Tienes que ingresar un numero'),
  body('description').notEmpty().withMessage('Tienes que ingresar una descripcion'),
  body('img').custom((value, {req}) => {
      let file = req.file;
      let acceptedExtensions = ['.jpg', '.gif', '.png'];
      let fileExtension = path.extname(file.originalname);
      if(!file){
        throw new Error('Tienes que ingresar una imagen');
      }else{
        if(!acceptedExtensions.includes(fileExtension)){
          throw new Error('Las extensiones de archivo permitidas son ${acceptedExtensions.join(",")}');
        }
      }

      return true;

  })
]

const validationsEdit = [
  body('name').notEmpty().withMessage('Tienes que ingresar un nombre'),
  body('description').notEmpty().withMessage('Tienes que ingresar una descripcion')
]

//home 2 listados, productos recientes visitados, productos en descuento

router.get('/', productController.home);

// Ruta para crear un producto
router.get('/products/create', productController.showFormCreate);

//Ruta para mandar formulario de crear producto -----EXPRESS VALIDATOR PARA ESTE FORM
router.post('/products/', upload.single('img'), validationsCreate, productController.createProduct);

// Ruta para listar todos los productos
router.get('/products', productController.listProducts);

//Ruta para mostrar el formulario de edicion ----------- EXPRESS VALIDATOR PARA ESTE FORM
router.get('/products/edit/:id', validationsEdit, productController.showFormEdit);

// Ruta para actualizar un producto por ID
router.put('/products/:id', upload.single('img'),  productController.updateProduct);

// Ruta para eliminar un producto por ID
router.delete('/products/:id', productController.deleteProduct);

// Ruta para mostrar detalles de un producto por ID
router.get('/products/detail/:id', productController.productDetails);

module.exports = router;

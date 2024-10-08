const express = require('express');
const {body, validationResult} = require('express-validator');
const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');



const escribirJson = (dataBase) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(dataBase, null, 2), 'utf-8');
}

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const dataBaseProducts = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productController = {

    showFormRegister: (req,res) => {
        return res.render('register');
    },

    showFormLogin: (req,res) => {
        return res.render('login');
    },

    processLogin : (req,res) => {
        let errors = validationResult(req);

        let usersJson = fs.readFileSync('users.json', { encoding: 'utf-8'});

        let users;


        if(errors.isEmpty()){
            
            if(users.JSON == ""){

                users = [];

            }else{

            users = JSON.parse(usersJSON);

            }

            for( let i = 0; i < users.length ; i++ ){

                if(users[i].email == req.body.email){

                    if(bcrypt.compareSync(req.body.passwrod, users[i].password)){

                        let usuarioALoggearse = users[i];

                        break;
                    }
                }
            }

        if(usuarioALoggearse == undefined){

            return res.render('login', {errors: [{msg:"Credenciales invalidas"}]});
        }

        req.session.usuarioLogueado = usuarioALoggearse;

        res.render('Success');

        }else{
            return res.render('login', { errors : errors.errors });
        }
    },


    showFormCreate : (req,res) => {
        
            res.render('product-create-form');
        

    },
    home: (req,res) => {
        //res.render(dataBaseProducts, { product });
        const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        res.render('index.ejs', { products: dataBaseProducts, toThousand });
    },
    admin : (req, res) => {
        if (req.session.admin) {
            // Código normal
        } else {
            res.redirect('/login');
        }
    },

    cambiarIdioma : (req, res) => {
        const newLanguage = req.query.idioma;
        req.session.idioma = newLanguage;
    
        res.redirect('index');
    },

    createProduct : (req,res) => {
        
        const resultValidation = validationResult(req);

        // Si tiene errores, retorna la misma vista pero pasando el objeto de errores

        if(resultValidation.errors.length > 0){
            res.render('product-create-form', {
                errors:resultValidation.mapped(),
                oldData:req.body
            });
        }
            
        const id = dataBaseProducts.length + 1; 
        const category = req.body.category;
        const name = req.body.name;
        const img = req.file.filename;
        const description = req.body.description;
        const price = parseInt(req.body.price);
        const discount = parseInt(req.body.discount);
        console.log("El valor de imagen"+img);
        const producto = {
            "id": id,
            "name": name,
            "image": img,
            "price": price,
            "description" : description,
            "discount" : discount,
            "category":category
            
        }
        console.log( producto);

        dataBaseProducts.push(producto);

        escribirJson(dataBaseProducts);

        // Sobrescribir el archivo JSON con el nuevo producto agregado
        //fs.writeFileSync(productsFilePath, JSON.stringify(dataBaseProducts, null, 2), 'utf-8');

        // Redirige a la página home con un mensaje flash o una query
        res.redirect('/?msg=productoCreado');
      //  res.render('../views/productoInsertado.ejs');
        //res.send("Se ha creado el producto exitadamente");
        

    },

    listProducts : (req,res) => {
       
       // res.render('BaseDatosEjs', {dataBaseProducts});
      res.render("products", {products : dataBaseProducts, toThousand});
    },

    showFormEdit : (req,res) => {
        const idProductUpdate = parseInt(req.params.id);
        let product = dataBaseProducts[idProductUpdate - 1];
        res.render('product-edit-form', {product});
    },

    updateProduct : (req,res) => {
        const idProductUpdate = parseInt(req.params.id);
        const name = req.body.name;     
        const description = req.body.description;
        const price = parseFloat(req.body.price);
        const discount = parseFloat(req.body.discount);
        const category = req.body.category;
        
        let img = req.file ? req.file.filename : dataBaseProducts[idProductUpdate - 1].image;

         //let productUpdate = dataBaseProducts.find(product => product.id === idProductUpdate);
        console.log(idProductUpdate+" "+name+" "+img+" "+description+" ");
        const productUpdated = {
            "id": idProductUpdate,
            "name": name,
            "image": img,
            "price": price,
            "description": description,
            "discount" : discount,
            "category" : category
        }

        dataBaseProducts[idProductUpdate - 1] = productUpdated;

        const mostrarProducto = stringify(dataBaseProducts[idProductUpdate - 1]);

        fs.writeFileSync(productsFilePath, JSON.stringify(dataBaseProducts, null, 2), 'utf-8');

        console.log(category+" "+price+" "+name+" "+img+" "+description+" ");
       // res.render("" + productUpdated.name);
        res.send("Producto actualizado exitadamente "+"<br> ");
    },

    deleteProduct : (req,res) => {
        
       const idProduct = parseInt(req.params.id);

       const index = dataBaseProducts.findIndex(product => product.id === idProduct);

       if (index !== -1) {
           // Eliminar el producto del array
           dataBaseProducts.splice(index, 1);    
       }
       //res.render("productoDeleteado");
       res.send("Producto borrado exitadamente");
    },

    productDetails: (req,res) => {
        const idProduct = parseInt(req.params.id);
        const detailProduct = dataBaseProducts.find(product => product.id === idProduct);
        console.log(detailProduct);
        //res.render("getDetailsProduct", {detailProduct});
        res.render("../views/detail", { detailProduct, toThousand } );
    },

    

}


module.exports = productController;
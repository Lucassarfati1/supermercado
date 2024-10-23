const express = require('express');
const {body, validationResult} = require('express-validator');
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');
const { stringify } = require('querystring');
let db = require('../models');



const escribirJson = (dataBase) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(dataBase, null, 2), 'utf-8');
}

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const dataBaseProducts = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const usersFilePath = path.join(__dirname, '../data/users.json');
const dataBaseUsers = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const saltRounds = 10;

const hashPasswords = async () => {
    for (let user of dataBaseUsers) {
        user.password = await bcrypt.hash(user.password, saltRounds);
    }
    console.log(dataBaseUsers);
};

hashPasswords();

const productController = {

    listUsers: (req,res) => {
        //const user = db.models.User;
        db.Users.findAll()
        .then(function(users){
         return res.render("listUsers", { users : users });
     })
    },

    showFormRegister: (req,res) => {
        return res.render('register');
    },

    processRegister: (req,res) => {

        let errors = validationResult(req);

        console.log('Entra al metodo del controlador');
        
        if(errors.isEmpty()){

            console.log('Pasa sin errores');


            for( let i = 0; i < dataBaseUsers.length ; i++ ){

                console.log('Esta iterando el array');

                if(dataBaseUsers[i].email == req.body.email){

                    return res.render('register', {errors: [{msg:"Email ya registrado"}]});

                }
            }
            const email = req.body.email;

            const password = req.body.password;

            const user = {

            "email": email,

            "password": password
        };

        console.log(user);

        dataBaseUsers.push(user);

        console.log(dataBaseUsers);

        // Sobreescribes el archivo JSON con los datos actualizados

        fs.writeFileSync(usersFilePath, JSON.stringify(dataBaseUsers, null, 2));

        return res.redirect('/login');
        
    }},

    showFormLogin: (req,res) => {
        return res.render('login');
    },

    processLogin : (req,res) => {
        let errors = validationResult(req);
        console.log('Entra al metodo del controlador');
        if(errors.isEmpty()){
            console.log('Pasa sin errores');
            let usuarioALoggearse;

            for( let i = 0; i < dataBaseUsers.length ; i++ ){
                console.log('Esta iterando el array');
                if(dataBaseUsers[i].email == req.body.email){

                    if(bcrypt.compareSync(req.body.password, dataBaseUsers[i].password)){
                        console.log('Encontro un usuario que coincide');
                         usuarioALoggearse = dataBaseUsers[i];
                         const hashPass = bcrypt.hashSync(req.body.password, 10);
                         console.log('La password hassheada es: '+ hashPass);

                        break;
                    }
                }
            }

        if(usuarioALoggearse == undefined){
            console.log('No encontro ningun usuario que coincida.')
            return res.render('login', {errors: [{msg:"Credenciales invalidas"}]});
        }

        console.log('success');

        req.session.usuarioLogueado = usuarioALoggearse;

        // implementando cookies

        if(req.body.remember != undefined){
            res.cookie('remember', usuarioALoggearse.email, {maxAge:60000});
        }

        res.cookie('lastAccess', new Date());

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
       // res.render('BaseDatosEjs', {dataBaseProducts})
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
const express = require('express');

const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');





const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const dataBaseProducts = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productController = {

    createProduct : (req,res) => {
        
        const name = req.body.name;
        const img = req.body.image;
        const price = req.body.price;
        const description = req.body.description;
        const discount = req.body.discount;

        const producto = {
            "name": name,
            "image": img,
            "price": price,
            "description" : description,
            "discount" : discount
            
        }

        dataBaseProducts.push(producto);

        // Sobrescribir el archivo JSON con el nuevo producto agregado
        fs.writeFileSync(productsFilePath, JSON.stringify(dataBaseProducts, null, 2), 'utf-8');

        res.status(200).send('Producto creado: <br>' 
            + "name: " + producto.name 
            + "<br>" 
            + "description: "+ producto.description
            + "discount: " + producto.discount
        );

      //  res.render('../views/productoInsertado.ejs');
        res.send("Se ha creado el producto exitadamente");
    },

    listProducts : (req,res) => {
       
       // res.render('BaseDatosEjs', {dataBaseProducts});
      res.send(dataBaseProducts);
    },

    updateProduct : (req,res) => {
        const idProductUpdate = parseInt(req.params.id);
        const name = req.body.name;
        const img = req.body.img;
        const price = req.body.price;
        const description = req.body.description;
        const discount = req.body.discount;
        const category = req.body.category;

         //let productUpdate = dataBaseProducts.find(product => product.id === idProductUpdate);

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

        const mostrarProducto = stringify(dataBaseProducts[idProductUpdate]);

       // res.render("" + productUpdated.name);
        res.send("Producto actualizado exitadamente "+"<br> "+ mostrarProducto);
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
        //res.render("getDetailsProduct", {detailProduct});
        res.render("../views/detail", { detailProduct } );
    },

    home: (req,res) => {
        //res.render(dataBaseProducts, { product });
        const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        res.render('index.ejs', { products: dataBaseProducts, toThousand });
    }


   

}
module.exports = productController;
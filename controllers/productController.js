const express = require('express');

const dataBaseProducts = [{
    "productos": [
      {
        "name": "Camiseta básica",
        "img": "camiseta.jpg",
        "price": 19.99,
        "descripcion": "Camiseta de algodón 100% con cuello redondo.",
        "discount": 10
      },
      {
        "name": "Pantalón vaquero",
        "img": "pantalon_vaquero.jpg",
        "price": 39.99,
        "descripcion": "Pantalón vaquero con ajuste slim fit.",
        "discount": 15
      },
      {
        "name": "Zapatillas deportivas",
        "img": "zapatillas.jpg",
        "price": 49.99,
        "descripcion": "Zapatillas deportivas para running.",
        "discount": 5
      },
      {
        "name": "Chaqueta impermeable",
        "img": "chaqueta_impermeable.jpg",
        "price": 59.99,
        "descripcion": "Chaqueta impermeable para exteriores.",
        "discount": 20
      },
      {
        "name": "Reloj digital",
        "img": "reloj_digital.jpg",
        "price": 99.99,
        "descripcion": "Reloj digital resistente al agua.",
        "discount": 25
      },
      {
        "name": "Gorra de béisbol",
        "img": "gorra.jpg",
        "price": 14.99,
        "descripcion": "Gorra de béisbol ajustable.",
        "discount": 0
      },
      {
        "name": "Bolso de cuero",
        "img": "bolso_cuero.jpg",
        "price": 89.99,
        "descripcion": "Bolso de cuero genuino.",
        "discount": 30
      },
      {
        "name": "Cinturón de cuero",
        "img": "cinturon.jpg",
        "price": 24.99,
        "descripcion": "Cinturón de cuero marrón.",
        "discount": 10
      },
      {
        "name": "Gafas de sol",
        "img": "gafas_sol.jpg",
        "price": 29.99,
        "descripcion": "Gafas de sol con protección UV.",
        "discount": 12
      },
      {
        "name": "Mochila deportiva",
        "img": "mochila_deportiva.jpg",
        "price": 49.99,
        "descripcion": "Mochila deportiva con múltiples compartimentos.",
        "discount": 8
      },
      {
        "name": "Sudadera con capucha",
        "img": "sudadera.jpg",
        "price": 34.99,
        "descripcion": "Sudadera con capucha y bolsillo frontal.",
        "discount": 5
      },
      {
        "name": "Camiseta gráfica",
        "img": "camiseta_grafica.jpg",
        "price": 24.99,
        "descripcion": "Camiseta con diseño gráfico moderno.",
        "discount": 15
      },
      {
        "name": "Pantalones cortos",
        "img": "pantalones_cortos.jpg",
        "price": 19.99,
        "descripcion": "Pantalones cortos para verano.",
        "discount": 10
      },
      {
        "name": "Reloj analógico",
        "img": "reloj_analogico.jpg",
        "price": 149.99,
        "descripcion": "Reloj analógico de acero inoxidable.",
        "discount": 20
      },
      {
        "name": "Botas de montaña",
        "img": "botas_montana.jpg",
        "price": 79.99,
        "descripcion": "Botas de montaña impermeables.",
        "discount": 18
      }
    ]
  }
  ];

const productController = {

    createProduct : (req,res) => {
        
        const name = req.body.name;
        const img = req.body.img;
        const price = req.body.price;
        const descripcion = req.body.descripcion;
        const discount = req.body.discount;

        const producto = {
            "name": name,
            "img": img,
            "price": price,
            "descripcion" : descripcion,
            "discount" : discount
            
        }

        dataBaseProducts.push(producto);

        res.status(200).send('Producto creado: <br>' 
            + "name: " + producto.name 
            + "<br>" 
            + "descripcion: "+ producto.descripcion
            + "discount: " + producto.discount
        );

        res.render('../views/productoInsertado.ejs');

    },

    listProducts : (req,res) => {
       
        res.render('BaseDatosEjs', {dataBaseProducts});

    },

    updateProduct : (req,res) => {
        const idProductUpdate = parseInt(req.params.id);
        const name = req.body.name;
        const img = req.body.img;
        const descripcion = req.body.descripcion;
        const discount = req.body.discount;

         //let productUpdate = dataBaseProducts.find(product => product.id === idProductUpdate);

        const productUpdated = {
            "name": name,
            "img": img,
            "descripcion": descripcion,
            "discount" : discount
        }

        dataBaseProducts[idProductUpdate - 1] = productUpdated;

        res.render("" + productUpdated.name);

    },

    deleteProduct : (req,res) => {
        
       const idProduct = parseInt(req.params.id);

       const index = dataBaseProducts.findIndex(product => product.id === idProduct);

       if (index !== -1) {
           // Eliminar el producto del array
           dataBaseProducts.splice(index, 1);    
       }
       res.render("productoDeleteado");

    },

    productDetails: (req,res) => {
        const idProduct = parseInt(req.params.id);
        const detailProduct = dataBaseProducts.find(product => product.id === idProduct);
        res.render("getDetailsProduct", {detailProduct});
    },

    home: (req,res) => {


        res.render(dataBaseProducts, { product });

    }

}
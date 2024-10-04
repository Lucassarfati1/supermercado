const express = require('express');

const {chek,validationResult,body} = require('express-validator');

const app = express();

const path = require('path');

app.set('views', path.join(__dirname, 'views'));

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, '../public')));

//express.json(): Permite que Express procese el cuerpo de las solicitudes que contienen JSON.
app.use(express.json());

//express.urlencoded({ extended: false }): Permite que Express analice los datos enviados desde un
// formulario en formato URL.
app.use(express.urlencoded({ extended : false }));

const router = require('./routes/indexRouter');

const methodOverride = require('method-override');

app.use(methodOverride("_method")); 

app.listen(8080, ()=> {
    console.log("server abierto");
});

app.use("/", router);



//app.use(router);
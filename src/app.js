const express = require('express');

const app = express();

//express.json(): Permite que Express procese el cuerpo de las solicitudes que contienen JSON.
app.use(express.json());

//express.urlencoded({ extended: false }): Permite que Express analice los datos enviados desde un
// formulario en formato URL.
app.use(express.urlencoded({ extended : false }));

const router = require('./routes/indexRouter');

app.listen(8080, ()=> {
    console.log("server abierto");
});

app.use("/", router);

///app.set("view engine", "ejs");

//app.use(router);
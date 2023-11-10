import express from "express";
import handlebars from 'express-handlebars';
import path from 'path';
import { __dirname } from './utils.js';
import productsRouter from "../src/routers/products.router.js";
import cartsRouter from "../src/routers/carts.router.js";
import homeRouter from './routers/home.router.js';
// import productsRouterMD from "../src/routers/api/products.router.js";
// import cartsRouterMD from "../src/routers/api/carts.router.js";
import chatRouter from '../src/routers/chat.router.js';
// import chatRouterMD from '../src/routers/api/chat.router.js'
import Views from "../src/routers/views.router.js"

// Configuración Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Configuración Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');


app.use('/', homeRouter, productsRouter, cartsRouter);
// app.use('/api', productsRouter, cartsRouter);
// app.use('/api', productsRouterMD, cartsRouterMD);
app.use('/chat', chatRouter);
app.use('/views', Views);



app.use((error, req, res, next) => {
    const message = `😨 Ah ocurrido un error desconocido: ${error.message}`;
    console.error(message);
    res.status(500).json({ message });
});


export default app;


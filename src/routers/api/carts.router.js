import { Router } from "express";
import CartManager from "../../dao/cartManagerMongo.js";
// import ProductManager from "../dao/productManager.js";

const cartsRouter = Router();

// Endpoint para obtener todos los carritos
cartsRouter.get('/carts', async (req, res) => {
    try {
        const carts = await CartManager.getAllCarts();
        // console.log(carts); 
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para obtener un carrito por ID
cartsRouter.get('/carts/:cartId', async (req, res) => {
    try {
        const { cartId } = req.params;
        const cart = await CartManager.getCartById(cartId);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para crear un nuevo carrito
cartsRouter.post('/carts', async (req, res) => {
    try {
        const newCart = await CartManager.createCart();
        res.status(200).json(newCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para agregar un producto a un carrito
cartsRouter.post('/carts/:cartId/products/:productId', async (req, res) => {
    try {
        const { cartId, productId } = req.params;
        const quantity = 1; // Siempre incrementamos la cantidad en 1

        await CartManager.addProductToCart(cartId, productId, quantity);

        res.status(200).json({ message: 'Producto agregado al carrito correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para eliminar un carrito por ID
cartsRouter.delete('/carts/:cartId', async (req, res) => {
    try {
        const { cartId } = req.params;
        await CartManager.deleteCart(cartId);
        res.status(200).json({ message: 'Carrito eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para eliminar un producto del carrito
cartsRouter.delete('/carts/:cartId/products/:productId', async (req, res) => {
    try {
        const { cartId, productId } = req.params;

        await CartManager.removeProductFromCart(cartId, productId);

        res.status(200).json({ message: 'Producto eliminado del carrito correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default cartsRouter;

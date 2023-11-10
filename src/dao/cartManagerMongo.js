import Cart from '../models/cart.model.js';
import { Exception } from '../utils.js';
import { v4 as uuidv4 } from 'uuid';


export default class CartManager {
  
  static async getAllCarts() {
    try {
      const cart = await Cart.find();
      return cart;
    } catch (error) {
      console.error('Error al obtener todos los carritos:', error);
      throw new Exception('Error al obtener todos los carritos', 500);
    }
  }

  static async getCartById(cartId) {
    try {
      const cart = await Cart.findById(cartId);
      return cart;
    } catch (error) {
      console.error('Error al obtener el carrito por ID:', error);
      throw new Exception('Error al obtener el carrito por ID', 500);
    }
  }
  
  static getNewId() {
    return uuidv4();
  }

  static async createCart() {
    try {
      // console.log(CartManager.getNewId());
      const newCart = await Cart.create({ id: CartManager.getNewId(), products: [] });
      return newCart;
    } catch (error) {
      console.error('Error al crear el carrito:', error);
      throw new Exception('Error al crear el carrito', 500);
    }
  }

  static async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Exception('Carrito no encontrado', 404);
      }

      const existingProduct = cart.products.find(product => product.productId === productId);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      await cart.save();
      return cart;
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
      throw new Exception('Error al agregar producto al carrito', 500);
    }
  }
  
  static async deleteCart(cartId) {
    try {
      const deletedCart = await Cart.findByIdAndDelete(cartId);
      return deletedCart;
    } catch (error) {
      console.error('Error al eliminar el carrito:', error);
      throw new Exception('Error al eliminar el carrito', 500);
    }
  }

  static async removeProductFromCart(cartId, productId) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Exception('Carrito no encontrado', 404);
      }

      const updatedProducts = cart.products.filter(product => product.productId !== productId);

      cart.products = updatedProducts;
      await cart.save();
      return cart;
    } catch (error) {
      console.error('Error al remover producto del carrito:', error);
      throw new Exception('Error al remover producto del carrito', 500);
    }
  }


  static async updateCart(cartId, products) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Exception('Carrito no encontrado', 404);
      }

      cart.products = products; // Reemplazar productos en el carrito
      await cart.save();
      return cart;
    } catch (error) {
      console.error('Error al actualizar el carrito:', error);
      throw new Exception('Error al actualizar el carrito', 500);
    }
  }

  static async updateProductQuantity(cartId, productId, quantity) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Exception('Carrito no encontrado', 404);
      }

      const existingProduct = cart.products.find(product => product.productId.toString() === productId);

      if (existingProduct) {
        existingProduct.quantity = quantity;
      }

      await cart.save();
      return cart;
    } catch (error) {
      console.error('Error al actualizar la cantidad del producto en el carrito:', error);
      throw new Exception('Error al actualizar la cantidad del producto en el carrito', 500);
    }
  }

  static async removeAllProductsFromCart(cartId) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Exception('Carrito no encontrado', 404);
      }

      cart.products = []; // Eliminar todos los productos del carrito
      await cart.save();
      return cart;
    } catch (error) {
      console.error('Error al eliminar todos los productos del carrito:', error);
      throw new Exception('Error al eliminar todos los productos del carrito', 500);
    }
  }

}

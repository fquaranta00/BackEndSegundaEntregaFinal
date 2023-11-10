import { Server } from 'socket.io';
import ProductManager from './dao/productManager.js';
import MessageManager from './dao/messageManager.js';

let io;
let messages = [];

export const init = (httpServer) => {
  io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log(`Nuevo cliente conectado 🎉 (${socket.id})`);

    socket.on('new-product', async (data) => {
      try {
        console.log('Nuevo producto recibido:', data);
        await ProductManager.addProduct(data);
        const updatedProducts = await ProductManager.getJSONFromFile();
        io.emit('updated-product-list', updatedProducts);
        socket.emit('product-added', 'Producto agregado exitosamente');
      } catch (error) {
        console.error('Error al agregar producto:', error);
        socket.emit('product-add-error', 'Error al agregar el producto');
      }
    });

    // Borrar producto
    socket.on('delete-product', async (productId) => {
      try {
        await ProductManager.deleteProduct(productId);

        const updatedProducts = await ProductManager.getJSONFromFile();
        io.emit('updated-product-list', updatedProducts);

        socket.emit('product-deleted', 'Producto eliminado exitosamente');
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        socket.emit('product-delete-error', 'Error al eliminar el producto');
      }
    });

    socket.on('disconnect', () => {
      console.log(`Cliente desconectado (${socket.id}) 😨.`);
    });
  });

  // Conexion del Chat
  io.on('connection', (socketClient) => {
    console.log(`Se ha conectado un nuevo cliente 🎉 (${socketClient.id})`);

    socketClient.emit('notification', { messages });
    socketClient.broadcast.emit('new-client');

    socketClient.on('new-message', async (data) => {
      const { username, text } = data;
      messages.push({ username, text });

      try {
        await MessageManager.createMessage(username, text);
      } catch (error) {
        console.error('Error al guardar el mensaje en la base de datos:', error);
      }

      io.emit('notification', { messages });
    });
  });

  console.log('Server socket running 🚀');
};

export const emitFromApi = (eventName, data) => {
  io.emit(eventName, data);
};

import Message from '../models/message.model.js';

export default class MessageManager {
  static async getAllMessages() {
    try {
      const messages = await Message.find();
      return messages;
    } catch (error) {
      console.error('Error al obtener todos los mensajes:', error);
      throw new Error('Error al obtener todos los mensajes');
    }
  }

  static async createMessage(user, message) {
    try {
      const newMessage = await Message.create({ user, message });
      return newMessage;
    } catch (error) {
      console.error('Error al crear el mensaje:', error);
      throw new Error('Error al crear el mensaje');
    }
  }
}

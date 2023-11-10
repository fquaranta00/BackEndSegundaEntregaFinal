import mongoose from 'mongoose';

const productQuantitySchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Cambiado a referencia de Product
  quantity: { type: Number, required: true },
});

const productOrderSchema = new mongoose.Schema({
  id: { type: String, required: true },
  products: [productQuantitySchema],
}, { timestamps: true });

export default mongoose.model('Cart', productOrderSchema);

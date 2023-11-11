import mongoose from 'mongoose';

const productQuantitySchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
}, { _id: false });

const productOrderSchema = new mongoose.Schema({
  // id: { type: String, required: true },
  products: [productQuantitySchema],
}, { timestamps: true });


productOrderSchema.pre('find', function (next) {
  this.populate('products.productId');
  next();
});


export default mongoose.model('Cart', productOrderSchema);

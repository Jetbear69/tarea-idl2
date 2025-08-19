import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true, min: 0 },
  categoria: { type: String, required: true },
  stock: { type: Number, required: true, min: 0 },
  fechaRegistro: { type: Date, default: Date.now }
});

const Producto = mongoose.model('Producto', productoSchema);
export default Producto;
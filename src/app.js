import dotenv from 'dotenv';
import express from 'express';
import conectarDB from './config/db.js';
import productoRoutes from './routes/productoRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

await conectarDB();

app.use(productoRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
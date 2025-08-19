import { Router } from 'express';
import {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  reportePorCategoria,
  promedioPrecio,
  actualizarPrecios
} from '../controllers/productoController.js';

const router = Router();

router.get('/api/productos', listarProductos);
router.get('/api/productos/:id', obtenerProducto);
router.post('/api/productos', crearProducto);
router.put('/api/productos/:id', actualizarProducto);
router.delete('/api/productos/:id', eliminarProducto);

router.get('/api/productos/reportes/categoria', reportePorCategoria);
router.get('/api/productos/reportes/promedio-precio', promedioPrecio);
router.put('/api/productos/actualizar-precios', actualizarPrecios);

export default router;
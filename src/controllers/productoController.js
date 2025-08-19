import Producto from '../models/producto.js';

export const listarProductos = async (req, res) => {
  try {
    const { categoria, minPrecio, maxPrecio, nombre, stockMenor } = req.query;
    let filtro = {};

    if (categoria) filtro.categoria = categoria;
    if (minPrecio || maxPrecio) filtro.precio = {};
    if (minPrecio) filtro.precio.$gte = Number(minPrecio);
    if (maxPrecio) filtro.precio.$lte = Number(maxPrecio);
    if (nombre) filtro.nombre = { $regex: nombre, $options: 'i' };
    if (stockMenor) filtro.stock = { $lt: Number(stockMenor) };

    const productos = await Producto.find(filtro);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar productos' });
  }
};

export const obtenerProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto' });
  }
};

export const crearProducto = async (req, res) => {
  try {
    const { nombre, precio, categoria, stock } = req.body;
    if (!nombre || !precio || precio <= 0) {
      return res.status(400).json({ error: 'Datos inválidos' });
    }
    const nuevoProducto = new Producto({
      nombre,
      precio,
      categoria,
      stock,
      fechaRegistro: new Date()
    });
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const { nombre, precio, categoria, stock } = req.body;
    if (precio && precio <= 0) {
      return res.status(400).json({ error: 'Precio inválido' });
    }
    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      { nombre, precio, categoria, stock },
      { new: true, runValidators: true }
    );
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};

export const reportePorCategoria = async (req, res) => {
  try {
    const resultado = await Producto.aggregate([
      { $group: { _id: "$categoria", cantidad: { $sum: 1 } } }
    ]);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error en el reporte' });
  }
};

export const promedioPrecio = async (req, res) => {
  try {
    const resultado = await Producto.aggregate([
      { $group: { _id: null, promedio: { $avg: "$precio" } } }
    ]);
    res.json({ promedio: resultado[0]?.promedio || 0 });
  } catch (error) {
    res.status(500).json({ error: 'Error en el reporte' });
  }
};

export const actualizarPrecios = async (req, res) => {
  try {
    const porcentaje = Number(req.query.porcentaje);
    if (!porcentaje) return res.status(400).json({ error: 'Porcentaje requerido' });

    const resultado = await Producto.updateMany(
      {},
      [{ $set: { precio: { $multiply: ["$precio", 1 + porcentaje / 100] } } }]
    );
    res.json({ mensaje: 'Precios actualizados', resultado });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar precios' });
  }
};
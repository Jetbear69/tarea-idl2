# API de Productos

Este proyecto es una API REST para la gestión de productos, que permite realizar operaciones CRUD completas, así como búsquedas y filtros avanzados. La API está construida con Node.js y Express, y utiliza MongoDB como base de datos.

## Estructura del Proyecto

```
api-productos
├── src
│   ├── controllers         # Controladores para manejar la lógica de negocio
│   │   └── productoController.js
│   ├── models              # Modelos de datos
│   │   └── producto.js
│   ├── routes              # Rutas de la API
│   │   └── productoRoutes.js
│   ├── app.js              # Punto de entrada de la aplicación
│   └── config              # Configuración de la base de datos
│       └── db.js
├── package.json            # Configuración de npm
├── .env                    # Variables de entorno
├── README.md               # Documentación del proyecto
└── swagger.json            # Documentación de la API en formato Swagger
```

## Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   cd api-productos
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Configura las variables de entorno en el archivo `.env`:
   ```
   MONGODB_URI=<tu_cadena_de_conexión_a_mongodb>
   ```

4. Inicia la aplicación:
   ```
   npm start
   ```

## Endpoints de la API

- `GET /api/productos` - Listar todos los productos.
- `GET /api/productos/:id` - Obtener un producto por ID.
- `POST /api/productos` - Crear un nuevo producto.
- `PUT /api/productos/:id` - Actualizar producto por ID.
- `DELETE /api/productos/:id` - Eliminar producto por ID.

## Filtros y Búsquedas

- `GET /api/productos?categoria=Electrónica` - Filtrar por categoría.
- `GET /api/productos?minPrecio=100&maxPrecio=500` - Filtrar por rango de precios.
- `GET /api/productos?nombre=tv` - Buscar productos por coincidencia en el nombre.
- `GET /api/productos?stockMenor=10` - Listar productos con stock bajo.

## Consultas Avanzadas

- `GET /api/productos/reportes/categoria` - Contar cuántos productos hay por categoría.
- `GET /api/productos/reportes/promedio-precio` - Calcular precio promedio de productos.
- `PUT /api/productos/actualizar-precios?porcentaje=10` - Actualización masiva de precios.

## Buenas Prácticas

- Respuestas en formato JSON.
- Manejo de errores (400, 404, 500).
- Validación de datos en entradas.
- Documentación de endpoints con Swagger o Postman.
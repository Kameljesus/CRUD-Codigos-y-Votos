// Importamos Express
const express = require('express');

// Creamos la app
const app = express();

// Importamos los datos de los temas y subtemas:
const {infoTemas} = require('./datos/temas.js');

// Puerto
const PORT = 3000;

// Middleware para archivos estáticos (CSS, JS, imágenes)
app.use(express.static('public'));

// Middleware para parsear JSON en POST/PUT/PATCH
app.use(express.json());

// Motor de plantillas EJS
app.set('view engine', 'ejs');

// Importamos routers
const routerBartending = require('./routes/bartending.js');
const routerVideojuegos = require('./routes/videojuegos.js');
const routerCocina = require('./routes/cocina.js');

// Ruta principal: renderiza todos los temas principales con sus subtemas
app.get('/', (req, res) => {
  res.render('index', { infoTemas });
});

// Montamos routers
app.use('/api/bartending', routerBartending);
app.use('/api/videojuegos', routerVideojuegos);
app.use('/api/cocina', routerCocina);

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// app.js


// Importamos Express
const express = require('express');

// Creamos la app
const app = express();

// Importamos los datos de los temas y subtemas:
const {infoTemas} = require('./datos/db.js');

// Puerto
const PORT = 3000;


// Middleware para archivos estáticos (CSS, JS, imágenes)
app.use(express.static('public'));

// Middleware para parsear JSON en POST/PUT/PATCH
app.use(express.json());

// Motor de plantillas EJS
app.set('view engine', 'ejs');


// Importamos routers
const routerTemas = require('./routes/temas.js');
const routerSubtemas = require('./routes/subtemas.js');

// Montamos routers:
// Rutas principales de temas
app.use('/', routerTemas);

// Rutas de subtemas (dependen de un tema)
app.use('/:tema', routerSubtemas);


// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

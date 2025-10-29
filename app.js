const express = require('express');
const app = express();
const path = require('path');
const db = require('./model/db.js'); // tu base de datos SQLite

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // carpeta donde está tu .ejs

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal
app.get('/', (req, res) => {
  db.all('SELECT * FROM temas ORDER BY votos DESC', (err, temas) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al obtener los temas');
    }
    res.render('index', { temas }); // <-- aquí pasamos los temas al .ejs
  });
});

app.use('/temas', require('./controllers/temas.js'));
app.use('/temas/:tema/subtemas', require('./controllers/subtemas.js')); // si lo necesitas

app.listen(3000, () => console.log('Servidor escuchando en http://localhost:3000'));

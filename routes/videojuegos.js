const express = require('express');
const routerVideojuegos = express.Router();

// Importamos solo los subtemas de videojuegos
const { infoTemas } = require('../datos/temas.js');
const videojuegos = infoTemas.videojuegos;

// Middleware para parsear JSON
routerVideojuegos.use(express.json());

// GET /
// Devuelve todos los subtemas de videojuegos
routerVideojuegos.get('/', (req, res) => res.json(videojuegos));

// PATCH /:id/votar
// Incrementa votos de un subtema
routerVideojuegos.patch('/:id/votar', (req, res) => {
  const id = parseInt(req.params.id);
  const subtema = videojuegos.find(s => s.id === id);
  if (!subtema) return res.status(404).send('Subtema no encontrado');

  subtema.votos += 1;
  res.json(subtema);
});

module.exports = routerVideojuegos;

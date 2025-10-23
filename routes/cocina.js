const express = require('express');
const routerCocina = express.Router();

// Importamos los subtemas de cocina
const { infoTemas } = require('../datos/temas.js');
const cocina = infoTemas.cocina;

// Middleware para parsear JSON
routerCocina.use(express.json());

// GET /
// Devuelve todos los subtemas de cocina
routerCocina.get('/', (req, res) => res.json(cocina));

// PATCH /:id/votar
// Incrementa votos de un subtema
routerCocina.patch('/:id/votar', (req, res) => {
  const id = parseInt(req.params.id);
  const subtema = cocina.find(s => s.id === id);
  if (!subtema) return res.status(404).send('Subtema no encontrado');

  subtema.votos += 1;
  res.json(subtema);
});

module.exports = routerCocina;

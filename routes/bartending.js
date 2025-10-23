// Importamos Express
const express = require('express');

// Creamos un router específico para bartending
const routerBartending = express.Router();

// Importamos los datos de los temas
const { bartending } = require('../datos/temas.js').infoTemas;

// Middleware para parsear JSON en el body de las solicitudes POST/PUT/PATCH
routerBartending.use(express.json());

/**
 * GET /
 * Devuelve todos los subtemas de Bartending
 * URL: /api/bartending
 */
routerBartending.get('/', (req, res) => res.json(bartending));

/**
 * GET /:id
 * Devuelve un subtema específico por id
 * URL ejemplo: /api/bartending/2
 */
routerBartending.get('/:id', (req, res) => {
  const id = parseInt(req.params.id); // Convertimos el parámetro a número
  const subtema = bartending.find(s => s.id === id); // Buscamos el subtema
  if (!subtema) return res.status(404).send('Subtema no encontrado'); // Si no existe
  res.json(subtema); // Si existe, lo devolvemos
});

/**
 * POST /
 * Crea un subtema nuevo
 * Body esperado: { "titulo": "Nombre", "votos": 0 }
 */
routerBartending.post('/', (req, res) => {
  const subtemaNuevo = req.body;

  // Generamos un ID automático
  subtemaNuevo.id = bartending.length > 0 ? bartending[bartending.length - 1].id + 1 : 1;

  // Si no se pasa votos, lo iniciamos en 0
  if (!subtemaNuevo.votos) subtemaNuevo.votos = 0;

  // Agregamos al array
  bartending.push(subtemaNuevo);

  // Devolvemos el subtema recién creado
  res.json(subtemaNuevo);
});

/**
 * PUT /:id
 * Reemplaza un subtema por completo
 */
routerBartending.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = bartending.findIndex(s => s.id === id);

  if (index === -1) return res.status(404).send('Subtema no encontrado');

  // Reemplazamos todo el objeto subtema
  const actualizado = req.body;
  actualizado.id = id; // mantenemos el mismo ID
  bartending[index] = actualizado;

  res.json(actualizado);
});

/**
 * PATCH /:id
 * Actualiza parcialmente un subtema
 */
routerBartending.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const subtema = bartending.find(s => s.id === id);

  if (!subtema) return res.status(404).send('Subtema no encontrado');

  // Mezclamos los datos nuevos con los existentes
  Object.assign(subtema, req.body);

  res.json(subtema);
});

/**
 * PATCH /:id/votar
 * Incrementa en 1 el número de votos de un subtema
 */
routerBartending.patch('/:id/votar', (req, res) => {
  const id = parseInt(req.params.id);
  const subtema = bartending.find(s => s.id === id);

  if (!subtema) return res.status(404).send('Subtema no encontrado');

  subtema.votos += 1; // sumamos 1 voto
  res.json(subtema);
});

/**
 * DELETE /:id
 * Elimina un subtema
 */
routerBartending.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = bartending.findIndex(s => s.id === id);

  if (index === -1) return res.status(404).send('Subtema no encontrado');

  // Eliminamos del array
  const eliminado = bartending.splice(index, 1);

  res.json(eliminado[0]); // devolvemos el subtema eliminado
});

// Exportamos el router para usarlo en app.js
module.exports = routerBartending;

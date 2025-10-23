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
 * Admite filtros: ?votos=30 o ?orden=desc
 */
routerBartending.get('/', (req, res) => {
  let resultados = [...bartending];
  const { votos, orden } = req.query;

  if (votos) {
    resultados = resultados.filter(subtema => subtema.votos == parseInt(votos));
  }

  if (orden === 'asc') {
    resultados.sort((a, b) => a.votos - b.votos);
  } else if (orden === 'desc') {
    resultados.sort((a, b) => b.votos - a.votos);
  }

  res.json(resultados);
});


/**
 * GET /:param
 * Si el parámetro es numérico → busca por ID
 * Si es texto → busca por título
 */
routerBartending.get('/:param', (req, res) => {
  const { param } = req.params;
  let resultados;

  if (!isNaN(param)) {
    const id = parseInt(param);
    resultados = bartending.filter(subtema => subtema.id === id);
  } else {
    const titulo = param.toLowerCase();
    resultados = bartending.filter(subtema => subtema.titulo.toLowerCase() === titulo);
  }

  if (resultados.length === 0) {
    return res.status(404).send(`No se encontraron subtemas con el parámetro: ${param}`);
  }

  res.json(resultados);
});


/**
 * POST /
 * Crea un subtema nuevo
 * Body esperado: { "titulo": "Nombre", "votos": 0 }
 */
routerBartending.post('/', (req, res) => {
  const nuevoSubtema = req.body;

  if (!nuevoSubtema.titulo) {
    return res.status(400).send('Falta el campo "titulo"');
  }

  nuevoSubtema.id = bartending.length > 0 ? bartending[bartending.length - 1].id + 1 : 1;
  bartending.push(nuevoSubtema);

  res.status(201).json(nuevoSubtema);
});


/**
 * PUT /:id
 * Reemplaza un subtema por completo
 */
routerBartending.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = bartending.findIndex(subtema => subtema.id === id);

  if (index === -1) {
    return res.status(404).send(`No se encontraron subtemas con el id: ${id}`);
  }

  bartending[index] = { id, ...req.body };
  res.json(bartending[index]);
});


/**
 * PATCH /:id
 * Actualiza parcialmente un subtema
 */
routerBartending.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = bartending.findIndex(subtema => subtema.id === id);

  if (index === -1) {
    return res.status(404).send(`No se encontraron subtemas con el id: ${id}`);
  }

  Object.assign(bartending[index], req.body);
  res.json(bartending[index]);
});


// Lo exportamos
module.exports = routerBartending;

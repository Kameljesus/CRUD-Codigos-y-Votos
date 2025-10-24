// routes/temas.js


// Importamos Express
const express = require('express');

// Creamos un router específico para temas
const routerTemas = express.Router();

// Importamos los datos de los temas
const { infoTemas } = require('../datos/db.js');


// Middleware para parsear JSON en el body de las solicitudes POST/PUT/PATCH
routerTemas.use(express.json());


/**
 * GET /
 * Devuelve todos los temas
 * Ejemplo: GET / → devuelve todos los temas con sus votos
 */
routerTemas.get('/', (req, res) => {
  res.json(infoTemas);
});


/**
 * GET /:tema
 * Devuelve un tema por su nombre.
 * Ejemplo: GET /bartending → devuelve { titulo, votos }
 */
routerTemas.get('/:tema', (req, res) => {
  const nombreTema = req.params.tema.toLowerCase();

  const temaEncontrado = Object.values(infoTemas).find(
    tema => tema.titulo.toLowerCase() === nombreTema
  );

  if (!temaEncontrado) {
    return res.status(404).send(`El tema "${nombreTema}" no existe`);
  }

  res.json({
    id: temaEncontrado.id,
    titulo: temaEncontrado.titulo,
    votos: temaEncontrado.votos
  });
});


/**
 * POST /
 * Crea un tema nuevo
 */
routerTemas.post('/', (req, res) => {
  const { tituloTema } = req.body;

  if (!tituloTema) return res.status(400).send('Se necesita un título para el tema');
  if (infoTemas[tituloTema.toLowerCase()]) {
    return res.status(400).send('El tema ya existe');
  }

  const id = Object.keys(infoTemas).length + 1;

  infoTemas[tituloTema.toLowerCase()] = {
    id,
    titulo: tituloTema,
    votos: 0,
    subtemas: []
  };

  res.status(201).json({
    mensaje: 'Tema creado',
    tema: infoTemas[tituloTema.toLowerCase()]
  });
});


/**
 * PUT /:tema
 * Actualiza los votos o el título de un tema existente
 */
routerTemas.put('/:tema', (req, res) => {
  const { tema } = req.params;
  const { tituloTema, votos } = req.body;

  if (!infoTemas[tema]) {
    return res.status(404).send(`El tema "${tema}" no existe`);
  }

  if (tituloTema) infoTemas[tema].titulo = tituloTema;
  if (votos !== undefined) infoTemas[tema].votos = votos;

  res.json({
    mensaje: 'Tema actualizado',
    tema: infoTemas[tema]
  });
});


/**
 * DELETE /:tema
 * Elimina un tema completo
 */
routerTemas.delete('/:tema', (req, res) => {
  const { tema } = req.params;

  if (!infoTemas[tema]) {
    return res.status(404).send(`El tema "${tema}" no existe`);
  }

  delete infoTemas[tema]; // elimina el tema del objeto
  res.json({ mensaje: `Tema "${tema}" eliminado correctamente` });
});


module.exports = routerTemas;

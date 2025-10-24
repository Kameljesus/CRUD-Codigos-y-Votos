// routes/subtemas.js


// Importamos Express
const express = require('express');

// Creamos un router específico para subtemas
const routerSubtemas = express.Router({ mergeParams: true });

// Importamos los datos de los temas
const { infoTemas } = require('../datos/db.js');


// Middleware
routerSubtemas.use(express.json());


/**
 * GET /:tema/
 * Devuelve todos los subtemas de un tema.
 */
routerSubtemas.get('/', (req, res) => {
  const tema = req.params.tema.toLowerCase();

  if (!infoTemas[tema]) {
    return res.status(404).send(`El tema "${tema}" no existe.`);
  }

  res.json(infoTemas[tema].subtemas);
});


/**
 * GET /:tema/:subtema
 * Devuelve un subtema específico de un tema.
 */
routerSubtemas.get('/:subtema', (req, res) => {
  const tema = req.params.tema.toLowerCase();
  const subtemaNombre = req.params.subtema.toLowerCase();

  if (!infoTemas[tema]) {
    return res.status(404).send(`El tema "${tema}" no existe.`);
  }

  const subtema = infoTemas[tema].subtemas.find(
    s => s.titulo.toLowerCase() === subtemaNombre
  );

  if (!subtema) {
    return res.status(404).send(`El subtema "${subtemaNombre}" no existe en "${tema}".`);
  }

  res.json(subtema);
});


/**
 * POST /:tema
 * Crea un subtema nuevo
 */
routerSubtemas.post('/', (req, res) => {
  const tema = req.params.tema.toLowerCase();
  const { tituloSubtema } = req.body;

  if (!infoTemas[tema]) return res.status(404).send('El tema principal no existe');
  if (!tituloSubtema) return res.status(400).send('Se necesita un título para el subtema');

  const subtemas = infoTemas[tema].subtemas;
  const idSubtema = subtemas.length + 1;

  const nuevoSubtema = {
    id: idSubtema,
    titulo: tituloSubtema,
    votos: 0
  };

  subtemas.push(nuevoSubtema);

  res.status(201).json({
    mensaje: 'Subtema agregado',
    subtema: nuevoSubtema
  });
});


/**
 * PUT /:tema/:idSubtema
 * Actualiza un subtema
 */
routerSubtemas.put('/:idSubtema', (req, res) => {
  const tema = req.params.tema.toLowerCase();
  const { idSubtema } = req.params;
  const { tituloSubtema, votos } = req.body;

  if (!infoTemas[tema]) {
    return res.status(404).send(`El tema "${tema}" no existe`);
  }

  const subtemas = infoTemas[tema].subtemas;
  const subtema = subtemas.find(sub => sub.id == idSubtema);

  if (!subtema) {
    return res.status(404).send(`El subtema con ID ${idSubtema} no existe dentro de "${tema}"`);
  }

  if (tituloSubtema) subtema.titulo = tituloSubtema;
  if (votos !== undefined) subtema.votos = votos;

  res.json({
    mensaje: 'Subtema actualizado',
    subtema
  });
});


/**
 * DELETE /:tema/:idSubtema
 * Elimina un subtema específico de un tema
 */
routerSubtemas.delete('/:idSubtema', (req, res) => {
  const tema = req.params.tema.toLowerCase();
  const { idSubtema } = req.params;

  if (!infoTemas[tema]) {
    return res.status(404).send(`El tema "${tema}" no existe`);
  }

  const subtemas = infoTemas[tema].subtemas;
  const index = subtemas.findIndex(sub => sub.id == idSubtema);

  if (index === -1) {
    return res.status(404).send(`El subtema con ID ${idSubtema} no existe en "${tema}"`);
  }

  subtemas.splice(index, 1); // elimina el subtema
  res.json({ mensaje: `Subtema con ID ${idSubtema} eliminado de "${tema}"` });
});


module.exports = routerSubtemas;

// Importamos Express
const express = require('express');

// Creamos un router específico para subtemas
const routerSubtemas = express.Router({ mergeParams: true }); // 👈 importante para acceder a req.params.tema

// Importamos la conexión a SQLite
const db = require('../model/db.js');

// Middleware
routerSubtemas.use(express.json());


/**
 * GET /
 * Devuelve todos los subtemas de un tema.
 * Ejemplo: GET /temas/bartending/subtemas → devuelve [{ id, titulo, votos }]
 */
routerSubtemas.get('/', (req, res) => {
  const temaNormalizado = req.params.tema?.toLowerCase();

  if (!temaNormalizado) {
    return res.status(400).json({ error: 'Falta el parámetro del tema en la URL' });
  }

  // 1️⃣ Buscamos el tema principal
  const temaQuery = `
    SELECT id 
    FROM temas 
    WHERE LOWER(titulo) = ?
  `;

  db.get(temaQuery, [temaNormalizado], (err, tema) => {
    if (err) {
      console.error('❌ Error al buscar el tema:', err.message);
      return res.status(500).json({ error: 'Error al buscar el tema' });
    }

    if (!tema) {
      return res.status(404).send(`El tema "${temaNormalizado}" no existe.`);
    }

    // 2️⃣ Obtenemos todos los subtemas asociados a ese tema
    const subtemasQuery = `
      SELECT id, titulo, votos, enlace
      FROM subtemas 
      WHERE tema_id = ?
      ORDER BY votos DESC
    `;

    db.all(subtemasQuery, [tema.id], (err, rows) => {
      if (err) {
        console.error('❌ Error al obtener los subtemas:', err.message);
        return res.status(500).json({ error: 'Error al obtener los subtemas' });
      }

      // 👇 Si se usa EJS, renderizamos una vista
      res.render('subtemas', { tema: temaNormalizado, subtemas: rows });
    });
  });
});


/**
 * GET /:subtema
 * Devuelve un subtema específico de un tema.
 * Ejemplo: GET /temas/bartending/subtemas/gintonic → devuelve { id, titulo, votos }
 */
routerSubtemas.get('/:subtema', (req, res) => {
  const temaNormalizado = req.params.tema?.toLowerCase();
  const subtemaNormalizado = req.params.subtema?.toLowerCase();

  if (!temaNormalizado || !subtemaNormalizado) {
    return res.status(400).json({ error: 'Faltan parámetros en la URL' });
  }

  const temaQuery = `
    SELECT id 
    FROM temas 
    WHERE LOWER(titulo) = ?
  `;

  db.get(temaQuery, [temaNormalizado], (err, tema) => {
    if (err) return res.status(500).json({ error: 'Error al buscar el tema' });
    if (!tema) return res.status(404).send(`El tema "${temaNormalizado}" no existe.`);

    const subtemaQuery = `
      SELECT id, titulo, votos, enlace
      FROM subtemas 
      WHERE tema_id = ? AND LOWER(titulo) = ?
    `;

    db.get(subtemaQuery, [tema.id, subtemaNormalizado], (err, subtema) => {
      if (err) return res.status(500).json({ error: 'Error al buscar el subtema' });
      if (!subtema) return res.status(404).send(`El subtema "${subtemaNormalizado}" no existe en "${temaNormalizado}".`);

      res.json(subtema);
    });
  });
});


/**
 * GET /ver/:subtema
 * Muestra la página del enlace del subtema
 */
routerSubtemas.get('/ver/:subtema', (req, res) => {
  const temaNormalizado = req.params.tema?.toLowerCase();
  const subtemaNormalizado = req.params.subtema?.toLowerCase();

  const temaQuery = `SELECT id FROM temas WHERE LOWER(titulo) = ?`;

  db.get(temaQuery, [temaNormalizado], (err, tema) => {
    if (err || !tema) return res.status(404).send('Tema no encontrado');

    const subtemaQuery = `
      SELECT titulo, enlace 
      FROM subtemas 
      WHERE tema_id = ? AND LOWER(titulo) = ?
    `;

    db.get(subtemaQuery, [tema.id, subtemaNormalizado], (err, subtema) => {
      if (err || !subtema) return res.status(404).send('Subtema no encontrado');

      res.render('subtemaEnlace', {
        tema: temaNormalizado,
        subtema: subtema.titulo,
        enlace: subtema.enlace
      });
    });
  });
});



/**
 * POST /
 * Crea un subtema nuevo dentro de un tema existente.
 * Ejemplo: POST /temas/bartending/subtemas con body { "tituloSubtema": "cocteles clásicos" }
 * Devuelve: { mensaje: '✅ Subtema agregado', subtema: { id, titulo, votos, enlace } }
 */
routerSubtemas.post('/', (req, res) => {
  const temaNormalizado = req.params.tema?.toLowerCase();
  const { tituloSubtema } = req.body;

  if (!temaNormalizado) return res.status(400).send('Falta el tema principal en la URL');
  if (!tituloSubtema) return res.status(400).send('Se necesita un título para el subtema');

  const temaQuery = `
    SELECT id 
    FROM temas 
    WHERE LOWER(titulo) = ?
  `;

  db.get(temaQuery, [temaNormalizado], (err, tema) => {
    if (err) return res.status(500).json({ error: 'Error al verificar el tema' });
    if (!tema) return res.status(404).send('El tema principal no existe');

    const tituloNormalizado = tituloSubtema.toLowerCase();

    const checkQuery = `
      SELECT id 
      FROM subtemas 
      WHERE tema_id = ? AND LOWER(titulo) = ?
    `;

    db.get(checkQuery, [tema.id, tituloNormalizado], (err, row) => {
      if (err) return res.status(500).json({ error: 'Error al verificar el subtema' });
      if (row) return res.status(400).send('El subtema ya existe dentro de este tema');

      // 👉 Generar enlace
      const enlace = `/temas/${temaNormalizado}/subtemas/ver/${encodeURIComponent(tituloNormalizado)}`;

      const insertQuery = `
        INSERT INTO subtemas (tema_id, titulo, votos, enlace)
        VALUES (?, ?, 0, ?)
      `;

      db.run(insertQuery, [tema.id, tituloNormalizado, enlace], function (err) {
        if (err) return res.status(500).json({ error: 'Error al crear el subtema' });

        res.status(201).json({
          mensaje: '✅ Subtema agregado',
          subtema: {
            id: this.lastID,
            titulo: tituloNormalizado,
            votos: 0,
            enlace
          }
        });
      });
    });
  });
});


/**
 * PUT /:idSubtema
 * Actualiza un subtema existente.
 * Cambia también el enlace si se modifica el título.
 * Ejemplo: PUT /temas/bartending/subtemas/3 con body { "tituloSubtema": "aperitivos", "votos": 12 }
 * Devuelve: { mensaje: '✅ Subtema actualizado', subtema: { id, titulo, votos, enlace } }
 */
routerSubtemas.put('/:idSubtema', (req, res) => {
  const temaNormalizado = req.params.tema?.toLowerCase();
  const { idSubtema } = req.params;
  const { tituloSubtema, votos } = req.body;

  if (!temaNormalizado) return res.status(400).send('Falta el tema principal en la URL');

  const temaQuery = `
    SELECT id 
    FROM temas 
    WHERE LOWER(titulo) = ?
  `;

  db.get(temaQuery, [temaNormalizado], (err, tema) => {
    if (err) return res.status(500).json({ error: 'Error al verificar el tema' });
    if (!tema) return res.status(404).send(`El tema "${temaNormalizado}" no existe`);

    const subtemaQuery = `
      SELECT * 
      FROM subtemas 
      WHERE id = ? AND tema_id = ?
    `;

    db.get(subtemaQuery, [idSubtema, tema.id], (err, subtema) => {
      if (err) return res.status(500).json({ error: 'Error al buscar el subtema' });
      if (!subtema) return res.status(404).send(`El subtema con ID ${idSubtema} no existe dentro de "${temaNormalizado}"`);

      const updates = [];
      const params = [];

      let nuevoTitulo = subtema.titulo;

      if (tituloSubtema) {
        nuevoTitulo = tituloSubtema.toLowerCase();
        updates.push('titulo = ?');
        params.push(nuevoTitulo);

        // 👉 Actualizar también el enlace
        updates.push('enlace = ?');
        const nuevoEnlace = `/temas/${temaNormalizado}/subtemas/ver/${encodeURIComponent(nuevoTitulo)}`;
        params.push(nuevoEnlace);
      }

      if (votos !== undefined) {
        updates.push('votos = ?');
        params.push(votos);
      }

      if (updates.length === 0) {
        return res.status(400).send('No se proporcionaron campos para actualizar');
      }

      const updateQuery = `
        UPDATE subtemas SET ${updates.join(', ')} 
        WHERE id = ? AND tema_id = ?
      `;

      params.push(idSubtema, tema.id);

      db.run(updateQuery, params, function (err) {
        if (err) return res.status(500).json({ error: 'Error al actualizar el subtema' });

        const getUpdated = `
          SELECT id, titulo, votos, enlace
          FROM subtemas 
          WHERE id = ?
        `;

        db.get(getUpdated, [idSubtema], (err, updated) => {
          if (err) return res.status(500).json({ error: 'Error al obtener el subtema actualizado' });
          res.json({ mensaje: '✅ Subtema actualizado', subtema: updated });
        });
      });
    });
  });
});


/**
 * DELETE /:idSubtema
 * Elimina un subtema específico de un tema.
 * Ejemplo: DELETE /temas/bartending/subtemas/2 → elimina el subtema con id 2
 */
routerSubtemas.delete('/:idSubtema', (req, res) => {
  const temaNormalizado = req.params.tema?.toLowerCase();
  const { idSubtema } = req.params;

  if (!temaNormalizado) return res.status(400).send('Falta el tema principal en la URL');

  const temaQuery = `
    SELECT id 
    FROM temas 
    WHERE LOWER(titulo) = ?
  `;

  db.get(temaQuery, [temaNormalizado], (err, tema) => {
    if (err) return res.status(500).json({ error: 'Error al verificar el tema' });
    if (!tema) return res.status(404).send(`El tema "${temaNormalizado}" no existe`);

    const deleteQuery = `
      DELETE 
      FROM subtemas 
      WHERE id = ? AND tema_id = ?
    `;

    db.run(deleteQuery, [idSubtema, tema.id], function (err) {
      if (err) return res.status(500).json({ error: 'Error al eliminar el subtema' });

      if (this.changes === 0) {
        return res.status(404).send(`El subtema con ID ${idSubtema} no existe en "${temaNormalizado}"`);
      }

      res.json({ mensaje: `✅ Subtema con ID ${idSubtema} eliminado de "${temaNormalizado}"` });
    });
  });
});


module.exports = routerSubtemas;

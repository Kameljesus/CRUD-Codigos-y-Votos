// routes/temas.js


// Importamos Express
const express = require('express');

// Creamos un router específico para temas
const routerTemas = express.Router();

// Importamos los datos de los temas
const db = require('../datos/db.js'); // Importamos la conexión a SQLite


// Middleware para parsear JSON en el body de las solicitudes POST/PUT/PATCH
routerTemas.use(express.json());


/**
 * GET /
 * Devuelve todos los temas con sus votos, ordenados de mayor a menor
 * Ejemplo: GET / → devuelve [{ titulo: '...', votos: 10 }, ...]
 */
routerTemas.get('/', (req, res) => {
  const query = `
    SELECT titulo, votos 
    FROM temas 
    ORDER BY votos DESC
  `;

  db.all(query, (err, rows) => {
    if (err) {
      console.error('❌ Error al obtener los temas:', err.message);
      return res.status(500).json({ error: 'Error al obtener los temas' });
    }

    res.json(rows); // Devuelve los resultados como JSON
  });
});


/**
 * GET /:tema
 * Devuelve un tema por su nombre.
 * Ejemplo: GET /bartending → devuelve { titulo, votos }
 */
routerTemas.get('/:tema', (req, res) => {
  const { tema } = req.params;

  const query = `
    SELECT titulo, votos 
    FROM temas 
    WHERE LOWER(titulo) = ?
  `;

  db.get(query, [tema], (err, row) => {
    if (err) {
      console.error('❌ Error al obtener el tema:', err.message);
      return res.status(500).json({ error: 'Error al obtener el tema' });
    }

    if (!row) {
      return res.status(404).json({ error: `El tema "${tema}" no existe.` });
    }

    res.json(row); // Devuelve el tema encontrado
  });
});


/**
 * POST /
 * Crea un tema nuevo
 * Ejemplo: POST / con body { "tituloTema": "Bartending" } 
 * Devuelve: { mensaje: '✅ Tema creado exitosamente', tema: { id, titulo, votos } }
 */
routerTemas.post('/', (req, res) => {
  const { tituloTema } = req.body;

  // 1️⃣ Validamos que se haya enviado el título
  if (!tituloTema) {
    return res.status(400).send('Se necesita un título para el tema');
  }

  // 2️⃣ Convertimos el título a minúsculas (normalización)
  const tituloNormalizado = tituloTema.toLowerCase();

  // 3️⃣ Verificamos si el tema ya existe en la base de datos
  const checkQuery = `
    SELECT * 
    FROM temas 
    WHERE LOWER(titulo) = ?
  `;

  db.get(checkQuery, [tituloNormalizado], (err, row) => {
    if (err) {
      console.error('❌ Error al verificar el tema:', err.message);
      return res.status(500).json({ error: 'Error al verificar el tema' });
    }

    if (row) {
      return res.status(400).send('El tema ya existe');
    }

    // 4️⃣ Insertamos el nuevo tema (los votos inician en 0)
    const insertQuery = `
      INSERT INTO temas (titulo, votos)
      VALUES (?, 0)
    `;

    db.run(insertQuery, [tituloNormalizado], function (err) {
      if (err) {
        console.error('❌ Error al crear el tema:', err.message);
        return res.status(500).json({ error: 'Error al crear el tema' });
      }

      // 5️⃣ Devolvemos el nuevo tema creado
      res.status(201).json({
        mensaje: '✅ Tema creado exitosamente',
        tema: {
          id: this.lastID,         // ID autogenerado por SQLite
          titulo: tituloNormalizado,
          votos: 0
        }
      });
    });
  });
});


/**
 * PUT /:tema
 * Actualiza los votos o el título de un tema existente
 * Ejemplo: PUT /bartending con body { "tituloTema": "Mixologia", "votos": 10 }
 * Devuelve: { mensaje: '✅ Tema actualizado', tema: { id, titulo, votos } }
 */
routerTemas.put('/:tema', (req, res) => {
  const { tema } = req.params; // nombre del tema actual
  const { tituloTema, votos } = req.body;

  // Normalizamos el nombre a minúsculas
  const temaNormalizado = tema.toLowerCase();

  // 1️⃣ Verificamos si el tema existe
  const selectQuery = `
    SELECT * FROM temas 
    WHERE LOWER(titulo) = ?
  `;

  db.get(selectQuery, [temaNormalizado], (err, row) => {
    if (err) {
      console.error('❌ Error al buscar el tema:', err.message);
      return res.status(500).json({ error: 'Error al buscar el tema' });
    }

    if (!row) {
      return res.status(404).send(`El tema "${tema}" no existe`);
    }

    // 2️⃣ Construimos la consulta de actualización dinámicamente
    const updates = [];
    const params = [];

    if (tituloTema) {
      updates.push('titulo = ?');
      params.push(tituloTema.toLowerCase());
    }

    if (votos !== undefined) {
      updates.push('votos = ?');
      params.push(votos);
    }

    if (updates.length === 0) {
      return res.status(400).send('No se proporcionaron campos para actualizar');
    }

    const updateQuery = `
      UPDATE temas SET ${updates.join(', ')} 
      WHERE id = ?
    `;

    params.push(row.id); // usamos el id del tema encontrado

    // 3️⃣ Ejecutamos la actualización
    db.run(updateQuery, params, function (err) {
      if (err) {
        console.error('❌ Error al actualizar el tema:', err.message);
        return res.status(500).json({ error: 'Error al actualizar el tema' });
      }

      // 4️⃣ Devolvemos el tema actualizado
      db.get(`
          SELECT id, titulo, votos 
          FROM temas 
          WHERE id = ?
        `, 
        [row.id], (err, updatedRow) => {
        
          if (err) {
          console.error('❌ Error al obtener el tema actualizado:', err.message);
          return res.status(500).json({ error: 'Error al obtener el tema actualizado' });
        }

        res.json({
          mensaje: '✅ Tema actualizado',
          tema: updatedRow
        });
      });
    });
  });
});



/**
 * DELETE /:tema
 * Elimina un tema existente por su nombre.
 * Ejemplo: DELETE /bartending → elimina el tema "bartending" y sus subtemas asociados.
 * Devuelve: { mensaje: '🗑️ Tema eliminado correctamente' }
 */
routerTemas.delete('/:tema', (req, res) => {
  const { tema } = req.params; // nombre del tema a eliminar

  // Normalizamos el nombre a minúsculas
  const temaNormalizado = tema.toLowerCase();

  // 1️⃣ Verificamos si el tema existe
  const selectQuery = `
    SELECT * FROM temas 
    WHERE LOWER(titulo) = ?
  `;

  db.get(selectQuery, [temaNormalizado], (err, row) => {
    if (err) {
      console.error('❌ Error al buscar el tema:', err.message);
      return res.status(500).json({ error: 'Error al buscar el tema' });
    }

    if (!row) {
      return res.status(404).send(`El tema "${tema}" no existe`);
    }

    // 2️⃣ Eliminamos el tema (y sus subtemas gracias a ON DELETE CASCADE)
    const deleteQuery = `
      DELETE FROM temas 
      WHERE id = ?
    `;

    db.run(deleteQuery, [row.id], function (err) {
      if (err) {
        console.error('❌ Error al eliminar el tema:', err.message);
        return res.status(500).json({ error: 'Error al eliminar el tema' });
      }

      // 3️⃣ Confirmamos la eliminación
      res.json({
        mensaje: '🗑️ Tema eliminado correctamente',
        tema: {
          id: row.id,
          titulo: row.titulo,
          votos: row.votos
        }
      });
    });
  });
});


module.exports = routerTemas;

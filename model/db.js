// data/db.js


const sqlite3 = require('sqlite3').verbose(); // .verbose() muestra un stack trace más detallado si es que tira error.
const path = require('path'); // requerimos path para que se pueda ejecutar en todos los OS.


// Crear o abrir la base de datos (archivo físico en /datos)

// __dirname es una variable global de Node.js que contiene:
// La ruta absoluta de la carpeta donde está el archivo que se está ejecutando. Así, siempre ejecuta el archivo en su ubicación correcta.
const db = new sqlite3.Database(path.resolve(__dirname, 'database.sqlite'), (err) => {
  if (err) {
    console.error('❌ Error al conectar a SQLite:', err.message);
  } else {
    console.log('✅ Conectado a la base de datos SQLite.');

    // Crear tablas si no existen
    db.serialize(() => {
      // Tabla de temas
      db.run(`
        CREATE TABLE IF NOT EXISTS temas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          titulo TEXT UNIQUE NOT NULL,
          votos INTEGER DEFAULT 0
        )
      `);

      // Tabla de subtemas (relacionada con temas)
      db.run(`
        CREATE TABLE IF NOT EXISTS subtemas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          tema_id INTEGER NOT NULL,
          titulo TEXT NOT NULL,
          votos INTEGER DEFAULT 0,
          enlace TEXT NOT NULL,
          FOREIGN KEY (tema_id) REFERENCES temas(id) ON DELETE CASCADE
        )
      `);

      console.log('📦 Tablas "temas" y "subtemas" listas.');
    });
  }
});

module.exports = db;

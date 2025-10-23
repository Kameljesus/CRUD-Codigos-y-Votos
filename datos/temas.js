// data/temas.js

let infoTemas = {
  bartending: [
    {
      id: 1,
      titulo: 'Tragos',
      votos: 30
    },
    {
      id: 2,
      titulo: 'Herramientas',
      votos: 20
    },
    {
      id: 3,
      titulo: 'Técnicas',
      votos: 10
    }
  ],

  videojuegos: [
    {
      id: 1,
      titulo: 'Consolas',
      votos: 30
    },
    {
      id: 2,
      titulo: 'PC Gaming',
      votos: 40
    },
    {
      id: 3,
      titulo: 'Retro',
      votos: 30
    }
  ],

  cocina: [
    {
      id: 1,
      titulo: 'Recetas',
      votos: 50
    },
    {
      id: 2,
      titulo: 'Utensilios',
      votos: 25
    },
    {
      id: 3,
      titulo: 'Técnicas de corte',
      votos: 15
    }
  ]
};

// Exportamos para usarlo en rutas y controladores
module.exports = { infoTemas };

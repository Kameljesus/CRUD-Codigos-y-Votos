# CRUD – Códigos y Votos

Aplicación web desarrollada en **Node.js con Express** que implementa un sistema **CRUD completo de temas y subtemas**, con persistencia en **SQLite** y un **sistema de votos** que permite priorizar contenidos según su relevancia.

El proyecto fue realizado como challenge técnico, aplicando arquitectura MVC, renderizado con **EJS** y lógica backend propia sin frameworks frontend.

---

## 🧠 Objetivo del proyecto

Crear una aplicación que permita:

- Crear, leer, actualizar y eliminar **temas**
- Asociar **subtemas y enlaces** a cada tema
- Votar contenidos para ordenarlos por relevancia
- Renderizar vistas dinámicas desde el servidor
- Persistir toda la información en una base de datos SQLite

---

## 🛠️ Tecnologías utilizadas

- **Node.js**
- **Express**
- **SQLite**
- **EJS (Embedded JavaScript Templates)**
- **JavaScript**
- Arquitectura **MVC**

---

## 📂 Estructura real del proyecto

```text
CRUD-Codigos-y-Votos/
│
├── app.js
│   └── Archivo principal del servidor
│
├── package.json
│   └── Dependencias y scripts del proyecto
│
├── estructura.md
│   └── Explicación de la estructura del proyecto
│
├── info_challenge.md
│   └── Consigna original del challenge
│
├── controllers/
│   ├── temas.js
│   │   └── Lógica CRUD de temas
│   └── subtemas.js
│       └── Lógica CRUD de subtemas y enlaces
│
├── model/
│   └── db.js
│       └── Conexión y manejo de la base de datos SQLite
│
└── views/
    ├── index.ejs
    │   └── Vista principal con listado de temas
    ├── subtemas.ejs
    │   └── Vista de subtemas por tema
    └── subtemaEnlace.ejs
        └── Vista de enlaces asociados a un subtema
```



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

---

## 🧩 Arquitectura

El proyecto sigue el patrón **MVC**:

### 🔹 Modelo
- `model/db.js`
- Maneja la conexión con SQLite
- Define y ejecuta las queries SQL
- Centraliza el acceso a la base de datos

### 🔹 Controladores
- `controllers/temas.js`
- `controllers/subtemas.js`

Responsabilidades:
- Procesar requests HTTP
- Ejecutar operaciones CRUD
- Llamar al modelo para persistencia
- Renderizar vistas EJS con datos dinámicos

### 🔹 Vistas
- Renderizadas del lado del servidor con **EJS**
- Separación clara entre lógica y presentación
- Datos inyectados directamente desde Express

---

## 🗄️ Base de datos

- Base de datos: **SQLite**
- Archivo gestionado desde `db.js`
- Tablas para:
  - Temas
  - Subtemas
  - Enlaces
  - Votos

La persistencia permite mantener el estado completo de la aplicación sin depender de memoria.

---

## 🔁 Flujo de funcionamiento

1. El usuario accede a la vista principal (`index.ejs`)
2. El servidor consulta los temas en SQLite
3. Los temas se renderizan ordenados (incluyendo votos)
4. El usuario puede:
   - Crear nuevos temas
   - Acceder a subtemas
   - Agregar enlaces
   - Votar contenidos
5. Cada acción impacta directamente en la base de datos
6. La vista se vuelve a renderizar con los cambios actualizados

---

## 🚀 Cómo ejecutar el proyecto

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/Kameljesus/CRUD-Codigos-y-Votos.git
cd CRUD-Codigos-y-Votos
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Ejecutar el servidor
```bash
node app.js
```

Abrir en el navegador:
http://localhost:3000


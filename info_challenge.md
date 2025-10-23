Imagínate esto: acabas de ser contratado por Learn It, Love It Inc., una plataforma educativa en ascenso. Quieren una aplicación donde los usuarios puedan agregar, actualizar y eliminar temas de aprendizaje, como "Cómo programar como un ninja" o "Dominar el arte de preparar café". Pero hay un giro: los usuarios deberían poder votar a favor de los temas y enlaces que encuentren más útiles, y la aplicación debería reordenar dinámicamente el contenido según los votos. Ah, y ¿mencionamos? Harás todo con Node.js, Express, un motor de plantillas, y JavaScript puro. Sin presión.

## Antes de comenzar: Conceptos para repasar

Antes de sumergirse de lleno en este desafío, asegúrense de que su cerebro esté bien alimentado. No los vamos a enviar a la batalla sin armas:

- Node.js y Express: Estos son tus ejes de batalla. Aprende cómo configurar un servidor, definir rutas y manejar solicitudes/respuestas HTTP. Aquí estás construyendo la columna vertebral de tu aplicación.
- HTTP: Entiende cómo funcionan las solicitudes y respuestas HTTP. Cada vez que un usuario interactúa con tu aplicación, se están enviando solicitudes HTTP (GET, POST, PUT, DELETE) al servidor, y tu trabajo será manejar estas solicitudes de manera efectiva.
- Motores de plantillas: Piensa en estos como tu arma secreta. Ya sea EJS o Handlebars, aprende a transformar datos en una página web que los usuarios puedan ver. Este es tu primer paso para conectar el servidor con el cliente.
- JavaScript puro: Sin frameworks, sin bibliotecas, solo tú y JavaScript. Como un verdadero guerrero del código, lo harás a la antigua. Arquitectura MVC con Express: Si tu aplicación fuera una pizza, MVC sería la masa, la salsa y el queso. Aprende a organizar tu aplicación para que todo esté en su lugar correcto y listo para ser devorado.

# ¡¡ Empecemos !!

# Configuración del servidor Express:

💡Imagina que tu servidor es como una tienda en línea. Node.js es el motor que pone todo en marcha, mientras que Express es la estructura que le da forma a tu tienda. 

- Necesitas configurar tu servidor para que esté listo para recibir "clientes" (los usuarios). Esto implica crear un entorno donde el servidor pueda escuchar y responder a solicitudes, como si abrieras las puertas de tu tienda para que la gente pueda entrar y explorar.
- Luego el protocolo HTTP entra en juego. Cada vez que alguien visita tu "tienda", en realidad está enviando una solicitud HTTP al servidor. Tu servidor necesita estar preparado para recibir estas solicitudes, procesarlas y enviar una respuesta adecuada.
- Define rutas para las operaciones CRUD y votaciones. Estas rutas son las autopistas de tu aplicación, manejando solicitudes HTTP (GET, POST, PUT, DELETE) que conectan a los usuarios con los datos.

# Magia del motor de plantillas:

💡  Imagina que tu servidor está organizando una exhibición de arte. Los datos JSON que tienes, como los temas de aprendizaje y enlaces, son como las obras de arte en bruto. No son muy atractivos por sí mismos, pero aquí es donde entra el motor de plantillas. Toma los datos JSON y los "pinta" en una página web que los usuarios pueden ver e interactuar.

- Elige tu motor de plantillas favorito: EJS o Handlebars. Luego úsalo para convertir esos datos JSON en páginas web que los usuarios puedan ver e interactuar.

# Funcionalidad CRUD:

Añade funcionalidades CRUD a tu ejercicio. Da a los usuarios el poder de crear, leer, actualizar y eliminar temas de aprendizaje.
Dentro de cada tema, permite que los usuarios agreguen, actualicen y eliminen enlaces.

# Manejo de solicitudes y respuestas HTTP:

💡 ¿Qué son las Solicitudes HTTP? 
Las solicitudes HTTP son la base de la comunicación entre un cliente (como un navegador) y un servidor.

- Aprende a manejar solicitudes HTTP en tu servidor Express. Cada vez que un usuario realiza una acción (como votar por un tema o agregar un enlace), tu servidor recibirá una solicitud HTTP y deberá responder adecuadamente.
- Asegúrate de que tu servidor maneje correctamente las diferentes solicitudes HTTP para las operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

# Sistema de votaciones:

- Implementa un botón de votaciones que permita a los usuarios votar por temas y enlaces. El servidor actualiza el conteo de votos en la base de datos y puede reordenar el contenido según los votos recibidos. Asegúrate de que la interfaz del usuario se actualice en tiempo real para reflejar estos cambios.,

# Arquitectura MVC:

💡 La arquitectura MVC (Modelo-Vista-Controlador) es un patrón de diseño que organiza el código de una aplicación en tres componentes principales, facilitando su desarrollo, mantenimiento y escalabilidad.

- Modelo: Aquí es donde viven los datos. Maneja los temas, enlaces y conteos de votos. Aquí es donde se almacenan y procesan los datos que se mostrarán en la aplicación.
- Vista: La parte que los usuarios realmente ven. Usa tu motor de plantillas para crear páginas limpias.
- Controlador: El cerebro detrás de la operación. Recibe las solicitudes del usuario, actualiza el Modelo y elige la Vista adecuada para mostrar los resultados. Asegura que toda la aplicación funcione correctamente y en conjunto.

# Frontend con JS puro:
- Usa JavaScript puro para todas las interacciones del lado del cliente, cómo manejar los clics en los botones de votación. Piensa en él como el superhéroe sin capa que hace que los botones de tu aplicación hagan cosas cuando los clickeas. No necesitas frameworks ni bibliotecas: solo tú y tu valiente código JS.

## Resumen de Requerimientos

# Requerimientos Obligatorios:

💡 Los requerimientos obligatorios deben ser completados en su totalidad o el ejercicio no se considera válido. 

1. Configura un servidor Express usando Node.js.
2. Define rutas para operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y para el sistema de votaciones.
3. Maneja las solicitudes y respuestas HTTP correspondientes a las operaciones CRUD y votaciones.
4. Usa un motor de plantillas como EJS o Handlebars para transformar datos JSON en páginas web interactivas.
5. Implementa funcionalidades CRUD
6. Implementa un botón de votaciones que permita a los usuarios votar por temas y enlaces.
7. Asegúrate de que el servidor actualice el conteo de votos en la base de datos y reordene el contenido según los votos.
8. Actualiza la interfaz del usuario en tiempo real para reflejar los cambios en los votos.
9. Implementa la arquitectura MVC (Modelo-Vista-Controlador) en tu aplicación
10. Utiliza JavaScript puro para manejar interacciones del lado del cliente, como los clics en los botones de votación.

# Requerimientos Opcionales:

💡 Los requerimientos opcionales quedan a criterio del participante, su total y correcta implementación pueden influir en obtener una evaluación excepcional.

1. Usa Tailwind CSS para estilizar la aplicación y hacer que el diseño sea más atractivo.
2. Agrega autenticación para que solo usuarios registrados puedan agregar, actualizar o eliminar temas y enlaces.
3. Implementa validaciones para formularios del lado del cliente y del servidor para asegurar datos consistentes y evitar errores.

# Consideraciones para el ejercicio

💡 El objetivo de este ejercicio es que aprendas a desplegar y gestionar un servidor web desde cero, enfocándote en seguridad, configuración manual y buenas prácticas de administración para un entorno de producción.

1. Antes de comenzar a codificar, asegúrate de tener una comprensión clara de los requisitos funcionales y no funcionales del proyecto. Esto incluye cómo debe comportarse la aplicación y qué características debe tener.
2. Divide el desarrollo en fases pequeñas y manejables. Por ejemplo, primero configura el servidor y las rutas, luego implementa CRUD, y finalmente añade funcionalidades de votación y el frontend.
3. Utiliza un sistema de control de versiones como Git para gestionar tu código. Realiza commits frecuentes con mensajes claros para documentar los cambios.
4. Define claramente los roles de cada componente del MVC para evitar mezclas de responsabilidades. Esto ayudará a mantener tu código organizado y mantenible.
5. Implementa la solución y luego optimizala:

    - Configura el servidor Express.
    - Define las rutas básicas.
    - Implementa rutas y controladores para crear, leer, actualizar y eliminar temas.
    - Implementa funcionalidades CRUD para enlaces dentro de los temas.
    - Añade funcionalidad para que los usuarios puedan votar por temas y enlaces.
    - Actualiza el conteo de votos y reordena el contenido.
    - Configura y utiliza el motor de plantillas (EJS o Handlebars) para renderizar datos.
    - Implementa interacciones del lado del cliente usando JavaScript puro.
    - Añade lógica para manejar clics en botones de votación y actualizaciones en la interfaz Asegurate que todo funcione correctamente
    - Optimiza el programa
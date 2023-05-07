# App React

Aplicación creada con React versión 16.13.1 y node versión 16.

# Introduction

El objetivo principal de la app es loguearse y tener acceso a las búsqueda de sitios en el mundo. 
- login: se compone de tres formas de logueo siendo usuario de Facebook, Google o de la misma página. Para el caso de Facebook y Google se utilizan sus respectivas apis:
  - google : en la ubicación `public/index.html` encontramos los scripts para su modificacion o adición. En la ubicación `src/googleLogin.js` vemos el código que realiza llamado a las funciones de este script.
  - Facebook: en la ubicación `src/fbLogin.js` vemos el script y el respectivo código para llamar las apis y confirmar el usuario.
  - paseandoando : si no somos usuarios Facebook o Google podremos loguearnos directamente en el memento no tiene configuración alguna, si colocamos cualquier correo y contraseña podremos entrar, esto con la idea de que se adapte a un back o nube y se configure.
  - nuevo usuario: el botón new account para llamar al formulario no está creado, pero sirve como guía para su configuración.

# Search places

- Después de loguearse podrá acceder a la búsqueda e sitios con las apis de Google, para usar esta característica se configura el script en el `public/index.html` o si desea crear el elemento nativo con js. 
- En el fichero `src/mapApp.js` podemos ver el código que hace llamado a las funciones de Google para ubicación en el mapa y carga de fotos.

# Boot modes

- `npm run start` : Se habilitara en un entorno local de desarrollo por defecto servira en la url `http://localhost:3000/`.

- `npm run build` : Construira la app lista para su uso productivo en la carpeta `build`.

- `npm run test` : Correran pruebas unitarias en el momento no se enfoco en la creacion de estas para mayor informacion `https://es.legacy.reactjs.org/docs/testing.html`

- `npm run eject` : Para acceder y modificar configuracion de Babel y Webpack.

# Environemnts

No se tiene configuración previa de los entornos para mayor información `https://create-react-app.dev/docs/adding-custom-environment-variables/`

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

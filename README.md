TC2007B.E7
# Manual de Instalación

## Instalar:
- Node.js y NPM
  - https://nodejs.org/
- MongoDB Community Server e incluir MongoDB Compass
  - https://www.mongodb.com/try/download/community
 
### Mongo DB 

## Crear base de datos y colecciones. 
En MongoDBCompass conectarse a:
<div>
<p style = 'text-align:center;'>
<img src="https://pbs.twimg.com/media/EiAAHfoU4AADis4?format=jpg&name=small">
</p>
</div>

Posteriormente en Databases dar click en el botón "+" (Create database)
y crear una base de datos con el nombre:
```sh
tc2007b 
```
y el nombre de colección:
```sh
usuarios
```
Después en la base de datos tc2007b añadir las colecciones:
```sh
tickets
```
```sh
log
```
dando click en el botón "+" (Create collection)


## Clonar Repositorio 

Para clonar el repositorio, entramos a nuestra terminal de preferencia y escribimos el siguiente comando en la dirección dónde queramos clonar el repositorio:

```sh
git clone https://github.com/DavidF2714/TC2007B.E7.git
```

Después de clonar el repositorio, siga los siguientes pasos.

```sh
cd TC2007B.E7
```

## BACKEND 

### Ubicación

Abra la terminal de su preferencia y diríjase a la ubicación ~/Documents/pruebaHTTPS/TC2007B.E7/backend.
Si se encuentra en la ubicación ~/Documents/pruebaHTTPS/TC2007B.E7/, utilice el siguiente comando:

```sh
cd backend
```

Insertar usuario ejecutivo.
Correr el siguiente comando:

```js
node adminCreate.js
```

Inicie la aplicación backend ejecutando el siguiente comando:

```sh
node index.js
```

## FRONTEND

### Instalar librerias faltantes

```js
npm i html2canvas, jspdf y @nivo/pie
```

### Ubicación

Ahora dirijase a la ubicación ~/Documents/pruebaHTTPS/TC2007B.E7/new-test-david
```sh
cd new-test-david
```

Inicie la aplicación en modo desarrollo ingresando el comando:

```sh
npm run dev
```

Haz clic en cualquiera de los dos enlaces https que se desplegarán a continuación similares a los que se encuentran a continuación:

```js
  VITE v4.4.9  ready in 443 ms

  ➜  Local:   https://localhost:1234/
  ➜  Network: https://10.23.34.5:1234/
  ➜  press h to show help
```

## Instalar Certificados 

En el navegador web de preferencia dirigirse a la parte de privacidad y seguridad y seleccionar "Gestionar los certificados del dispositivo"

Hacer click en el botón "Import...", Seleccionar "Next" en la pestaña Welcome, dar click en "Browse..." y dirigirse a la ubicación del respositorio, en la carpeta seleccionar el archivo:

```sh
rootCA
```
Y presionar "Next" a todo lo siguiente.


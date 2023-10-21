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
<img src="img\mongo.png"style="width:500px;">
</p>
</div>

Posteriormente en Databases dar click en el botón "+" (Create database)
y crear una base de datos con el nombre:
<div>
<p style = 'text-align:center;'>
<img src="img\mongo2.png"style="width:500px;">
</p>
</div>
Después en la base de datos tc2007b añadir las colecciones:
dando click en el botón "+" (Create collection)
<div>
<p style = 'text-align:center;'>
<img src="img\mongo3.png"style="width:500px;">
</p>
</div>




## Clonar Repositorio 

Para clonar el repositorio, entramos a nuestra terminal de preferencia y escribimos el siguiente comando en la dirección dónde queramos clonar el repositorio:

```bash
git clone https://github.com/DavidF2714/TC2007B.E7.git
```

Después de clonar el repositorio, entrar a la carpeta:

```bash
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

## Instalar Certificados en el navegador 

En el navegador web de preferencia dirigirse a la parte de privacidad y seguridad y seleccionar "Gestionar los certificados del dispositivo"
<div>
<p style = 'text-align:center;'>
<img src="img\cert.png"style="width:500px;">
</p>
</div>

Hacer click en el botón "Import...",
<div>
<p style = 'text-align:center;'>
<img src="img\cert2.png"style="width:500px;">
</p>
</div>

 Seleccionar "Next" en la pestaña Welcome,
 <div>
<p style = 'text-align:center;'>
<img src="img\cert3.png"style="width:500px;">
</p>
</div>
Dar click en "Browse..."
<div>
<p style = 'text-align:center;'>
<img src="img\cert4.png"style="width:500px;">
</p>
</div>
Y dirigirse a la ubicación del respositorio,
en la carpeta seleccionar el archivo "rootCA":
<div>
<p style = 'text-align:center;'>
<img src="img\cert5.png"style="width:500px;">
</p>
</div>

Y finalmente presionar "Next" y "Finish" a todo lo siguiente.
<div>
<p style = 'text-align:center;'>
<img src="img\cert6.png"style="width:500px;">
</p>
</div>
<div>


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

Haz clic en cualquiera de los dos enlaces https que se desplegarán a continuación:

```js
  VITE v4.4.9  ready in 443 ms

  ➜  Local:   https://localhost:1234/
  ➜  Network: https://10.23.34.5:1234/
  ➜  press h to show help
```




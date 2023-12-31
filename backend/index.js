const express=require('express')
const MongoClient=require('mongodb').MongoClient
const cors = require('cors')
const bodyParser=require('body-parser')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const https=require("https")
const fs=require("fs")

let db;
const app=express();
app.use(cors());
app.use(bodyParser.json());


async function connectDB(){
    let client=new MongoClient("mongodb://127.0.0.1:27017/tc2007b")
    await client.connect();
    db=client.db();
    console.log("Conectado a la base de datos")
}

async function log(sujeto, accion, objeto){
    toLog={}
    toLog["timestamp"]=new Date();
    toLog["sujeto"]=sujeto;
    toLog["accion"]=accion;
    toLog["objeto"]=objeto;
    await db.collection("log").insertOne(toLog);
}

//getList, getMany, getManyReference
app.get("/tickets", async (request, response)=>{ 
    try{
        let token=request.get("Authentication"); // Aut del header
        let verifiedToken = await jwt.verify(token, "secretKey"); // Verifica el token con la llave secreta
        let authData=await db.collection("usuarios").findOne({"usuario": verifiedToken.usuario})
        let parametersFind={}
        if(authData.permissions=="Coordinador"){
            parametersFind["usuario"]=verifiedToken.usuario;
        }
        
        if ("_sort" in request.query){
            let sortBy=request.query._sort;
            let sortOrder=request.query._order=="ASC"?1:-1;
            let start=Number(request.query._start);
            let end=Number(request.query._end);
            let sorter={}
            sorter[sortBy]=sortOrder
            let data=await db.collection('tickets').find(parametersFind).sort(sorter).project({_id:0}).toArray();
            response.set('Access-Control-Expose-Headers', 'X-Total-Count')
            response.set('X-Total-Count', data.length)
            data=data.slice(start, end)
            response.json(data);
        }else if ("id" in request.query){
            let data=[]
            for (let index=0; index<request.query.id.length; index++){
                let dataObtain=await db.collection('tickets').find({id: Number(request.query.id[index])}).project({_id:0}).toArray();
                data=await data.concat(dataObtain)
            }
            response.json(data);
        }else {
            let data=[]
            data=await db.collection('tickets').find(request.query).project({_id:0}).toArray();
            response.set('Access-Control-Expose-Headers', 'X-Total-Count')
            response.set('X-Total-Count', data.length)
            response.json(data)
        }
    }catch{
        response.sendStatus(401);
    }
})


app.get("/usuarios", async (request, response)=>{
    try{
        let token=request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let authData=await db.collection("usuarios").findOne({"usuario": verifiedToken.usuario})
        let parametersFind={}
        
        if ("_sort" in request.query){
            let sortBy=request.query._sort;
            let sortOrder=request.query._order=="ASC"?1:-1;
            let start=Number(request.query._start);
            let end=Number(request.query._end);
            let sorter={}
            sorter[sortBy]=sortOrder
            let data=await db.collection('usuarios').find(parametersFind).sort(sorter).project({_id:0}).toArray();
            response.set('Access-Control-Expose-Headers', 'X-Total-Count')
            response.set('X-Total-Count', data.length)
            data=data.slice(start, end)
            response.json(data);
        }else if ("id" in request.query){
            let data=[]
            for (let index=0; index<request.query.id.length; index++){
                let dataObtain=await db.collection('usuarios').find({id: Number(request.query.id[index])}).project({_id:0}).toArray();
                data=await data.concat(dataObtain)
            }
            response.json(data);
        }else {
            let data=[]
            data=await db.collection('usuarios').find(request.query).project({_id:0}).toArray();
            response.set('Access-Control-Expose-Headers', 'X-Total-Count')
            response.set('X-Total-Count', data.length)
            response.json(data)
        }
    }catch{
        response.sendStatus(401);
    }
})


//getOne
app.get("/tickets/:id", async (request, response)=>{
    try{
        let token=request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let authData=await db.collection("usuarios").findOne({"usuario": verifiedToken.usuario})
        let parametersFind={"id": Number(request.params.id)}
        if(authData.permissions=="Coordinador"){
            parametersFind["usuario"]=verifiedToken.usuario;
        }
        let data=await db.collection('tickets').find(parametersFind).project({_id:0}).toArray();
        log(verifiedToken.usuario, "ver objeto", request.params.id)
        response.json(data[0]);
    }catch{
        response.sendStatus(401);
    }
})


//create
app.post("/tickets", async (request, response)=>{
    try{
        let token=request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let addValue=request.body
        let data=await db.collection('tickets').find({}).toArray();
        let id=data.length+1;
        addValue["id"]=id;
        addValue["usuario"]=verifiedToken.usuario;
        data=await db.collection('tickets').insertOne(addValue);
        response.json(data);
    }catch{
        response.sendStatus(401);
    }
}) 

//update
app.put("/tickets/:id", async (request, response)=>{
    try{
        let token=request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let addValue=request.body
        addValue["id"]=Number(request.params.id);
        let data=await db.collection("tickets").updateOne({"id": addValue["id"]}, {"$set": addValue});
        data=await db.collection('tickets').find({"id": Number(request.params.id)}).project({_id:0, id:1, nombre:1, materia:1}).toArray();
        response.json(data[0]);
    }catch{
        response.sendStatus(401);
    }
})          

app.post("/registrarse", async (request, response) => {
    let user = request.body.username; //
    let pass = request.body.password;
    let fname = request.body.fullName; 
    let perm = request.body.permissions;

    console.log(request.body);
    let data = await db.collection("usuarios").findOne({ "usuario": user });
    if (data == null) {
        try {
            // Consulta la colección de usuarios para obtener el último usuario registrado
            let ultimoUsuario = await db.collection("usuarios").find().sort({ id: -1 }).limit(1).toArray();
            let nuevoId = 1; // Valor predeterminado si no hay usuarios registrados

            if (ultimoUsuario.length > 0) {
                nuevoId = ultimoUsuario[0].id + 1;
            }

            bcrypt.genSalt(10, (error, salt) => { // Genera el salt para el hash
                bcrypt.hash(pass, salt, async (error, hash) => {
                    let usuarioAgregar = {
                        "id": nuevoId, // Asigna el nuevo "id"
                        "usuario": user,
                        "password": hash,
                        "fullName": fname,
                        "permissions": perm
                    };
                    data = await db.collection("usuarios").insertOne(usuarioAgregar);
                    response.sendStatus(201);
                });
            });
        } catch {
            response.sendStatus(401);
        }
    } else {
        response.sendStatus(401);
    }
});



app.post("/login", async(request, response)=>{ // Autenticación
    let user=request.body.username; 
    let pass=request.body.password;
    let data= await db.collection("usuarios").findOne({"usuario": user});
    if(data==null){
        response.sendStatus(401);
    }else{
        bcrypt.compare(pass, data.password, (error, result)=>{ // Compara el hash de la contraseña
            if(result){
                const tokenPayload = { // 
                    usuario: data.usuario, // 
                    permissions: data.permissions, // 
                };
                const token = jwt.sign(tokenPayload, "secretKey", { expiresIn: 1200000 }); // 
                log(user, "login", "");
                response.json({
                  "token": token,
                  "id": data.usuario,
                  "fullName": data.fullName
                });
            }else{
                response.sendStatus(401) // request no autorizado
            }
        })
    }
})

//delete
app.delete("/tickets/:id", async (request, response)=>{
    try{
        let token=request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let data=await db.collection('tickets').deleteOne({"id": Number(request.params.id)});
        response.json(data);
    }catch{
        response.sendStatus(401);
    }
})
 
app.delete("/usuarios/:id", async (request, response)=>{
    try{
        let token=request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let data=await db.collection('usuarios').deleteOne({"id": Number(request.params.id)});
        response.json(data);
    }catch{
        response.sendStatus(401);
    }
})

//getOne
app.get("/usuarios/:id", async (request, response)=>{
    try{
        let token=request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let authData=await db.collection("usuarios").findOne({"usuario": verifiedToken.usuario})
        let parametersFind={"id": Number(request.params.id)}
        let data=await db.collection('usuarios').find(parametersFind).project({_id:0}).toArray();
        log(verifiedToken.usuario, "ver objeto", request.params.id)
        response.json(data[0]);
    }catch{
        response.sendStatus(401);
    }
})

//update
app.put("/usuarios/:id", async (request, response)=>{
    try{
        let token=request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let addValue=request.body
        addValue["id"]=Number(request.params.id);
        let data=await db.collection("usuarios").updateOne({"id": addValue["id"]}, {"$set": addValue});
        data=await db.collection('usuarios').find({"id": Number(request.params.id)}).project({_id:0, id:1, nombre:1, materia:1}).toArray();
        response.json(data[0]);
    }catch{
        response.sendStatus(401);
    }
})       
 

https.createServer({cert: fs.readFileSync("backend.cer"), key: fs.readFileSync("backend.key")}, app).listen(1337, ()=>{
    connectDB();
    console.log("Servidor escuchando en puerto 1337 con HTTPS")
})
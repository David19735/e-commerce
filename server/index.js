import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import csrf from 'csurf';
import db from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js'

//Creando la aplicación
const app=express();

//Conexión a la base de datos
try {
    await db.authenticate();
    db.sync();
    console.log("Conexión correcta a la base de datos");

} catch (error) {
    console.log(error);
}

//Habilitar lectura de datos de formulario
app.use(express.urlencoded({extended:true}))

//Habiliar cookieParser
app.use(cookieParser());

//Habilitar CSRF
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);


//Habilitar NextJs
app.use(cors(
    {
    origin: "http://localhost:3000", // Permitir peticiones desde el frontend
    credentials: true // Permite enviar cookies y encabezados de autenticación
    }
));
app.use(express.json());

//Generando el puerto
const port=4000;

//Configurando el routing
app.use('/auth',usuarioRoutes);

//Arrancando el servidor
app.listen(port,()=>{
    console.log("Servidor funcionando en el puerto "+port);
})
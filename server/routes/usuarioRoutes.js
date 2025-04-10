import express from 'express';
import { Registro,Confirmar,FormularioRegistro,FormularioOlvidePassword,FormularioPassword,ResetPassword,FormularioRessetPassword,InicioSesion,FormularioInicioSesion } from '../controllers/usuarioController.js';

const router=express.Router();

//Registro del cliente
router.get('/registro',FormularioRegistro)
router.post('/registro',Registro)

//Confirmar cuenta del cliente
router.get('/confirmar/:token',Confirmar)

//Solicitud de cambio de contraseña
router.get('/olvidePassword',FormularioOlvidePassword)
router.post('/olvidePassword',FormularioPassword)

//Formulario de cambio de contraseña
router.get('/resetpassword/:token',ResetPassword);
router.post('/resetpassword/:token',FormularioRessetPassword);

//Inicio de sesisón
router.get('/login',InicioSesion)
router.post('/login',FormularioInicioSesion)


export default router;
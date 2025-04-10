import {check,validationResult} from 'express-validator'
import Usuario from '../models/Usuario.js';
import { emailRegistro,emailResetPassword } from '../helpers/emails.js';
import {generarId,generarJwt} from '../helpers/tokens.js'
import bcrypt from 'bcrypt';

const FormularioRegistro=async(req,res)=>{


    
    return res.json({csrf:req.csrfToken()})
   
}

const Registro=async(req,res)=>{

    const {nombre, apellido1,apellido2,email,password,password2,edad,calle,colonia,municipio,estado,telefono,descripcion,n,genero,turno}=req.body;

    await check('nombre').notEmpty().withMessage('El nombre no puede estar vacío').run(req);
    await check('apellido1').notEmpty().withMessage('El primer apellido no puede estar vacío').run(req);
    await check('apellido2').notEmpty().withMessage('El segundo apellido no puede estar vacío').run(req);
    await check('email').isEmail().withMessage('El nombre no puede estar vacío').run(req);
    await check('nombre').notEmpty().withMessage('El nombre no puede estar vacío').run(req);
    await check('password').isLength({min:8}).withMessage('La contraseña debe contener mínimo 8 carácteres').run(req);
    await check('password2').equals(password).withMessage('Las contraseñas no son iguales').run(req);
    await check('edad').notEmpty().withMessage('La edad no puede estar vacío').run(req);
    await check('genero').notEmpty().withMessage('El género no puede estar vacío').run(req);
    await check('calle').notEmpty().withMessage('La calle no puede estar vacío').run(req);
    await check('colonia').notEmpty().withMessage('La colonia no puede estar vacío').run(req);
    await check('municipio').notEmpty().withMessage('El municipio no puede estar vacío').run(req);
    await check('estado').notEmpty().withMessage('El estado no puede estar vacío').run(req);
    await check('telefono').notEmpty().withMessage('El telefono no puede estar vacío').run(req);
    await check('descripcion').notEmpty().withMessage('La descripción no puede estar vacío').run(req);
    await check('n').notEmpty().withMessage('El número de vivienda no puede estar vacío').run(req);
    await check('turno').notEmpty().withMessage('El turno de entrega no puede estar vacío').run(req);


    let resultado=validationResult(req).array();

    if(resultado.length>0){

        return res.json({mensaje:'Alguno de los datos ingresados son incorrectos',tipo:'error'})
     }

    const usuarioExistente=await Usuario.findOne({where:{email:req.body.email}});

    if(usuarioExistente){

        return res.json({mensaje:'El usuario ya se encuentra registrado',tipo:'error'})
    }


    //Almacenar usuario
    const usuario=await Usuario.create({
        nombre, apellido1,apellido2,email,password,edad,calle,colonia,municipio,estado,telefono,descripcion,n,genero,turno,token:generarId(),confirmado:0
    });
    
    //Enviar email de confirmación de cuenta
    emailRegistro({
        nombre:usuario.nombre,
        email:usuario.email,
        token:usuario.token
    })

    return res.json({mensaje:'Usuario registrado',tipo:'exito'})
}

const Confirmar=async(req,res)=>{

    const {token}=await req.params;
    
    
    const usuario=await Usuario.findOne({where:{token}});

    if(!usuario){

        return res.json({msg:'Enlace incorrecto, valida tus datos por favor',tipo:'error'})
    }

    //Cambiando datos en la base de datos
    usuario.token=null;
    usuario.confirmado=1;
    usuario.save();

    return res.json({msg:'Usuario confirmado, ya puedes iniciar sesión',tipo:'exito'});
}


//Cambio de contraseña

//GET enviando datos del correo
const FormularioOlvidePassword=(req,res)=>{


    return res.json({csrf:req.csrfToken()})
}

//POST
const FormularioPassword=async(req,res)=>{

    const {email}=req.body;

    //Verificando si el usuario existe
    const usuario=await Usuario.findOne({where:{email}});
    if(!usuario){

        return res.json({mensaje:'Correo no registrado',tipo:'error'})
    }
   
    //Envío de email y generar token
    const token=generarId();
    usuario.token=token;
    await usuario.save();

    emailResetPassword({
        nombre:usuario.nombre,
        email:usuario.email,
        token:usuario.token
    });

    

    return res.json({mensaje:'Te hemos enviado un correo electrónico para reestablecer tu contraseña',tipo:'exito'})
}


const ResetPassword=async(req,res)=>{

    const {token}=req.params;
  
    const usuario=await Usuario.findOne({where:{token}})

    if(!usuario){

        return res.json({mensaje:'El enlace visitado no existe, si deseas realizar el cambio de tu contraseña en MolisStore, verifica tu bandeja de correo, ahí encontrarás el enlace correcto.',tipo:'error'})
    }


    return res.json({csrf:req.csrfToken(),tipo:'exito'})
}

const FormularioRessetPassword=async(req,res)=>{

    const {password,password2}=req.body;
    const {token}=req.params;
   
    if(password!==password2){

        return res.json({mensaje:'Las contraseñas no coinciden',tipo:'error'})
    }

    if(password.length<8){

        return res.json({mensaje:'Las contraseña debe contener mínimo 8 carácteres',tipo:'error'})   
    }

    const usuario=await Usuario.findOne({where:{token}});

    const salt=await bcrypt.genSalt(10)
    usuario.password=await bcrypt.hash(password,salt)
    usuario.token=null;
    await usuario.save();


    return res.json({mensaje:'Contraseña reestablecida',tipo:'exito'})
}

const InicioSesion=async(req,res)=>{

    return res.json({csrf:req.csrfToken()})
}

const FormularioInicioSesion=async(req,res)=>{

    const {email,password}=req.body;

   const usuario=await Usuario.findOne({where:{email}})

   if(!usuario){

    return res.json({mensaje:'El correo no se encuentra registrado',tipo:'error'})
   }

   if(!usuario.confirmado){

    return res.json({mensaje:'No haz confirmado tu correo electrónico',tipo:'error'})
   }

   //Revisar password

   if(!usuario.verificarPassword(password)){

    return res.json({mensaje:'La contraseña es incorrecta',tipo:'error'})
   }

   //Creando el jwt
    const token=generarJwt({id:usuario.id,nombre:usuario.nombre})

   //Almacenar token en cookie
   res.cookie("token", token, {
    httpOnly: true, // Evita que el token sea accesible desde JavaScript en el navegador
    secure: true, // Solo en HTTPS (desactiva en local si es necesario)
    sameSite: "Strict", // Evita envío de cookies en solicitudes de terceros
});

    return res.json({mensaje:'Iniciando sesion',tipo:'exito'})
}

export {
    Registro,
    Confirmar,
    FormularioRegistro,
    FormularioOlvidePassword,
    FormularioPassword,
    ResetPassword,
    FormularioRessetPassword,
    InicioSesion,
    FormularioInicioSesion
}
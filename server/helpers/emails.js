import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config({path:'.env'})



const emailRegistro=async(datos)=>{

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    
      const {nombre,email,token}=datos;

      //Enviar el email
      await transport.sendMail({
        from:'MolisStore.com',
        to:email,
        subject:'Confirmación de cuenta en MolisStore',
        text:'Confirmación de cuenta en MolisStore',
        html:`
            <p>Hola, ${nombre} comprueba tu cuenta en MolisStore.com</p>
            <p>Tu cuenta ya está lista, solo debes confirmarla en el siguiente enlace:
                <a href="http://localhost:3000/registro/${token}">Confirmar cuenta</a>
            </p>
            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `
      })

}

const emailResetPassword=async(datos)=>{

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const {nombre,email,token}=datos;

  //Enviar el email
  await transport.sendMail({
    from:'MolisStore.com',
    to:email,
    subject:'Reestablecimiento de contraseña',
    text:'Reestablecimiento de contraseña',
    html:`
        <p>Hola, ${nombre}, reset de password en MolisStore.com</p>
        <p>Para realizar el reset de tu contraseña, debes ingresar en el siguiente enlace:
            <a href="http://localhost:3000/resetpassword/${token}">Reset Password</a>
        </p>
        <p>Si tu no solicitaste este movimiento puedes ignorar el mensaje</p>
    `
  })
}

export {
    emailRegistro,
    emailResetPassword
}
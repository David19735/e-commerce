'use client'
import React, { useEffect, useState } from 'react'
import style from '@/styles/ResetPassword.module.css'
import Link from 'next/link'
import Alerta from '@/components/Alerta'

function ResetPassword() {

  const [email,setEmail]=useState('');
  const [csrfToken, setCsrfToken] = useState('');

  const [tipo,setTipo]=useState('');
  const [mensaje,setMensaje]=useState('');
  const [estadoAlerta,setEstadoAlerta]=useState(false);
  

  useEffect(()=>{
    const getToken=async()=>{

      const res=await fetch('http://localhost:4000/auth/olvidePassword',{
        credentials: 'include' // Permitir cookies en la solicitud
      })

      const data=await res.json();
      setCsrfToken(data.csrf);
    }
    getToken()

  },[])


  const handleSubmit=async(e)=>{
    e.preventDefault();

    const res=await fetch('http://localhost:4000/auth/olvidePassword',{
      'method':'POST',
      headers:{
        "Content-Type":"application/json",
        'X-CSRF-Token': csrfToken
      },
      body:JSON.stringify({email}),
      credentials:'include'
    })

    const data=await res.json();
      setEstadoAlerta(true)
      setMensaje(data.mensaje)
      setTipo(data.tipo);
  }

  return (
    <div className={style.contendor}>
            <h2>MOLIS<span>STORE</span></h2>
            <form action="" className={style.formulario} onSubmit={handleSubmit}>
                <h3>Recupera tu contraseña</h3>

                <div className={style.contenedorInput}>
                    <label htmlFor="email">Correo</label>
                    <input type="email" placeholder='Escribe tu email' id='email' name='email'
                    value={email} onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>

                <div className={style.contenedorLinks}>
                    <Link href={'/registro'}>¿No tienes cuenta? Regístrate</Link>
                    <Link href={'/sesion'}>¿Ya tienes cuenta? Incia sesión</Link>
                </div>

                <button>Enviar</button>

            </form>
            {
              estadoAlerta===true&&
              <Alerta
                tipo={tipo}
                mensaje={mensaje}
                estadoAlerta={estadoAlerta} setEstadoAlerta={setEstadoAlerta}
            />
            }
    </div>
  )
}

export default ResetPassword
'use client';
import React, { useEffect, useState } from 'react'
import style from '@/styles/IniciarSesion.module.css'
import Link from 'next/link'
import Alerta from '@/components/Alerta';
import { useRouter } from 'next/navigation';



function IniciarSesion() {

   const router=useRouter();
  

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [mensaje,setMensaje]=useState([]);
  const [tipo,setTipo]=useState('');
  const [estadoAlerta,setEstadoAlerta]=useState(false);

  const [csrfToken, setCsrfToken] = useState('');

  useEffect(()=>{

    const getCstf=async()=>{
      const res=await fetch('http://localhost:4000/auth/login',{
        credentials:'include'
      })
      const data=await res.json();
      setCsrfToken(data.csrf)
    }

    getCstf();
  },[])


    const handleChange=(e)=>{
        if(e.target.name==="email"){
          setEmail(e.target.value)
        }
        else if(e.target.name==="password"){
          setPassword(e.target.value);
        }
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();

      if(email==='' || password===''){

        setEstadoAlerta(true);
        setTipo('error');
        setMensaje('Los campos no pueden estar vacíos');
        return
      }

      const res=await fetch('http://localhost:4000/auth/login',{
        'method':'POST',
        headers:{
          'Content-Type':'application/json',
          'X-CSRF-Token': csrfToken
        },
        body:JSON.stringify({email,password}),
        credentials:'include'
      })       

      const data=await res.json();
      setEstadoAlerta(true);
      setMensaje(data.mensaje)
      setTipo(data.tipo)

      if(data.tipo==='exito'){
        router.push('/')
      }
    }




  return (
    <div className={style.contendor}>
            <h2>MOLIS<span>STORE</span></h2>
            <form action="" className={style.formulario} onSubmit={handleSubmit}>
                <h3>Iniciar Sesión</h3>

                <div className={style.contenedorInput}>
                    <label htmlFor="email">Correo</label>
                    <input type="email" placeholder='Escribe tu email' name='email' id='email'
                      value={email} onChange={handleChange}
                    />
                </div>

                <div className={style.contenedorInput}>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='Escribe tu contraseña' id='password' name='password'
                      value={password} onChange={handleChange}
                    />
                </div>

                <div className={style.contenedorLinks}>
                    <Link href={'/registro'}>¿No tienes cuenta? Regístrate</Link>
                    <Link href={'/resetpassword'}>¿Olvidaste tu contraseña?</Link>
                </div>

                <button>Iniciar Sesión</button>

            </form>

            {
              estadoAlerta&&
              <Alerta
                tipo={tipo} mensaje={mensaje} estadoAlerta={estadoAlerta} setEstadoAlerta={setEstadoAlerta}
              />
            }
    </div>
  )
}

export default IniciarSesion
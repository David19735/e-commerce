'use client'
import React,{useEffect, useState} from 'react'
import style from '@/styles/FormularioNewPassword.module.css'
import Link from 'next/link';
import Alerta from '@/components/Alerta';

function FormularioNewPassword({token}) {

  const [password,setPassword]=useState('');
  const [password2,setPassword2]=useState('');
  const [mensaje,setMensaje]=useState();
  const [tipo,setTipo]=useState('');
  const [estadoAlerta,setEstadoAlerta]=useState(false);
  const [csrfToken, setCsrfToken] = useState('');

  const [parametros,setParametros]=useState(false);
 

  useEffect(()=>{

    const getCsrf=async()=>{

      const res=await fetch(`http://localhost:4000/auth/resetpassword/${token}`,{
        credentials:'include'
      })
      const data=await res.json();
      if(data.tipo==='error'){
        setParametros(false)
        setMensaje(data.mensaje)
        return
      }
      setCsrfToken(data.csrf);
      setParametros(true);
    }
    getCsrf();

  },[])

  const handleChange=(e)=>{
    if(e.target.name==='password'){
      setPassword(e.target.value)
    }
    if(e.target.name==='password2'){

      setPassword2(e.target.value);
    }
  }

  const handleSubmit=async(e)=>{

    e.preventDefault();

    if(password==='' || password2===''){

      setEstadoAlerta(true);
      setTipo('error');
      setMensaje('Rellena los campos de la contraseña')
      return
    }

    const res=await fetch(`http://localhost:4000/auth/resetpassword/${token}`,{
      'method':'POST',
      headers:{
        'Content-Type':'application/json',
        'X-CSRF-Token':csrfToken
      },
      body:JSON.stringify({password,password2}),
      credentials:'include'
    })

    const data=await res.json();

    setEstadoAlerta(true);
    setMensaje(data.mensaje);
    setTipo(data.tipo);
  }

  return (
    <>
    {
      parametros===true?
      <div className={style.contendor}>
    <h2>MOLIS<span>STORE</span></h2>
    <form action="" className={style.formulario} onSubmit={handleSubmit}>
        <h3>Cambia tu contraseña</h3>

        <div className={style.contenedorInput}>
            <label htmlFor="password">Contraseña</label>
            <input type="password" placeholder='Escribe tu contraseña' name='password' id='password'
              value={password} onChange={handleChange}
            />
        </div>

        <div className={style.contenedorInput}>
            <label htmlFor="password2">Repite contraseña</label>
            <input type="password" placeholder='Repite la contraseña' id='password2' name='password2'
              value={password2} onChange={handleChange}
            />
        </div>

        <button>Enviar</button>

    </form>
      {
        estadoAlerta&&
        <Alerta
          tipo={tipo} mensaje={mensaje} estadoAlerta={estadoAlerta} setEstadoAlerta={setEstadoAlerta}
        />
      }
    
</div>
:
<div className={style.contendor}>
  <h2>MOLIS<span>STORE</span></h2>
    <div className={style.noExiste}>
        <h3>{mensaje}</h3>
        <Link href={'/sesion'}>Iniciar Sesión</Link>
    </div>
</div>
    }
    </>
  )
}

export default FormularioNewPassword
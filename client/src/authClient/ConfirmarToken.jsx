import React from 'react'
import style from '@/styles/ConfirmarToken.module.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

async function ConfirmarToken({token}) {

  const res=await fetch(`http://localhost:4000/auth/confirmar/${token}`);
  const data=await res.json();
  console.log(data);
   
  return (
    <>
    {
      data.tipo==='exito' ?
      <div className={style.contenedor}>
        <h1>{data.msg}</h1>
        <a href="/sesion">Iniciar Sesión <i className="bi bi-arrow-right-square-fill"></i></a>
      </div>
     :
     <div className={style.contenedor}>
      {data.msg}
      <a href="/registro">Registrarse <i className="bi bi-arrow-right-square-fill"></i></a>
     </div>

    }
    </>
  )
}

export default ConfirmarToken
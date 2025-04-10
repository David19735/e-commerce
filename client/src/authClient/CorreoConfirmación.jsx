import React from 'react'
import style from '@/styles/CorreoConfirmacion.module.css'

function CorreoConfirmación() {
  return (
    <div className={style.contenedor}>
       <h1>Molis<span>Store</span></h1>
       <h2>Cuenta creada correctamente</h2>
       <p>Hemos enviado un email de confirmación, presiona en el enlace <a href="">Confirmar correo</a></p>
    </div>
  )
}

export default CorreoConfirmación
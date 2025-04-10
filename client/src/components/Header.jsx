import React from 'react'
import style from '@/styles/Header.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function Header() {
  return (
    <header className={style.header}>
        <div className={style.contenedor_logo}>
          <img src="/imagenes/Logo.jpg" alt="" />
        </div>  

        <div className={style.direccion}>
            <p>Entrega en Naucalpan 53550</p>
            <p><i className="bi bi-pin-map-fill"></i> Segunda Cerrada de San Andrés Atoto 25</p>
        </div>

        <div className={style.contenedor_input}>
            <input type="text" placeholder='Busca un producto'/>
           <button><i className="bi bi-search-heart"></i></button>
        </div>

        <div className={style.carrito}>
        <i className="bi bi-cart-fill"></i>
        <p>Carrito</p>
        <p>1</p>
        </div>

      <div className={style.sesion}>
        <p>Hola, David Pérez</p>
        <button>Iniciar Sesión</button>
      </div>

    </header>
  )
}

export default Header
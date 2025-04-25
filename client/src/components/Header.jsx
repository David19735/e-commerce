import React from 'react'
import style from '@/styles/Header.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from 'next/link';


function Header() {
  return (
    <header className={style.header}>
          <div className={style.enlaces}>
            <Link href={'/'}>Inicio</Link>
            <Link href={'/'}>Videojuegos</Link>
            <Link href={'/'}>Celulares</Link>
            <Link href={'/'}>Tablets</Link>
            <Link href={'/'}>Mascotas</Link>
          </div>
          

          <div className={style.iconos}>
          <div className={style.domicilio}>
              <p><i className="bi bi-geo-alt-fill"></i> Entrega en Segunda Cerrada de San Andrés Atoto</p>
              <p>Naucalpan 53550</p>
          </div>
          <i className="bi bi-cart-fill"></i>
          <i className="bi bi-person-circle"></i>
          </div>

    </header>
  )
}

export default Header
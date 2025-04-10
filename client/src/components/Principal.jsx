import React from 'react'
import style from '@/styles/Principal.module.css';
import Link from 'next/link';

function Principal() {
  return (
    <div>
        <div className={style.bg}>
            <div className={style.bg_content}>
                <p>Conoce nuestras ofertas de consolas de videojuegos</p>
                <Link href={'/'}>Mirar más <i className="bi bi-caret-right-square"></i></Link>
            </div>
        </div>
    </div>
  )
}

export default Principal
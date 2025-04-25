'use client'
import React from 'react'
import style from '@/styles/Compras.module.css'


function Compras() {
  return (
    <>
      <div className={style.juegos} data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1000">
            <div className={style.juego}>

              <div className={style.contenido} >
                <h3>Crash Bandicot</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum at delectus ut corrupti excepturi reprehenderit voluptate ratione hic libero ad. Dolorum illum molestias voluptates suscipit!</p>
              </div>
              <img src="/imagenes/juegos/game2.png" alt="" />
            </div>

            <div className={style.juego}>
              
            <div className={style.contenido} >
            <h3>Crash Bandicot</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum at delectus ut corrupti excepturi reprehenderit voluptate ratione hic libero ad. Dolorum illum molestias voluptates suscipit!</p>
            </div>
            <img src="/imagenes/juegos/game3.png" alt="" />
            </div>

            <div className={style.juego}>

            <div className={style.contenido} >
            <h3>Crash Bandicot</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum at delectus ut corrupti excepturi reprehenderit voluptate ratione hic libero ad. Dolorum illum molestias voluptates suscipit!</p>
            </div>
            <img src="/imagenes/juegos/game4.png" alt="" />
            </div>

            <div className={style.juego}>

            <div className={style.contenido} >
            <h3>Crash Bandicot</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum at delectus ut corrupti excepturi reprehenderit voluptate ratione hic libero ad. Dolorum illum molestias voluptates suscipit!</p>
            </div>
            <img src="/imagenes/juegos/game5.png" alt="" />
            </div>
      </div>
    </>
  )
}

export default Compras
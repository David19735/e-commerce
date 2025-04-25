import React from 'react'
import style from '@/styles/Principal.module.css';
import Link from 'next/link';
import Carousel from './Carousel';
import Compras from './Compras';
import Header from './Header';
import JuegoPrincipal from './JuegoPrincipal';

function Principal() {
  return (
    <div>
       <Header/>
        <div className={style.bg}>
        </div>
        <JuegoPrincipal/>
        <Compras/>
          <Carousel/>

    </div>
  )
}

export default Principal
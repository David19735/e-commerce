'use client';
import React, { useEffect } from 'react'

function Bootstrap() {

    useEffect(()=>{
        import('bootstrap/dist/js/bootstrap.min.js')
    },[])

  return (
    <>
    </>
  )
}

export default Bootstrap
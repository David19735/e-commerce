import React from 'react'
import FormularioNewPassword from '@/authClient/FormularioNewPassword';

async function page({params}) {

    const {token}=await params;

  return (
    <>
    <FormularioNewPassword token={token}/>
    </>
  )
}

export default page
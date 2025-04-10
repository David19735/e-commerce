import React from 'react'
import ConfirmarToken from '@/authClient/ConfirmarToken';

async function page({params}) {

    const {token}=await params;
    console.log(token);

  return (
    <>
    <ConfirmarToken
        token={token}
    />
    </>
  )
}

export default page
'use client'
import React, { useEffect, useState } from 'react'
import style from '@/styles/Registro.module.css'
import Link from 'next/link';
import Alerta from '@/components/Alerta';
import { useRouter } from 'next/navigation';

function Registro() {

    const router=useRouter();

    const [avanzar,setAvanzar]=useState(false);

    const[nombre,setNombre]=useState('')
    const[apellido1,setApellido1]=useState('')
    const[apellido2,setApellido2]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[password2,setPassword2]=useState('')
    const[edad,setEdad]=useState('')
    const[calle,setCalle]=useState('')
    const[colonia,setColonia]=useState('')
    const[municipio,setMunicipio]=useState('')
    const[estado,setEstado]=useState('')
    const[telefono,setTelefono]=useState('')
    const[descripcion,setDescripcion]=useState('')
    const[n,setN]=useState('')
    const[genero,setGenero]=useState('');
    const[turno,setTurno]=useState('')

    const[tipo,setTipo]=useState('');
    const[mensaje,setMensaje]=useState('');
    const[estadoAlerta,setEstadoAlerta]=useState(false);

    const [csrfToken, setCsrfToken] = useState('');

    const handleChange=(e)=>{
        switch(e.target.name){
            case 'nombre': setNombre(e.target.value) 
            break;
            case 'apellido1': setApellido1(e.target.value)
            break;
            case 'apellido2': setApellido2(e.target.value)
            break;
            case 'email': setEmail(e.target.value)
            break;
            case 'password': setPassword(e.target.value)
            break;
            case 'password2': setPassword2(e.target.value);
            break;
            case 'edad': setEdad(e.target.value)
            break;
            case 'calle': setCalle(e.target.value)
            break;
            case 'colonia': setColonia(e.target.value)
            break;
            case 'municipio': setMunicipio(e.target.value)
            break;
            case 'estado': setEstado(e.target.value)
            break;
            case 'telefono': setTelefono(e.target.value);
            break;
            case 'descripcion': setDescripcion(e.target.value);
            break;
            case 'n': setN(e.target.value)
            break;
            case 'genero': setGenero(e.target.value)
            break;
            case 'turno': setTurno(e.target.value)
            break;
        }
    }

    useEffect(()=>{
        const obtenerCsrf=async()=>{
            const res=await fetch('http://localhost:4000/auth/registro',{
                credentials: 'include' // Permitir cookies en la solicitud
            });
            const data=await res.json();
            setCsrfToken(data.csrf)
        }
    
        obtenerCsrf();
       },[])


    const handleSubmit=async(e)=>{
        e.preventDefault();

        

         const datos={nombre, apellido1,apellido2,email,password,password2,edad,calle,colonia,municipio,estado,telefono,descripcion,n,genero,turno}
            
        const res=await fetch('http://localhost:4000/auth/registro',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'X-CSRF-Token': csrfToken // Enviar el token CSRF en el header
            },
            body:JSON.stringify(datos),
            credentials:'include'
        })
        const data=await res.json();

        setEstadoAlerta(true);
        setMensaje(data.mensaje)
        setTipo(data.tipo);
        if(data.tipo==="exito"){
            router.push('/alertaConfirmacion')
        }
    }

  return (
    <div className={style.contenedorRegistro}>
        <h2>MOLIS<span>STORE</span></h2>

        <form className={style.formulario} onSubmit={handleSubmit}>
            <h4>Registro</h4>

            {
               !avanzar&&
               <div className={style.Contenedor1}>
                    <div className={style.contenedorGrid1}>

                        <div className={style.contenedorInput}>
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" placeholder='Escribe tu nombre' id='nombre' name='nombre'
                            value={nombre} onChange={handleChange}
                            />
                        </div>
                        <div className={style.contenedorInput}>
                            <label htmlFor="apellido1">Apellido 1</label>
                            <input type="text" placeholder='Escribe tu primer apellido' id='apellido1' name='apellido1'
                            value={apellido1} onChange={handleChange}
                            />
                        </div>
                        <div className={style.contenedorInput}>
                            <label htmlFor="apellido2">Apellido 2</label>
                            <input type="text" placeholder='Escribe tu segundo apellido' name='apellido2' id='apellido2' value={apellido2} onChange={handleChange}
                            />
                        </div>
                        <div className={style.contenedorInput}>
                            <label htmlFor="email">Correo</label>
                            <input type="text" placeholder='Escribe tu email' name='email' id='email' value={email} onChange={handleChange} 
                            />
                        </div>
                        <div className={style.contenedorInput}>
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder='Escribe tu password' name='password' id='password' value={password} onChange={handleChange} 
                            />
                        </div>
                        <div className={style.contenedorInput}>
                            <label htmlFor="password2">Repite password</label>
                            <input type="password" placeholder='Escribe nuevamente tu password' id='password2' name='password2' value={password2} onChange={handleChange}
                            />
                        </div>

                    </div>
                    <div className={style.preguntasChicas}>

                        <div className={style.preguntasChicas1}>
                            <label htmlFor="edad">Edad</label>
                            <input type="text" placeholder='Edad' name='edad' id='edad' value={edad} onChange={handleChange}/>
                        </div>
                        <div className={style.preguntasChicas2}>
                            <select name="genero" id="genero" value={genero} onChange={handleChange}>
                                <option value="" disabled>-Género-</option>
                                <option value="m">Masculino</option>
                                <option value="f">Femenino</option>
                            </select>

                        </div>
                        <Link href={'/sesion'} className={style.link}>¿Ya tienes cuenta? Inicia sesión</Link>
                    </div>
                    <div className={style.contenedorBtn1}>
                        <button
                        type='button'
                            onClick={
                                ()=>{
                                    if(nombre===''||apellido1===''||apellido2===''||email===''||password===''||password2===''||edad===''||genero===''){

                                        setTipo('error')
                                        setMensaje('Rellena todos los campos')
                                        setEstadoAlerta(true);

                                    }
                                    else{
                                        setAvanzar(true);
                                    }
                                }
                            }
                        >Siguiente</button>
                    </div>
                </div> 
            }

            {
                avanzar&&
                <div className={style.Contenedor2}>
                        <div className={style.contenedorGrid1}>

                            <div className={style.contenedorInput}>
                                <label htmlFor="calle">Calle</label>
                                <input type="text" placeholder='Calle de tu vivienda' id='calle' name='calle' value={calle} onChange={handleChange}/>
                            </div>
                            <div className={style.contenedorInput}>
                                <label htmlFor="colonia">Colonia</label>
                                <input type="text" placeholder='Colonia de tu vivienda' id='colonia' name='colonia' value={colonia} onChange={handleChange}/>
                            </div>
                            <div className={style.contenedorInput}>
                                <label htmlFor="municipio">Municipio</label>
                                <input type="text" placeholder='Municipio de tu vivienda' id='municipio' name='municipio' value={municipio} onChange={handleChange}/>
                            </div>
                            <div className={style.contenedorInput}>
                                <label htmlFor="estado">Estado</label>
                                <input type="text" placeholder='Estado donde radicas' id='estado' name='estado'
                                value={estado} onChange={handleChange}/>
                            </div>
                            <div className={style.contenedorInput}>
                                <label htmlFor="telefono">Teléfono</label>
                                <input type="text" placeholder='Digita tu número celular' name='telefono' id='telefono' value={telefono} onChange={handleChange}/>
                            </div>
                            <div className={style.contenedorInput}>
                                <label htmlFor="vivienda">Descripción de tu vivienda</label>
                                <input type="text" placeholder='Escribe una breve descripción de tu vivienda' name='descripcion' id='descripcion' value={descripcion} onChange={handleChange}/>
                            </div>

                            </div>

                            <div className={style.preguntasChicas}>

                        <div className={style.preguntasChicas1}>
                            <label htmlFor="n">Número</label>
                            <input type="text" placeholder='N.' id='n' name='n' value={n} onChange={handleChange}/>
                        </div>
                        <div className={style.preguntasChicas2}>
                            <select name="turno" id="turno" value={turno} onChange={handleChange}>
                                <option value="" disabled>-Horario-</option>
                                <option value="matutino">Matutino</option>
                                <option value="vespertino">Vespertino</option>
                            </select>

                        </div>
                    </div>
                    <div className={style.contenedorBtn2}>
                        <button className={style.btN1}
                            onClick={()=>{setAvanzar(false)}}
                        >Atrás</button>
                        <button className={style.btN2} type='submit'>Registrarse</button>
                    </div>
                </div>
            }
        </form>
           {
            estadoAlerta&&
            <Alerta
            tipo={tipo} mensaje={mensaje} estadoAlerta={estadoAlerta} setEstadoAlerta={setEstadoAlerta}
        />
           }
    </div>
  )
}

export default Registro
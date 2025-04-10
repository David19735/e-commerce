import React,{useEffect} from 'react'
import styled,{keyframes} from 'styled-components';

function Alerta({tipo,mensaje,estadoAlerta,setEstadoAlerta}) {

    useEffect(()=>{
            let tiempo;
            if(estadoAlerta===true){
               tiempo=setTimeout(()=>{
                    setEstadoAlerta(false);
                },2000)
            }
            return(()=>clearTimeout(tiempo))
    
        },[estadoAlerta,setEstadoAlerta])

  return (
    <ContenedorAlerta tipo={tipo}>
        <p>{mensaje}</p>
    </ContenedorAlerta>
)
}


const slideDown = keyframes`
    0% {
        transform: translateY(-1.25rem); /* 20px */
        opacity: 0;
    }
 
    10% {
        transform: translateY(0.2rem);
        opacity: 1;
    }
    
    90% {
        transform: translateY(0.2rem);
        opacity: 1;
    }
 
    100% {
        transform: translateY(0.2rem);
        opacity: 0;
    }
`;
 
const ContenedorAlerta = styled.div`
    z-index: 1000;
    width: 100%;
    left: 0;
    top: 1.25rem; /* 20px */
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${slideDown} 4s ease forwards;
 
    p {
 
        background: ${(props) => {
            if(props.tipo === 'error'){
                return '#b41b2b';
            } else if (props.tipo === 'exito') {
                return '#0f5213';
            } else {
                return '#000';
            }
        }};
        color: #fff;
        padding: 1.25rem 4rem; /* 20px 40px */
        border-radius: 0.31rem; /* 5px */
        box-shadow: 0px 0px 15px rgba(0,0,0,.1);
        text-align: center;
        font-weight: 700;
        font-size: 1.2rem;
    }
`;

export default Alerta
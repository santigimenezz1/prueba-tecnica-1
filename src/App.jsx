import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const CAT_ENDPOINT_IMANGE_URL = `https://cataas.com/cat/says/${"text"}?fontSize=50&fontColor=red&json=true`
  const [frase, setFrase] = useState("")
  const [url, setUrl] = useState("")

   useEffect(()=>{  //aca hago la peticion, guardo la frase en un estado y obtengo la primera palabra 
    fetch("https://catfact.ninja/fact")
    .then((res)=>res.json())
    .then((res)=>{
      setFrase(res.fact)
      console.log(res)
      const {fact} = res 
      setFrase(fact)
      const primeraPalabra = fact.split(" ")[0]
      console.log(primeraPalabra)
      //Aca tengo que hacer la peticion para buscar el objeto del gato y obtener el id para armar la url
      fetch(`https://cataas.com/cat/says/${primeraPalabra}&json=true`)
      .then((data)=>data.json())
      .then((data)=>{  
        console.log(data)     //una vez que contengo del objeto el id creo la url para guardarla en un estado y luego ponerla en el src de la imagen en el renderizado
        const url = data._url
        setUrl(`https://cataas.com/cat/says/${url}`)
      })
                                              
    })
   },[])

 
  return (
    <>
    <h1>{frase}</h1>
    <img src={url}></img>
    
  
    </>
  )
}

export default App



// En esta prueba tecnica tenemos 2 apis, en la primera vamos a recuperar una frease, de lo cual vamos a quedarnos con la primera palabra
// esto lo hacemos convirtiendo el string en un arreglo con un split() y quedandome con la palabra en la posicion [0]
// luego cuando obtengo la primera palabra hago la segunda peticion obteniendo un objeto de un gato, tengo que sacar el id
// para luego construir la url de la imagen y poder renderizarlo en una etiqueta img. 



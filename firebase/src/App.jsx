import React, { useState } from 'react';
import './App.css';

import { db } from './firebaseConnection'
import {
  doc,
  setDoc,
  collection,
  addDoc
} from 'firebase/firestore'

function App() {

  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')

  async function handleAdd() {
    // // setDoc --> registra no banco porem voce passa o id manualmente 
    // await setDoc(doc(db, 'posts', "12345"),{
    //   autor,
    //   titulo
    // })
    // .then(()=>{
    //   alert("cadastrado!")
    // })
    // .catch((err)=>{
    //   console.log(err)
    // })

    await addDoc(collection(db, "posts"),{
      autor,
      titulo
    })
    .then(()=>{
      alert('cadastrado')
    })
    .catch((err)=>{
      console.log(err)
    })

    setAutor("")
    setTitulo("")
  }

  return (
    <div>
      <h1>ReactJS + Firebase</h1>

      <div className='container'>
        <label>Titulo:</label>
        <textarea
          type="text"
          placeholder='Digite o titulo'
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
        ></textarea>

        <label>Autor:</label>
        <input
          type="text"
          placeholder='Autor do post'
          onChange={e => setAutor(e.target.value)}
        />

        <button onClick={handleAdd}>Cadastrar</button>
      </div>
    </div>
  );
}

export default App;

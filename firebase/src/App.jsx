import React, { useEffect, useState } from "react";
import './App.css'

import { db } from './firebaseConnection'
import {
  doc,
  setDoc,
  collection
  , addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore'

function App() {

  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [idPost, setIdPost] = useState('')

  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function loadPosts() {
      const onsub = onSnapshot(collection(db, "posts"), (snapshot) => {
        let listaPosts = []

        snapshot.forEach((doc) => {
          listaPosts.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor
          })
        })

        setPosts(listaPosts)

      })
        .catch((error) => {
          console.log(error)
        })
    }
    loadPosts()
  }, [])

  async function handleAdd() {
    // await setDoc(doc(db, "posts", "12345"),{
    //   titulo: titulo,
    //   autor: autor
    // })
    // .then(()=>{
    //   console.log("dados registrados no banco")
    // })
    // .catch((error)=>{
    //   console.log("gerou erro" + error)
    // })

    await addDoc(collection(db, 'posts'), {
      titulo: titulo,
      autor: autor
    })
      .then(() => {
        console.log("sucesso")
        setAutor('')
        setTitulo('')
      })
      .catch((error) => {
        console.log('Erro' + error)
      })

  }

  async function buscarPost() {
    // const postRef = doc(db, "posts", "z9dX5dgtDKlRuHQXWD22")

    // await getDoc(postRef)
    // .then((snapshot)=>{
    //   setAutor(snapshot.data().autor)
    //   setTitulo(snapshot.data().titulo)
    // })
    // .catch((error)=>{
    //   console.log(error)
    // })

    const postsRef = collection(db, 'posts')

    await getDocs(postsRef)
      .then((snapshot) => {
        let lista = []

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor
          })
        })

        setPosts(lista)

      })
      .catch((error) => {
        console.log(error)
      })

  }

  async function editarPost() {
    const docRef = doc(db, "posts", idPost)

    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor
    })
      .then(() => {
        setIdPost('')
        setAutor('')
        setTitulo('')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function excluirPost(id) {
    const docRef = doc(db, "posts", id)

    await deleteDoc(docRef)
      .then(() => {
        alert("Post deletado com sucesso")
      })
  }

  return (
    <div>
      <h1>React firebase</h1>
      <div className="container">
        <label>Id do Post</label>
        <input
          type="text"
          placeholder="Digite o Id dio o post"
          value={idPost}
          onChange={(e) => setIdPost(e.target.value)}
        /> <br />
        <label>Titulo:</label>
        <textarea
          placeholder="Digite um titulo"
          typeof="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <label>Autor</label>
        <input
          type="text"
          placeholder="Autor do post"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />
        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscarPost} >Buscar post</button><br />
        <button onClick={editarPost} >Atualizar Post</button>

        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <strong>ID: {post.id}</strong> <br />
                <span>Titulo: {post.titulo}</span> <br />
                <span>Autor: {post.autor}</span> <br />
                <button onClick={() => excluirPost(post.id)} >Excluir</button> <br /><br />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;

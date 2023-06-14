import React, { useEffect, useState } from 'react';
import './App.css';

import { db, auth } from './firebaseConnection'
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

function App() {
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [idPost, setIdPost] = useState('')

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const [user, setUser] = useState(false)
  const [userDetail, setUserDetail] = useState({})

  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function loadPosts() {

      // onSnapshot -->fica observando o banco e atualiza oq for preciso
      const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
        let listaPost = []

        snapshot.forEach((doc) => {
          listaPost.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor
          })
        })

        setPosts(listaPost)
      })
    }
    loadPosts()
  }, [])

  useEffect(() => {
    async function checkLogin() {
      const utcDate = new Date();
      console.log(utcDate)
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user.metadata.lastSignInTime)
          setUser(true)
          setUserDetail({
            uid: user.uid,
            email: user.email
          })
        } else {
          setUser(false)
          setUserDetail({})
        }
      })
    }

    checkLogin()
  }, [])

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

    // addDov --> registra no banco com um id aleatorio automatico 
    // collection ==> usado para indicar em qual coleção sera cadastrado as informações 
    await addDoc(collection(db, "posts"), {
      autor,
      titulo
    })
      .then(() => {
        alert('cadastrado')
      })
      .catch((err) => {
        console.log(err)
      })

    setAutor("")
    setTitulo("")
  }

  async function buscarPost() {
    // const postRef = doc(db, "posts", "kMjmDlUqG9kx1NoNVjLJ")

    // //getDoc --> pega um post especifico passado diretamente na referencia 
    // await getDoc(postRef)
    //   .then((snapshot) => {
    //     setAutor(snapshot.data().autor)
    //     setTitulo(snapshot.data().titulo)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })

    const postsRef = collection(db, "posts")

    // getdocs --> pega todos os posts 
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
      .catch((err) => {
        console.log(err)
      })

  }

  async function editarPost() {
    const docRef = doc(db, "posts", idPost)

    // updateDoc --> Atualiza o post usando de referencia o id do mesmo 
    await updateDoc(docRef, {
      titulo,
      autor
    })
      .then(() => {
        alert('Atualizado!')
        setAutor('')
        setIdPost('')
        setTitulo('')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async function excluirPost(id) {
    const docRef = doc(db, "posts", id)

    //deleteDoc--> deleta o post referente ao id passado
    await deleteDoc(docRef)
      .then(() => {
        alert('Deletado')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async function novoUsuario() {

    //createUserWithEmailAndPassword --> Cria um novo usuario baseado no email e senha
    await createUserWithEmailAndPassword(auth, email, senha)
      .then((value) => {
        alert("usuario cadastrado")

        setEmail('')
        setSenha('')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  async function logarUsuario() {

    //signInWithEmailAndPassword --> loga o usuario baseado no email e na senha
    await signInWithEmailAndPassword(auth, email, senha)
      .then((value) => {
        alert('logado com sucesso')

        setUserDetail({
          uid: value.user.uid,
          email: value.user.email
        })
        setUser(true)

        setEmail('')
        setSenha('')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async function fazerLogout() {
    await signOut(auth)
    setUser(false)
    setUserDetail({})
  }

  return (
    <div>
      <h1>ReactJS + Firebase</h1>

      {user && (
        <div>
          <strong>Seja bem-vindo(a)!</strong><br />
          <span>ID: {userDetail.id} - Email: {userDetail.email}</span><br />
          <button onClick={fazerLogout}>Sair da conta</button>
          <br /><br />
        </div>
      )}

      <div className='container'>
        <h2>Usuarios</h2>

        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Email'
        />

        <label>Senha:</label>
        <input
          type="text"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          placeholder='Senha'
        />
        <button onClick={novoUsuario}>Cadastrar</button>
        <button onClick={logarUsuario} >Login</button>

      </div>

      <br /><br /><hr />

      <div className='container'>
        <h2>Posts</h2>

        <label>Id do post:</label>
        <input
          type="text"
          value={idPost}
          placeholder='Digite o id do post que deseja buscar'
          onChange={e => setIdPost(e.target.value)}
        />
        <label>Titulo:</label>
        <textarea
          type="text"
          placeholder='Digite o titulo'
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
        ></textarea>

        <label>Autor:</label>
        <input
          value={autor}
          type="text"
          placeholder='Autor do post'
          onChange={e => setAutor(e.target.value)}
        />

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscarPost}>Buscar Post</button> <br />
        <button onClick={editarPost}>Atualizar Post</button>

        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <strong>ID: {post.id}</strong> <br />
                <span>Titulo: {post.titulo}</span> <br />
                <span>Autor: {post.autor}</span> <br />
                <button onClick={() => excluirPost(post.id)}>Excluir</button> <br /><br />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;

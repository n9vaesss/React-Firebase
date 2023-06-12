import { useEffect, useState } from "react";

import { db } from './firebaseConnection'
import { uid } from 'uid'
import { set, ref, onValue, remove } from 'firebase/database'

import './App.css'

function App() {

  const [codBarra, setCodBarra] = useState("")
  const [nomeProduto, setNomeProduto] = useState("")
  const [undNegocio, setUniNegocio] = useState("")
  const [dataValidade, setDataValidade] = useState("")
  const [todos, setTodos] = useState([])

  //read
  useEffect(() => {
    onValue(ref(db), snapshot => {
      setTodos([])
      const data = snapshot.val()
      if (data !== null) {
        Object.values(data).map(todo => {
          console.log(todo)
          setTodos(oldArray => [...oldArray, todo])
          console.log(todos)
        })
      }
    })
  }, [])

  //write
  const WriteToDatabase = () => {
    const uuid = uid()
    set(ref(db, `/${uuid}`), {
      codBarra,
      nomeProduto,
      undNegocio,
      dataValidade,
      uuid,
    })
    setCodBarra("")
    setNomeProduto("")
    setUniNegocio("")
    setDataValidade("")
  }

  //delete

  const handleDelete = (todo) => {
    remove(ref(db, `${todo.uuid}`))
  }

  return (
    <div className="main">

      <main>
        <h1>Teste planilha</h1>

        <form>
          <label> Código de barras: </label>
          <input type="text" value={codBarra} onChange={(e) => setCodBarra(e.target.value)} />
          <label> Nome do produto: </label>
          <input type="text" value={nomeProduto} onChange={(e) => setNomeProduto(e.target.value)} />
          <label> Unidade de negócio </label>
          <input type="text" value={undNegocio} onChange={(e) => setUniNegocio(e.target.value)} />
          <label> Data de validade: </label>
          <input type="date" value={dataValidade} onChange={(e) => setDataValidade(e.target.value)} />

          <button type="submit" onClick={WriteToDatabase}>Registrar</button>
        </form>

      </main>

      <div className="list">
        {todos.map(todo => (
          <div>
            <h2>Nome: {todo.nomeProduto}</h2>
            <ul>
              <li>Codigo de barra: {todo.codBarra}</li>
              <li>Unidade de negocios: {todo.undNegocio}</li>
              <li>Data de validade: {todo.dataValidade}</li>
            </ul>
            <div>
              <button>Atualizar</button>
              <button onClick={() => handleDelete(todo)}>Deletar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

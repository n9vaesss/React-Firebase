import { useState } from "react";

import validationLogin from "../../js/validationLogin";
import Header from "../../components/header/Header";

import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../connection/firebaseConnection'

function IncludeRegister() {

    const [localidade, setLocalidade] = useState('Loja 1')

    const [codBarras, setCodBarras] = useState('')

    const [nome, setNome] = useState('')

    const [dtValidade, setDtValidade] = useState('')

    const [comissao, setComissao] = useState('')

    const onchangeLocalidade = e => {
        setLocalidade(e.target.value);
    };

    async function handleRegisterProducts(e) {
        e.preventDefault()

        await addDoc(collection(db, "produtos"), {
            comissao: comissao,
            dtValidade: dtValidade,
            localidade: localidade,
            nome: nome,
            codBarras: codBarras
        })
            .then(() => {
                alert('cadastrado')
            })
            .catch((err) => {
                console.log(err)
            })

        setCodBarras("")
        setNome("")
        setDtValidade("")
        setComissao("")
        setLocalidade("Loja 1")
    }

    validationLogin()

    return (
        <>
            <Header />
            <main>
                <form>
                    <div>
                        <label>Codigo de barras: </label>
                        <input
                            type="text"
                            placeholder="Insira o codido de barras"
                            maxLength={45}
                            value={codBarras}
                            onChange={e => setCodBarras(e.target.value)}
                            required 
                        />
                    </div>
                    <div>
                        <label>Nome do Produto: </label>
                        <input
                            type="text"
                            placeholder="Insira o nome do produto"
                            maxLength={45}
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            required 
                        />
                    </div>
                    <div>
                        <label>Localidade: </label>
                        <select value={localidade} onChange={onchangeLocalidade}>
                            <option value="Loja 1">Loja 1</option>
                            <option value="Loja 2">Loja 2</option>
                            <option value="Loja 3">Loja 3</option>
                            <option value="Loja 4">Loja 4</option>
                            <option value="Loja 5">Loja 5</option>
                            <option value="Loja 6">Loja 6</option>
                        </select>
                    </div>
                    <div>
                        <label>Data de validade: </label>
                        <input
                            type="date"
                            value={dtValidade}
                            onChange={e => setDtValidade(e.target.value)}
                            required 
                        />
                    </div>
                    <div>
                        <label>Comissão: </label>
                        <input
                            type="number"
                            placeholder="Insira o valor da comissão"
                            value={comissao}
                            onChange={e => setComissao(e.target.value)}
                            required 
                        />
                    </div>

                    <button onClick={handleRegisterProducts}>Registrar</button>
                </form>
            </main>
        </>
    );
}

export default IncludeRegister;
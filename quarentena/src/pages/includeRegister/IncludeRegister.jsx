import { useState } from "react";
import './IncludeRegister.css'

import validationLogin from "../../js/validationLogin";
import Header from "../../components/header/Header";
import InputsForm from "../../components/inputsForm/InputsForm";

import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../connection/firebaseConnection'

function IncludeRegister() {

    const [localidade, setLocalidade] = useState('Loja 1')
    const [codBarras, setCodBarras] = useState('')
    const [nome, setNome] = useState('')
    const [dtValidade, setDtValidade] = useState('')
    const [comissao, setComissao] = useState('')
    const onchangeLocalidade = e => { setLocalidade(e.target.value) };

    async function handleRegisterProducts(e) {
        e.preventDefault()

        if (codBarras.length && nome.length && dtValidade.length && comissao.length > 0) {
            await addDoc(collection(db, "produtos"), {
                nome: nome,
                codBarras: codBarras,
                localidade: localidade,
                dtValidade: dtValidade,
                comissao: comissao,
            })
                .then(() => {
                    setCodBarras('')
                    setNome('')
                    setDtValidade('')
                    setComissao('')
                    setLocalidade("Loja 1")

                    alert('Item cadastrado com sucesso')
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            alert("preencha todos os campos")
        }
    }

    function handleSetResponseCb(response) {
        if (response[1] === 'codBarras') { setCodBarras(response[0]) }
        if (response[1] === 'nome') { setNome(response[0]) }
        if (response[1] === 'dtValidade') { setDtValidade(response[0]) }
        if (response[1] === 'comissao') { setComissao(response[0]) }
    }

    validationLogin()

    return (
        <>
            <Header />
            <main className="main-includeRegister">
                <div>
                    <InputsForm
                        name="Codigo de barras: "
                        placeholder="Insira o codido de barras"
                        maxL={45}
                        handleSubmit={handleSetResponseCb}
                        nameState="codBarras"
                        type="text"
                    />
                    <InputsForm
                        name="Nome do Produto: "
                        placeholder="Insira o nome do produto"
                        maxL={45}
                        handleSubmit={handleSetResponseCb}
                        nameState="nome"
                        type="text"
                    />
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
                    <InputsForm
                        name="Data de validade: "
                        placeholder=""
                        maxL={45}
                        handleSubmit={handleSetResponseCb}
                        nameState="dtValidade"
                        type="date"
                    />
                    <InputsForm
                        name="Comissão: "
                        placeholder="Insira o valor da comissão"
                        maxL={5}
                        handleSubmit={handleSetResponseCb}
                        nameState="comissao"
                        type="number"
                    />

                    <button onClick={handleRegisterProducts}>Registrar</button>
                </div>
            </main>
        </>
    );
}

export default IncludeRegister;
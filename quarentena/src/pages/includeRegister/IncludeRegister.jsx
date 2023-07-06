import { useEffect, useState } from "react";
import './IncludeRegister.css'

import validationLogin from "../../js/validationLogin";
import Header from "../../components/header/Header";
import InputsForm from "../../components/inputsForm/InputsForm";

import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../connection/firebaseConnection'

import { useNavigate } from 'react-router-dom'

function IncludeRegister() {

    const [localidade, setLocalidade] = useState('Loja 1')
    const [codBarras, setCodBarras] = useState('')
    const [nome, setNome] = useState('')
    const [dtValidade, setDtValidade] = useState('')
    const onchangeLocalidade = e => { setLocalidade(e.target.value) };

    const navigate = useNavigate()

    useEffect(()=>{
        const diffInMs = new Date() - new Date('2023-10-04')
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        let comissao = ''

        if (diffInDays <= -120) {
            comissao = 5
            console.log(5)
        } else if (diffInDays > -120 && diffInDays <= -60) {
            comissao = 7.5
            console.log(7.5)
        } else if (diffInDays > -60) {
            console.log(10)
            comissao = 10
        }
    },[])

    async function handleRegisterProducts(e) {
        e.preventDefault()

        const diffInMs = new Date() - new Date(dtValidade)
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        let comissao = ''

        if (diffInDays <= -120) {
            comissao = 5
            console.log(5)
        } else if (diffInDays > -120 && diffInDays <= -60) {
            comissao = 7.5
            console.log(7.5)
        } else if (diffInDays > -60) {
            console.log(10)
            comissao = 10
        }


        if (codBarras.length && nome.length && dtValidade.length) {

            await addDoc(collection(db, "produtos"), {
                nome: nome,
                codBarras: codBarras,
                localidade: localidade,
                dtValidade: dtValidade,
                comissao: comissao
            })
                .then(() => {
                    setCodBarras('')
                    setNome('')
                    setDtValidade('')
                    setLocalidade("Loja 1")

                    alert('Item cadastrado com sucesso')

                    navigate('/home')
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
    }

    validationLogin()


    useEffect(() => {

    }, [])

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

                    <button onClick={handleRegisterProducts}>Registrar</button>
                </div>
            </main>
        </>
    );
}

export default IncludeRegister;
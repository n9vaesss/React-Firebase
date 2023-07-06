import { useState } from "react";
import Header from "../../components/header/Header";
import validationLogin from '../../js/validationLogin'

import {
    doc,
    updateDoc,
    collection,
    onSnapshot,
} from 'firebase/firestore'

import { db } from '../../connection/firebaseConnection'

import './PainelADM.css'

function PainelADM() {

    const [conferirVendas, setConferirVendar] = useState(false)
    const [produtosVendidos, setProdutosVendidos] = useState([])
    const [vizualizar, setVizualizar] = useState('todos')

    function handleConferir(conf) {
        setConferirVendar(true)

        async function loadProductsVenidos() {
            const unsub = onSnapshot(collection(db, "logsVendasConfirmadas"), (snapshot) => {
                let listProducts = []

                snapshot.forEach((prod) => {
                    listProducts.push({
                        id: prod.id,
                        codBarras: prod.data().codBarras,
                        nome: prod.data().nome,
                        valorVenda: prod.data().valorVenda,
                        dtValidade: prod.data().dtValidade,
                        comissao: prod.data().comissao,
                        nomeDoVendedor: prod.data().nomeDoVendedor,
                        confirmado: prod.data().confirmado
                    })
                })

                listProducts.sort(function (a, b) {
                    if ((a.nomeDoVendedor).toLowerCase() < (b.nomeDoVendedor).toLowerCase()) {
                        return -1;
                    } else {
                        return true;
                    }
                });

                setVizualizar(conf)

                if (vizualizar === 'todos') {
                    setProdutosVendidos(listProducts)
                } else if (vizualizar === 'conferidos') {
                    setProdutosVendidos(listProducts.filter(produtos => produtos.confirmado == 1))
                } else if (vizualizar === 'nao conferidos') {
                    setProdutosVendidos(listProducts.filter(produtos => produtos.confirmado == 0))
                }

            })
        }
        loadProductsVenidos()
    }

    async function handleConferirVenda(id) {

        const docRef = doc(db, "logsVendasConfirmadas", id)

        await updateDoc(docRef, {
            confirmado: 1
        })
            .then(() => {

            })
            .catch((err) => {
                console.log(err)
            })

    }

    async function handleDesconferirVenda(id) {

        const docRef = doc(db, "logsVendasConfirmadas", id)

        await updateDoc(docRef, {
            confirmado: 0
        })
            .then(() => {

            })
            .catch((err) => {
                console.log(err)
            })

    }

    validationLogin()
    return (
        <div className="main-painel">
            <Header />

            <div>
                <button>Inserir novo ususario</button>
                <button onClick={() => handleConferir('todos')}>Conferir vendas</button>
            </div>
            {conferirVendas && <h2>Conferir produtos vendidos</h2>}
            {conferirVendas && <div className="div-boatao-conferir">
                <button onClick={() => handleConferir('conferidos')}>Vizualizar confirmados</button>
                <button onClick={() => handleConferir('nao conferidos')} >Vizualizar não confirmados</button>
            </div>}

            <table>

                <thead>
                    <tr className="title-table">
                        <td>Nome</td>
                        <td colSpan={2}>Codigo de barras</td>
                        <td className="text-center">Data de validade</td>
                        <td className="text-center">Valor da venda</td>
                        <td className="text-center">Valor da comissão</td>
                        <td className="text-center">Comissao do funcionario</td>
                        <td className="text-center">Vendedor</td>
                        <td className="text-center conferir">Editar</td>
                    </tr>
                </thead>
                <tbody>
                    {conferirVendas && produtosVendidos.map((prod) => {
                        return (
                            <tr key={prod.id}>
                                <td>{prod.nome}</td>
                                <td colSpan={2}>{prod.codBarras}</td>
                                <td className="text-center">{prod.dtValidade}</td>
                                <td className="text-center">{prod.valorVenda}</td>
                                <td className="text-center">{prod.comissao}%</td>
                                <td className="text-center">R${(parseFloat(prod.valorVenda.replace(',', '.')) * parseFloat(prod.comissao / 100)).toFixed(2)}</td>
                                <td className="text-center">{prod.nomeDoVendedor}</td>
                                <td className="edit-table">
                                    {prod.confirmado !== 1 && <button onClick={() => handleConferirVenda(prod.id)} className='conferir'>Conferir</button>}
                                    {prod.confirmado == 1 && <button onClick={() => handleDesconferirVenda(prod.id)} className='conferir laranja'>Desconferir</button>}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    );
}

export default PainelADM;
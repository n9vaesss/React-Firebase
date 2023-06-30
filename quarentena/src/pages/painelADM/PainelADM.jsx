import { useState } from "react";
import Header from "../../components/header/Header";
import validationLogin from '../../js/validationLogin'

import {
    collection,
    onSnapshot,
} from 'firebase/firestore'
import { db } from '../../connection/firebaseConnection'
import { query, orderBy, limit } from "firebase/firestore";  

import './PainelADM.css'

function PainelADM() {

    const [conferirVendas, setConferirVendar] = useState(false)
    const [produtosVendidos, setProdutosVendidos] = useState([])

    function handleConferir() {
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
                        nomeDoVendedor: prod.data().nomeDoVendedor
                    })
                })

                listProducts.sort(function(a, b) {
                    if((a.nomeDoVendedor).toLowerCase() < (b.nomeDoVendedor).toLowerCase()) {
                      return -1;
                    } else {
                      return true;
                    }
                  });
                setProdutosVendidos(listProducts)
            })
        }
        loadProductsVenidos()
    }

    function handleConferirVenda() {

    }

    validationLogin()
    return (
        <div className="main-painel">
            <Header />

            <div>
                <button>Inserir novo ususario</button>
                <button onClick={handleConferir}>Conferir vendas</button>
                <button>Verificar exclusões</button>
            </div>
            {conferirVendas && <h2>Confirir produtos vendidos</h2>}
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
                                <td className="text-center">R${(parseFloat(prod.valorVenda.replace(',', '.')) * parseFloat(prod.comissao / 100)).toFixed(2) }</td>
                                <td className="text-center">{prod.nomeDoVendedor}</td>
                                <td className="edit-table">
                                    <button onClick={handleConferirVenda} className='conferir'>Conferir</button>
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
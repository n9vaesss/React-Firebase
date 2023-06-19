import React, { useEffect, useState } from 'react';
import './TableProducts.css'


import { db } from '../../connection/firebaseConnection'
import {
    collection,
    onSnapshot,
    deleteDoc,
    doc
} from 'firebase/firestore'

import Modal from 'react-modal';

import { ImBin, ImPencil, ImSearch } from 'react-icons/im';

function TableProducts() {

    const [produtcs, setProducts] = useState([])
    const [productSelected, setProductSelected] = useState('')
    const [modalIsOpen, setModalIsOpen] = useState(false)


    useEffect(() => {
        async function loadProducts() {
            const unsub = onSnapshot(collection(db, "produtos"), (snapshot) => {
                let listProducts = []

                snapshot.forEach((prod) => {
                    listProducts.push({
                        id: prod.id,
                        codBarras: prod.data().codBarras,
                        nome: prod.data().nome,
                        localidade: prod.data().localidade,
                        dtValidade: prod.data().dtValidade,
                        comissao: prod.data().comissao
                    })
                })
                setProducts(listProducts)
            })
        }
        loadProducts()
    }, [])

    function handleOpenModal(id) {
        setModalIsOpen(true)
        setProductSelected(id)
    }

    function handleCloseModal() {
        setModalIsOpen(false)
    }

    async function handleDelete() {
        const docRef = doc(db, "produtos", productSelected)

        await deleteDoc(docRef)
            .then(() => {
                setModalIsOpen(false)
                setProductSelected('')
                alert('Produto deletado')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <section>
            <table>
                <thead>
                    <tr>
                        <td colSpan={4}>
                            <h2>Produtos que estão em quarentena</h2>
                        </td>
                        <td colSpan={3}>
                            <input
                                type="text"
                                placeholder="Nome/ Cod. Barras/ Dt. Validade"
                                maxLength={45}
                            />
                            <button><ImSearch /></button>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr className="title-table">
                        <td>Nome</td>
                        <td colSpan={2}>Codigo de barras</td>
                        <td className="text-center">Localidade</td>
                        <td className="text-center">Data de validade</td>
                        <td className="text-center">Valor da comissão</td>
                        <td className="text-center">Editar</td>
                    </tr>

                    {produtcs.map((prod) => {
                        return (
                            <tr key={prod.id}>
                                <td>{prod.nome}</td>
                                <td colSpan={2}>{prod.codBarras}</td>
                                <td className="text-center">{prod.localidade}</td>
                                <td className="text-center">{prod.dtValidade}</td>
                                <td className="text-center">{prod.comissao}%</td>
                                <td className="edit-table">
                                    <button onClick={() => handleOpenModal(prod.id)}><ImBin /></button>
                                    <button><ImPencil /></button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <Modal
                isOpen={modalIsOpen}
                className="a"
            >
                <div className="main-modal-delete">
                    <span>Deseja deletar o item selecionado?</span>
                    <div>
                        <button className="green" onClick={handleDelete}>Sim</button>
                        <button className="red" onClick={handleCloseModal}>Nao</button>
                    </div>
                </div>
            </Modal>
        </section>
    );
}

export default TableProducts;
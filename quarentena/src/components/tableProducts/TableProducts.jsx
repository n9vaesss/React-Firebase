import React, { useEffect, useState } from 'react';
import './TableProducts.css'


import { db, auth } from '../../connection/firebaseConnection'
import {
    collection,
    onSnapshot,
    deleteDoc,
    doc,
    setDoc,
    getDoc
} from 'firebase/firestore'

import {
    onAuthStateChanged
} from 'firebase/auth'

import Modal from 'react-modal';

import {
    ImBin,
    ImPencil,
    ImSearch,
    ImCheckmark
} from 'react-icons/im';

import Modal1 from '../modal/Modal';


function TableProducts() {

    const [produtcs, setProducts] = useState([])
    const [productSelected, setProductSelected] = useState('')
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [user, setUser] = useState('')
    const [openModalConfimSale, setOpenModalConfimSale] = useState(0)
    const [inputValueSearch, setInputValueSearch] = useState('')
    const [productsSearch, setProductsSearch] = useState([])


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

    useEffect(() => {
        async function checkLogin() {
            await onAuthStateChanged(auth, user => {
                setUser(user.uid)
                if (user.uid === '57k5ugtZm0SMFEoEsWRVuFac1h23') {
                }
            })
        }

        checkLogin()
    }, [])

    function handleOpenModal(id) {
        setModalIsOpen(true)
        setProductSelected(id)
    }

    function handleCloseModal() {
        setModalIsOpen(false)
    }

    async function handleDelete() {

        await registarLogsExclusao()

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

    async function registarLogsExclusao() {

        const docRef = doc(db, "produtos", productSelected)

        await getDoc(docRef)
            .then((snapshot) => {

                const postRef = doc(db, "logsExclusao", productSelected)

                setDoc(postRef, {
                    dataEHora: new Date(),
                    idUser: user,
                    codBarras: snapshot.data().codBarras,
                    nome: snapshot.data().nome,
                    dtValidade: snapshot.data().dtValidade,
                    comissao: snapshot.data().comissao
                })

            })

    }

    function handleConfirmSale(id) {
        setProductSelected(id)
        setOpenModalConfimSale(1)
    }

    function handleSetPropsModal(response) {
        setOpenModalConfimSale(response)
    }

    function handleSearch(e) {
        setInputValueSearch(e.target.value)

        setProductsSearch(produtcs.filter(prod => prod.nome.includes(inputValueSearch)))
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
                                type="search"
                                placeholder="Nome do produto"
                                maxLength={45}
                                value={inputValueSearch}
                                onChange={handleSearch}
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

                    {!inputValueSearch && produtcs.map((prod) => {
                        return (
                            <tr key={prod.id}>
                                <td>{prod.nome}</td>
                                <td colSpan={2}>{prod.codBarras}</td>
                                <td className="text-center">{prod.localidade}</td>
                                <td className="text-center">{prod.dtValidade}</td>
                                <td className="text-center">{prod.comissao}%</td>
                                <td className="edit-table">
                                    <button onClick={() => handleOpenModal(prod.id)}><ImBin /></button>
                                    <button onClick={() => handleConfirmSale(prod.id)}><ImCheckmark /></button>
                                </td>
                            </tr>
                        )
                    })}

                    {inputValueSearch && productsSearch.map((prod) => {
                        return (
                            <tr key={prod.id}>
                                <td>{prod.nome}</td>
                                <td colSpan={2}>{prod.codBarras}</td>
                                <td className="text-center">{prod.localidade}</td>
                                <td className="text-center">{prod.dtValidade}</td>
                                <td className="text-center">{prod.comissao}%</td>
                                <td className="edit-table">
                                    <button onClick={() => handleOpenModal(prod.id)}><ImBin /></button>
                                    <button onClick={() => handleConfirmSale(prod.id)}><ImCheckmark /></button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>

            <Modal1
                modal={openModalConfimSale}
                handlePropsModal={handleSetPropsModal}
                id={productSelected}
                user={user}
            />

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
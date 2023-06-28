import { useEffect, useState } from 'react';
import './Modal.css'

import { db } from '../../connection/firebaseConnection';
import { getDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';

function Modal(props) {

    const [display, setDisplay] = useState('none')

    const [nome, setNome] = useState('')
    const [dtValidade, setDtValidade] = useState('')
    const [codBarras, setCodBarras] = useState('')
    const [inputValue, setInputValue] = useState('')
    const [inputValue1, setInputValue1] = useState('')
    const [comissao, setComissao] = useState('')

    useEffect(() => {
        if (props.modal === 0) {
            setDisplay("none")
        } else if (props.modal === 1) {
            setDisplay("flex")

            async function getDocConfirmSale() {

                const docRef = doc(db, "produtos", props.id)

                await getDoc(docRef)
                    .then((snapshot) => {
                        setNome(snapshot.data().nome)
                        setDtValidade(snapshot.data().dtValidade)
                        setCodBarras(snapshot.data().codBarras)
                        setComissao(snapshot.data().comissao)
                    })
            }

            getDocConfirmSale()
        }
    }, [props.modal])

    function handleSubmitPropsModal() {
        props.handlePropsModal(0)
    }

    async function handleConfirmSale() {

        if (inputValue.length < 2) {
            alert('preencha o nome do vendedor!')
        } else {
            await setDoc(doc(db, 'logsVendasConfirmadas', props.id), {
                nome: nome,
                dtValidade: dtValidade,
                codBarras: codBarras,
                nomeDoVendedor: inputValue,
                usuarioLogado: props.user,
                comissao: comissao,
                valorVenda: inputValue1,
                dtConfirmacao: new Date()
            })
                .then(() => {
                    setNome('')
                    setDisplay('none')
                    handleDelet()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    async function handleDelet() {
        const docRef = doc(db, "produtos", props.id)

        await deleteDoc(docRef)
            .then(() => {
                alert("Venda confirmada")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="main-modal" style={{ display: display }}>
            <section>
                <button onClick={handleSubmitPropsModal}>x</button>
                <span>
                    Deseja confirmar a venda do produto <strong>{nome}</strong> e com data de validade de <strong>{dtValidade}</strong>?
                </span>
                <br /><br />
                <span>
                    Se sim insira o nome do vendedor no campo abaixo:
                </span>
                <input
                    type="text"
                    placeholder='Insira o nome do vendedor'
                    maxLength={45}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />
                <input
                    type="text"
                    placeholder='Insira o valor da venda'
                    maxLength={45}
                    value={inputValue1}
                    onChange={e => setInputValue1(e.target.value)}
                />
                <button className='confirm-sale' onClick={handleConfirmSale}>Confirmar venda</button>
            </section>
        </div>
    );
}

export default Modal;
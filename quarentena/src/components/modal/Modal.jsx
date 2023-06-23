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
                    })
            }

            getDocConfirmSale()
        }
    }, [props.modal])

    function handleSubmitPropsModal() {
        props.handlePropsModal(0)
    }

    async function handleConfirmSale() {

        handleDelet()

        await setDoc(doc(db, 'logsVendasConfirmadas', props.id), {
            nome: nome,
            dtValidade: dtValidade,
            codBarras: codBarras,
            nomeDoVendedor: inputValue
        })
            .then(() => {
                alert("Venda confirmada")
                setNome('')
                setDisplay('none')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    async function handleDelet() {
        const docRef = doc(db, "produtos", props.id)

        await deleteDoc(docRef)
            .then(() => {
                console.log('Produto deletado')
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
                <button className='confirm-sale' onClick={handleConfirmSale}>Confirmar venda</button>
            </section>
        </div>
    );
}

export default Modal;
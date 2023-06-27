import React, { useEffect, useState } from 'react';
import './Header.css'

import { signOut } from 'firebase/auth'
import { auth } from '../../connection/firebaseConnection';
import {
    onAuthStateChanged
} from 'firebase/auth';

import LogoLongo from '../../images/logo-drogarema-longo.png'
import { useNavigate } from 'react-router-dom';

function Header() {

    const [buttonIncludeRegister, setButtonIncludeRegister] = useState(false)
    const [buttonHome, setButtonHome] = useState(false)
    const [buttonADM, setButtonADM] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        let url = window.location.href.split('/')
        if (url[3] === 'home') {
            setButtonIncludeRegister(true)
            setButtonHome(false)
        } else if (url[3] === 'register') {
            setButtonHome(true)
            setButtonIncludeRegister(false)
        } else if (url[3] === 'painelAdm') {
            setButtonHome(true)
            setButtonIncludeRegister(true)
        } else if (url[3] === 'includeRegister') {
            setButtonHome(true)
            setButtonIncludeRegister(false)
        }
    }, [])

    useEffect(() => {
        async function checkLogin() {
            await onAuthStateChanged(auth, user => {
                if (user.uid === '57k5ugtZm0SMFEoEsWRVuFac1h23') {
                    setButtonADM(true)
                }
            })
        }

        checkLogin()
    }, [])

    function goTo(pathing) {
        navigate(pathing)
    }

    async function LogOut() {
        await signOut(auth)
    }

    return (
        <header>
            <img src={LogoLongo} alt='Logo' />
            <div>
                <nav>
                    {buttonADM && <button onClick={() => goTo("/painelAdm")}>Painel administrativo</button>}
                    {buttonHome && <button onClick={() => goTo("/home")}>Todos registros</button>}
                    {buttonIncludeRegister && <button onClick={() => goTo("/includeRegister")} >Incluir novo registro</button>}
                    <button onClick={LogOut}>Sair</button>
                </nav>
            </div>
        </header>
    );
}

export default Header;
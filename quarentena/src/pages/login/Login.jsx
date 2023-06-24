import React, { useState } from "react";
import './Login.css'

import { auth } from '../../connection/firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { useNavigate } from "react-router-dom";

import Logo from '../../images/logo-drogarema.png'

function Login() {

    const [email, setEmail] = useState('')
    const [validationEmail, setValidationEmail] = useState(null)
    const [selectStyleInputEmail, setSelectStyleInputEmail] = useState({ border: '1px solid black' })

    const [password, setPassword] = useState('')
    const [validationPassword, setValidationPassword] = useState(null)
    const [selectStyleInputPassword, setSelectStyleInputPassword] = useState({ border: '1px solid black' })

    const navigate = useNavigate()


    const handleSubmit = e => {
        e.preventDefault()

        if (!email || !password) {
            if (!email) {
                setValidationEmail(true)
                setSelectStyleInputEmail({ border: '2px solid red' })
            }
            if (!password) {
                setValidationPassword(true)
                setSelectStyleInputPassword({ border: '2px solid red' })
            }
        } else {
            LoginUser()
        }

        async function LoginUser() {
            await signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate("/home");
                })
                .catch((err) => {
                    console.log(err)
                    setEmail('')
                    setPassword('')
                    alert('Email ou senha incorreto!')
                })
        }
    }

    const onchangeEmail = e => {
        setEmail(e.target.value)
        if (email.length > 0) {
            setValidationEmail(false)
            setSelectStyleInputEmail({ border: '1px solid black' })
        }
    }

    const onchangePassword = e => {
        setPassword(e.target.value)
        if (password.length > 0) {
            setValidationPassword(false)
            setSelectStyleInputPassword({ border: '1px solid black' })
        }
    }

    return (
        <main className="main-container-login">
            <section>
                <img src={Logo} alt="Logo" />
                <h1>Sistema de controle quarentena</h1>
            </section>
            <form>
                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        placeholder="Digite o email"
                        value={email}
                        onChange={onchangeEmail}
                        style={selectStyleInputEmail}
                        maxLength={30}
                    />
                    {validationEmail && <span className="error-message">Campo obrigatorio!</span>}
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        placeholder="Digite a senha"
                        value={password}
                        onChange={onchangePassword}
                        style={selectStyleInputPassword}
                        maxLength={30}
                    />
                    {validationPassword && <span className="error-message">Campo obrigatorio!</span>}
                </div>
                <button onClick={handleSubmit}>Enviar</button>
            </form>
        </main>
    );
}

export default Login
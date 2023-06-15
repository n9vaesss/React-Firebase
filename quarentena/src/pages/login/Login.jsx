import React, { useState } from "react";
import './Login.css'

import Logo from '../../images/logo-drogarema.png'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validation, setValidation] = useState(null)

    const handleSubmit = e => {
        e.preventDefault()

        if (!email) {
            setValidation(true)
        }
    }

    const onchangeEmail = e => {
        setEmail(e.target.value)
        if(email.length > 0){
            setValidation(false)
        }
    }

    const customStyle ={
        inputError:{
            color: 'red',
            border: '2px solid red '
        }
    }

    return (
        <main className="main-container-login">
            <section>
                <img src={Logo} />
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
                        style={customStyle}
                    />
                    {validation && <span>Campo obrigatorio!</span>}
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        placeholder="Digite a senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button onClick={handleSubmit}>Enviar</button>
            </form>
        </main>
    );
}

export default Login
import './login.css';
import logoDindin from '../../assets/logoDindin.svg';

import api from '../../services/api';
import { setItemf, getItemf } from '../../utils/functions';

import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [warning, setWarning] = useState('');

    async function handleSubmit(evt) {
        evt.preventDefault();

        if (!email || !password) {
            return;
        }

        try {
            const response = await api.post('/login', {
                email: email,
                senha: password
            })

            console.log(response.data.usuario);
            const { token, usuario } = response.data;

            setItemf('token', token);
            setItemf('user', usuario.id);

            navigate('/Main');

        } catch (error) {
            setWarning(error.response.data);
        }

    }

    useEffect(function () {
        const token = getItemf('token');

        if (token) {
            navigate('/Main');
        }
    }, [])

    return (
        <div className='container'>
            <img className='logo-Din' src={logoDindin} alt='LogoDindin' />
            <div className='login__ad'>
                <h1 className='ad__title'>Controle suas <span style={{ color: '#7978D9' }}>finanças</span>,
                    sem planilha chata.</h1>
                <p className='ad__text'>
                    Organizar as suas finanças nunca foi tão fácil, <br /> com o DINDIN, você tem tudo
                    num único lugar <br /> e em um clique de distância.
                </p>
                <Link to='/Sign-in'>
                    <button className='btn-register'>Cadastre-se</button>
                </Link>
            </div>
            <div className='login__card'>
                <h2 className='card-form__title'>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='email'>E-mail</label>
                    <input className='login-input' id='email'
                        type='email' required
                        onChange={(event) => setEmail(event.target.value)} />

                    <label htmlFor='pass'>Senha</label>
                    <input className='login-input' id='pass'
                        type='password' required
                        onChange={(event) => setPassword(event.target.value)} />

                    {warning && <span>{warning}</span>}

                    <button className='card-form__btn login-btn'
                        type='submit' >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;
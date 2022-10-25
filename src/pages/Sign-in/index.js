import './signIn.css';
import logoDindin from '../../assets/logoDindin.svg';

import api from '../../services/api';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SignIn() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''

    })

    const [error, setError] = useState(false);

    function changeValue(evt) {
        setForm({ ...form, [evt.name]: evt.value });
        setError(false);
    }

    async function handleAddUser(evt) {
        evt.preventDefault();

        if (form.password !== form.password2) {
            setError(true);
            return;
        }

        if (!form.name || !form.email || !form.password || !form.password2) {
            return
        }

        try {

            const response = await api.post('/usuario', {
                nome: form.name,
                email: form.email,
                senha: form.password
            })

            console.log(response.data);

            navigate('/');

        } catch (error) {
            console.log(error.response.data);
        }

    }

    return (
        <div className="container">
            <img className='logo-Din' src={logoDindin} alt='LogoDindin' />
            <div className='card-form'>
                <h1 className='card-form__title'>Cadastre-se</h1>
                <form onSubmit={handleAddUser}>

                    <label htmlFor='name'>Nome</label>
                    <input className='signIn-input' id='name'
                        type='text' name='name' value={form.name} required
                        onChange={(event) => changeValue(event.target)} />

                    <label htmlFor='email'>E-mail</label>
                    <input className='signIn-input' id='email'
                        type='email' name='email' value={form.email} required
                        onChange={(event) => changeValue(event.target)} />

                    <label htmlFor='pass'>Senha</label>
                    <input className='signIn-input' id='pass' required
                        type='password' name='password' value={form.password}
                        onChange={(event) => changeValue(event.target)} />

                    <label htmlFor='pass2'>Confirmação de senha</label>
                    <input className='signIn-input' id='pass2' required
                        type='password' name='password2' value={form.password2}
                        onChange={(event) => changeValue(event.target)} />

                    {error && <span style={{ color: 'red' }}>
                        O campo Confirmarção e Senha não correspondem
                    </span>}

                    <button className='card-form__btn' type='submit'>Cadastrar</button>

                </form>
                <span className='card-form__span'
                    onClick={() => navigate(-1)}>
                    Já tem cadastro? Clique aqui!
                </span>
            </div>
        </div>
    );
}

export default SignIn;
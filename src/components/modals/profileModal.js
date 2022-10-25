import './styles.css';
import closeButton from '../../assets/btn-close.svg';

import { getItemf } from '../../utils/functions';
import api from '../../services/api';

import { useState } from 'react';


function ProfileModal({ setStateProfile, user }) {

    const [form, setForm] = useState({
        nome: user.nome,
        email: user.email,
        senha: '',
        senha2: ''
    });

    function changeValue(evt) {
        setForm({ ...form, [evt.id]: evt.value });
    }

    async function updateUser() {
        if (form.senha !== form.senha2) {
            console.log('password doesnt match')
            return
        }
        try {
            const token = getItemf('token');
            await api.put('/usuario', {
                ...form
            }, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
        } catch (e) {
            console.log(e.message)
        }

    }

    return (
        <div className='cardModal-container'>
            <div className='modal-card profile'>
                <h2>Editar Perfil</h2>
                <img src={closeButton} alt='Ícone fechar' onClick={() => setStateProfile(false)} />
                <form onSubmit={() => updateUser()}>
                    <label htmlFor='nome'>Nome</label>
                    <input id='nome' type='text' defaultValue={user.nome} onChange={(evt) => changeValue(evt.target)} />

                    <label htmlFor='email'>E-mail</label>
                    <input id='email' type='email' defaultValue={user.email} onChange={(evt) => changeValue(evt.target)} />

                    <label htmlFor='senha'>Senha</label>
                    <input className='signIn-input' id='senha' type='password' onChange={(evt) => changeValue(evt.target)} />

                    <label htmlFor='senha2'>Confirmação de senha</label>
                    <input className='signIn-input' id='senha2' type='password' onChange={(evt) => changeValue(evt.target)} />

                    <div className='btn-div'>
                        <button className='modal-btn' type='submit'>Confirmar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProfileModal;
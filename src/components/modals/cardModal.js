import './styles.css';
import closeButton from '../../assets/btn-close.svg';
import { useState, useEffect } from 'react';
import { getItemf } from '../../utils/functions';


import api from '../../services/api';


function CardModal({ setStateModal }) {

    const [btnBlue, setBtnBlue] = useState(false);
    const [btnRed, setBtnRed] = useState(true);

    const [category, setCategory] = useState('');

    async function getCategories() {
        try {
            const token = getItemf('token');
            const response = await api.get('/categoria', {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            const categories = response.data;
            setCategory(categories)
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    function changeColorButton(btn) {
        if (btn.className !== 'noColor') {
            return;
        }

        setBtnBlue(!btnBlue);
        setBtnRed(!btnRed);
        setForm({ ...form, [btn.name]: btn.value });

    }

    const [form, setForm] = useState({
        tipo: 'saida',
        valor: 0,
        categoria_id: 0,
        data: '',
        descricao: ''
    })
    function handleChangeValue(e) {
        setForm({ ...form, [e.name]: e.value });
        console.log(form)
    }
    async function addTransaction() {
        const categoriaId = category.findIndex((cat) => {
            return cat.descricao === form.categoria;
        })
        try {
            const token = getItemf('token');
            const response = await api.post('/transacao', {
                tipo: form.tipo,
                valor: form.valor,
                categoria_id: categoriaId + 1,
                data: form.data,
                descricao: form.descricao
            },
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
        } catch (e) {
            console.log(e.message)
        }
    }

    function handleDate(e) {
        const data = new Date(e.value);
        setForm({ ...form, [e.name]: data });
    }

    return (
        <div className='cardModal-container'>
            <div className='modal-card'>
                <h2>Adicionar Registro</h2>
                <img src={closeButton} alt='Ícone fechar' onClick={() => setStateModal(false)} />
                <div className='modal-card__btns'>

                    <button name='tipo' value='entrada' className={btnBlue ? 'btnBlue' : 'noColor'}
                        onClick={(event) => changeColorButton(event.target)}
                    >Entrada
                    </button>

                    <button name='tipo' value='saida' className={btnRed ? 'btnRed' : 'noColor'}
                        onClick={(event) => changeColorButton(event.target)}
                    >Saída</button>

                </div>
                <form onSubmit={() => addTransaction()}>
                    <label htmlFor='valor'>Valor</label>
                    <input id='valor' name='valor' type='number'
                        onChange={(e) => handleChangeValue(e.target)} />

                    <label htmlFor='category'>Categoria</label>
                    <select id='categoria' name='categoria' onChange={(e) => { handleChangeValue(e.target) }}>
                        {
                            category && category.map((item) => {
                                return (
                                    <option key={item.id}>{item.descricao}</option>
                                )
                            })
                        }
                    </select>

                    <label htmlFor='date'>Data</label>
                    <input id='data' name='data' type='date'
                        onChange={(e) => handleDate(e.target)} />

                    <label htmlFor='desc'>Descrição</label>
                    <input id='desc' type='text' name='descricao'
                        onChange={(e) => handleChangeValue(e.target)} />

                    <div className='btn-div'>
                        <button type='submit' className='modal-btn'>Confirmar</button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default CardModal;
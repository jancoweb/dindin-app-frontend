import './styles.css';
import closeButton from '../../assets/btn-close.svg';
import { useState, useEffect } from 'react';
import { getItemf } from '../../utils/functions';


import api from '../../services/api';


function UpdateModal({ setStateUpdate, item }) {

    const [category, setCategory] = useState('');
    const [btnBlue, setBtnBlue] = useState(false);
    const [btnRed, setBtnRed] = useState(true);
    const [updateForm, setUpdateForm] = useState({
            descricao : '',
            valor : 0,
            data : '',
            categoria_id: 0,
            tipo : 'saida'
    })

    function handleChangeValue(e) {
        setUpdateForm({...updateForm, [e.name]: e.value});
        console.log(updateForm)
    }
 
    function changeColorButton(btn) {
        if (btn.className !== 'noColor') {
            return;
        }

        setBtnBlue(!btnBlue);
        setBtnRed(!btnRed);
        setUpdateForm({...updateForm, [btn.name]: btn.value});
        console.log(updateForm)
    }



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

    function handleChangeCategory(e){
        const categoriaId = category.findIndex((cat) => {
            return cat.descricao === e.value;
        });
        setUpdateForm({...updateForm, [e.name]: categoriaId})
    }

    function handleDate(e) {
        const data = new Date(e.value);
        setUpdateForm({...updateForm,  [e.name]: data});
    }

    async function updateTransacao(id){
        try {
            const token = getItemf('token');
            await api.put(`/transacao/${id}`,
            {
                descricao : updateForm.descricao,
                valor : updateForm.valor,
                data : updateForm.data,
                categoria_id: updateForm.categoria_id + 1,
                tipo : updateForm.tipo
            }, 
            {
                headers:{
                    authorization: `Bearer ${token}`
                 }
            });
        } catch (e){
            console.log(e.message)
        }
    }

    return (
        <div className='cardModal-container'>
            <div className='modal-card'>
                <h2>Editar Registro</h2>
                <img src={closeButton} alt='Ícone fechar' onClick={() => setStateUpdate({ opened: false, id: '' })} />
                <div className='modal-card__btns'>

                    <button name='tipo' value='entrada' className={btnBlue ? 'btnBlue' : 'noColor'}
                        onClick={(event) => changeColorButton(event.target)}
                    >Entrada
                    </button>

                    <button name='tipo' value='saida' className={btnRed ? 'btnRed' : 'noColor'}
                        onClick={(event) => changeColorButton(event.target)}
                    >Saída</button>

                </div>
                <form onSubmit={()=>{updateTransacao(item.id)}}>
                    <label htmlFor='valor'>Valor</label>
                    <input id='valor' defaultValue={item.valor} name='valor' type='number'
                        onChange={(e) => handleChangeValue(e.target)} />

                    <label htmlFor='category'>Categoria</label>
                    <select id='categoria' defaultValue={item.categoria_nome} name='categoria_id' onChange={(e) => { handleChangeCategory(e.target) }}>
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
                    <input id='desc' defaultValue={item.descricao} type='text' name='descricao'
                        onChange={(e) => handleChangeValue(e.target)} />

                    <div className='btn-div'>
                        <button type='submit' className='modal-btn'>Confirmar</button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateModal; 
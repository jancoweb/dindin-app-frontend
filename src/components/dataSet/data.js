import './data.css';

import { format, parseISO, Locale } from 'date-fns';

import iconEdit from '../../assets/icons-editar.svg';
import iconTrash from '../../assets/icons-lixo.svg';
import api from '../../services/api'
import { getItemf } from '../../utils/functions';

import { useEffect, useState } from 'react';
import UpdateModal from '../modals/updateModal';
import { ptBR } from 'date-fns/locale';

function DatasApi() {
    const [stateUpdate, setStateUpdate] = useState({ opened: false, id: '' });
    const [transacao, setTransacao] = useState([]);
    const [popup, setPopup] = useState({ opened: false, id: '' });

    async function listarTransacao() {
        try {
            const token = getItemf('token');
            const response = await api.get('/transacao', {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            setTransacao(response.data)
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        listarTransacao()
    }, []);

    async function handleDelete(id) {
        try {
            const token = getItemf('token');
            const response = await api.delete(`/transacao/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

        } catch (e) {
            console.log(e.message)
        }
        listarTransacao()
    }

    return (
        <div className=''>
            {transacao.length > 0 &&
                transacao.map((item) => {
                    return (
                        <div className='container-data' key={item.id}>
                            <div className='sell-info'>
                                <span >{format(parseISO(item.data), "dd/MM/yyyy")}</span>
                            </div>

                            <div className='sell-info'>
                                <span>{format(new Date(item.data),'eeee', {locale: ptBR})}</span>
                            </div>

                            <div className='sell-info'>
                                <span>{item.descricao}</span>
                            </div>

                            <div className='sell-info'>
                                <span>{item.categoria_nome}</span>
                            </div>

                            <div className='sell-info'>
                                <span style={item.tipo =='saida' ? {color: '#FA8C10'} : {color: '#3A9FF1'}}>R${(item.valor / 100).toFixed(2)}</span>
                            </div>

                            <div className='data-icons'>

                                <img src={iconEdit} alt='Ícone de editar'
                                    onClick={() => setStateUpdate({ opened: true, id: item.id })} />
                                <img src={iconTrash} alt='Ícone da lixeira'
                                    onClick={() => setPopup({ opened: true, id: item.id })} />

                                {(stateUpdate.opened && stateUpdate.id === item.id) &&
                                    <UpdateModal item={item} setStateUpdate={setStateUpdate} />
                                }
                                {(popup.opened && popup.id === item.id) &&
                                    <div className='popup-confirm'>
                                        <h3>Apagar item?</h3>
                                        <button style={{ background: '#3A9FF1' }} onClick={(e) => { handleDelete(item.id) }}>Sim</button>
                                        <button
                                            style={{ background: '#FF576B' }}
                                            onClick={() => setPopup(false)}
                                        >Não</button>
                                    </div>}
                            </div>
                        </div>)
                })
            }
        </div>
    )
}


export default DatasApi;
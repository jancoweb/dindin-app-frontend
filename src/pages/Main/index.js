import './main.css';
import logoDindin from '../../assets/logoDindin.svg';
import iconeAvatar from '../../assets/icone-avatar.svg';
import seta from '../../assets/seta.svg';
import iconFilter from '../../assets/iconFilter.svg';
import polygon from '../../assets/Polygon.svg';

import UpdateModal from '../../components/modals/updateModal';
import DatasApi from '../../components/dataSet/data';
import Filter from '../../components/filter';
import CardModal from '../../components/modals/cardModal';
import ProfileModal from '../../components/modals/profileModal';
import ResumeCard from '../../components/resumeCard/resume';
import { clearAll, getItemf } from '../../utils/functions';
import api from '../../services/api';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';



function Main() {

    const [filters, setFilters] = useState(false);
    const [stateModal, setStateModal] = useState(false);
    const [stateProfile, setStateProfile] = useState(false);
    const [user, setUser] = useState('');

    const navigate = useNavigate();

    async function getUser() {
        try {
            const token = getItemf('token');
            const response = await api.get('/usuario', {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setUser(response.data)
        } catch (e) {
            console.log(e.message)
        }
    }
    useEffect(() => {
        getUser()
    }, [])

    function handleLogout() {

        clearAll();

        navigate('/');

    }

    return (
        <div className='container background-blue'>
            <img className='logo-Din' src={logoDindin} alt='LogoDindin' />
            <div className='icons'>
                <img className='profile-icon' src={iconeAvatar} alt='Ícone pessoa'
                    onClick={() => setStateProfile(true)} />

                <span style={{color: '#fff'}}>{user.nome}</span>

                <img className='logout-img' src={seta} alt='Seta'
                    onClick={() => handleLogout()} />

            </div>
            <div className='sales-info'>
                <div className='img-filter' onClick={() => setFilters(!filters)}>
                    <img src={iconFilter} alt='Ícone de filtro' />
                    <span>Filtrar</span>
                </div>
                {filters && <Filter />}
                <div className='sales-area'>
                    <div>
                        <div className='column-title'>
                            <span>Data</span>
                            <img src={polygon} alt='Polígono' />
                            <span>Dia da Semana</span>
                            <span className='desc'>Descrição</span>
                            <span className='categ'>Categoria</span>
                            <span>Valor</span>
                        </div>
                        <div className='column-content'>
                            <div className='map-api'>
                                <DatasApi />
                            </div>
                        </div>
                    </div>
                    <div className='resume-button'>
                        <ResumeCard />
                        <button onClick={() => setStateModal(true)}>Adicionar Registro</button>
                    </div>
                </div>
            </div>
            {stateModal && <CardModal setStateModal={setStateModal} />}
            {stateProfile && <ProfileModal user={user} setStateProfile={setStateProfile} />}

        </div>
    )
}

export default Main;
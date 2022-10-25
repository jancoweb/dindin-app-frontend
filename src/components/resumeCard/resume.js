import { useEffect, useState } from "react";
import api from "../../services/api";
import { getItemf } from "../../utils/functions";

export default function ResumeCard() {

    const [resumo, setResumo] = useState({});

    async function getResumo() {
        try {
            const token = getItemf('token');
            const response = await api.get('/transacao/extrato', {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            const { entrada, saida } = response.data;


            setResumo({ entrada, saida });


        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        getResumo()
    }, [resumo]);

    return (
        <div className='resume-card'>
            <h2>Resumo</h2>
            <div className='valor-info'>
                <span style={{ margin: '0px 45px 0px 0px' }}>Entradas</span>
                <span style={{ color: '#645FFB' }}>R$ {!resumo.entrada ? (0).toFixed(2) : (resumo.entrada / 100).toFixed(2)}</span>
            </div>
            <div className='valor-info'>
                <span style={{ margin: '0px 71px 0px 0px' }}>Saídas</span>
                <span style={{ color: '#FA8C10' }}>R$ {!resumo.saida ? (0).toFixed(2) : (resumo.saida / 100).toFixed(2)}</span>
            </div>
            <div className='valor-info balance'>
                <span style={{ margin: '0px 62px 0px 0px' }}>Saldo</span>
                <span style={{ color: '#3A9FF1' }}>R$ {!resumo.entrada & !resumo.saida ? (0).toFixed(2) :
                    ((resumo.entrada - resumo.saida) / 100).toFixed(2)}</span>
            </div>
        </div>
    )
}
import './styles.css';

export default function Filter() {

    return (
        <div className='filter-container'>
            <h3>Categoria</h3>

            <div className='filters-info'>
                <div className='filter-option'>
                    <span>Contas</span>
                    <span className='span-filter'>+</span>
                </div>
                <div className='filter-option'>
                    <span>Depósito</span>
                    <span className='span-filter'>+</span>
                </div>
                <div className='filter-option'>
                    <span>Contas</span>
                    <span className='span-filter'>+</span>
                </div>
            </div>

            <div className='filters-info'>
                <div className='filter-option'>
                    <span>Lazer</span>
                    <span className='span-filter'>+</span>
                </div>
                <div className='filter-option'>
                    <span>Mercado</span>
                    <span className='span-filter'>+</span>
                </div>
                <div className='filter-option'>
                    <span>TED</span>
                    <span className='span-filter'>+</span>
                </div>
            </div>

            <div className='filters-info'>
                <div className='filter-option'>
                    <span>Compras</span>
                    <span className='span-filter'>+</span>
                </div>
                <div className='filter-option'>
                    <span>Farmácia</span>
                    <span className='span-filter'>+</span>
                </div>
                <div className='filter-option'>
                    <span>Pix</span>
                    <span className='span-filter'>+</span>
                </div>
            </div>

            <button>Limpar Filtros</button>
            <button>Aplicar Filtros</button>
        </div>
    )
}
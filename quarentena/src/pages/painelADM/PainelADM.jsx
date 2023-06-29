import { useState } from "react";
import Header from "../../components/header/Header";
import validationLogin from '../../js/validationLogin'

import './PainelADM.css'

function PainelADM() {

    const [conferirVendas, setConferirVendar] = useState(false)

    function handleConferir() {
        setConferirVendar(true)
    }

    validationLogin()
    return (
        <div className="main-painel">
            <Header />

            <div>
                <button>Inserir novo ususario</button>
                <button onClick={handleConferir}>Conferir vendas</button>
                <button>Verificar exclusões</button>
            </div>

            {!conferirVendas && produtcs.map((prod) => {
                return (
                    <tr>
                        <td>{prod.nome}</td>
                        <td colSpan={2}>{prod.codBarras}</td>
                        <td className="text-center">{prod.localidade}</td>
                        <td className="text-center">{prod.dtValidade}</td>
                        <td className="text-center">{prod.comissao}%</td>
                        <td className="edit-table">
                            <button onClick={() => handleOpenModal(prod.id)}><ImBin /></button>
                            <button onClick={() => handleConfirmSale(prod.id)}><ImCheckmark /></button>
                        </td>
                    </tr>
                )
        </div>
    );
}

export default PainelADM;
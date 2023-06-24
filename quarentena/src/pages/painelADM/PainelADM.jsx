import Header from "../../components/header/Header";
import validationLogin from '../../js/validationLogin'

function PainelADM() {

    validationLogin()
    return (
        <div>
            <Header/>
        </div>  
    );
}

export default PainelADM;
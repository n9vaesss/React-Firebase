import { useState } from "react";

function InputsForm(props) {

    const [valInputForm, setInputValForm] = useState('')

    function handleSubmitCb(e) {
        setInputValForm(e.target.value)
        props.handleSubmit([
            e.target.value,
            props.nameState
        ])
    }

    return (
        <>
            <div className="main-inputsForm">
                <label>{props.name} </label>
                <input
                    type={props.type}
                    placeholder={props.placeholder}
                    maxLength={props.maxL}
                    value={valInputForm}
                    onChange={handleSubmitCb}
                />
            </div>
        </>
    );
}

export default InputsForm;
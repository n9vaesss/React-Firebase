import React from "react";
import validationLogin from "../../js/validationLogin";
import Header from "../../components/header/Header";

function Home() {
    
    validationLogin()

    return (
        <div>
            <Header/>
        </div>
    )
}

export default Home
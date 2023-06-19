import React from "react";
import validationLogin from "../../js/validationLogin";
import Header from "../../components/header/Header";



import './Home.css'
import TableProducts from "../../components/tableProducts/TableProducts";

function Home() {

    validationLogin()

    return (
        <main className="main-container-home">
            <Header />
            <TableProducts/>
        </main>
    )
}

export default Home
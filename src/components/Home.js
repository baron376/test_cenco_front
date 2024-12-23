import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
export default class Home extends Component {
    render() {
        return (
            <div>
            <div className="cont-login">
                <div className="container">
                <div className="row align-items-center height-100vh">
                    <div className="col-12 col-sm-8 col-md-6 col-lg-6 col-xl-6 offset-sm-2 offset-md-3 text-center">
                    <img src={process.env.PUBLIC_URL + '/dist/img/cenco-check-blue.png'} alt="cencoCheck" className="img-fluid mb-3" width="40%"/>
                    <img src={process.env.PUBLIC_URL + '/dist/img/logo-jumbo-santa-isabel-big.png'} alt="Cencosud, Jumbo, Santa Isabel" className="img-fluid mb-3" />
                    <h1 className="mb-4">Bienvenido al sistema de Jumbo y SISA</h1>
                    <p className="mt-2">Escoja una opción para iniciar sesión</p>
                    <Link  to="/LoginInt" className="btn btn-success mr-2">Iniciar sesión <br />Cencosud</Link >
                    <Link  to="/LoginPro" className="btn btn-danger ml-2">Iniciar sesión <br />Proveedor</Link >
                    </div>
                </div>
                </div>
            </div>
            </div> 
        )
    }
}

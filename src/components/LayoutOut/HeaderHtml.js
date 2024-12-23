import React, { Component } from 'react'
import AdminServices from '../../services/AdminServices';
import Cookies from 'js-cookie';
import cookie from 'cookie';
export default class Header extends Component {

    state = {
        error:null,
        csrfToken:null,
        algo:'NASHFASHFASDHFSDFHSDFH'

    }
    async componentDidMount(){
        await this.getCsrfToken();       
    }
    getCsrfToken = async function(){ 
        document.querySelector('meta[name="csrf-token"]').setAttribute("content",  Cookies.get('XSRF-TOKEN')); 
    }

    render() {
        return (
            <div>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Cencosud</title>
            <link rel="stylesheet" href={process.env.PUBLIC_URL + '/dist/css/bootstrap.min.css'}/>
            <link rel="stylesheet" href={process.env.PUBLIC_URL + '/dist/css/bootstrap-grid.css'} />
            <link rel="stylesheet"  href={process.env.PUBLIC_URL + 'dist/css/style.css'} />
            </div>
        )
    }
}

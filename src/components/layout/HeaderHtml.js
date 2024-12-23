import React, { Component } from 'react'
import AdminServices from '../../services/AdminServices';
import SecurityServices from '../../services/SecurityServices';
import Cookies from 'js-cookie';
import cookie from 'cookie';
import $ from "jquery";
export default class Header extends Component {
    state = {
        loading:false,
        error:null,
        csrfToken:null,
        algo:'NASHFASHFASDHFSDFHSDFH',
        dataUSer:{},
        dataUSerP:{},
        style:process.env.PUBLIC_URL + 'dist/css/style.css'
    }
    async componentDidMount(){
        await this.getCsrfToken(); 
        await this.getDataUSer();       
    }

    getCsrfToken = async function(){ 
        document.querySelector('meta[name="csrf-token"]').setAttribute("content",  Cookies.get('XSRF-TOKEN')); 
    }

    getDataUSer = async function(){
        this.setState({loading:true , error: null})
         await SecurityServices.getDataUser().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                var styleValue = process.env.PUBLIC_URL + 'dist/css/style.css'
                if(data.data && data.data.cadenas.length === 1){
                    switch (data.data.cadenas[0].id) {
                    case 1:
                        styleValue = process.env.PUBLIC_URL + 'dist/css/style-jumbo.css'
                        break;
                    case 2:
                        styleValue = process.env.PUBLIC_URL + 'dist/css/style-sisa.css'
                        break;
                    case 3:
                        styleValue = process.env.PUBLIC_URL + 'dist/css/style-spid.css'
                        break;
                    }
                }

                this.setState({
                    style:styleValue
                });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
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
            <link rel="stylesheet"  href={this.state.style} />
            </div>
        )
    }
}

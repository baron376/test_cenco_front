import React, { Component } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import {logOut} from '../../util/auth';
import {withRouter} from 'react-router';
import api from '../../util/api';
import SecurityServices from '../../services/SecurityServices';
import env from "react-dotenv";
import GetErrosJs from "../layout/GetErrorJs";
import Cookies from 'js-cookie';
import cookie from 'cookie';
import swal from 'sweetalert';

class Header extends Component {
    state = {
        loading:false,
        dataUSer:{},
        dataUSerP:{},
        logo:'/dist/img/logo-jumbo-santa-isabel-small.png',
        error:null,
        dateUserNull:null,
    }
    constructor(props){
        super(props);
        let dataUserL = JSON.parse(localStorage.getItem('fulanotal'))
        if(JSON.parse(localStorage.getItem('fulanotal'))){
            this.state = { dataUSer:dataUserL , dateUserNull : 1, logo:'/dist/img/logo-jumbo-santa-isabel-small.png',};
        }else{
            this.state = { dataUSer:{} , dateUserNull : null , logo:'/dist/img/logo-jumbo-santa-isabel-small.png',};
        }
    }
    async componentDidMount(){
        await this.init(); 
        await this.getDataUSer(); 
        await this.checkUserLoginWithAdfs();
        await this.getDataUSerLogo();   
    }

    init = async function(){
        const BaseUrl = env.REACT_APP_BASE_URL
        let arrayTosent = {
            id : ''
        }
        if (localStorage.getItem("ccscts") === null) {
            api(this.props.history).get(`${BaseUrl}/sanctum/csrf-cookie`).then(response => {
                api(this.props.history).post(`${BaseUrl}/logInit`, arrayTosent).then(res=>{
                    localStorage.setItem('ccscts', res.data.access_token);
                    localStorage.setItem('fulanotal', JSON.stringify(res.data.user));
                    window.location.href = window.location.href;
                }).catch(e => {
                  swal({
                    title: `Error Comuníquese el Administrador del Sistema !`,
                    text: "",
                    icon: "error",
                    button: "Ok!",
                });
                this.setState({loading:false});
              });
            });
        }
    }
    
    getDataUSer = async function(){
        this.setState({loading:true , error: null})
         await SecurityServices.getDataUser().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({
                    loading:false,
                    dataUSerP: data.data,
                    dateUserNull: data.data
                });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
    }

    getDataUSerLogo = async function(){
        this.setState({loading:true , error: null})
         await SecurityServices.getDataUser().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                var logoValue = '/dist/img/logo-jumbo-santa-isabel-small.png';
                if(data.data && data.data.cadenas.length === 1){
                    switch (data.data.cadenas[0].id) {
                    case 1:
                        logoValue = '/dist/img/logo-jumbo.png'
                        break;
                    case 2:
                        logoValue = '/dist/img/logo-sisa.png'
                        break;
                    case 3:
                        logoValue = '/dist/img/logo-spid.png'
                        break;
                    }
                }

                this.setState({
                    logo:logoValue
                });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
    }

    handleOnCloseSecion= async e =>{
        localStorage.clear();
        const BaseUrl = process.env.REACT_APP_BASE_URL;
        window.location.replace(`${BaseUrl}/saml2/mzzo/logoutP`);
    }
    handleOnCloseSecionProveedor= async e =>{
        localStorage.clear();
        const BaseUrl = process.env.REACT_APP_BASE_URL;
         api(this.props.history).post(`${BaseUrl}/logout`).then(res=>{
          if(res.data.error){
          }else{
            logOut(this.props.history);
          }
        });
    }
    checkUserLoginWithAdfs = async function(){
        if((this.state.dataUSerP.id_proveedor) === null){
          if(Number(this.state.dataUSerP.init_adfs) !== 1){
            localStorage.clear();
            this.props.history.push("/");
          }
        }
    }
    render() {
        const BaseUrl = process.env.REACT_APP_BASE_URL;
        document.querySelector('meta[name="csrf-token"]').setAttribute("content",  Cookies.get('XSRF-TOKEN')); 
        if(!this.state.dataUSer.hasOwnProperty('nombre')){
           <GetErrosJs></GetErrosJs>
        }
        return (
            <header >
                
                <div className="container-fluid">
                    <nav>
                        <div className="row align-items-center">
                            <div className="col-4">
                                <img  alt='Cencocheck' src={process.env.PUBLIC_URL + '/dist/img/cenco-check_small.png'} width={150}  />
                                <Link className="navbar-brand" to="/">
                                    <img  alt='Cencocheck' src={process.env.PUBLIC_URL + this.state.logo} width={150}  />
                                </Link>
                            </div>
                            <div className="col-8">
                                <div className="d-flex justify-content-end align-items-center">
                                    <div className="item-noti">
                                        <img  alt='Notificaciones' src={process.env.PUBLIC_URL + '/dist/img/ic-notification.svg'}  />
                                        <span className="notificaciones">0</span>
                                    </div>
                                    <div className="dropdown dropdown-user">
                                        <button className="dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                                            {this.state.dataUSer.nombre}<br/>{this.state.dataUSer.apellido}
                                        </button>
                                        <div className="dropdown-menu">
                                            {this.state.dataUSer.id_proveedor === null &&
                                                <button  type="button" onClick={this.handleOnCloseSecion} className="dropdown-item">Salir</button>
                                            }
                                            {this.state.dataUSer.id_proveedor !== null &&
                                                <button  type="button" onClick={this.handleOnCloseSecionProveedor} className="dropdown-item">Salir</button> 
                                            }     
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                
            </header>
        )
    }
}
export default withRouter(Header)

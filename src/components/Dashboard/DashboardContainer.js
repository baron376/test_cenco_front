import React, { Component } from 'react'
import Dashboard from './Dashboard';
import FaldonesServices from '../../services/FaldonesServices';
import CampanaPromotoraServices from '../../services/CampanaPromotoraServices';
import CampanasServices from '../../services/CampanasServices';
import CampanaInternaServices from '../../services/CampanaInternaServices';
import MantencionServices from '../../services/MantencionServices';
import {customFormatterToView} from '../../util/formats';
import { faPencilAlt , faEye , faTrashAlt, faFileExcel , faFilePdf ,faCubes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from 'sweetalert';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import env from "react-dotenv";

export default class DashboardContainer extends Component {
    state = {
        campanasActivas: 0,
        campanasExpressActivas: 0,
        campanasPromotorasActivas: 0,
        campanasProveedoresActivas: 0,
        campanasInternasActivas: 0,
        mantencionesActivas: 0,
        campanasPendientes: 0,
        campanasExpressPendientes: 0,
        campanasPromotorasPendientes: 0,
        campanasProveedoresPendientes: 0,
        campanasInternasPendientes: 0,
        mantencionesPendientes: 0,
        loading:false
    }
    trasfData = async function(){
        
    }
    async componentDidMount(){
        await this.getDataAllCamapanaActive();
        await this.getDataAllExpressActive();
        await this.getDataAllPromotorasActive();
        await this.getDataAllProveedorActive();
        await this.getDataAllCampanasInternasActive();
        await this.getDataAllMantencionActive();
    }

    getDataAllCamapanaActive = async function(){
        this.setState({loading:true , error: null,  dataActive:[] })
         await FaldonesServices.getFaldonesAllDashborad().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                    this.setState({loading:false, campanasActivas: data.data ? data.data : 0});
                }else{
                    this.setState({ loading:false , error : data.error})
                }
        })
    }

    getDataAllExpressActive = async function(){
        this.setState({loading:true , error: null})
         await FaldonesServices.getFaldonesExpressDashboard().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                    this.setState({loading:false, campanasExpressActivas: data.data ? data.data : 0});
                }else{
                    this.setState({ loading:false , error : data.error})
                }
        })
    }

    getDataAllPromotorasActive = async function(){
        this.setState({loadingPromotoras:true , error: null,  dataActive:[] })
        await CampanaPromotoraServices.getCampanaPromotorasDashboard().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loadingPromotoras:false, campanasPromotorasActivas: data.data ? data.data : 0});
            }else{
                this.setState({ loadingPromotoras:false , error : data.error})
            }
        })
    }

    getDataAllProveedorActive = async function(){
        this.setState({loadingFaldones:true , error: null})
         await CampanasServices.getCampanasDashboard().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loadingFaldones:false, campanasProveedoresActivas: data.data ? data.data : 0});
            }else{
                this.setState({ loadingFaldones:false , error : data.error})
            }
        })
    }

    getDataAllCampanasInternasActive = async function(){
        this.setState({loadingFaldones:true , error: null})
        await CampanaInternaServices.getCampanasInternasDashboard().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                    this.setState({loadingFaldones:false, campanasInternasActivas: data.data ? data.data : 0});
                }else{
                    this.setState({ loadingFaldones:false , error : data.error})
                }
        })
    }

    getDataAllMantencionActive = async function(){
        this.setState({loadingFaldones:true , error: null})
        await MantencionServices.getMantencionDashboard().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loadingFaldones:false, mantencionesActivas: data.data ? data.data : 0});
            }else{
                this.setState({ loadingFaldones:false , error : data.error})
            }
        })
    }
    
    render() {
        let lsn = parseInt(localStorage.getItem('lsn'));
        if(lsn === 0){
            setTimeout(()=>{
                window.location.reload();
            }, 500);
            localStorage.setItem('lsn', 1);
        }
        return (
            <Dashboard
                state = {this.state}
            >
            </Dashboard>
        )
    }
}
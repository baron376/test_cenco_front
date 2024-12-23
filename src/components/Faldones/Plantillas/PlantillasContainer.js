import React, { Component } from 'react'
import Plantillas from './Plantillas';
import FaldonesServices from '../../../services/FaldonesServices';
import env from "react-dotenv";
import { faEye , faFilePdf , faThumbsDown , faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert';
import {hasPermission} from '../../../util/auth';
export default class PlantillasContainer extends Component {

    state = {
        dataActive:[],
        dataInactive:[],
        headData:[{
            dataField: '',
            text: ''
          }],
          loadingPlantillas:false,
          error:null,
          loading:false,
    }
    async componentDidMount(){
        await this.trasfData();
        await this.getDataAllActive();
        await this.getDataAllInactive();
    }
    trasfData = async function(){
        this.setState({
            loading:true,
        });
        const columns = [
          {
                dataField: 'id',
                text: 'N°',
                headerStyle: {
                    width: '13%'
                  },
                  sort: true,
          },
          {
            dataField: 'descripcion',
            text: 'Descripción',
            headerStyle: {
                width: '13%'
              },
              sort: true,
          },
          {
            dataField: 'actions',
            text: 'Acciones',
            formatter:this.actionsFormater.bind(this),
            headerStyle: {
                width: '15%'
              }
        },
        ];
          this.setState({
            loading:false,
            headData: columns,
        });
    }
    getDataAllActive = async function(){
        this.setState({loadingFaldones:true , error: null})
         await FaldonesServices.getPlantillasView().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                    this.setState({loadingFaldones:false, dataActive: data.data});
                }else{
                    this.setState({ loadingFaldones:false , error : data.error})
                }
        })
    }
    getDataAllInactive = async function(){
        this.setState({loadingFaldones:true , error: null})
         await FaldonesServices.getPlantillasInactivasView().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                    this.setState({loadingFaldones:false, dataInactive: data.data});
                }else{
                    this.setState({ loadingFaldones:false , error : data.error})
                }
        })
    }
    actionsFormater(cell , row){
        const BaseUrl = env.REACT_APP_BASE_URL;
        if(row.id_estatus_plantilla_tipo ===1){
            return(
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">
                        {hasPermission([409]) &&  
                            <a target="_blank" href={`${BaseUrl}/${row.url_ejemplo}`}><button  title="Ver diseño" className="dropdown-item"><FontAwesomeIcon icon={faFilePdf}/> Ver diseño</button></a>
                        }
                        {hasPermission([410]) &&   
                            <button   title="Desactivar" className="dropdown-item"   onClick={() => {this.desactivateRol(row.id)}}> <FontAwesomeIcon icon={faThumbsDown} /> Desactivar</button>
                        }
                    </div>
                </div>
            ) 
        }else{
            return(
                <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                    Seleccionar
                </button>
                <div className="dropdown-menu">
                    <button title="Activar" className="dropdown-item" onClick={() => {this.activateRol(row.id)}}> <FontAwesomeIcon icon={faThumbsUp} /> Activar</button>
                </div>
            </div>
            )
        }
    }

    desactivateRol = async (plantilla) =>{
        swal({
            title: "Esta seguro que desea desactivar la plantilla?",
            text: "la misma no se podrá seleccionar para crear una campaña!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                try{
                    let data = FaldonesServices.desactivatePlantilla(plantilla);
                    if(!data.hasOwnProperty('errorInfo')){
                    swal({
                        title: `Plantilla desactivada con éxito`,
                        text: "!",
                        icon: "success",
                        button: "Ok!",
                    });
                    this.getDataAllActive();
                    this.getDataAllInactive();
                    }else{
                        swal({
                            title: `Error ${data.errorInfo.toString()} `,
                            text: "!",
                            icon: "error",
                            button: "Ok!",
                        });
                    }
                    this.setState({loading:false , error: null})
                } catch(error){
                    this.setState({loading:false , error: error})
                }
            }
        });
    }
    activateRol = async (plantilla) =>{
        swal({
            title: "Esta seguro que desea activar la plantilla?",
            text: "la misma volverá a estar disponible para seleccionar, al crear una campaña!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                try{
                    let data = FaldonesServices.activatePlantilla(plantilla);
                    if(!data.hasOwnProperty('errorInfo')){
                    swal({
                        title: `Plantilla activada con éxito`,
                        text: "!",
                        icon: "success",
                        button: "Ok!",
                    });
                    this.getDataAllActive();
                    this.getDataAllInactive();
                    }else{
                        swal({
                            title: `Error ${data.errorInfo.toString()} `,
                            text: "!",
                            icon: "error",
                            button: "Ok!",
                        });
                    }
                    this.setState({loading:false , error: null})
                } catch(error){
                    this.setState({loading:false , error: error})
                }
            }
        });
    }

    render() {
        return (
            <Plantillas  state = {this.state}
            ></Plantillas>
        )
    }
}

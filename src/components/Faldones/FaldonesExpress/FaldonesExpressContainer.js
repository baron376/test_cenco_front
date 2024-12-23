import React, { Component } from 'react'
import FaldonesExpress from './FaldonesExpress';
import FaldonesServices from '../../../services/FaldonesServices';
import env from "react-dotenv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt , faEye , faTrashAlt, faFileExcel, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert';
import {hasPermission} from '../../../util/auth';

export default class FaldonesExpressContainer extends Component {
    state = {
        dataActive:[],
        dataDeteted:[],
        headData:[{
            dataField: '',
            text: ''
          }],
          loadingFaldones:false,
          error:null,
          loading:false,
          loadingDescarga:false
    }

    trasfData = async function(){
        this.setState({
            loading:true,
        });
        const columns = [
         
        // {
        //     dataField: 'seccion_faldon',
        //     text: 'Sección',
        //     formatter:this.seccionFormater,
        //     headerStyle: {
        //         width: '12%'
        //       },
        //     sort: true,
        // },
        {
            dataField: 'cadena',
            text: 'Cadena',
            headerStyle: {
                width: '12%'
              },
            sort: true,
        },
        {
            dataField: 'cod_barra',
            text: 'SAP o Código de Barra',
            headerStyle: {
                width: '12%'
              },
            sort: true,
        },
        {
            dataField: 'umb',
            text: 'UMB',
            headerStyle: {
                width: '12%'
              },
            sort: true,
        },
        {
            dataField: 'nombre_generico_promocion',
            text: 'Nombre Genérico',
            headerStyle: {
                width: '12%'
              },
            sort: true,
        },
        {
            dataField: 'estado_faldon',
            text: 'Estado',
           // formatter:this.estadoFormater,
            headerStyle: {
                width: '12%'
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
    async componentDidMount(){
        await this.trasfData();
        await this.getDataAllActive();
        await this.getDataDetele();
        
    }
    actionsFormater(cell , row){
        /* 
        onClick={() => {this.downloadExcel(row.id , row)}}
        */
        const BaseUrl = env.REACT_APP_BASE_URL;
        if(row.deleted_at){
            return(
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                    Seleccionar
                </button>
                <div className="dropdown-menu">                    
                    <Link to={`/FaldonesExpressDetalles-${row.uid}`} title="Ver detalles" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh" ><FontAwesomeIcon icon={faEye}/> Ver detalles</Link> 
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
                    {hasPermission([406]) &&
                        <Link to={`/FaldonesExpressDetalles-${row.uid}`} title="Ver detalles" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"  ><FontAwesomeIcon icon={faEye}/> Ver detalles</Link> 
                    }
                    {hasPermission([405]) && 
                        <button title="Descargar faldón" className="dropdown-item" onClick={() => {this.downloadFaldon(row.uid)}}> <FontAwesomeIcon icon={faFilePdf}/> Descargar faldón</button>
                    }
                    {hasPermission([407]) &&
                        <button title="Eliminar" className="dropdown-item btn-delete" onClick={() => {this.deleteFaldon(row.uid)}}> <FontAwesomeIcon icon={faTrashAlt} /> Eliminar</button>
                    }
                </div>
            </div>
            )
        }
        
    }

    deleteFaldon= async (faldon) =>{
            swal({
                title: "Esta seguro que desea Eliminar el Faldón?",
                text: "No podrá recuperar los datos!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    try{
                        FaldonesServices.deleteFaldon(faldon).then((data) => {;
                            if(!data.hasOwnProperty('errorInfo')){
                            swal({
                                title: `Faldón eliminada con éxito`,
                                text: "!",
                                icon: "success",
                                button: "Ok!",
                            });
                             this.getDataAllActive();
                             this.getDataDetele();
                            }else{
                                swal({
                                    title: `Error ${data.errorInfo.toString()} `,
                                    text: "!",
                                    icon: "error",
                                    button: "Ok!",
                                });
                            }
                        })
                        this.setState({loading:false , error: null})
                    } catch(error){
                        this.setState({loading:false , error: error})
                    }
                }
            });
    }

    downloadFaldon = async (faldon) => {
        const BaseUrl = env.REACT_APP_BASE_URL;
        this.setState({ loadingDescarga: true, error: null });
        try {
            FaldonesServices.downloadFaldon(faldon).then((data) => {
                if (!data.hasOwnProperty('errorInfo')) {
                    let responseLocal = data.data;
                    console.log(responseLocal)
                    let url = `${BaseUrl}/${responseLocal}`;
                    window.open(url, '_blank');
                    this.setState({ loadingDescarga: false, error: null });
                    swal({
                        title: `Faldon abierto en una nueva pestaña`,
                        text: "¡Éxito!",
                        icon: "success",
                        button: "Ok!",
                    });
                } else {
                    swal({
                        title: `Error`,
                        text: "¡Ocurrió un error al abrir el faldón!",
                        icon: "error",
                        button: "Ok!",
                    });
                }
            });
        } catch (error) {
            this.setState({ loadingDescarga: false, error: error });
        }
    }
    

    getDataAllActive = async function(){
        this.setState({loadingFaldones:true , error: null})
         await FaldonesServices.getFaldonesExpressAll().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                    this.setState({loadingFaldones:false, dataActive: data.data});
                }else{
                    this.setState({ loadingFaldones:false , error : data.error})
                }
        })
    }
    getDataDetele = async function(){
        this.setState({loadingFaldones:true , error: null})
         await FaldonesServices.getFaldonesExpressDelete().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                    this.setState({loadingFaldones:false, dataDeteted: data.data});
                }else{
                    this.setState({ loadingFaldones:false , error : data.error})
                }
        })
    }

    seccionFormater (cell){
        let namesCad = cell.nombre
        return namesCad;
    }
    estadoFormater (cell){
        //console.log('soooy yo',cell);
        let namesCad = cell.nombre
        return namesCad;
    }


    render() {
        return (
            <FaldonesExpress state = {this.state}
            downloadPdf={this.downloadPdf}> 
            </FaldonesExpress>
        )
    }
}

import React, { Component } from 'react'
import AdminFaldones from './AdminFaldones';
import FaldonesServices from '../../../services/FaldonesServices';
import {customFormatterToView} from '../../../util/formats';
import { faPencilAlt , faEye , faTrashAlt, faFileExcel , faFilePdf ,faCubes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from 'sweetalert';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import env from "react-dotenv";
import {hasPermission} from '../../../util/auth';

export default class AdminFaldonesContainers extends Component {
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
          {
                dataField: 'cadena_nombre',
                text: 'Cadena',
                headerStyle: {
                    width: '13%'
                  },
                  sort: true,
          },
          {
            dataField: 'sala_nombre',
            text: 'Sala',
            formatter:this.salaFormater,
            headerStyle: {
                width: '13%'
              },
              sort: true,
      },
          {
            dataField: 'nombre',
            text: 'Campaña',
            headerStyle: {
                width: '12%'
              },
            sort: true,
            },
            {
                dataField: 'vigencia',
                text: 'Vigencia',
                headerStyle: {
                    width: '13%'
                  },
                  sort: true,
            },
            {
                dataField: 'estado_nombre',
                text: 'Estado',
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
    async componentDidMount(){
        await this.trasfData();
        await this.getDataAllActive();
        await this.getDataDetele();
        
    }
    vigenciaFormater(cell , row){
        return customFormatterToView(row.desde)+ ' - ' +customFormatterToView(row.hasta)
    }
    salaFormater (cell){
        let namesCad = cell == null ? 'Global' : cell
        return namesCad;
    }
    estadoFormater (cell){
        let namesEstd = cell.nombre
        return namesEstd;
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
                    {hasPermission([406]) &&
                        <Link to={`/FaldonesDetalles-${row.id}`} title="Ver detalles" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"  onClick={() => {this.showCampana(row.id)}}><FontAwesomeIcon icon={faEye}/> Ver detalles</Link>
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
                    {hasPermission([406]) &&
                        <Link to={`/FaldonesDetalles-${row.id}`} title="Ver detalles" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"  onClick={() => {this.showCampana(row.id)}}><FontAwesomeIcon icon={faEye}/> Ver detalles</Link>
                    }  
                    {hasPermission([404]) &&
                        <Link to={`/FaldonesEditar-${row.id}`}> <button  title="Editar Campaña" className="dropdown-item" data-toggle="modal" data-target="#modal-lg"  onClick={() => {this.editCampana(row.id)}}><FontAwesomeIcon icon={faPencilAlt}/> Editar Campaña</button></Link>
                    }  
                    {(Number(row.id_estado_campana) !==6 && row.url_pdf != null)&&
                        <a target="_blank" href={`${BaseUrl}/${row.url_pdf}`}><button  title="Descargar Faldón" className="dropdown-item" data-toggle="modal" data-target="#modal-lg"><FontAwesomeIcon icon={faFilePdf}/> Descargar Faldón</button></a>
                    }              
                    {hasPermission([403]) &&
                        <a target="_blank" href={`${BaseUrl}/${row.url}`}><button  title="Descargar Excel" className="dropdown-item" data-toggle="modal" data-target="#modal-lg"  ><FontAwesomeIcon icon={faFileExcel}/> Descargar Excel</button></a>
                    }
                    { Number((row.id_estado_campana) !== 6 && hasPermission([406]) ) &&
                        <Link to={`/FaldonesStock-${row.id}`}> <button  title="Stock Sala" className="dropdown-item" data-toggle="modal" data-target="#modal-lg" ><FontAwesomeIcon icon={faCubes}/> Stock Sala</button></Link>
                    }
                    {hasPermission([407]) &&
                        <button  title="Eliminar" className="dropdown-item btn-delete" onClick={() => {this.deleteCampana(row.id)}}> <FontAwesomeIcon icon={faTrashAlt} /> Eliminar</button>
                    }
                </div>
            </div>
            )
        }
        
    }
    showCampana = async (campana) =>{
       console.log('id de la campana' , campana)
    }
    editCampana = async (campana) =>{
        console.log(' editar campana' , campana)
    }
    deleteCampana= async (campana) =>{
        console.log( 'eliminar campana', campana)
      
            swal({
                title: "Esta seguro que desea Eliminar el Faldón?",
                text: "No podrá recuperar los datos de la misma!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    try{
                        FaldonesServices.deleteCampana(campana).then((data) => {;
                            if(!data.hasOwnProperty('errorInfo')){
                            swal({
                                title: `Faldón eliminada con éxito`,
                                text: "!",
                                icon: "success",
                                button: "Ok!",
                            });
                            this.getDataAllActive();
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
    /*downloadExcel= async (campana , campanaAll) =>{
        console.log('descargar excel' , campanaAll)
    }*/
    downloadFaldon= async (campana) =>{
        this.setState({loadingDescarga:true , error: null})
        try{
            FaldonesServices.downloadFaldonesCampana(campana).then((data) => {
                if(!data.hasOwnProperty('errorInfo')){
                    let responseLocal = data.data;
                    let linkSource = `data:application/pdf;base64,${responseLocal.content}`;
                    let downloadLink = document.createElement("a");
                    let fileName = responseLocal.nombre_archivo;
                    downloadLink.href = linkSource;
                    downloadLink.download = fileName;
                    downloadLink.click();
                    this.setState({loadingDescarga:false , error: null})
                swal({
                    title: `Faldón descargado con éxito`,
                    text: "!",
                    icon: "success",
                    button: "Ok!",
                });
                }else{
                    swal({
                        title: `Error`,
                        text: "!",
                        icon: "error",
                        button: "Ok!",
                    });
                }
            })
            
        } catch(error){
            this.setState({loadingDescarga:false , error: error})
        }
    }
    getDataAllActive = async function(){
        this.setState({loadingFaldones:true , error: null,  dataActive:[] })
         await FaldonesServices.getFaldonesAll().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                    this.setState({loadingFaldones:false, dataActive: data.data});
                }else{
                    this.setState({ loadingFaldones:false , error : data.error})
                }
        })
    }
    getDataDetele = async function(){
        this.setState({loadingFaldones:true , error: null ,dataDeteted:[]})
         await FaldonesServices.getFaldonesDelete().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                    this.setState({loadingFaldones:false, dataDeteted: data.data});
                }else{
                    this.setState({ loadingFaldones:false , error : data.error})
                }
        })
    }
    render() {
        return (
            <AdminFaldones
            state = {this.state}
           >
            </AdminFaldones>
        )
    }
}
import AdminCampanasPromotoras from './AdminCampanasPromotoras.js';
import React, { Component } from 'react'
import {customFormatterToView} from '../../util/formats';
import CampanaPromotoraServices from '../../services/CampanaPromotoraServices';
import { faPencilAlt , faEye , faTrashAlt, faCog , faFilePdf ,faCubes , faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from 'sweetalert';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {hasPermission} from '../../util/auth';

export default class AdminCampanasPromotorasContainers extends Component {

    state = {
        dataActive:[],
        dataDeteted:[],
        headData:[{
            dataField: '',
            text: ''
          }],
          loadingPromotoras:false,
          error:null,
          loading:false,
    }
    async componentDidMount(){
        await this.trasfData();
        await this.getDataAllActive();
        await this.getDataDetele();
    }

    trasfData = async function(){
        this.setState({
            loading:true,
        });
        const columns = [
             {
                    dataField: 'cadena',
                    text: 'Cadena',
                    headerStyle: {
                        width: '8%'
                    },
                    sort: true,
            }, 
            {
            dataField: 'nombre',
            text: 'Campaña',
            headerStyle: {
                width: '20%'
              },
            sort: true,
            },
            {
                dataField: 'proveedor',
                text: 'Proveedor',
                headerStyle: {
                    width: '10%'
                  },
                  sort: true,
            },
            {
                dataField: 'vigencia',
                text: 'Vigencia',
                formatter:this.vigenciaFormater,
                headerStyle: {
                    width: '17%'
                  },
                  sort: true,
            },
            {
                dataField: 'turno',
                text: 'Turno',
                headerStyle: {
                    width: '5%'
                  },
                  sort: true,
            },
            {
            dataField: 'estado',
            text: 'Estado',
            headerStyle: {
                width: '8%'
              },
              sort: true,
            },
             {
                dataField: 'etapa_promotora',
                text: 'Etapa',
                headerStyle: {
                    width: '8%'
                  },
                  sort: true,
            }, 
            {
                dataField: 'actions',
                text: 'Acciones',
                formatter:this.actionsFormater.bind(this),
                headerStyle: {
                    width: '20%'
                  }
            },
      
        ];
          this.setState({
            loading:false,
            headData: columns,
        });
    }
    

    
    vigenciaFormater(cell , row){
        return customFormatterToView(row.desde)+ ' - ' +customFormatterToView(row.hasta)
    }
    actionsFormater(cell , row){

        if(row.deleted_at !== null){
            return(
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">                    
                        {hasPermission([515]) &&
                            <Link to={`/VerCampanaPromotoras-${row.id}`}> <button   title="Ver detalles" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faEye}/> Ver detalles</button></Link>
                        }
                    </div>
                </div>
            )
        }
        else if( row.id_etapa_promotora === 1){
            return(
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">                    
                        {hasPermission([515,908]) &&
                            <Link to={`/VerCampanaPromotoras-${row.id}`}> <button   title="Ver detalles" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faEye}/> Ver detalles</button></Link>
                        }
                        {hasPermission([901]) &&
                            <Link to={`/EditCampanaPromotoras-${row.id}`}> <button  title="Editar Campaña" className="dropdown-item" data-toggle="modal" data-target="#modal-lg" ><FontAwesomeIcon icon={faPencilAlt}/> Editar Campaña</button></Link>
                        }
                        {hasPermission([902]) &&
                            <Link to={`/GestionarCampanaPromotoras-${row.id}`}> <button   title="Gestionar Campaña" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faCog}/> Gestionar Campaña</button></Link>
                        }
                        {hasPermission([515,907]) &&
                            <Link to={`/SubirMaterialCampanaPromotora-${row.id}`}> <button   title="Subir Campaña" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon  icon={faArrowUp}/> Subir Campaña</button></Link>
                        }
                        {hasPermission([515,908]) &&
                            <button  title="Descargar pdf" className="dropdown-item" data-toggle="modal" data-target="#modal-lg"  onClick={() => {this.downloadPdf(row.id)}}><FontAwesomeIcon icon={faFilePdf}/> Descargar pdf</button>
                        }
                        {hasPermission([905]) &&
                            <button  title="Eliminar" className="dropdown-item btn-delete" onClick={() => {this.deleteCampana(row.id)}}> <FontAwesomeIcon icon={faTrashAlt} /> Eliminar</button>
                        }
                    </div>
                </div>
            )
        }
        else if(row.id_etapa_promotora=== 3 || row.id_etapa_promotora === 2){
            return(
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">                    
                        {hasPermission([515,908]) &&
                            <Link to={`/VerCampanaPromotoras-${row.id}`}> <button title="Ver detalles" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faEye}/> Ver detalles</button></Link>
                        }
                        {hasPermission([515,908]) &&
                            <button title="Descargar pdf" className="dropdown-item" data-toggle="modal" data-target="#modal-lg"  onClick={() => {this.downloadPdf(row.id)}}><FontAwesomeIcon icon={faFilePdf}/> Descargar PDF</button>
                        }
                        {hasPermission([905]) &&
                            <button title="Eliminar" className="dropdown-item btn-delete" onClick={() => {this.deleteCampana(row.id)}}> <FontAwesomeIcon icon={faTrashAlt} /> Eliminar</button>
                        }
                    </div>
                </div>
                )
        }
       
    }
    getDataAllActive = async function(){
        this.setState({loadingPromotoras:true , error: null,  dataActive:[] })
         await CampanaPromotoraServices.getCampanaPromotorasAll().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                    this.setState({loadingPromotoras:false, dataActive: data.data});
                }else{
                    this.setState({ loadingPromotoras:false , error : data.error})
                }
        })
    }
    getDataDetele = async function(){
        this.setState({loadingPromotoras:true , error: null ,dataDeteted:[]})
         await CampanaPromotoraServices.getCampanaPromotorasDelete().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                    this.setState({loadingPromotoras:false, dataDeteted: data.data});
                }else{
                    this.setState({ loadingPromotoras:false , error : data.error})
                }
        })
    }
    deleteCampana= async (campana) =>{
        console.log( 'eliminar campana', campana)
      
            swal({
                title: "Esta seguro que desea Eliminar la campaña?",
                text: "No podrá recuperar los datos de la misma!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    try{
                        CampanaPromotoraServices.deleteCampanaPromotoras(campana).then((data) => {;
                            if(!data.hasOwnProperty('errorInfo')){
                            swal({
                                title: `Campaña eliminada con éxito`,
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
    downloadPdf= async (idCampanaPro) =>{
        console.log('descarasssssssssssssssss')
        let campanaPdf = idCampanaPro;
        this.setState({loadingDescarga:true , error: null})
        try{
            CampanaPromotoraServices.downloadDetailsCampana(campanaPdf).then((data) => {
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
                    title: `PDF descargado con éxito`,
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
    render() {
        return (
            <AdminCampanasPromotoras
            state = {this.state}>
            </AdminCampanasPromotoras>
        )
    }
}

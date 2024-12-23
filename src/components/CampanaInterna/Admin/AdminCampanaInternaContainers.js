import React, { Component } from 'react'
import AdminCampanaInterna from './AdminCampanaInterna.js';
import CampanaInternaServices from '../../../services/CampanaInternaServices';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {customFormatterToView} from '../../../util/formats';
import { faPencilAlt , faEye , faTrashAlt, faFileExcel , faFilePdf, faArrowUp, faThumbsUp, faCog,faCheck,faComment} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from 'sweetalert';
import {hasPermission} from '../../../util/auth';
import env from "react-dotenv";

export default class AdminCampanaInternaContainers extends Component {
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
          modalIsopen: false,
          modalCreateTitle: '',
          campanaDetailsData:[],
          dataUp:[]
    }
    trasfData = async function(){
        this.setState({
            loading:true,
        });
        const columns = [
           {
                dataField: 'cadena',
                text: 'Cadena',
                // formatter:this.cadenaFormater,
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
                dataField: 'instalador',
                text: 'Instalador',
                // formatter:this.instaldorFormater,
                headerStyle: {
                    width: '13%'
                  },
                  sort: true,
           },
            {
                dataField: 'vigencia',
                text: 'Vigencia',
                formatter:this.vigenciaFormater,
                headerStyle: {
                    width: '13%'
                  },
                  sort: true,
            },
            {
                dataField: 'etapa',
                text: 'Etapa',
                // formatter:this.EtapaFormater,
                headerStyle: {
                    width: '13%'
                  },
                  sort: true,
            },
            {
                dataField: 'estado',
                text: 'Estado',
                // formatter:this.estadoFormater,
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
            {
                dataField: 'updated_at',
                text: 'Actualizada',
                formatter:this.ActualizadFormater,
                headerStyle: {
                    width: '13%'
                  },
                  sort: true,
            },
      
        ];
          this.setState({
            loading:false,
            headData: columns,
        });
    }
    async componentDidMount(){
        console.log('cargando el componente q es ');
        await this.trasfData();
        await this.getDataAllActive();
        await this.getDataAllup();
        await this.getDataDetele();
        
    }
    getDataAllActive = async function(){
        this.setState({loadingFaldones:true , error: null})
         await CampanaInternaServices.getCampanasInternasAll().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                    this.setState({loadingFaldones:false, dataActive: data.data});
                }else{
                    this.setState({ loadingFaldones:false , error : data.error})
                }
        })
    }

    getDataAllup = async function(){
        this.setState({loadingFaldones:true , error: null})
         await CampanaInternaServices.getCampanasInternasUp().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loadingFaldones:false, dataUp: data.data});
            }else{
                this.setState({ loadingFaldones:false , error : data.error})
            }
        })
    }
    getDataDetele = async function(){
        this.setState({loadingFaldones:true , error: null})
         await CampanaInternaServices.getCampanaInternaDelete().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                    this.setState({loadingFaldones:false, dataDeteted: data.data});
                }else{
                    this.setState({ loadingFaldones:false , error : data.error})
                }
        })
    }
    vigenciaFormater(cell , row){
        return customFormatterToView(row.desde)+ ' - ' +customFormatterToView(row.hasta)
    }
    ActualizadFormater(cell , row){
        return customFormatterToView(row.updated_at)
    }
    cadenaFormater (cell){
        let namesCad = cell.nombre
        return namesCad;
    }

    EtapaFormater (cell){
        let namesCad = cell.nombre
        return namesCad;
    }

    instaldorFormater (cell){
        let namesE = cell.nombre
        return namesE;
    }
    estadoFormater (cell){
        let namesEstd = cell.nombre
        return namesEstd;
    }
    //Funcion que al parecer provocaba error al quedar un bucle
     downloadMateriales = (row) => {
        console.log(row)
         row.materiales.forEach( async (material) => {
             await this.downloadUrl(material)
         });
     }

/*     downloadMateriales = () => {
        this.state.listaMateriales.forEach(async (material) => {
            await this.downloadUrl(material);
        });
    } */

    // downloadMateriales = async (row) => {
    //     try {
    //         for (const material of row.materiales) {
    //             await this.downloadUrl(material);
    //         }
    //     } catch (error) {
    //         console.error("Error al descargar materiales:", error);
    //     }
    // }

    //download original
    downloadUrl = async function(material) {
        window.open(env.REACT_APP_BASE_URL+'/'+material.url, '_blank');
    }

    // downloadUrl = (material) => {
    //     try {
    //         const anchor = document.createElement('a');
    //         anchor.href = env.REACT_APP_BASE_URL + '/' + material.url;
    //         anchor.download = 'material'; // Puedes establecer un nombre de archivo si lo tienes disponible en el material
    //         anchor.click();
    //     } catch (error) {
    //         console.error("Error al descargar el material:", error);
    //     }
    // }

    actionsFormater(cell , row){
        if(!row.deleted_at){
            const BaseUrl = env.REACT_APP_BASE_URL;
            return(   
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">                    
                        {hasPermission([807]) &&
                            <Link to={`/VerCampanaInterna-${row.id}`}> <button   title="Ver" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faEye}/> Ver</button></Link>
                        }
                        {hasPermission([802]) &&
                            <Link to={`/EditarCampanaInterna-${row.id}`}> <button   title="Editar" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faPencilAlt}/> Editar</button></Link> 
                        }
                        {hasPermission([804]) &&
                            <Link to={`/RevisarCampanaInterna-${row.id}`}> <button   title="Reporte" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faCheck}/> Reporte</button></Link> 
                        }
                        {hasPermission([807]) &&
                            <Link to={`/ComentariosCampanaInterna-${row.id}`}> <button   title="Comentarios" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faComment}/>Comentarios</button></Link> 
                        }
                        {hasPermission([807]) &&
                            <a> <button   title="Descargar Material" onClick={() => {this.downloadMateriales(row)}} download className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faFilePdf}/> Descargar Material</button></a>
                        }
                        {hasPermission([803]) &&
                            <a> <button  title="Eliminar"   className="dropdown-item  btn-delete" onClick={() => {this.deleteCampana(row.id)}}> <FontAwesomeIcon icon={faTrashAlt} /> Eliminar</button></a>
                        }
                    </div>
                </div>         
            )        
        }
        else {
            const BaseUrl = env.REACT_APP_BASE_URL;
            return(   
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">                    
                        {hasPermission([807]) &&
                            <Link to={`/VerCampanaInterna-${row.id}`}> <button   title="Ver detalle" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faEye}/> Ver detalle</button></Link>
                        }
                    </div>
                </div>
            )        
        }
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
                        CampanaInternaServices.deleteCampanaInterna(campana).then((data) => {;
                            if(!data.hasOwnProperty('errorInfo')){
                            swal({
                                title: `Campaña eliminada con éxito`,
                                text: "!",
                                icon: "success",
                                button: "Ok!",
                            });
                            this.trasfData();
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
                }catch(error){
                    this.setState({loading:false , error: error})
                }
            }
        });        
    }

    upCampana = async (campana) =>{
        console.log('descargar excel' , campana)
        this.setState({modalIsopen:true , modalTitle:'Detalle de Omar', loadingModalShow:true});
            await this.getDetailsCampana(campana);
            await this.setVarShowCadena();
        this.setState({loadingModalShow:false});
    }

    getDetailsCampana = async function(CadenaId){
        this.setState({loading:false , error: null})
        await CampanaInternaServices.getDetailsCampana(CadenaId).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, campanaDetailsData: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }
    setVarShowCadena = async () =>{
        this.setState(
            {
               modalTitle:`Subir Campaña ${this.state.campanaDetailsData.nombre}`,
               cadena: this.state.campanaDetailsData.cadena.nombre,
               vigencia: customFormatterToView(this.state.campanaDetailsData.desde)+ ' - ' +customFormatterToView(this.state.campanaDetailsData.hasta),
               proveedor: this.state.campanaDetailsData.proveedor.nombre,
               seccion: this.state.campanaDetailsData.sesion.cdg_int+ '-' +this.state.campanaDetailsData.sesion.nombre,
               editCadenaEstate:false,
               name:this.state.campanaDetailsData.nombre,
               descripcion: 'CHAOOOOOOO',
               
            })
        this.setState({modalIsopen:true})
    }

    editCampana = async (campana) =>{
        console.log(' editar campana' , campana)
    }

    downloadPdf= async (campana) =>{
        console.log('descargar pdf' , campana)
    }
    

    handleCloseModal = e =>{
        this.setState({modalIsopen:false})
    }

    render() {
        return (
            <AdminCampanaInterna
            state = {this.state}
            isOpen={this.state.modalIsopen} 
            onCloseModal={this.handleCloseModal}
            modalIsopen={this.state.modalIsopen}
            onOpenModal={this.handleOpenModal}
            modalTitle={this.state.modalTitle}
           >
            </AdminCampanaInterna>
        )
    }
}
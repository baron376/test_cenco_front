import React, { Component } from 'react'
import AdminComentariosCampanaInterna from './AdminComentariosCampanaInterna.js';
import CampanaInternaServices from '../../../services/CampanaInternaServices';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {customFormatterToView} from '../../../util/formats';
import { faPencilAlt , faEye , faTrashAlt, faFileExcel , faFilePdf, faArrowUp, faThumbsUp, faCog,faCheck} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from 'sweetalert';
import {hasPermission} from '../../../util/auth';
import env from "react-dotenv";

export default class AdminComentariosCampanaInternaContainers extends Component {
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
                dataField: 'sala',
                text: 'Sala',
                formatter:this.salaFormater,
                headerStyle: {
                    width: '20%'
                },
                sort: true,
           },
           {
                dataField: 'user',
                text: 'Usuario',
                formatter:this.userFormater,
                headerStyle: {
                    width: '20%'
                },
                sort: true,
            },
            {
                dataField: 'comentario',
                text: 'Comentario',
                headerStyle: {
                    width: '50%'
                  },
                  sort: true,
            },
            {
                dataField: 'actions',
                text: 'Acciones',
                formatter:this.actionsFormater.bind(this),
                headerStyle: {
                    width: '10%'
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

    getDataAllActive = async function(){
        this.setState({loadingFaldones:true , error: null})
         await CampanaInternaServices.getComentariosCampanasInternasAll(this.props.match.params.id).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loadingFaldones:false, dataActive: data.data});
            }else{
                this.setState({ loadingFaldones:false , error : data.error})
            }
        })
    }

    getDataDetele = async function(){
        this.setState({loadingFaldones:true , error: null})
         await CampanaInternaServices.getComentarioCampanaInternaDelete(this.props.match.params.id).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                    this.setState({loadingFaldones:false, dataDeteted: data.data});
                }else{
                    this.setState({ loadingFaldones:false , error : data.error})
                }
        })
    }

    userFormater (cell){
        return cell.nombre+" "+cell.apellido;
    }

    salaFormater (cell){
        return cell.nombre_sap;
    }

    downloadMateriales = (row) => {
        row.materiales.forEach( async (material) => {
            await this.downloadUrl(material)
        });
    }

    downloadUrl = async function(material) {
        window.open(env.REACT_APP_BASE_URL+'/'+material.url, '_blank');
    }

    actionsFormater(cell , row){
        if(!row.deleted_at){
            return(            
                <div>
                    {hasPermission([807]) &&
                        <a> <button   title="Descargar Material" onClick={() => {this.downloadMateriales(row)}} download className="btn btn btn-danger actions-icons-t" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faFilePdf}/></button></a>
                    }
                    {hasPermission([807]) &&
                        <a> <button  title="Eliminar"   className="btn btn-danger" onClick={() => {this.delete(row.id)}}> <FontAwesomeIcon icon={faTrashAlt} /> </button></a>
                    }
                </div>
            )        
        }
        else {
            return(            
                <div>
                    {hasPermission([807]) &&
                        <a> <button   title="Descargar Material" onClick={() => {this.downloadMateriales(row)}} download className="btn btn btn-danger actions-icons-t" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faFilePdf}/></button></a>
                    }
                </div>
            )        
        }
    }
    delete= async (campana) =>{
        console.log( 'eliminar campana', campana)
      
            swal({
                title: "Esta seguro que desea Eliminar el comentario?",
                text: "No podrá recuperar los datos del mismo",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
            .then((willDelete) => {
                if (willDelete) {
                    try{
                        CampanaInternaServices.deleteComentarioCampanaInterna(campana).then((data) => {;
                            if(!data.hasOwnProperty('errorInfo')){
                            swal({
                                title: `Comentario eliminado con éxito`,
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
            <AdminComentariosCampanaInterna
            state = {this.state}
            isOpen={this.state.modalIsopen} 
            onCloseModal={this.handleCloseModal}
            modalIsopen={this.state.modalIsopen}
            onOpenModal={this.handleOpenModal}
            modalTitle={this.state.modalTitle}
           >
            </AdminComentariosCampanaInterna>
        )
    }
}
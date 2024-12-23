import React, { Component } from 'react'
import AdminMantencion from './AdminMantencion.js';
import MantencionServices from '../../../services/MantencionServices';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {customFormatterToView} from '../../../util/formats';
import { faPencilAlt , faEye , faTrashAlt, faFileExcel , faFilePdf, faArrowUp, faThumbsUp, faCog,faCheck} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from 'sweetalert';
import {hasPermission} from '../../../util/auth';
export default class AdminMantencionContainers extends Component {
    state = {
        dataActive:[],
        dataDeteted:[],
        dataAprobe:[],
        dataRefuse:[],
        dataEnded:[],
        dataDelete:[],
        dataLiveradas:[],
        dataDevueltas:[],
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
                dataField: 'nombre',
                text: 'Cadena',
                // formatter:this.cadenaFormater,
                headerStyle: {
                    width: '13%'
                  },
                  sort: true,
           },
           {
                dataField: 'asunto',
                text: 'Asunto',
                headerStyle: {
                    width: '12%'
                },
                sort: true,
            },
            {
                dataField: 'sala',
                text: 'Sala',
                // formatter:this.salaFormater,
                headerStyle: {
                    width: '12%'
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
        console.log('cargando el componenete q es ');
        await this.trasfData();
        await this.getDataAllActive();
        await this.getDataAllup();
        await this.getDataLiveradas();
        await this.getDataDevueltas();
        await this.getDataAprobe();
        await this.getDataRefuse();
        await this.getDataEnded();
        await this.getDataDetele();
    }

    getDataAllActive = async function(){
        this.setState({loadingFaldones:true , error: null})
         await MantencionServices.getMantencionAll().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                    this.setState({loadingFaldones:false, dataActive: data.data});
                }else{
                    this.setState({ loadingFaldones:false , error : data.error})
                }
        })
    }

    getDataAllup = async function(){
        this.setState({loadingFaldones:true , error: null})
         await MantencionServices.getMantencionByState(1).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loadingFaldones:false, dataUp: data.data});
            }else{
                this.setState({ loadingFaldones:false , error : data.error})
            }
        })
    }

    getDataLiveradas = async function(){
        this.setState({loadingFaldones:true , error: null})
         await MantencionServices.getMantencionByState(2).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loadingFaldones:false, dataLiveradas: data.data});
            }else{
                this.setState({ loadingFaldones:false , error : data.error})
            }
        })
    }

    getDataDevueltas = async function(){
        this.setState({loadingFaldones:true , error: null})
         await MantencionServices.getMantencionByState(3).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loadingFaldones:false, dataDevueltas: data.data});
            }else{
                this.setState({ loadingFaldones:false , error : data.error})
            }
        })
    }

    getDataAprobe = async function(){
        this.setState({loadingFaldones:true , error: null})
         await MantencionServices.getMantencionByState(4).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                    this.setState({loadingFaldones:false, dataAprobe: data.data});
                }else{
                    this.setState({ loadingFaldones:false , error : data.error})
                }
        })
    }

    getDataRefuse = async function(){
        this.setState({loadingFaldones:true , error: null})
         await MantencionServices.getMantencionByState(5).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                    this.setState({loadingFaldones:false, dataRefuse: data.data});
                }else{
                    this.setState({ loadingFaldones:false , error : data.error})
                }
        })
    }

    getDataEnded = async function(){
        this.setState({loadingFaldones:true , error: null})
         await MantencionServices.getMantencionByState(6).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                    this.setState({loadingFaldones:false, dataEnded: data.data});
                }else{
                    this.setState({ loadingFaldones:false , error : data.error})
                }
        })
    }

    getDataDetele = async function(){
        this.setState({loadingFaldones:true , error: null})
         await MantencionServices.getMantencionDelete().then((data) => {
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

    proveedorFormater (cell){
        let namesE = cell.nombre
        return namesE;
    }
    estadoFormater (cell){
        let namesEstd = cell.nombre
        return namesEstd;
    }

    salaFormater (cell){
        let nameSala = cell.nombre_sap
        return nameSala;
    }

    downloadPdf= async (idMantencion) =>{
        let mantencionPdf = idMantencion;
        this.setState({loadingFaldones:true , error: null})
        try{
            MantencionServices.downloadDetailsMantencion(mantencionPdf).then((data) => {
                if(!data.hasOwnProperty('errorInfo')){
                    let responseLocal = data.data;
                    let linkSource = `data:application/pdf;base64,${responseLocal.content}`;
                    let downloadLink = document.createElement("a");
                    let fileName = responseLocal.nombre_archivo;
                    downloadLink.href = linkSource;
                    downloadLink.download = fileName;
                    downloadLink.click();
                    this.setState({loadingFaldones:false , error: null})
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
            this.setState({loadingFaldones:false , error: error})
        }
    }

    actionsFormater(cell , row){
        if(row.deleted_at === null){
            return(            
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">                    
                        {(hasPermission([702]) && (row.id_mantencion_estado === 1 || row.id_mantencion_estado === 3)) &&
                            <Link to={`/EditarMantencion-${row.id}`}> <button   title="Editar" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon  icon={faPencilAlt}/> Editar</button></Link>
                        }   
                        {hasPermission([706]) && 
                            <button  title="Descargar Solicitud" className="dropdown-item" data-toggle="modal" data-target="#modal-lg"  onClick={() => {this.downloadPdf(row.id)}}><FontAwesomeIcon icon={faFilePdf}/> Descargar Solicitud</button>
                        }            
                        {(hasPermission([713]) && (row.id_mantencion_estado === 2 || row.id_mantencion_estado === 5)) &&
                            <Link to={`/MantencionGestion-${row.id}`}> <button   title="Gestionar Solicitud" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faCog}/> Gestionar Solicitud</button></Link>
                        }                                                            
                        {(hasPermission([714]) && row.id_mantencion_estado === 1) &&
                            <Link to={`/MantencionGestion-${row.id}`}> <button   title="Gestionar Solicitud" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faCog} /> Gestionar Solicitud</button></Link>
                        }
                        {hasPermission([706]) &&
                            <Link to={`/VerMantencion-${row.id}`}> <button   title="Visualizar pedido realizado por local" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faEye}/> Visualizar pedido realizado por local</button></Link>
                        }
                        {(hasPermission([715]) && row.id_mantencion_estado === 4) &&
                            <button title="Solicitud Terminada con éxito" className="dropdown-item" onClick={() => {this.FinalizarMantencion(row.id)}}><FontAwesomeIcon icon={faCheck} /> Solicitud Terminada con éxito</button>
                        }
                        {hasPermission([703]) &&
                            <button  title="Eliminar" className="dropdown-item btn-delete" onClick={() => {this.deleteCampana(row.id)}}> <FontAwesomeIcon icon={faTrashAlt} /> Eliminar</button>
                        }
                    </div>
                </div>
            )        
        }
        
        else{
            return(            
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">    
                        {hasPermission([700]) &&
                            <Link to={`/VerCampana-${row.id}`}> <button   title="Ver mantencion" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faEye}/> Ver mantención</button></Link>
                        }
                    </div>
                </div>
            )        
        }
    }
    deleteCampana= async (campana) =>{
        console.log( 'eliminar campana', campana)
      
            swal({
                title: "Esta seguro que desea Eliminar la mantencion?",
                text: "No podra recuperar los datos de la misma!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
            .then((willDelete) => {
                if (willDelete) {
                    try{
                        MantencionServices.deleteMantencion(campana).then((data) => {;
                            if(!data.hasOwnProperty('errorInfo')){
                            swal({
                                title: `Mantencion eliminada con exito`,
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

    FinalizarMantencion= async (mantencion) =>{

        let statusMantencion = ({
            id: this.props.match.params.id,
            comentario: this.state.comentario,
        });
    
        swal({
            title: "Esta seguro que desea Finalizar la Mantencion?",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
        .then((willDelete) => {
            if (willDelete) {
                try{
                    
                    MantencionServices.FinalizarMantencion(statusMantencion, mantencion).then((data) => {;
                        if(!data.hasOwnProperty('errorInfo')){
                            swal({
                                title: `Mantencion Finalizada con éxito`,
                                text: "!",
                                icon: "success",
                                button: "Ok!",
                            });
                            window.location.replace('');
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
        await MantencionServices.getDetailsMantencion(CadenaId).then((data) => {
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

    handleCloseModal = e =>{
        this.setState({modalIsopen:false})
    }

    render() {
        return (
            <AdminMantencion
            state = {this.state}
            isOpen={this.state.modalIsopen} 
            onCloseModal={this.handleCloseModal}
            modalIsopen={this.state.modalIsopen}
            onOpenModal={this.handleOpenModal}
            modalTitle={this.state.modalTitle}
           >
            </AdminMantencion>
        )
    }
}
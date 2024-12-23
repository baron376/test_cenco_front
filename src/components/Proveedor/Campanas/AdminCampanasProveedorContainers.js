import React, { Component } from 'react'
import AdminCampanas from './AdminCampanas.js';
import CampanasServices from '../../../services/CampanasServices';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {customFormatterToView} from '../../../util/formats';
import $ from "jquery";
import { faPencilAlt , faEye , faTrashAlt, faFileExcel , faFilePdf, faArrowUp} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from 'sweetalert';
import {hasPermission} from '../../../util/auth';
export default class AdminCampanasProveedorContainers extends Component {
    state = {
        dataPendiente:[],
        dataDeteted:[],
        dataActive:[],
        dataAprobada:[],
	dataRechazada:[],        
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
          dataUp: []
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
                dataField: 'proveedor',
                text: 'Proveedor',
                // formatter:this.proveedorFormater,
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
                dataField: 'campana_etapa',
                text: 'Etapa',
                // formatter:this.EtapaFormater,
                headerStyle: {
                    width: '13%'
                  },
                  sort: true,
            },
            {
                dataField: 'campana_estado',
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
        await this.trasfData();
        await this.getDataAllPendientes();
        await this.getDataAllup();
        await this.getDataDetele();
        await this.getDataAllActive();
        await this.getDataAprobada();
	    await this.getDataRechazada();    
    }

    getDataAllActive = async function(){
        this.setState({loadingFaldones:true , error: null})
         await CampanasServices.getCampanasAll().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                    this.setState({loadingFaldones:false, dataActive: data.data});
                }else{
                    this.setState({ loadingFaldones:false , error : data.error})
                }
        })
    }
    getDataAllPendientes = async function(){
        this.setState({loadingFaldones:true , error: null})
         await CampanasServices.getCampanasPendiente().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loadingFaldones:false, dataPendiente: data.data});
            }else{
                this.setState({ loadingFaldones:false , error : data.error})
            }
        })
    }

    getDataAllup = async function(){
        this.setState({loadingFaldones:true , error: null})
         await CampanasServices.getCampanasUp().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loadingFaldones:false, dataUp: data.data});
            }else{
                this.setState({ loadingFaldones:false , error : data.error})
            }
        })
    }
    getDataDetele = async function(){
        this.setState({loadingFaldones:true , error: null})
         await CampanasServices.getCampanaDelete().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                    this.setState({loadingFaldones:false, dataDeteted: data.data});
                }else{
                    this.setState({ loadingFaldones:false , error : data.error})
                }
        })
    }
    getDataAprobada = async function(){
        this.setState({loadingFaldones:true , error: null})
         await CampanasServices.getCampanasAprobadas().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                    this.setState({loadingFaldones:false, dataAprobada: data.data});
                }else{
                    this.setState({ loadingFaldones:false , error : data.error})
                }
        })
    }
  getDataRechazada = async function(){
        this.setState({loadingFaldones:true , error: null})
         await CampanasServices.getCampanasRechazadas().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                    this.setState({loadingFaldones:false, dataRechazada: data.data});
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
    actionsFormater(cell , row){
        
        if(row.id_etapa ===1 && row.id_estado_campana === 1){
            return(            
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">                    
                        {hasPermission([505,515,306]) &&
                            <Link to={`/VerPropuesta-${row.id}`}> <button   title="Ver Campaña" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faEye}/> Ver Campaña</button></Link>
                        }
                        {hasPermission([505]) &&
                            <Link to={`/CampanasSubir-${row.id}`}> <button   title="Subir Campaña" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon  icon={faArrowUp}/> Subir Campaña</button></Link>
                        }
                        {hasPermission([519,306]) &&
                        <button  title="Descargar pdf" className="dropdown-item" data-toggle="modal" data-target="#modal-lg"  onClick={() => {this.downloadPdf(row.id)}}><FontAwesomeIcon icon={faFilePdf}/> Descargar pdf</button>
                        }
                    </div>
                </div>
            )        
        }

        if(row.id_etapa ===4 && row.id_estado_campana === 1){
            return(   
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">                    
                        {hasPermission([505,515,306]) &&
                            <Link to={`/VerPropuesta-${row.id}`}> <button   title="Ver Campaña" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faEye}/> Ver Campaña</button></Link>
                        }
                        {hasPermission([505]) &&
                            <Link to={`/CampanasSubir-${row.id}`}> <button   title="Subir Campaña rechazada" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon  icon={faArrowUp}/> Subir Campaña rechazada</button></Link>
                        }
                        {hasPermission([519,306]) &&
                            <button  title="Descargar pdf" className="dropdown-item" data-toggle="modal" data-target="#modal-lg"  onClick={() => {this.downloadPdf(row.id)}}><FontAwesomeIcon icon={faFilePdf}/> Descargar PDF</button>
                        }
                    </div>
                </div> 
            )        
        }

        if(row.id_etapa === 3 || row.id_etapa === 2){
            return(  
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">                    
                        {hasPermission([505,515,306]) &&
                            <Link to={`/VerPropuesta-${row.id}`}> <button   title="Ver Campaña" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faEye}/> Ver Campaña</button></Link>
                        }
                        {hasPermission([519,306]) &&
                        <button  title="Descargar pdf" className="dropdown-item" data-toggle="modal" data-target="#modal-lg"  onClick={() => {this.downloadPdf(row.id)}}><FontAwesomeIcon icon={faFilePdf}/> Descargar PDF</button>
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
                        CampanasServices.deleteCampana(campana).then((data) => {;
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
            await this.salasFormater();
        this.setState({loadingModalShow:false});
    }

    getDetailsCampana = async function(CadenaId){
        this.setState({loading:false , error: null})
        await CampanasServices.getDetailsCampana(CadenaId).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, campanaDetailsData: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }
    setVarShowCadena = async () =>{
        //console.log('holaaa', this.salasFormater())
        this.setState(
            {
               modalTitle:`Subir Campaña ${this.state.campanaDetailsData.nombre}`,
               cadena: this.state.campanaDetailsData.cadena.nombre,
               vigencia: customFormatterToView(this.state.campanaDetailsData.desde)+ ' - ' +customFormatterToView(this.state.campanaDetailsData.hasta),
               proveedor: this.state.campanaDetailsData.proveedor.nombre,
               seccion: this.state.campanaDetailsData.sesion.cdg_int+ '-' +this.state.campanaDetailsData.sesion.nombre,
               editCadenaEstate:false,
               name:this.state.campanaDetailsData.nombre,
               descripcion: this.state.campanaDetailsData.descripcion,
            })
        this.setState({modalIsopen:true})
    }

    salasFormater (){
        let cell = this.state.campanaDetailsData.salas
        console.log("holaaa2222")
        let namesCad = cell.map(cad => cad.nombre_sap)
        console.log(namesCad)
        //return namesCad.toString();
        this.setState(
        {
            salas: namesCad,              
            
        })
    }

    editCampana = async (campana) =>{
        console.log(' editar campana' , campana)
    }

    downloadPdf= async (idCampanaPro) =>{

        let campanaPdf = idCampanaPro;
        this.setState({loadingDescarga:true , error: null})
        try{
            CampanasServices.downloadDetailsCampana(campanaPdf).then((data) => {
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


    handleCloseModal = e =>{
        this.setState({modalIsopen:false})
    }

    ModalPop = e =>{
        //this.setState({modalIsopen:false})
        console.log('holllaaa')
    }

    render() {
        return (
            <AdminCampanas
                state = {this.state}
                isOpen={this.state.modalIsopen} 
                onCloseModal={this.handleCloseModal}
                modalIsopen={this.state.modalIsopen}
                onOpenModal={this.handleOpenModal}
                modalTitle={this.state.modalTitle}
                ModalPop={this.ModalPop}
		downloadPdf={this.downloadPdf}
           >
            </AdminCampanas>
        )
    }
}

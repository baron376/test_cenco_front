import React, { Component } from 'react'
import AdminCampanas from './AdminCampanas.js';
import CampanasServices from '../../../services/CampanasProveedoresServices';
import AdminServices from '../../../services/AdminServices';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {customFormatterToView} from '../../../util/formats';
import { faPencilAlt , faEye , faTrashAlt, faFileExcel , faFilePdf, faArrowUp, faThumbsUp, faCog,faArrowDown} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from 'sweetalert';
import {hasPermission} from '../../../util/auth';
import env from "react-dotenv";


export default class AdminCampanasContainers extends Component {
    state = {
        dataPendiente:[],
        dataActive:[],
        dataAprobada:[],
        dataRechazada:[],
        dataDeteted:[],
        listaCadenasCreate:[],
        listaCadenasSeleccionadas:[],
        listaSalas:[],
        listSalasSeleted:[],
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
          dataUp:[],
          loadingDescarga:false
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
            // {
            //     dataField: 'vigencia',
            //     text: 'Vigencia',
            //     formatter:this.vigenciaFormater,
            //     headerStyle: {
            //         width: '13%'
            //       },
            //       sort: true,
            // },
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
        console.log('cargando el componente q es ');
        await this.trasfData();
        await this.getDataAllPendientes();
        await this.getDataAllActive();
        await this.getDataAllup();
        await this.getDataDetele();
        await this.getDataAprobada();
        await this.getDataRechazada();
        //await this.getCadenas();
       // await this.getSalas();
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
    getCadenas = async function(){
        this.setState({loading:true , error: null})
         await AdminServices.getCadenasUsuario().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({
                    loading:false,
                    listaCadenasCreate: data.data,
                });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
    }
    onSelectCadenas = (selectedList, _selectedItem) =>{
        console.log(selectedList)
        this.setState({
            listaCadenasSeleccionadas : selectedList
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  cadena: 'Debe seleccionar al menos una Cadena'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  plantillas: ''
                }
              });
        }   
    }
    onRemovCadenas = (selectedList, _removedItem) => {
        this.setState({
            listaCadenasSeleccionadas : selectedList
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  plantillas: 'Debe seleccionar al menos una plantillas'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  plantillas: ''
                }
              });
        }
    }

    getSalas = async function(zonas){
        this.setState({loading:true , error: null })
        let data = [];
        data [0] = {id:0 , nombre_sap:'Todas', display_nombre_sap:'Todas'}
        if(zonas.length !== 0){
            zonas.forEach(zona => {
                data = data.concat(zona.salas)
                if(this.state.listaCadenasSeleccionadas.length != 0){
                    let cadena  =  this.state.listaCadenasSeleccionadas;
                    data = data.filter(value => value.id_cadena == cadena.id || value.id == 0);
                }
            });
            this.setState({
                listaSalas: data,
                loading:false,
            })
        }else{
            data = [];
        }
        this.setState({
            loading:false,
            listaSalas: data,
        }) 
    }

    onSelectSalas = (selectedList, _selectedItem) =>{
        if(Number(_selectedItem.id) === 0){
            let arraySalasTodas = this.state.listaSalas;
            arraySalasTodas.shift();
            this.setState({
                listSalasSeleted : arraySalasTodas
            })
        }else{
            this.setState({
                listSalasSeleted : selectedList
            })
        }
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  zona: 'Debe seleccionar al menos una Zona'
                }
            });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  zona: ''
                }
            });
        }   
    }
    onRemovSalas = (selectedList, _removedItem) => {
        this.setState({
            listSalasSeleted : selectedList
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  sala: 'Debe seleccionar al menos una Sala'
                }
            });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  sala: ''
                }
            });
        }
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

    downloadMateriales = (row) => {
        console.log(row);
        const downloadLink = document.createElement('a');
        downloadLink.href = env.REACT_APP_BASE_URL_FRONT + '/' + row.url_orden_compra;
        const fileName = this.getFileNameFromUrl(row.url_orden_compra); // Extract file name with extension
        downloadLink.setAttribute('download', fileName); // Set the 'download' attribute with the file name
        downloadLink.click();
    }
    
    getFileNameFromUrl = (url) => {
        const parts = url.split('/');
        return parts[parts.length - 1]; // Get the last part of the URL, which should be the file name
    }

    downloadUrl = async function(material) {
        window.open(env.REACT_APP_BASE_URL+'/'+material.url, '_blank');
    }

    actionsFormater(cell , row){
        if(row.deleted_at !== null){
            return(            
                <div>
                    {hasPermission([306]) &&
                        <Link to={`/VerCampanaNew-${row.id}`}> <button   title="Ver" className="btn btn-info" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faEye}/></button></Link>
                    }
                </div>
            )        
        }
        else if((row.id_etapa ===1 ||  row.id_etapa === 2 )  ){
            return(  
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">
                        {hasPermission([306]) &&
                            <Link to={`/VerCampanaNew-${row.id}`}> <button   title="Ver" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faEye}/> Ver</button></Link>
                        }
                        {hasPermission([301]) &&
                            <Link to={`/EditarCampanaProveedoresNew-${row.id}`}> <button   title="Editar" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon  icon={faPencilAlt}/> Editar</button></Link>
                        }
                        {hasPermission([302]) &&
                            <Link to={`/CampanasProveedoresNewGestion-${row.id}`}> <button   title="Gestionar" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faCog}/> Gestionar</button></Link>
                        }                 
                        {row.id_etapa === 3 && hasPermission([306]) &&
                        <button  title="Descargar pdf" className="dropdown-item" data-toggle="modal" data-target="#modal-lg"  onClick={() => {this.downloadPdf(row)}}><FontAwesomeIcon icon={faFilePdf}/> Descargar pdf</button>
                        }
                        {hasPermission([306]) &&
                            <button  title="Descargar materiales" className="dropdown-item" data-toggle="modal" data-target="#modal-lg"   onClick={() => {this.downloadMateriales(row)}} download><FontAwesomeIcon icon={faArrowDown}/> Descargar materiales</button>
                        }
                        {hasPermission([505]) &&
                            <Link to={`/CampanasNewSubir-${row.id}`}> <button   title="Subir Campaña" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon  icon={faArrowUp}/> Subir Campaña</button></Link>
                        }
                        {hasPermission([305]) &&
                        <button  title="Eliminar" className="dropdown-item btn-delete" onClick={() => {this.deleteCampana(row.id)}}> <FontAwesomeIcon icon={faTrashAlt} /> Eliminar </button>
                        }
                    </div>
                </div>          
            )        
        }
        else if(row.id_etapa === 3 || row.id_etapa === 4){
            return(  
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">  
                        {hasPermission([306]) &&
                            <Link to={`/VerCampanaNew-${row.id}`}> <button   title="Ver" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faEye}/> Ver</button></Link>
                        }                  
                        {row.id_etapa === 3 && hasPermission([306,505]) &&
                        <button  title="Descargar pdf" className="dropdown-item" data-toggle="modal" data-target="#modal-lg"  onClick={() => {this.downloadPdf(row)}}><FontAwesomeIcon icon={faFilePdf}/> Descargar pdf</button>
                        }
                        {hasPermission([305]) &&
                        <button  title="Eliminar"   className="dropdown-item btn-delete" onClick={() => {this.deleteCampana(row.id)}}> <FontAwesomeIcon icon={faTrashAlt} /> Eliminar </button>
                        }
                    </div>
                </div>            
            )        
        }
        
        else if(row.id_estado_campana ==! 1 ){
            return(   
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">   
                        {hasPermission([306]) &&
                            <Link to={`/VerCampanaNew-${row.id}`}> <button   title="Ver" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faEye}/> Ver</button></Link>
                        }                 
                        {row.id_etapa === 3 && hasPermission([306,505]) &&
                        <button  title="Descargar pdf" className="dropdown-item" data-toggle="modal" data-target="#modal-lg"  onClick={() => {this.downloadPdf(row)}}><FontAwesomeIcon icon={faFilePdf}/> Descargar PDF</button>
                        }
                    </div>
                </div>            
            )        
        }
    }
    downloadPdf= async (idCampanaPro) =>{ 
        let campanaPdf = idCampanaPro.id;
        this.setState({loadingDescarga:true , error: null})
        swal({
            title: "Procesando",
            text: "Por favor, espera...",
            icon: "info",
            buttons: false,
            closeOnClickOutside: false,
            closeOnEsc: false
        });
        try {
            //await this.downloadMateriales(idCampanaPro);
            CampanasServices.downloadDetailsCampana(campanaPdf).then((data) => {
                swal.close(); // Cerrar el swal de carga
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
            });
        } catch(error){
            this.setState({loadingDescarga:false , error: error});
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
        this.setState({loadingModalShow:false});
    }

    getDetailsCampana = async function(CadenaId){
        this.setState({loading:false , error: null})
        await CampanasServices.getDetailsCampanaNew(CadenaId).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, campanaDetailsData: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }
    setVarShowCadena = async () =>{
        console.log(this.state.campanaDetailsData)
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
            <AdminCampanas
            state = {this.state}
            isOpen={this.state.modalIsopen} 
            onCloseModal={this.handleCloseModal}
            modalIsopen={this.state.modalIsopen}
            onOpenModal={this.handleOpenModal}
            modalTitle={this.state.modalTitle}
            downloadPdf={this.downloadPdf}
            onSelectCadenas={this.onSelectCadenas}
            onRemovCadenas={this.onRemovCadenas}
           >
            </AdminCampanas>
        )
    }
}

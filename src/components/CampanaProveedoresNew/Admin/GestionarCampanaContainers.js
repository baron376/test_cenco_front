import React, { Component } from 'react'
import GestionarCampana from './GestionarCampana.js';
import CampanasServices from '../../../services/CampanasProveedoresServices';
import {customFormatterToView} from '../../../util/formats';
import { faPencilAlt , faEye , faTrashAlt, faFileExcel , faFilePdf, faArrowUp} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from 'sweetalert';
import env from "react-dotenv";


export default class GestionarCampanaContainers extends Component {
    state = {
        dataPendiente:[],
        dataDeteted:[],
        headData:[{
            dataField: '',
            text: ''
        }],
        errorsForm: {
            comentario_gestion: '',
        },
        loadingFaldones:false,
        error:null,
        loading:false,
        modalIsopen: false,
        openModal: false,
        modalCreateTitle: '',
        campanaDetailsData:[],
        espaciosDatas:[],
        espaciosSeleccionada:[],
        name_materia : '',
        medida_materia:'',
        carrucelImage64 :[],
        campanaMAterialesData:[],
        comentario_gestion: '',
        campanaComentariosData:[],
        filenameMaterial:'',
    }
    
    async componentDidMount(){
        this.setState({loading:true , error: null})
        await this.getEspacios();
        await this.upCampana();
        /*await this.trasfData();
        await this.getDataAllPendientes();
        await this.getDataDetele();*/
        
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

    upCampana = async () =>{
        let idCampanaFaldontoEdit = this.props.match.params.id;
        this.setState({loading:true});
            await this.getDetailsCampana(idCampanaFaldontoEdit);
            await this.setVarShowCadena();
            await this.salasFormater();
            await this.fechasFormater();
            await this.ZonasFormater();
            await this.FormatosFormater();
            await this.ElementosFormater();
            //await this.materiales_on(idCampanaFaldontoEdit);
            console.log(idCampanaFaldontoEdit)
            await this.comentarios_on(idCampanaFaldontoEdit);
            await this.Materiales_change();
        this.setState({loading:false});
    }

    getDetailsCampana = async function(CadenaId){
        this.setState({loading:false , error: null})
        await CampanasServices.getDetailsCampanaNew(CadenaId).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({campanaDetailsData: data.data});
            }else{
                this.setState({error : data.error})
            }
        })
    }
    setVarShowCadena = async () =>{
        //console.log('holaaa', this.salasFormater())
        this.setState(
            {
               modalTitle:`Subir Campaña ${this.state.campanaDetailsData.nombre}`,
               cadena: this.state.campanaDetailsData.cadena.nombre,
               desde:customFormatterToView(this.state.campanaDetailsData.desde),
               hasta:customFormatterToView(this.state.campanaDetailsData.hasta),
               proveedor: this.state.campanaDetailsData.proveedor.nombre,
               seccion: this.state.campanaDetailsData.sesion.cdg_int+ '-' +this.state.campanaDetailsData.sesion.nombre,
               sub_sesion: this.state.campanaDetailsData.sub_sesion?.nombre  || '-',
               editCadenaEstate:false,
               name:this.state.campanaDetailsData.nombre,
               descripcion: this.state.campanaDetailsData.descripcion,
               id_campana: this.state.campanaDetailsData.id,
               tp_campana: this.state.campanaDetailsData.tp_campana.name,
               visibilidad: this.state.campanaDetailsData.visibilidad.name,
               //elementos: this.state.campanaDetailsData.elementos,
               espacio: this.state.campanaDetailsData.espacio.nombre,
               //espacio_exhibicion: this.state.campanaDetailsData.espacio_exhibicion.nombre,
               filenameAreaComercial: this.state.campanaDetailsData.url_area_comercial,
               filenameOrdenCompra: this.state.campanaDetailsData.url_orden_compra,
               filenameBasesLegales: this.state.campanaDetailsData.url_bases_legales,
               filenameMaterial: this.state.campanaDetailsData.material && this.state.campanaDetailsData.material.url ? this.state.campanaDetailsData.material.url : null,
            })
        //this.setState({modalIsopen:true})
    }

    fechasFormater = async function(){
        let cell = this.state.campanaDetailsData.vigencias
        let fechas = []
        cell.forEach((fecha, index) => {               
            fechas[index] = [{ id: index, dateFrom: fecha.desde, dateTo: fecha.hasta }]
        });
        this.setState({fechas: fechas,})
    }

    salasFormater (){
        let cell = this.state.campanaDetailsData.salas_disponibles
        let namesCad = cell.map(cad => cad.cdg_local + ' - ' + cad.nombre_sap)
        //console.log(namesCad)
        //return namesCad.toString();
        this.setState(
        {
            salas: namesCad,              
            
        })
    }

    ZonasFormater (){
        let cell = this.state.campanaDetailsData.zonas
        let namesZonas = cell.map(cad => cad.nombre)
        //return namesCad.toString();
        this.setState(
        {
            zonas: namesZonas,              
            
        })
    }

    FormatosFormater (){
        let cell = this.state.campanaDetailsData.formato
        let namesCad = cell.map(cad => cad.nombre)
        console.log(namesCad)
        //return namesCad.toString();
        this.setState(
        {
            formato: namesCad,              
            
        })
    }

    ElementosFormater() {
        let cell = this.state.campanaDetailsData.elementos;
   
        this.setState({
            elementos: cell,
        });
    }

    // materiales_on = async function (idCampanaFaldontoEdit){
    //     this.setState({error: null})
    //     await CampanasServices.getMateriales(idCampanaFaldontoEdit).then((data) => {
    //         if(!data.hasOwnProperty('errorInfo')){
    //             this.setState({campanaMAterialesData: data.data});
    //         }else{
    //             this.setState({ error : data.error})
    //         }
    //     })
    // }

    comentarios_on = async function (idCampanaFaldontoEdit){
        console.log(idCampanaFaldontoEdit)
        this.setState({error: null})
        await CampanasServices.getComentarios(idCampanaFaldontoEdit).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({campanaComentariosData: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }

    Materiales_change = async function (){
        let objcIntImage = {};
        let materiales_on = this.state.campanaMAterialesData;
        let arrayLocalImage = this.state.carrucelImage64;
        materiales_on.map((materialData) => {
            console.log('Esto es el nombre de la imagen',materialData.name);
            objcIntImage = {
                name:materialData.name,
                medida:materialData.medida,
                cdc64 :materialData.doc_64,
                url:materialData.url,
            }
            arrayLocalImage.push(objcIntImage);
        });
        console.log('Array de  imagen',arrayLocalImage);
        this.setState({carrucelImage64:arrayLocalImage , modalIsopen:false }); 
    }
    InactivestaImage = (i) => {
        console.log('esto es iiii', i);
        let arrayLocalImage = this.state.carrucelImage64;
        arrayLocalImage.splice(i,1);
        this.setState({carrucelImage64:arrayLocalImage , modalIsopen:false }); 
    }

    getEspacios = async function(){
        this.setState({loading:false , error: null})
        await CampanasServices.getEspacios().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, espaciosDatas: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }

    onSelectEspacios = (selectedItem) =>{
        this.setState({
            espaciosSeleccionada : selectedItem
        });
    }
    onRemoveEspacios = (selectedList, removedItem) => {
        console.log('pruebas selector cuando remueve' , selectedList, removedItem)
        this.setState({
            espaciosSeleccionada : []
        });
    }

    handleCloseModal = e =>{
        this.setState({modalIsopen:false})
    }

    handleChangeI = e =>{
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    handleOpenModal = e =>{
        this.setState({modalIsopen:true})
    }

    handleSubmitBsMateriales = async e =>{
        console.log('holaaaaaaaaaaaaaaaguarde rrr');
        
    }

    createMaterial = async function(){       
        
        this.setState({modalIsopen:true , modalTitle:'Crear sasdasdas'});
        
        
    }

    AprobeCampana = async (campana) => {
        let statusCamapna = ({
            id: this.state.id_campana,
            comentario_gestion : this.state.comentario_gestion,
        });
    
        swal({
            title: "¿Está seguro que desea Aprobar la campaña?",
            text: "¡La Campaña entrará en vigencia en su rango de fecha!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                swal({
                    title: "Procesando",
                    text: "Por favor, espera...",
                    icon: "info",
                    buttons: false,
                    closeOnClickOutside: false,
                    closeOnEsc: false
                });
    
                try {
                    CampanasServices.AprobeCampana(statusCamapna, campana).then((data) => {
                        swal.close(); // Cerrar el swal de carga
                        if (!data.hasOwnProperty('errorInfo')) {
                            swal({
                                title: `¡Campaña Aprobada con éxito!`,
                                icon: "success",
                                button: "Ok!",
                            });
                            this.props.history.push("/CampanasProveedoresNew");
                        } else {
                            swal({
                                title: `Error ${data.errorInfo.toString()}`,
                                icon: "error",
                                button: "Ok!",
                            });
                        }
                    });
                    this.setState({loading:false , error: null});
                } catch(error) {
                    this.setState({loading:false , error: error});
                }
            }
        });
    }
    
    
    RechazarCampana= async (campana) =>{
        await this.validateFormRechazo();
        if(this.validateForm(this.state.errorsForm)) {
        
            let statusCamapna = ({
                id: this.state.id_campana,
                comentario_gestion : this.state.comentario_gestion,
            });
        
            swal({
                title: "Esta seguro que desea Rechazar la campaña?",
                text: "Le permitirá al proveedor corregir sus observaciones!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
            .then((willDelete) => {
                if (willDelete) {
                    swal({
                        title: "Procesando",
                        text: "Por favor, espera...",
                        icon: "info",
                        buttons: false,
                        closeOnClickOutside: false,
                        closeOnEsc: false
                    });

                    try{
                        
                        CampanasServices.RechazarCampana(statusCamapna, campana).then((data) => {
                            swal.close();
                            if(!data.hasOwnProperty('errorInfo')){
                                swal({
                                    title: `Campaña Rechazada con éxito`,
                                    text: "!",
                                    icon: "success",
                                    button: "Ok!",
                                });
                                this.props.history.push("/CampanasProveedoresNew")
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
    }
    async validateFormRechazo(){
        let errors = this.state.errorsForm;
        errors.comentario_gestion ='';       
        if(this.state.comentario_gestion===''){
            errors.comentario_gestion ='El Comentario para rechazar es obligatorio!';
        }
        this.setState({errorsForm:errors});
    }

    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
          (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    /*FUNCIONES ARCHIVOS */
    handleSubmitFile = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }
    handleChangeStatus = ({ meta }, status) => {
        console.log(status, meta)
    }
    getUploadParams = ({ file, meta }) => {
        this.getBase64(file);
        this.setState({fileArc: file});
        this.setState({fileName: file.name});
        this.setState({fileType: file.type});
        this.setState({fileSize: file.size});
        this.setState({errorsForm: {...this.state.errorsForm,file: ''}});
        return { url: 'https://httpbin.org/post' }
    }
    getBase64= async function(file) {
        let me = this;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        let a = reader.onload = async function () {
            me.setState({fileBase: reader.result });
            me.setState({fileHead: reader.result.split(',').pop()});
           // console.log("acaacacacaca", reader.result.split(',').pop())
            return  reader.result;
        };
        this.setState({fileBase: a });
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
    }

    /*FIN FUNCIONES ARCHIVOS */

    handleSubmitBs = async e =>{
      console.log('submit externo');
    }

    /*modal submit */
 
    clearVarModal = async function(){
        this.setState({name_materia: '' , medida_materia:'' , fileHead: null});
    }
    downloadUrl = async function(material) {
        const BaseUrl = env.REACT_APP_BASE_URL;
        window.open(`${BaseUrl}/`+ material, '_blank');
    }
    handleSubmitBsModal = async e =>{
        e.preventDefault();
        let arrayLocalImage = this.state.carrucelImage64;
        let objcIntImage = {
            name:this.state.name_materia,
            medida:this.state.medida_materia,
            type:this.state.fileType,
            cdc64 :this.state.fileHead 
        }
        arrayLocalImage.push(objcIntImage);
        this.setState({carrucelImage64:arrayLocalImage , modalIsopen:false }); 
        console.log('tipo' ,this.state.fileType)
        console.log('array de imagenes' , arrayLocalImage);
        await this.clearVarModal();       
    }
    /*fin modal submit*/

    render() {
        return (
            <GestionarCampana
                state = {this.state}
                isOpen= {true}
                onCloseModal={this.handleCloseModal}
                modalIsopen={this.state.modalIsopen}
                onOpenModal={this.handleOpenModal}
                createMaterial={this.createMaterial}
                handleSubmitBsMateriales={this.handleSubmitBsMateriales}
                ModalPop={this.ModalPop}
                fechas =  {this.fechas}
                handleSubmitBs = {this.handleSubmitBs}
                onSelectEspacios =  {this.onSelectEspacios}
                onRemoveEspacios = {this.onRemoveEspacios}
                getUploadParams = {this.getUploadParams}
                handleChangeStatus = {this.handleChangeStatus}
                handleSubmitFile = {this.handleSubmitFile}
                modalTitle  = {this.state.modalTitle}
                handleChangeI = {this.handleChangeI}
                handleSubmitBsModal = {this.handleSubmitBsModal}
                InactivestaImage = {this.InactivestaImage}
                AprobeCampana = {this.AprobeCampana}
                RechazarCampana = {this.RechazarCampana}
                downloadUrl={this.downloadUrl}
            >
            </GestionarCampana>
        )
    }
}

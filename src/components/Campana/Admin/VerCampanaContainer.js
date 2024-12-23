import React, { Component } from 'react'
import VerCampana from './VerCampana.js';
import CampanasServices from '../../../services/CampanasServices';
import {customFormatterToView} from '../../../util/formats';
import { faPencilAlt , faEye , faTrashAlt, faFileExcel , faFilePdf, faArrowUp} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from 'sweetalert';
import $ from "jquery";
import env from "react-dotenv";

export default class VerCampanaContainer extends Component {
    state = {
        dataPendiente:[],
        dataDeteted:[],
        headData:[{
            dataField: '',
            text: ''
        }],
        comentario:'',
        loadingFaldones:false,
        error:null,
        loading:false,
        modalIsopen: false,
        modalCreateTitle: '',
        campanaDetailsData:[],
        espaciosDatas:[],
        espaciosSeleccionada:[],
        listaZonasExhibicion:[],
        listZonasExhibicionSeleted:[],
        name_materia : '',
        medida_materia:'',
        carrucelImage64 :[],
        campanaComentariosData:[],
        errorsMaterial: {
            name_materia: '',
            medida_materia:'', 
            fileHead:'',
            file :'La imagen del material es obligatoria!'

        },
        errorsExterno: {
            materiales: '',
            comentario:''

        },
    }
    
    async componentDidMount(){
        this.setState({loading:true , error: null})
        await this.getEspacios();
        await this.upCampana();
        await this.clearForExterno();
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
            await this.ZonasFormater();
            await this.materiales_on(idCampanaFaldontoEdit);
            await this.comentarios_on(idCampanaFaldontoEdit);
            await this.Materiales_change();
        this.setState({loading:false});
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
               vigencia: customFormatterToView(this.state.campanaDetailsData.desde)+ ' al ' +customFormatterToView(this.state.campanaDetailsData.hasta),
               proveedor: this.state.campanaDetailsData.proveedor.nombre,
               seccion: this.state.campanaDetailsData.sesion.cdg_int+ '-' +this.state.campanaDetailsData.sesion.nombre,
               editCadenaEstate:false,
               name:this.state.campanaDetailsData.nombre,
               descripcion: this.state.campanaDetailsData.descripcion,
              // zona: this.state.campanaDetailsData.zona.nombre,
               listZonasExhibicionSeleted: this.state.campanaDetailsData.zona_exhibicion.nombre,
               espacio_exhibicion: this.state.campanaDetailsData.espacio_exhibicion.nombre,
               etapa: this.state.campanaDetailsData.campana_etapa.nombre,
               estado: this.state.campanaDetailsData.campana_estado.nombre,
               descripcion_estado: this.state.campanaDetailsData.campana_estado.descripcion,
               estado_descripcion_estado: this.state.campanaDetailsData.campana_estado.nombre+' - ('+this.state.campanaDetailsData.campana_estado.descripcion+')',
               id_campana: this.state.campanaDetailsData.id,
            })
        //this.setState({modalIsopen:true})
    }

    salasFormater (){
        let cell = this.state.campanaDetailsData.salas
        let namesCad = cell.map(cad => cad.nombre_sap)
        // console.log(namesCad)
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
    materiales_on = async function (idCampanaFaldontoEdit){
        this.setState({error: null})
        await CampanasServices.getMateriales(idCampanaFaldontoEdit).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({campanaMAterialesData: data.data});
            }else{
                this.setState({ error : data.error})
            }
        })
    }

    Materiales_change = async function (){
        let objcIntImage = {};
        let materiales_on = this.state.campanaMAterialesData;
        let arrayLocalImage = this.state.carrucelImage64;
        materiales_on.map((materialData) => {
            // console.log('Esto es la data de la imagen',materialData);
            objcIntImage = {
                name:materialData.name,
                medida:materialData.medida,
                cdc64 :materialData.doc_64,
                name_archivo:materialData.name_archivo,
                url:materialData.url,

            }
            arrayLocalImage.push(objcIntImage);
        });
        // console.log('Array de  imagen',arrayLocalImage);
        this.setState({carrucelImage64:arrayLocalImage , modalIsopen:false }); 
    }

    InactivestaImage = (i) => {
        
        swal({
            title: "¿Esta seguro que desea Eliminar el Material?",
            text: "¡La Campaña se actualizara al Guardar los Cambios!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
        .then((willDelete) => {
            if (willDelete) {
                let arrayLocalImage = this.state.carrucelImage64;
                arrayLocalImage.splice(i,1);
                this.setState({carrucelImage64:arrayLocalImage , modalIsopen:false }); 
            }
        });
    }

    comentarios_on = async function (idCampanaFaldontoEdit){
        this.setState({error: null})
        await CampanasServices.getComentarios(idCampanaFaldontoEdit).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({campanaComentariosData: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }

    downloadUrl = async function(material) {
        const BaseUrl = env.REACT_APP_BASE_URL;
        // console.log("window open:",`${BaseUrl}/`+ material )
        window.open(`${BaseUrl}/`+ material, '_blank');
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

    createMaterial = (campana) =>{
        this.setState({modalIsopen:true});
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
        //let errors = this.state.errorsMaterial;
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
      e.preventDefault();
      console.log('submit externo');
      await this.validateFormExternal();
      if(this.validateForm(this.state.errorsExterno)) {

        swal({
            title: "Esta seguro que desea Crear la Cadena ?",
            text: "La sesión podrá ser usada en el sistema!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                this.SubirCampana();
            }
        });

      }
    }

    SubirCampana = async function(){   
        let idCampanaFaldontoEdit = this.props.match.params.id;     
        let subCampana = ({
            comentario:this.state.comentario,
            objMateriales:this.state.carrucelImage64,
        });
        this.setState({
            formAlldate : subCampana
        })
        try{
            CampanasServices.upCampana(subCampana, idCampanaFaldontoEdit).then((data) => {
                console.log('esto es le retornoooooooooooooooooooo' ,data)
                if(!data.hasOwnProperty('errorInfo')){
                    swal({
                        title: `¡Campana subida con Éxito!`,
                        //text: "!",
                        icon: "success",
                        button: "Ok!",
                    });
                }else{
                    swal({
                        title: `Error ${data.errorInfo.toString()} `,
                        text: "!",
                        icon: "error",
                        button: "Ok!",
                    });
                }
            })
            $('.modal-backdrop').remove();
            await this.clearVarModal();
            await this.clearForExterno();
            this.setState({loading:false , error: null})
            this.props.history.push("/CampanasProv")
        } catch(error){
            this.setState({loading:false , error: error})
        }
    }

    /*modal submit */
 
    clearVarModal = () =>{
        this.setState({name_materia: '' , medida_materia:'' , fileHead: null, modalIsopen:false});
    }

    clearForExterno = () =>{
        this.setState({comentario: '', modalIsopen:false});
        let errors = this.state.errorsMaterial;
        errors.name_materia= '';
        errors.medida_materia=''; 
        errors.fileHead='';
        this.setState({errorsMaterial:errors});
        let errors2 = this.state.errorsExterno;
        errors2.comentario= '';
        errors2.materiales='';       
        this.setState({errorsExterno:errors2});
    }
    
    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
          (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    
    handleSubmitBsModal = async e =>{
        e.preventDefault();
        await this.validateFormMAteriales();
        if(this.state.errorsMaterial.name_materia === '' && this.state.errorsMaterial.medida_materia === ''&& this.state.errorsMaterial.fileHead === '') {
            console.log('holaaaaaaaaaaaaaaaa')
            let arrayLocalImage = this.state.carrucelImage64;
            let objcIntImage = {
                name:this.state.name_materia,
                medida:this.state.medida_materia,
                type:this.state.fileType,
                name_archivo:this.state.fileName,
                cdc64 :this.state.fileHead 
            }
            arrayLocalImage.push(objcIntImage);
            this.setState({carrucelImage64:arrayLocalImage , modalIsopen:false }); 
            console.log('tipo' ,this.state.fileType)
            console.log('array de imagenes' , arrayLocalImage);
            swal({
                title: `Material Agregado con éxito`,
                text: "!",
                icon: "success",
                button: "Ok!",
            });
            await this.clearVarModal(); 
            $('.modal-backdrop').remove();      
        }
        
        
    }

    async validateFormMAteriales(){
        let errors = this.state.errorsMaterial;
        errors.name_materia= '';
        errors.medida_materia=''; 
        errors.fileHead='';
        if(this.state.name_materia===''){
            errors.name_materia ='El Nombre del Material es obligatorio!';
        }
        if(this.state.medida_materia===''){
            errors.medida_materia ='Las medidas del Material es obligatorio!';
        }

        if(this.state.file===''){
            errors.file ='La imagen del material es obligatorio!';
        }
        console.log(errors);
        this.setState({errorsMaterial:errors});
    }

    async validateFormExternal(){
        let errors = this.state.errorsExterno;
        errors.comentario= '';
        errors.materiales=''; 
        console.log(this.state.comentario)
        if(this.state.comentario===''){
            errors.comentario ='El comentario es obligatorio!';
        }
        if(this.state.carrucelImage64.length<1){
            errors.materiales ='Debe tener al menos un material POP!';
        }
        console.log(errors);
        this.setState({errorsExterno:errors});
    }
    /*fin modal submit*/

    render() {
        return (
            <VerCampana
                state = {this.state}
                //isOpen= {this.state.modalIsopen}
                onCloseModal={this.handleCloseModal}
                modalIsopen={this.state.modalIsopen}
                onOpenModal={this.handleOpenModal}
                createMaterial={this.createMaterial}
                handleSubmitBsMateriales={this.handleSubmitBsMateriales}
                ModalPop={this.ModalPop}
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
                clearVarModal = {this.clearVarModal}
                downloadUrl={this.downloadUrl}
            >
            </VerCampana>
        )
    }
}
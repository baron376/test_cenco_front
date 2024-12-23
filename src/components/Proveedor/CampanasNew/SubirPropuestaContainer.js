import React, { Component } from 'react'
import SubirPropuesta from './SubirPropuesta.js';
import CampanasServices from '../../../services/CampanasProveedoresServices';
import {customFormatterToView} from '../../../util/formats';
import { faPencilAlt , faEye , faTrashAlt, faFileExcel , faFilePdf, faArrowUp} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from 'sweetalert';
import $ from "jquery";
import env from "react-dotenv";

export default class SubirPropuestaContainer extends Component {
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
        name_materia : '',
        medida_materia:'',
        carrucelImage64 :[],
        campanaComentariosData:[],
        listaZonasExhibicion:[],
        listZonasExhibicionSeleted:[],
        listaMateriales:[],
        listMaterialesSeleted:[],
        fileNameMaterial:[],
        filenamematerial:'',
        fileextmaterial:'',
        filenameMaterial:'',
        errorsMaterial: {
            name_materia: '',
            medida_materia:'', 
            fileHead:'',
            file :''
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
    downloadUrl = async function(material) {
        const BaseUrl = env.REACT_APP_BASE_URL;
        window.open(`${BaseUrl}/`+ material, '_blank');
    }

    onSelectMaterial = (selectedItem) =>{
        this.setState({
            listMaterialesSeleted : selectedItem
        });
    }
    onRemoveMaterial = (selectedList, removedItem) => {
        console.log('pruebas selector cuando remueve' , selectedList, removedItem)
        this.setState({
            listMaterialesSeleted : []
        });
    }

    upCampana = async () =>{
        let idCampanaFaldontoEdit = this.props.match.params.id;
        this.setState({loading:true});
            await this.getDetailsCampana(idCampanaFaldontoEdit);
            await this.setVarShowCadena();
            await this.salasFormater();
            await this.ZonasFormater();
            await this.fechasFormater();
            await this.FormatosFormater();
            await this.ElementosFormater();
            //await this.materiales_on(idCampanaFaldontoEdit);
            await this.comentarios_on(idCampanaFaldontoEdit);
            //await this.Materiales_change();
           //await this.getMateriales();
        this.setState({loading:false});
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
        console.log('holaaa',  this.state.campanaDetailsData)
        this.setState(
            {
               modalTitle:`Subir Campaña ${this.state.campanaDetailsData.nombre}`,
               cadena: this.state.campanaDetailsData.cadena.nombre,
               vigencia: customFormatterToView(this.state.campanaDetailsData.desde)+ ' al ' +customFormatterToView(this.state.campanaDetailsData.hasta),
               desde:customFormatterToView(this.state.campanaDetailsData.desde),
               hasta:customFormatterToView(this.state.campanaDetailsData.hasta),
               proveedor: this.state.campanaDetailsData.proveedor.nombre,
               seccion: this.state.campanaDetailsData.sesion.cdg_int+ '-' +this.state.campanaDetailsData.sesion.nombre,
               sub_sesion: this.state.campanaDetailsData.sub_sesion?.nombre  || '-',
               editCadenaEstate:false,
               name:this.state.campanaDetailsData.nombre,
               descripcion: this.state.campanaDetailsData.descripcion,
               //zona: this.state.campanaDetailsData.zona.nombre,
               //listZonasExhibicionSeleted: this.state.campanaDetailsData.zona_exhibicion.nombre,
               //espacio_exhibicion: this.state.campanaDetailsData.espacio_exhibicion.nombre,
               espacio: this.state.campanaDetailsData.espacio.nombre,
               id_campana: [this.state.campanaDetailsData.id],
               tp_campana: this.state.campanaDetailsData.tp_campana.name,
               visibilidad: this.state.campanaDetailsData.visibilidad.name,
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
        console.log(namesCad)
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
        let cell = this.state.campanaDetailsData.elementos; // Asumiendo que los datos ya están formateados
   
        // Si ya están formateados, solo asigna al estado
        this.setState({
            elementos: cell,
        });
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
            console.log('Esto es el nombre de la imagen',materialData.name);
            objcIntImage = {
                name:materialData.name,
                medida:materialData.medida,
                cdc64 :materialData.doc_64,
                name_archivo:materialData.name_archivo,

            }
            arrayLocalImage.push(objcIntImage);
        });
        console.log('Array de  imagen',arrayLocalImage);
        this.setState({carrucelImage64:arrayLocalImage , modalIsopen:false }); 
    }

    getBase64Material= async function(file) {
        let me = this;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        let a = reader.onload = async function () {
            me.setState({fileNameMaterial: reader.result.split(',').pop()});
            return  reader.result;
        };
        this.setState({fileBase: a });
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
    }

    setFileMaterial = async (event) => {

        const files = event.target.files;

        if (files[0] && files[0].type == 'application/pdf') {
            let me = this;
            me.setState({filenamematerial: files[0].name});
            me.setState({fileextmaterial: files[0].type});
            me.setState({ filesize: files[0].size });
            this.getBase64Material(files[0]);
            return true;
        }

        swal({
            title: "Error",
            text: "Solo se puede cargar archivos tipo pdf.",
            icon: "warning",
            buttons: false,
            dangerMode: true,
        })
        return false;
    }

    removeFileMaterial = () => {
        // Reinicia el estado para eliminar el archivo cargado
        this.setState({
            filenamematerial: null,
            fileextmaterial: null,
            fileNameMaterial: null
        });
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

    getMateriales = async function(){
        let zona = this.state.campanaDetailsData.zona_exhibicion.id
        this.setState({loading:false , error: null})
        await CampanasServices.getzonasMaterialesByZona(zona).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, listaMateriales: data.data});
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
            title: "Esta seguro que desea Subir la Campaña ?",
            text: "Se le notificara al administrador para su aprobación!",
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

    SubirCampana = async function() {
        swal({
            title: "Procesando",
            text: "Por favor, espera...",
            icon: "info",
            buttons: false,
            closeOnClickOutside: false,
            closeOnEsc: false
        });
    
        let idCampanaFaldontoEdit = this.props.match.params.id;     
        let subCampana = ({
            comentario:this.state.comentario,
            fileNameMaterial:this.state.fileNameMaterial,
            filenamematerial : this.state.filenamematerial,
            fileextmaterial : this.state.fileextmaterial,
            filesize : this.state.filesize
        });
    
        this.setState({
            formAlldate : subCampana
        });
    
        try {
            const data = await CampanasServices.upCampana(subCampana, idCampanaFaldontoEdit);
            swal.close(); // Cerrar el swal de carga
    
            console.log('esto es le retornoooooooooooooooooooo', data);

            if (data.hasOwnProperty('errorInfo') || data?.response?.data?.errorInfo) {
                swal({
                    title: `Error: ${data.errorInfo || data.response.data.errorInfo}`,
                    text: "!",
                    icon: "error",
                    button: "Ok!",
                });

                this.setState({loading: false, error: true});
            } else {
                swal({
                    title: `¡Campaña subida con Éxito!`,
                    //text: "!",
                    icon: "success",
                    button: "Ok!",
                });

                $('.modal-backdrop').remove();
                await this.clearVarModal();
                await this.clearForExterno();
                this.setState({loading:false , error: null});
		    console.log('history:=>: ', this.props);
                this.props.history.push("/CampanasProvNew");
            }
        } catch(error) {
	    console.log('error:=>: ', error);
            this.setState({loading:false , error: error});
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
            let nombre_material = '';
            this.state.listMaterialesSeleted.forEach(element => {
                nombre_material += element.nombre + " "
            })

            let objcIntImage = {
                name:nombre_material,
                medida: '',
                type:this.state.fileType,
                name_archivo:this.state.fileName,
                cdc64 :this.state.fileHead 
            }
            arrayLocalImage.push(objcIntImage);
            this.setState({carrucelImage64:arrayLocalImage , modalIsopen:false, listMaterialesSeleted:[] }); 
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
        // if(this.state.carrucelImage64.length<1){
        //     errors.materiales ='Debe tener al menos un material POP!';
        // }
        console.log(errors);
        this.setState({errorsExterno:errors});
    }
    /*fin modal submit*/

    render() {
        return (
            <SubirPropuesta
                state = {this.state}
                //isOpen= {this.state.modalIsopen}
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
                clearVarModal = {this.clearVarModal}
                onSelectMaterial = {this.onSelectMaterial}
                onRemoveMaterial = {this.onRemoveMaterial}
                setFileMaterial={this.setFileMaterial}
                removeFileMaterial={this.removeFileMaterial}
                downloadUrl={this.downloadUrl}
            >
            </SubirPropuesta>
        )
    }
}

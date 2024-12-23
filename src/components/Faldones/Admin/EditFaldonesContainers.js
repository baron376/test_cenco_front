import React, { Component } from 'react';
import EditFaldones from '../Admin/EditFaldones';
import AdminServices from '../../../services/AdminServices';
import FaldonesServices from '../../../services/FaldonesServices';
import {customFormatterToSent , getFirtsEmentArray, customFormatterDate } from '../../../util/formats';
import swal from 'sweetalert';
import env from "react-dotenv";

export default class EditFaldonesContainers extends Component {

    state = {
        listaCadenasCreate:[],
        listaCadenasSeleccionadas:[],
        listaFormatCreate:[],
        listaFormatSeleted:[],
        listPlantillasCreated:[],
        listPlantillasSeleted:[],
        loading:false,
        id_tipo_campana_global : 1, 
        listaQrOptions:[
            {nombre:'Si' , value:'1', isChecked:false},
            {nombre:'No' , value:'2' ,  isChecked:false}
        ],
        selectedOptionQr:null,
        name:'',
        dateFrom:null,
        dateTo:null,
        errorsForm:{
            cadenas:'',
            name:'',
            datefrom:'',
            dateto:'',
            formato:'',
            plantilla:'',
            qr:'',
            file:'',
            sala:'',
        },
        fileArc:null,
        fileBase:null,
        fileHead:null,
        fileName:'',
        fileType:'',
        fileSize:'',
        objectTosend:{
            id_cadena:'',
            id_campana_tipo:'',
            nombre:'',
            desde:'',
            hasta:'',
            id_formato:'',
            id_plantilla:'',
            nombre_archivo:'',
            archivo_64:'',
            ext_archivo:'',
            qr:''
        },
        faldonDetailsData:'',
        fileEdit:null,
        dataFile:null,
        changeFile : true,
        urlFileToDownload:'',
        idCampanaFaldonToEdit:null     
    }
    constructor(){
        super();
        this.setState({loading:true})
        this.getDetailsFaldon.bind(this)
    }
    async componentDidMount(){
        await this.preSelectFile();
        await this.getCadenasForCreteFaldon();
        await this.getSalasForCreteFaldon();
        await this.getFormatosForCreteFaldon();
        await this.getPlantillasForCreteFaldon();
        
        await this.getDetailsFaldon();
       
        await this.preSelectObject();
        
    }
    getDetailsFaldon = async function(){
        this.setState({loading:true , error: null , idCampanaFaldonToEdit:this.props.match.params.id})
        let idCampanaFaldontoEdit = this.props.match.params.id;
        await FaldonesServices.getCampanaDetail(idCampanaFaldontoEdit).then((data) => {
            console.log('data del detalle' , data);
                if(!data.hasOwnProperty('errorInfo')){
                    this.setState({
                        loading:false,
                        faldonDetailsData: data.data,
                    });
                }else{
                    this.setState({ loading:false , error : data.error})
                }
            })
    }
    preSelectFile = async function(){
        const BaseUrl = env.REACT_APP_BASE_URL;
        this.setState({loading:true , error: null})
        let idCampanaFaldontoEdit = this.props.match.params.id;
        let transFile = '';
        await FaldonesServices.getCampanaDetailLatestFile(idCampanaFaldontoEdit).then((data) => {
            console.log('data del detalle ultimo archivo' , data);
                if(!data.hasOwnProperty('errorInfo')){
                    let dataFileLocal = data.data;
                    transFile = `data:${dataFileLocal.extension};base64,${dataFileLocal.file_64}`;
                    fetch(transFile).then(res => {
                        res.arrayBuffer().then(buf => {
                        const fileEdit = new File([buf],   dataFileLocal.nombre , { type: dataFileLocal.extension })
                        this.setState({ fileEdit : fileEdit , urlFileToDownload:`${BaseUrl}/${dataFileLocal.url}`})
                        })
                    })
                    console.log('documento pal seteooooooo' , transFile)
                    this.setState({
                        loading:false,
                        dataFile: data.data,
                    });
                }else{
                    this.setState({ loading:false , error : data.error})
                }
            })

   /* const imageDataUrl = 'data:image/jpeg;base64,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';
        await fetch(imageDataUrl).then(res => {
            res.arrayBuffer().then(buf => {
            const fileEdit = new File([buf], 'image_data_url.jpg', { type: 'image/jpeg' })
            this.setState({ fileEdit : fileEdit })
            })
        })*/
    }
    preSelectObject = async function(){
       this.setState({loading:true , error: null})
       let localCamapanaList = this.state.listaCadenasCreate;
       let localcampanaSeleted = null;
       let localCampanaSectToedit = this.state.faldonDetailsData.cadena_campana;
       let localname = this.state.faldonDetailsData.nombre;
       let localfrom = customFormatterDate(this.state.faldonDetailsData.desde);
       let localto = customFormatterDate(this.state.faldonDetailsData.hasta);
       let localFormat = this.state.faldonDetailsData.formato_campana;
       let localPlantilla = this.state.faldonDetailsData.plantilla_campana;
       let localSala = this.state.faldonDetailsData.sala_campana;
       
       if (!localSala){
           localSala = {id:null , nombre_sap:'Global'}
       }else{
            localSala = localSala;
       }

       let localQrList = this.state.listaQrOptions;
       let localQrSelected  =   this.state.faldonDetailsData.qr;
       localCamapanaList.forEach(element => {
           if(Number(element.id)===Number(localCampanaSectToedit.id)){
            localcampanaSeleted= element;
                element.isChecked = true;
           }
       });
       localQrList.forEach(element => {
            if(Number(element.value)===Number(localQrSelected)){
                element.isChecked = true;
            }
        });
       this.setState(
           {loading:false , 
            error: null , 
            listaCadenasCreate: localCamapanaList,
            listaCadenasSeleccionadas: localcampanaSeleted,
            name:localname,
            dateFrom:localfrom,
            dateTo:localto,
            listaFormatSeleted:[localFormat],
            listPlantillasSeleted:[localPlantilla],
            listSalasSeleted : [localSala],
            listaQrOptions:localQrList
        })

    }
    getCadenasForCreteFaldon = async function(){
        this.setState({loading:true , error: null})
         await AdminServices.getCadenasUsuario().then((data) => {    
            if(!data.hasOwnProperty('errorInfo')){
                data = data.data.map(element => ({
                    ...element,
                    isChecked: false
                }))
                this.setState({
                    loading:false,
                    listaCadenasCreate: data,
                });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
    }
    getFormatosForCreteFaldon = async function(){
        this.setState({loading:true , error: null})
         await FaldonesServices.getFormatos().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({
                    loading:false,
                    listaFormatCreate: data.data,
                });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
    }
    getPlantillasForCreteFaldon = async function(){
        this.setState({loading:true , error: null})
         await FaldonesServices.getPlantillas().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({
                    loading:false,
                    listPlantillasCreated: data.data,
                });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
    }
    getSalasForCreteFaldon = async function(){
        this.setState({loading:true , error: null})
         await AdminServices.getSalasUser().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                /*let salasT = data.data;
                salasT = salasT.unshift({id:0 , nombre_sap:'Todas'})*/
                this.setState({
                    loading:false,
                    listSalasCreated: data.data,
                });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
    }
    handleCheckChieldElement= e =>{
        this.setState({errorsForm: {...this.state.errorsForm,cadenas: ''}});
        let cadenasLocal =  this.state.listaCadenasCreate;
        let allCadenasLocal = this.state.listaCadenasCreate;
        allCadenasLocal.forEach(cadenaI => {
            if(Number(cadenaI.id) === Number(e.target.value)){
                cadenaI.isChecked = true;
            }
        });
        this.setState({listaCadenasCreate : allCadenasLocal });
        let resultado = cadenasLocal.find( cadena => Number(cadena.id) === Number(e.target.value));
        let salasT = resultado.salas_cadena;
        salasT.unshift({id:0 , nombre_sap:'Todas', display_nombre_sap:'Todas'})
        this.setState({listaCadenasSeleccionadas: resultado,
        listSalasCreated: salasT});
    }
    onlyLetter = e =>{
        if (!((e.keyCode >= '64' && e.keyCode <= '91')|| (e.keyCode >= '48' && e.keyCode <= '57') || (Number(e.keyCode) === Number('241'))  || (Number(e.keyCode) === Number('32')) || (Number(e.keyCode) === Number('8'))  || (Number(e.keyCode) === Number('192')))) {
            e.preventDefault()
         }
    }
    onlyLeterValidateForce(cadena) {
        for (let x = 0; x < cadena.length; x++) {
            let c = cadena.charAt(x);
            if (!((c >= 'a' && c <= 'z')|| (c >= '0' && c <= '9') || (c >= 'A' && c <= 'Z') || c === ' ' || c === 'ñ' || c === 'Ñ' || c === 'á' || c === 'é' || c === 'í' || c === 'ó' || c === 'ú' || c === 'Á' || c === 'É' || c === 'Í' || c === 'Ó' || c === 'Ú')) {
                return false;
            }
        }
        return true;
    }
    handleChangeI = e =>{
        this.setState({
            [e.target.name] : e.target.value
        });
        e.preventDefault();
        const { name, value } = e.target;
        let errors = this.state.errorsForm;

        switch (name) {
            case 'name': 
                errors.name ='';
                if(value.length<3){
                    errors.name ='El nombre del usuario nombre debe tener mas de 3 caracteres!';
                } 
                if(value===''){
                    errors.name =' El nombre del usuario es requerido';
                }
                if(!this.onlyLeterValidateForce(value)){
                    errors.name ='Caracteres inválidos!';
                }
            break;
         
            default:
              break;
          }
        this.setState({errors, [name]: value});
    }
    setDateFrom = (date) =>{
        this.setState({errorsForm: {...this.state.errorsForm,datefrom: ''}});
        let fechaFromLocal = date;
        let fechaToLocal = this.state.dateTo;
        if(fechaToLocal !==  null){
            if(fechaFromLocal>fechaToLocal){
                console.log('entra en la compracion')
                this.setState({errorsForm: {...this.state.errorsForm,datefrom: 'La fecha hasta debe ser mayor a la fecha desde verifique'}});
            }
        }
       this.setState({dateFrom:date})
    }
    setDateTo =  (date) =>{
        this.setState({errorsForm: {...this.state.errorsForm,dateto: ''}});
        let fechaFromLocal = this.state.dateFrom;
        let fechaToLocal =  date;
        if(fechaFromLocal !==  null){
            if(fechaFromLocal>fechaToLocal){
                console.log('entra en la compracion')
                this.setState({errorsForm: {...this.state.errorsForm,dateto: 'La fecha hasta debe ser mayor a la fecha desde verifique'}});
            }
        }
        this.setState({dateTo:date});
    }
    onSelectFormatos = (selectedList, _selectedItem) =>{
        this.setState({
            listaFormatSeleted : selectedList
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  formatos: 'Debe seleccionar al menos un formato'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  formatos: ''
                }
              });
        }   
    }
    onRemoveFormatos = (selectedList, _removedItem) => {
        this.setState({
            listaFormatSeleted : selectedList
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  formatos: 'Debe seleccionar al menos un formato'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  formatos: ''
                }
              });
        }
    }
    onSelectSalas = (selectedList, _selectedItem) =>{
        this.setState({
            listSalasSeleted : selectedList
        })

        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  salas: 'Debe seleccionar al menos una o todas las salas'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  salas: ''
                }
              });
        }
    }
    onRemoveSalas = (selectedList, _removedItem) => {
        this.setState({
            listSalasSeleted : selectedList
        })

        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  salas: 'Debe seleccionar al menos una o todas las salas'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  salas: ''
                }
              });
        } 
    }
    onSelectPlantillas = (selectedList, _selectedItem) =>{
        this.setState({
            listPlantillasSeleted : selectedList
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  plantillas: 'Debe seleccionar al menos un formato'
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
    onRemovePlantillas = (selectedList, _removedItem) => {
        this.setState({
            listPlantillasSeleted : selectedList
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
    onChangeValueQr  = (event) =>{
        this.setState({errorsForm: {...this.state.errorsForm,qr: ''}});
        let listOptionQrLocal = this.state.listaQrOptions;
        listOptionQrLocal.forEach(oqr => {
            if(Number(oqr.value) === Number(event.target.value)){
                oqr.isChecked = true;
            }
        });
        this.setState({listaQrOptions : listOptionQrLocal }); 
        this.setState({selectedOptionQr: event.target.value });
    }
    handleChangeStatus = ({ meta }, status) => {
        console.log(status, meta)
    }
    handleSubmitFile = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }
    getUploadParams = ({ file, meta }) => {
        this.getBase64(file);
        this.setState({fileArc: file});
        this.setState({fileName: file.name});
        this.setState({fileType: file.type});
        this.setState({fileSize: file.size});
        let changeStatus = this.state.changeFile;
         console.log('cambiod e estadooooooo' , changeStatus)
        if(this.state.changeFile){
            changeStatus = false;
            this.setState({changeFile: false})
        }else{
            changeStatus = true;
            this.setState({changeFile: true})
        }
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
            return  reader.result;
        };
        this.setState({fileBase: a });
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
    }
    
    construcObjt = async function(){
        let objectTosend= {
            id_cadena:this.state.listaCadenasSeleccionadas,
            id_campana_tipo: this.state.id_tipo_campana_global,
            nombre:this.state.name,
            desde: customFormatterToSent(this.state.dateFrom),
            hasta: customFormatterToSent(this.state.dateTo),
            id_formato: getFirtsEmentArray(this.state.listaFormatSeleted),
            id_plantilla:getFirtsEmentArray(this.state.listPlantillasSeleted),
            name_archivo:this.state.fileName,
            archivo_64:this.state.fileBase,
            archivo_64_sin_cabecera:this.state.fileHead,
            fileType:this.state.fileType,
            fileSize:this.state.fileSize,
            selectedOptionQr:this.state.selectedOptionQr,
            salas: getFirtsEmentArray(this.state.listSalasSeleted)
        }
        this.setState({objectTosend:  objectTosend});        
        console.log('Objeto armado::::::---->',objectTosend)
    }
    handleSubmitBs = async e =>{
        e.preventDefault();
        await this.validateFormPreSubmit();
        if(this.validateForm(this.state.errorsForm)) {
            await this.construcObjt();
            await this.createCampana();
        }else{
            console.error('Invalid Form')
        }
    }
    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
          (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }
    async validateFormPreSubmit(){
        let errors = this.state.errorsForm;
        errors.name ='';
        errors.cadenas='';
        errors.dateto = '';
        errors.datefrom=''; 
        errors.sala = '';
        if(this.state.name.length<3){
             errors.name  ='el nombre de la campaña debe tener mas de 3 caracteres!';
        }
        if(this.state.name===''){
            errors.name ='El nombre de la campaña es requerido!';
        }
        if(this.state.listaCadenasSeleccionadas === null){
            errors.cadenas='Debe Seleccionar al menos 1 cadena !'; 
        }
        /*if(this.state.selectedOptionQr === null){
            errors.qr='Debe Seleccionar al menos 1 opcion QR !'; 
        }*/
        if(this.state.dateFrom === null){
            errors.datefrom = 'Debe seleccionar una Fecha de inicio para la campaña';
        }
        if(this.state.dateTo === null){
            errors.dateto = 'Debe seleccionar una Fecha de fin para la campaña';
        }
        if(this.state.fileHead === null){
            errors.file = 'Debe seleccionar un archivo';
        }
        if(this.state.listaFormatSeleted.length ===0){
            errors.formato = 'Debe Seleccionar al menos un formato';
        }
        if(this.state.listPlantillasSeleted.length ===0){
            errors.plantilla = 'Debe Seleccionar al menos una plantilla';
        }
        if(this.state.listSalasSeleted.length ===0){
            errors.sala = 'Debe Seleccionar al menos una o todas las salas';
        }
        console.log('errores antes del submit' , errors)
        this.setState({errorsForm:errors});
    }
    createCampana = async function(){
        this.setState({loading:true})
        try{
         await FaldonesServices.updateCampana(this.state.objectTosend , this.state.idCampanaFaldonToEdit).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                swal({
                    title: `Faldón actualizada con éxito`,
                    text: "!",
                    icon: "success",
                    button: "Ok!",
                });
                this.props.history.push("/Faldones")
            }else{
                    swal({
                        title: `Error ${data.errorInfo.toString()} `,
                        text: "!",
                        icon: "error",
                        button: "Ok!",
                    });
                }
            })
        } catch(error){
            this.setState({loading:false , error: error})
        }
        this.setState({loading:false})
    }
    render() {
        return (
            <EditFaldones
            state = {this.state}
            handleCheckChieldElement={this.handleCheckChieldElement}
            onlyLetter={this.onlyLetter}
            handleChangeI={this.handleChangeI}
            setDateFrom={this.setDateFrom}
            setDateTo={this.setDateTo} 
            onSelectFormatos={this.onSelectFormatos}
            onRemoveFormatos={this.onRemoveFormatos} 
            onSelectPlantillas={this.onSelectPlantillas}
            onRemovePlantillas={this.onRemovePlantillas}
            onSelectSalas={this.onSelectSalas}
            onRemoveSalas={this.onRemoveSalas}
            onChangeValueQr={this.onChangeValueQr}
            handleChangeStatus={this.handleChangeStatus}
            handleSubmitFile={this.handleSubmitFile}
            getUploadParams={this.getUploadParams}
            handleSubmitBs={this.handleSubmitBs}>
            </EditFaldones>
        )
    }
}

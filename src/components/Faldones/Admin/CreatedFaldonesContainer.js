import React, { Component } from 'react'
import CreatedFaldones from './CreatedFaldones';
import AdminServices from '../../../services/AdminServices';
import FaldonesServices from '../../../services/FaldonesServices';
import {customFormatterToSent , getFirtsEmentArray } from '../../../util/formats';
import swal from 'sweetalert';
export default class CreatedFaldonesContainer extends Component {
    state = {
        listaCadenasCreate:[],
        listaCadenasSeleccionadas:null,
        listaFormatCreate:[],
        listaFormatSeleted:[],
        listPlantillasCreated:[],
        listPlantillasSeleted:[],
        listSalasCreated:[],
        listSalasSeleted:[],
        loading:false,
        loadingCreated:false,
        id_tipo_campana_global : 1, 
        listaQrOptions:[
            {nombre:'Si' , value:'1', isChecked:false},
            {nombre:'No' , value:'2' , isChecked:true}
        ],
        selectedOptionQr:'2',
        name:'',
        dateFrom:null,
        dateTo:null,
        habQr:false,
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
        }       
    }
    /* constructor(){
        super(); 
    } */
    async componentDidMount(){
        await this.getCadenasForCreteFaldon();
        //await this.getSalasForCreteFaldon();
        //await this.getPlantillasForCreteFaldon();

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
    getCadenasQr = async function(){
        this.setState({loading:true , error: null})
         await AdminServices.getCadenasQr().then((data) => {    
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
                let salasT = data.data;
                salasT = salasT.unshift({id:0 , nombre_sap:'Todas', display_nombre_sap:'Todas'})
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
        this.setState({
            listPlantillasSeleted: [],
            listaFormatSeleted:[],
            selectedOptionQr:'2',
          });
        this.setState({errorsForm: {...this.state.errorsForm,cadenas: ''}});
        let cadenasLocal =  this.state.listaCadenasCreate;
        let resultado = cadenasLocal.find( cadena => Number(cadena.id) === Number(e.target.value));
        let habQr = resultado.id === 1 ? true :false;
        let salasT = resultado.salas_cadena;
        salasT.unshift({id:0 , nombre_sap:'Todas', display_nombre_sap:'Todas'})
        let plantillas = resultado.plantillas;
        let PlantillasActivas = plantillas.filter(function (plan) {
            return plan.id_estatus_plantilla_tipo === 1;
        });
        console.log('salassss'  , salasT);
        this.setState({
            listaCadenasSeleccionadas: resultado,
            listPlantillasCreated: PlantillasActivas,
            habQr : habQr,
            listSalasCreated: salasT
          });
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
                    errors.name ='El nombre del Faldón debe tener mas de 3 caracteres!';
                } 
                if(value===''){
                    errors.name =' El nombre del campaña es requerido';
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
                  formato: 'Debe seleccionar al menos un formato'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  formato: ''
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
            listPlantillasSeleted : selectedList,
        })
        if(this.state.selectedOptionQr !=='1'){
            this.setState({
                listaFormatCreate : _selectedItem.formatos
            })
        }else{
            this.setState({
                listaFormatCreate : _selectedItem.formatosqr
            })
        }
       
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  plantilla: 'Debe seleccionar al menos un formato'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  plantilla: ''
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
        this.setState({
            selectedOptionQr: event.target.value
          });
        /*if(event.target.value === '1'){
            this.setState({
                listPlantillasCreated: this.state.listaCadenasSeleccionadas.plantillasqr
              });
        }*/
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
        console.log('Objeto armado::::::---- ',objectTosend)
    }
    handleSubmitBs = async e =>{
        e.preventDefault();
        this.setState({loadingCreated: true});
        await this.validateFormPreSubmit();
        if(this.validateForm(this.state.errorsForm)) {
            await this.construcObjt();
            await this.createCampana();
        }else{
            console.error('Invalid Form')
        }
        this.setState({loadingCreated: false});
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
        if(this.state.selectedOptionQr === null){
            errors.qr='Debe Seleccionar al menos 1 opción QR !'; 
        }
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

        try{
         await FaldonesServices.storeCampana(this.state.objectTosend).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                swal({
                    title: `Faldón registrado con éxito`,
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
            //this.setState({loading:false , error: null})
        } catch(error){
            this.setState({loading:false , error: error})
        }
    }
    render() {
        return (
            <CreatedFaldones
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
            </CreatedFaldones>
        )
    }
}

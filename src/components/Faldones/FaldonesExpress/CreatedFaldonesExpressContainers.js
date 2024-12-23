import React, { Component } from 'react';
import CreatedFaldonesExpress from './CreatedFaldonesExpress';
import AdminServices from '../../../services/AdminServices';
import FaldonesServices from '../../../services/FaldonesServices';
import {customFormatterToSent , getFirtsEmentArray } from '../../../util/formats';
import swal from 'sweetalert';
export default class CreatedFaldonesExpressContainers extends Component {
    state = {
        listaCadenasCreate:[],
        listaCadenasSeleccionadas:null,
        listaFormatCreate:[],
        listaFormatSeleted:[],
        listPlantillasCreated:[],
        listPlantillasSeleted:[],
        //listaSeccionesCreated:[],
        //listSeccionesSeleted:[],
        listaSalasCreated:[],
        listSalasSeleted:[],
        listaMediosCreated:[],
        listSMediosSeleted:[],
        listaTiposMediosCreated:[],
        listTiposSMediosSeleted:[],
        listaTiposVolantesCreated:[],
        listTiposVolanteseleted:[],

        listaTiposPromosCreated:[],
        listTiposPromosSeleted:[],

        listaCombinacionCreated:[],
        listCombinacionSeleted:[],

        listaUmbCreate:[],
        listaUmbSeleted:[],

        loading:false,
        loadingCreated:false,
        id_tipo_campana_global : 1, 
        listaOptions:[
            {nombre:'Si' , value:'1'},
            {nombre:'No' , value:'2'}
        ],
        selectedOptionFinanciamiento:null,
        name:'',
        tipo_medio:'',
        tipo_volante_catalogo:'',
        combinacion:'',

        sap:'',
        umb:'',
        cod_barra:'',
        descripcion:'',
        precio_referencia_moda:'',
        tmp:'',
        tc:'',
        cuotas:'',
        valor_cuota:'',
        cae:'',
        costo_total:'',
        dateFrom:null,
        dateTo:null,
        errorsForm:{
            cadenas:'',
            //secciones:'',
            name:'',
            tipo_medio:'',
            sap:'',
            umb:'',
            datefrom:'',
            dateto:'',
            formato:'',
            plantilla:'',
            financiamiento:'',
            file:'',
            salas:'',
            medios:'',
            tipos_medios:'',
            tipo_volante:'',
            cod_barra:'',
            descripcion:'',
            precio_referencia_moda:'',
            tmp:'',
            tc:'',
            cuotas:'',
            valor_cuota:'',
            cae:'',
            costo_total:'',
            tipo_promo:'',
            combinacion:'',
            tipo_volante_catalogo:'',
            umb:''
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
            financiamiento:''
        }       
    }
    /* constructor(){
        super(); 
    } */
    async componentDidMount(){
        await this.getCadenasForCreteFaldon();
        await this.getSeccionesForCreteFaldon();
        await this.getFormatosForCreteFaldon();
        await this.getPlantillasForCreteFaldon();
        await this.getSalasForCreteFaldon();
        await this.getMediosForCreteFaldon();
        await this.getTiposMediosForCreteFaldon();
        await this.getTiposVolantesForCreteFaldon();
        await this.getTiposPromosForCreteFaldon();
        await this.getCombinacionForCreteFaldon();
        await this.getUmbFaldonesForCreteFaldon();
    }
    getCadenasForCreteFaldon = async function(){
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
        console.log(selectedList);
        this.filtrarPlantillasPorCadena(selectedList);
        this.setState({
            listaCadenasSeleccionadas : selectedList,
            //listaTipoSalas : this.filterTipoSalas(selectedList, _selectedItem),
            listPlantillasSeleted:[]
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
                    listPlantillasSeleted: ''
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
                  plantilla: 'Debe seleccionar al menos una Planttilla'
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

    filtrarPlantillasPorCadena = (selectedCadenas) => {
        let plantillasFiltradas = [];
        selectedCadenas.forEach(cadena => {
            let plantillasCadena = cadena.plantillas.filter(plantilla => plantilla.id_estatus_plantilla_tipo === 1);
            plantillasFiltradas.push(...plantillasCadena);
        });
        this.setState({
            listaCadenasSeleccionadas: selectedCadenas,
            listPlantillasCreated: plantillasFiltradas,
            listaSalasCreated: selectedCadenas.flatMap(cadena => cadena.salas_cadena)
        });
    }


    getMediosForCreteFaldon = async function(){
        this.setState({loading:true , error: null})
         await AdminServices.getMedios().then((data) => {    
            if(!data.hasOwnProperty('errorInfo')){
                data = data.data.map(element => ({
                    ...element,
                    isChecked: false
                }))
                this.setState({
                    loading:false,
                    listaMediosCreated: data,
                });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
    }
    getTiposMediosForCreteFaldon = async function(){
        this.setState({loading:true , error: null})
         await AdminServices.getTiposMedios().then((data) => {    
            if(!data.hasOwnProperty('errorInfo')){
                data = data.data.map(element => ({
                    ...element,
                    isChecked: false
                }))
                this.setState({
                    loading:false,
                    listaTiposMediosCreated: data,
                });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
    }
    getTiposVolantesForCreteFaldon = async function(){
        this.setState({loading:true , error: null})
         await AdminServices.getTiposVolantes().then((data) => {    
            if(!data.hasOwnProperty('errorInfo')){
                data = data.data.map(element => ({
                    ...element,
                    isChecked: false
                }))
                this.setState({
                    loading:false,
                    listaTiposVolantesCreated: data,
                });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
    }
    getUmbFaldonesForCreteFaldon = async function(){
        this.setState({loading:true , error: null})
        await FaldonesServices.getUmbFladones().then((data) => {      
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({
                    loading:false,
                    listaUmbCreate: data.data,
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
                data = data.data.map(element => ({
                    ...element,
                    isChecked: false
                }))
                this.setState({
                    loading:false,
                    listaSalasCreated: data,
                });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
    }
    getSeccionesForCreteFaldon = async function(){
        this.setState({loading:true , error: null})
         await AdminServices.getSesionActivas().then((data) => {    
            if(!data.hasOwnProperty('errorInfo')){
                data = data.data.map(element => ({
                    ...element,
                    isChecked: false
                }))
                this.setState({
                    loading:false,
                    listaSeccionesCreated: data,
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

    /*nuevos 2*/


    getTiposPromosForCreteFaldon = async function(){
        this.setState({loading:true , error: null})
         await AdminServices.getTiposPromos().then((data) => {    
            if(!data.hasOwnProperty('errorInfo')){
                data = data.data.map(element => ({
                    ...element,
                    isChecked: false
                }))
                this.setState({
                    loading:false,
                    listaTiposPromosCreated: data,
                });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
    }

    getCombinacionForCreteFaldon = async function(){
        this.setState({loading:true , error: null})
         await AdminServices.getCombinaciones().then((data) => {    
            if(!data.hasOwnProperty('errorInfo')){
                data = data.data.map(element => ({
                    ...element,
                    isChecked: false
                }))
                this.setState({
                    loading:false,
                    listaCombinacionCreated: data,
                });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
    }

    handleCheckChieldElement= e =>{
        this.setState({errorsForm: {...this.state.errorsForm,cadenas: ''}});
        let cadenasLocal =  this.state.listaCadenasCreate;
        let resultado = cadenasLocal.find( cadena => Number(cadena.id) === Number(e.target.value));
        let plantillas = resultado.plantillas;
        let PlantillasActivas = plantillas.filter(function (plan) {
            return plan.id_estatus_plantilla_tipo === 1;
        });
        this.setState({
            listaCadenasSeleccionadas: resultado,
            listPlantillasCreated: PlantillasActivas,
            listaSalasCreated: resultado.salas_cadena
          });
        console.log('ESTO ES CADENA', this.state.listaCadenasSeleccionadas)
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
    onlyNumber = e =>{
        const key = e.keyCode || e.which;
        if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) && key !== 8 && key !== 0) {
            e.preventDefault();
         }
    }
    onlyNumberandK = e =>{
        const key = e.keyCode || e.which;
        if (!((key >= 48 && key <= 57) || key === 75 || key === 107 ||(key >= 96 && key <= 105)) && key !== 8 && key !== 0) {
            e.preventDefault();
        }
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
                    errors.name ='El nombre  genérico debe tener mas de 3 caracteres!';
                } 
                if(value===''){
                    errors.name =' El nombre genérico es requerido';
                }
                /*if(!this.onlyLeterValidateForce(value)){
                    errors.name ='Caracteres invalidos!';
                }*/
            break;
            /* case 'sap':
                errors.sap ='';
                if(value===''){
                    errors.sap =' El Cod SAP requerido';
                }
            break;
            case 'cod_barra':
                errors.cod_barra ='';
                if(value===''){
                    errors.cod_barra =' El Cod Barrras es requerido';
                }
            break; 
            case 'umb':
                errors.umb ='';
                if(value===''){
                    errors.umb =' El UMB es requerido';
                }
            break;
            case 'precio_referencia_moda':
                errors.precio_referencia_moda ='';
                if(value===''){
                    errors.precio_referencia_moda =' El Precio de referencia es requerido';
                }
            break;*/
            case 'tmp':
                errors.tmp ='';
                if(value===''){
                    errors.tmp =' El tmp es requerido';
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
    onSelectSecciones = (selectedList, _selectedItem) =>{
        this.setState({
            listSeccionesSeleted : selectedList
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  secciones: 'Debe seleccionar al menos una sección'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  secciones: ''
                }
              });
        }   
    }
    onRemoveSecciones = (selectedList, _removedItem) => {
        this.setState({
            listSeccionesSeleted : selectedList
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  secciones: 'Debe seleccionar al menos una sección'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  secciones: ''
                }
              });
        }
    }

    onSelectUmb = (selectedList, _selectedItem) =>{
        this.setState({
            listaUmbSeleted : selectedList
        }) 
    }
    onRemoveUmb = (selectedList, _removedItem) => {
        this.setState({
            listaUmbSeleted : selectedList
        })
    }

    onSelectSalas = (selectedList, _selectedItem) =>{
        this.setState({
            listSalasSeleted : selectedList
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  salas: 'Debe seleccionar al menos una sala'
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
                  salas: 'Debe seleccionar al menos una sección'
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
            listaFormatSeleted:[] 
        })
            this.setState({
                listaFormatCreate : _selectedItem.formatos
            })
        
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  plantilla: 'Debe seleccionar al menos un plantilla'
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
                  plantilla: 'Debe seleccionar al menos una plantillas'
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
    onSelectMedios = (selectedList, _selectedItem) =>{
        this.setState({
            listSMediosSeleted : selectedList
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  medios: 'Debe seleccionar al menos un medio'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  medios: ''
                }
              });
        }   
    }
    onRemoveMedios = (selectedList, _removedItem) => {
        this.setState({
            listSMediosSeleted : selectedList
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  medios: 'Debe seleccionar al menos un medio'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  medios: ''
                }
              });
        }
    }
    onSelectTiposMedios = (selectedList, _selectedItem) =>{
        this.setState({
            listTiposSMediosSeleted : selectedList
        })  
    }
    onRemoveTiposMedios = (selectedList, _removedItem) => {
        this.setState({
            listTiposSMediosSeleted : selectedList
        })
    }
    onSelectTipoVolante = (selectedList, _selectedItem) =>{
        this.setState({
            listTiposVolanteseleted : selectedList
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  tipo_volante: 'Debe seleccionar al menos un tipo de volante'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  tipo_volante: ''
                }
              });
        }   
    }
    onRemoveTipoVolante = (selectedList, _removedItem) => {
        this.setState({
            listTiposVolanteseleted : selectedList
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  tipo_volante: 'Debe seleccionar al menos un tipo de volante'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  tipo_volante: ''
                }
              });
        }
    }
    onSelectCombinacion = (selectedList, _selectedItem) =>{
        this.setState({
            listCombinacionSeleted : selectedList
        })  
    }
    onRemoveCombinacion = (selectedList, _removedItem) => {
        this.setState({
            listCombinacionSeleted : selectedList
        })
    }

    onSelectTipoPromo = (selectedList, _selectedItem) =>{
        this.setState({
            listTiposPromosSeleted : selectedList
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  tipo_promo: 'Debe seleccionar al menos un tipo de promo'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  tipo_promo: ''
                }
              });
        }   
    }
    onRemoveTipoPromo = (selectedList, _removedItem) => {
        this.setState({
            listTiposPromosSeleted : selectedList
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  tipo_promo: 'Debe seleccionar al menos un tipo de promo'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  tipo_promo: ''
                }
              });
        }
    }

    onChangeValueFinanciamiento  = (event) =>{
        this.setState({errorsForm: {...this.state.errorsForm,financiamiento: ''}});
        this.setState({
            selectedOptionFinanciamiento: event.target.value
          });
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
        console.log('estos son los datoa', this.faldones);
        console.log('estos son los tipos de medios' , this.state.listTiposSMediosSeleted);
        let objectTosend= {
            id_cadena:this.state.listaCadenasSeleccionadas,
            id_campana_tipo: this.state.id_tipo_campana_global,
            faldonesarray:this.state.faldones,
            //nombre:this.state.name,
            //sap:this.state.sap,
            //umb:this.state.umb,
            //cod_barra: this.state.cod_barra,
            //tipo_medio: this.state.tipo_medio,
            //tipo_volante_catalogo: this.state.tipo_volante_catalogo,
            //desde: customFormatterToSent(this.state.dateFrom),
            //hasta: customFormatterToSent(this.state.dateTo),
            id_formato: getFirtsEmentArray(this.state.listaFormatSeleted),
            id_plantilla:getFirtsEmentArray(this.state.listPlantillasSeleted),
            //id_seccion:getFirtsEmentArray(this.state.listSeccionesSeleted),
           //// id_sala:getFirtsEmentArray(this.state.listSalasSeleted),
            //id_medio:getFirtsEmentArray(this.state.listSMediosSeleted),
            //id_umb_faldones:getFirtsEmentArray(this.state.listaUmbSeleted),
            //id_tipo_medio:this.state.listTiposSMediosSeleted.length>0?getFirtsEmentArray(this.state.listTiposSMediosSeleted):null,
            //id_tipo_promo:this.state.listTiposPromosSeleted.length>0?getFirtsEmentArray(this.state.listTiposPromosSeleted):null,
            //id_combinacion:this.state.listCombinacionSeleted.length>0?getFirtsEmentArray(this.state.listCombinacionSeleted):null,
           // combinacion:this.state.combinacion,
           // id_tipo_volante:getFirtsEmentArray(this.state.listTiposVolanteseleted),
            //selectedOptionQr:this.state.selectedOptionQr,
           // descripcion:this.state.descripcion,
           // tmp:this.state.tmp,
           // tc:this.state.tc,
           // cuotas:this.state.cuotas,
           // valor_cuota:this.state.valor_cuota,
           // cae:this.state.cae,
           // costo_total:this.state.costo_total,
           // precio_referencia_moda:this.state.precio_referencia_moda,
        }
        this.setState({objectTosend:  objectTosend});        
        console.log('Objeto armado::::::---- ',objectTosend)
    }
    handleSubmitBs = async (e) => {
        e.preventDefault();
    
        // Aquí puedes acceder a los faldones y a otros datos del formulario
        const { faldones } = this.state;
        console.log("Datos del formulario:", this.state);
        console.log("Faldones:", faldones);
    
        // Lógica para manejar el envío del formulario y los faldones
        this.setState({ loadingCreated: true });
        await this.validateFormPreSubmit();
        if (this.validateForm(this.state.errorsForm)) {
            await this.construcObjt();
            await this.createCampana();
        } else {
            console.error('Invalid Form')
        }
        this.setState({ loadingCreated: false });
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
        errors.secciones = '';
        errors.dateto = '';
        errors.datefrom=''; 
        errors.salas = '';
        errors.medios = '';
        errors.tipos_medios = '';
        errors.tipo_volante = '';
        errors.cod_barra = '';
        errors.sap = '';
        errors.descripcion = '';
        errors.tmp = '';
        errors.precio_referencia_moda = '';
        errors.tc = '';
        errors.tipo_promo = '';


        if(this.state.listaCadenasSeleccionadas === null){
            errors.cadenas='Debe Seleccionar al menos 1 cadena !'; 
        }

        if(this.state.listPlantillasSeleted.length ===0){
            errors.plantilla = 'Debe Seleccionar al menos una plantilla';
        }

        if(this.state.listaFormatSeleted.length ===0){
            errors.formato = 'Debe Seleccionar al menos un formato';
        }

        this.state.faldones.forEach((faldon, index) => {
            if(faldon.name.length<3){
                errors.name  ='el nombre genérico debe tener mas de 3 caracteres!';
            }

            if(faldon.name===''){
                errors.name ='El nombre genérico es requerido!';
            }

            if(faldon.cod_barra===''){
                errors.cod_barra ='El SAP o código de barras es requerido!';
            } 

            if(faldon.umb===''){
                errors.umb ='El UMB es requerido!';
            }

            // if(faldon.precio_referencia_moda===''){
            //     errors.precio_referencia_moda ='El precio referencia es requerido!';
            // }

            if(faldon.tmp===''){
                errors.tmp ='El cod tmp es requerido!';
            }

            // if(faldon.tc===''){
            //     errors.tc ='El cod tc es requerido!';
            // }

            if(faldon.tipo_promo===''){
                errors.tipo_promo ='El Tipo de promo es requerido!';
            }
    
            if(faldon.dateFrom === null){
                errors.datefrom = 'Debe seleccionar una Fecha de inicio para la campaña';
            }
            if(faldon.dateTo === null){
                errors.dateto = 'Debe seleccionar una Fecha de fin para la campaña';
            }
        });

        console.log('errores antes del submit' , errors)
        this.setState({errorsForm:errors});
    }
    
    createCampana = async function(){

        try{
         await FaldonesServices.storeFaldon(this.state.objectTosend).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                swal({
                    title: `Faldon registrado con éxito`,
                    text: "!",
                    icon: "success",
                    button: "Ok!",
                });
                this.props.history.push("/FaldonesExpress")
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

    setFechasAr = (fechashija)=> {
        console.log('faldones:::', fechashija);
        this.setState({
            faldones: fechashija,
        });
    }

    render() {
        return (
            <CreatedFaldonesExpress
            state = {this.state}
            onSelectCadenas={this.onSelectCadenas}
            onRemovCadenas={this.onRemovCadenas}
            handleCheckChieldElement={this.handleCheckChieldElement}
            onlyLetter={this.onlyLetter}
            onlyNumber={this.onlyNumber}
            handleChangeI={this.handleChangeI}
            setDateFrom={this.setDateFrom}
            setDateTo={this.setDateTo} 
            onSelectFormatos={this.onSelectFormatos}
            onRemoveFormatos={this.onRemoveFormatos} 
            setFechasAr={this.setFechasAr}
            // onSelectSecciones = {this.onSelectSecciones}
            // onRemoveSecciones = {this.onRemoveSecciones}
            onSelectSalas={this.onSelectSalas}
            onRemoveSalas={this.onRemoveSalas}
            onSelectTiposMedios={this.onSelectTiposMedios}
            onRemoveTiposMedios={this.onRemoveTiposMedios}
            onSelectMedios={this.onSelectMedios}
            onRemoveMedios={this.onRemoveMedios}

            onSelectTipoPromo={this.onSelectTipoPromo}
            onRemoveTipoPromo={this.onRemoveTipoPromo}

            onSelectCombinacion={this.onSelectCombinacion}
            onRemoveCombinacion={this.onRemoveCombinacion}

            onSelectPlantillas={this.onSelectPlantillas}
            onRemovePlantillas={this.onRemovePlantillas}
            
           
            onSelectTipoVolante={this.onSelectTipoVolante}
            onRemoveTipoVolante = {this.onRemoveTipoVolante}
            onChangeValueFinanciamiento={this.onChangeValueFinanciamiento}
            handleChangeStatus={this.handleChangeStatus}
            handleSubmitFile={this.handleSubmitFile}
            getUploadParams={this.getUploadParams}
            handleSubmitBs={this.handleSubmitBs}

            onSelectUmb = {this.onSelectUmb}
            onRemoveUmb = {this.onRemoveUmb}>  
            </CreatedFaldonesExpress>
        )
    }
}

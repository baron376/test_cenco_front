import React, { Component } from 'react';
import EditFaldonesExpress from './EditFaldonesExpress';
import AdminServices from '../../../services/AdminServices';
import FaldonesServices from '../../../services/FaldonesServices';
import {customFormatterToSent , getFirtsEmentArray , customFormatterDate} from '../../../util/formats';
import swal from 'sweetalert';
export default class EditFaldonesExpressContainers extends Component {
    state = {
        listaCadenasCreate:[],
        listaCadenasSeleccionadas:null,

        listaFormatCreate:[],
        listaFormatSeleted:[],

        listPlantillasCreated:[],
        listPlantillasSeleted:[],

        listaSeccionesCreated:[],
        listSeccionesSeleted:[],

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

        loading:false,
        loadingCreated:false,
        id_tipo_campana_global : 1, 
        listaOptions:[
            {nombre:'Si' , value:'1'},
            {nombre:'No' , value:'2'}
        ],
        selectedOptionQr:null,
        name:'',
        sap:'',
        umb:'',
        cod_barra:'',
        descripcion:'',
        precio_referencia_moda:'',
        tmp:'',
        tc:'',
        dateFrom:null,
        dateTo:null,
        errorsForm:{
            cadenas:'',
            secciones:'',
            name:'',
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
            tipo_promo:'',
            combinacion:'',
        },

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
        },
        idFaldontoEdit:null,
        faldonDetailsData:'',
        tipo_medio:'',
        tipo_volante_catalogo:'',
        combinacion:''

    }
    constructor(){
        super();
        this.getDetailsFaldonExpress.bind(this);
    }
    async componentDidMount(){
        await this.getCadenasForCreteFaldon();
        await this.getSeccionesForCreteFaldon();
        await this.getFormatosForCreteFaldon();
        await this.getPlantillasForCreteFaldon();
        await this.getSalasForCreteFaldon();
        await this.getMediosForCreteFaldon();
     //   await this.getTiposMediosForCreteFaldon();
  //      await this.getTiposVolantesForCreteFaldon();
        await this.getTiposPromosForCreteFaldon();
        await this.getCombinacionForCreteFaldon();
        await this.getUmbFaldonesForCreteFaldon();
        await this.getDetailsFaldonExpress();
        await this.fechasFormater();
        await this.preSelectObject();

    }
    getDetailsFaldonExpress = async function(){
        this.setState({loading:true , error: null , idFaldontoEdit:this.props.match.params.id})
        let idFaldontoEdit = this.props.match.params.id;
        await FaldonesServices.getFaldonDetail(idFaldontoEdit).then((data) => {
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

    fechasFormater = async function() {
        let cell = this.state.faldonDetailsData;
    
        // Verificar si cell es un array
            let faldones = [];
            cell.forEach((faldon, index) => {
                faldones.push({
                    id: index,
                    nombre: faldon.nombre_generico_promocion,
                    cod_barra: faldon.cod_barra,
                    umb: faldon.umb,
                    cae: faldon.cae,
                    precio_referencia: faldon.precio_referencia_moda,
                    tipo_promo: faldon.tipo_promo,
                    tmp: faldon.tmp,
                    tc: faldon.tc,
                    fecha_inicio: faldon.fecha_inicio_promo,
                    fecha_termino: faldon.fecha_termino_promo,
                    cuotas: faldon.cuotas,
                    costo_total: faldon.costo_total,
                    combinacion: faldon.combinacion
                });
            });
    
            this.setState({
                faldones: faldones
            });
    
            console.log("ACaaaaaaa Fechas", faldones);
    }

    preSelectObject = async function(){
        this.setState({loading:true , error: null})
        let localCamapanaList = this.state.listaCadenasCreate;
        let localcampanaSeleted = null;       
        let localCampanaSectToedit = this.state.faldonDetailsData[0].cadena_faldon;
        let localname = this.state.faldonDetailsData.nombre_generico_promocion;
        let localdescripcion = this.state.faldonDetailsData.descripcion;
       // let localQrList = this.state.listaQrOptions;
        let localQrSelected  =   this.state.faldonDetailsData.qr;
        let localFormat = this.state.faldonDetailsData[0].formato_faldon;
        console.log('plantilla::: ', this.state.faldonDetailsData[0].plantilla_faldon);
        let localPlantilla = this.state.faldonDetailsData[0].plantilla_faldon;
        let localSeccion =  this.state.faldonDetailsData.seccion_faldon;
        let localSalas =  this.state.faldonDetailsData.sala_faldon;
        let localMedios =  this.state.faldonDetailsData.medio_faldon;
        let localTiposMedios =  this.state.faldonDetailsData.tipo_medio;
        let localTiposVolante =  this.state.faldonDetailsData.tipo_volante_catalogo;
        let localsap =  this.state.faldonDetailsData.sap;
        let localCodBarra =  this.state.faldonDetailsData.cod_barra;
        let localumb =  this.state.faldonDetailsData.umb;
        let local_precio_refrencia_moda = this.state.faldonDetailsData.precio_referencia_moda;
        let localtmp = this.state.faldonDetailsData.tmp;
        let localtc = this.state.faldonDetailsData.tc;
        let localfrom = customFormatterDate(this.state.faldonDetailsData.fecha_inicio_promo);
        let localto = customFormatterDate(this.state.faldonDetailsData.fecha_termino_promo);
        let localTiposPRomo = this.state.faldonDetailsData.tipo_promo_faldon;
        let localCombinacion = this.state.faldonDetailsData.combinacion; // this.state.faldonDetailsData.combinacion_faldon ? [this.state.faldonDetailsData.combinacion_faldon]: null;
        let localqrseleccionalo = 2;
        localCamapanaList.forEach(element => {
            if(Number(element.id)===Number(localCampanaSectToedit.id)){
             localcampanaSeleted= element;
                 element.isChecked = true;
            }
        });
        // console.log(localQrList);
        // localQrList.forEach(element => {
        //      if(Number(element.value)===Number(localQrSelected)){
        //          element.isChecked = true;
        //          localqrseleccionalo = element.value;
        //      }
        //  });

        console.log('elementosssss',localFormat);
        this.setState(
            {loading:false , 
             error: null , 
             listaCadenasCreate: localCamapanaList,
             listaCadenasSeleccionadas: [localcampanaSeleted],
           //  listaQrOptions:localQrList,
             listaFormatSeleted:[localFormat],
             listPlantillasSeleted:[localPlantilla],
             listSeccionesSeleted:[localSeccion],
             name:localname,
             listSalasSeleted:[localSalas],
             listSMediosSeleted : [localMedios],
           //  listTiposSMediosSeleted : localTiposMedios,
             listTiposVolanteseleted : [localTiposVolante] ,
             descripcion : localdescripcion,
             sap : localsap,
             cod_barra: localCodBarra,
             umb : localumb,
             precio_referencia_moda : local_precio_refrencia_moda,
             tmp : localtmp,
             tc :localtc ,
             dateFrom : localfrom,
             dateTo : localto,
             listTiposPromosSeleted : [localTiposPRomo],
             listCombinacionSeleted : localCombinacion,
             tipo_medio:localTiposMedios,
             tipo_volante_catalogo:localTiposVolante,
             combinacion: localCombinacion,
             selectedOptionQr: localqrseleccionalo
         })
 
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
        this.setState({
            listaCadenasSeleccionadas : selectedList,
            //listaTipoSalas : this.filterTipoSalas(selectedList, _selectedItem),
            TipoSalaseleccionada:[]
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
                    TipoSalaseleccionada: ''
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
    getSalasForCreteFaldon = async function(){
        this.setState({loading:true , error: null})
         await AdminServices.getSalasActivas().then((data) => {    
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
            console.log('descripcion plantilla:::::',data.data);
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
        this.setState({
            listaCadenasSeleccionadas: resultado
          });
        console.log('ESTO ES CADENA', this.state.listaCadenasSeleccionadas)
    }
    onlyLetter = e =>{
        if (!((e.keyCode >= '64' && e.keyCode <= '91') || (Number(e.keyCode) === Number('32')) || (Number(e.keyCode) === Number('8'))  || (Number(e.keyCode) === Number('192')))) {
            e.preventDefault()
         }
    }
    onlyLeterValidateForce(cadena) {
        for (let x = 0; x < cadena.length; x++) {
            let c = cadena.charAt(x);
            if (!((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === ' ')) {
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
            case 'sap':
                errors.sap ='';
                if(value===''){
                    errors.sap =' El Cod SAP requerido';
                }
            break;
            case 'cod_barra':
                errors.cod_barra ='';
                if(value===''){
                    errors.cod_barra =' El Cod Barras es requerido';
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
            break;
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
    onSelectPlantillas = (selectedList, _selectedItem) =>{
        this.setState({
            listPlantillasSeleted : selectedList
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

    onChangeValueQr  = (event) =>{
        this.setState({errorsForm: {...this.state.errorsForm,qr: ''}});
        this.setState({
            selectedOptionQr: event.target.value
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
        console.log('estos son los tipos de medios' , this.state.listTiposSMediosSeleted);
        let objectTosend= {
            fechasarray:this.state.fechas,
            id_cadena:this.state.listaCadenasSeleccionadas,
            id_campana_tipo: this.state.id_tipo_campana_global,
            nombre:this.state.name,
            sap:this.state.sap,
            umb:this.state.umb,
            cod_barra: this.state.cod_barra,
            desde: customFormatterToSent(this.state.dateFrom),
            hasta: customFormatterToSent(this.state.dateTo),
            id_formato: getFirtsEmentArray(this.state.listaFormatSeleted),
            id_plantilla:getFirtsEmentArray(this.state.listPlantillasSeleted),
            id_seccion:getFirtsEmentArray(this.state.listSeccionesSeleted),
            id_sala:getFirtsEmentArray(this.state.listSalasSeleted),
            id_medio:getFirtsEmentArray(this.state.listSMediosSeleted),
            tipo_medio: this.state.tipo_medio,
            id_tipo_medio:this.state.listTiposSMediosSeleted?this.state.listTiposSMediosSeleted.length>0?getFirtsEmentArray(this.state.listTiposSMediosSeleted):null : null,
            id_tipo_promo:this.state.listTiposPromosSeleted.length>0?getFirtsEmentArray(this.state.listTiposPromosSeleted):null,
            id_combinacion:this.state.listCombinacionSeleted?this.state.listCombinacionSeleted.length>0?getFirtsEmentArray(this.state.listCombinacionSeleted):null:null,
            id_tipo_volante:getFirtsEmentArray(this.state.listTiposVolanteseleted),
            id_umb_faldones:getFirtsEmentArray(this.state.listaUmbSeleted),
            selectedOptionQr:this.state.selectedOptionQr,
            descripcion:this.state.descripcion,
            tmp:this.state.tmp,
            tc:this.state.tc,
            precio_referencia_moda:this.state.precio_referencia_moda,
            combinacion:this.state.combinacion,
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
        errors.secciones = '';
        errors.dateto = '';
        errors.datefrom=''; 
        errors.salas = '';
        errors.medios = '';
        errors.tipos_medios = '';
        errors.tipo_volante = '';
        errors.cod_barras = '';
        errors.sap = '';
        errors.descripcion = '';
        errors.tmp = '';
        errors.precio_referencia_moda = '';
        errors.tc = '';
        if(this.state.name.length<3){
             errors.name  ='el nombre generico debe tener mas de 3 caracteres!';
        }
        if(this.state.name===''){
            errors.name ='El nombre generico es requerido!';
        }
        if(this.state.sap===''){
            errors.sap ='El cod sap es requerido!';
        }
        if(this.state.precio_referencia_moda===''){
            errors.precio_referencia_moda ='El cod precio_referencia_moda es requerido!';
        }
        if(this.state.tmp===''){
            errors.tmp ='El cod tmp es requerido!';
        }
        if(this.state.cod_barra===''){
            errors.cod_barra ='El cod barras es requerido!';
        }
        if(this.state.umb===''){
            errors.umb ='El UMB es requerido!';
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
        if(this.state.listaFormatSeleted.length ===0){
            errors.formato = 'Debe Seleccionar al menos un formato';
        }
        if(this.state.listSalasSeleted.length ===0){
            errors.salas = 'Debe Seleccionar al menos un una sala';
        }
        if(this.state.listSMediosSeleted.length ===0){
            errors.medios = 'Debe Seleccionar al menos un un medio';
        }
        if(this.state.listTiposVolanteseleted.length ===0){
            errors.tipo_volante = 'Debe Seleccionar al menos un un tipo volante';
        }
        if(this.state.listPlantillasSeleted.length ===0){
            errors.plantilla = 'Debe Seleccionar al menos una plantilla';
        }
        if(this.state.listSeccionesSeleted.length ===0){
            errors.secciones = 'Debe Seleccionar al menos una seccion';
        }
        if(this.state.listPlantillasSeleted.length ===0){
            errors.plantilla = 'Debe Seleccionar al menos una plantilla';
        }
        console.log('errores antes del submit' , errors)
        this.setState({errorsForm:errors});
    }
    createCampana = async function(){
        try{
            await FaldonesServices.updateFaldon(this.state.objectTosend , this.state.idFaldontoEdit).then((data) => {
               if(!data.hasOwnProperty('errorInfo')){
                   swal({
                       title: `Faldon actualizado con exitos`,
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
           } catch(error){
               this.setState({loading:false , error: error})
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

    setFechasAr = (fechashija)=> {
        console.log('faldones:::', fechashija);
        this.setState({
            faldones: fechashija,
        });
    }

    render() {
        return (
            <EditFaldonesExpress
            state = {this.state}
            faldones =  {this.faldones}
            handleCheckChieldElement={this.handleCheckChieldElement}
            onlyLetter={this.onlyLetter}
            onlyNumber={this.onlyNumber}
            handleChangeI={this.handleChangeI}
            setFechasAr={this.setFechasAr}
            setDateFrom={this.setDateFrom}
            setDateTo={this.setDateTo} 
            onSelectFormatos={this.onSelectFormatos}
            onRemoveFormatos={this.onRemoveFormatos} 
            onSelectSecciones = {this.onSelectSecciones}
            onRemoveSecciones = {this.onRemoveSecciones}
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
            onChangeValueQr={this.onChangeValueQr}
            handleChangeStatus={this.handleChangeStatus}
            handleSubmitFile={this.handleSubmitFile}
            getUploadParams={this.getUploadParams}
            handleSubmitBs={this.handleSubmitBs}
            
            onSelectUmb={this.onSelectUmb}
            onRemoveUmb={this.onRemoveUmb}>  
            </EditFaldonesExpress>
        )
    }
}

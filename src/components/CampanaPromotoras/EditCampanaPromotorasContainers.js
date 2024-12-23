import React, { Component } from 'react'
import EditCampanaPromotoras from './EditCampanaPromotoras.js';
import AdminServices from '../../services/AdminServices';
import CampanasServices from '../../services/CampanasServices';
import {customFormatterToSent , getFirtsEmentArray ,customFormatterDate } from '../../util/formats';
import CampanaPromotoraServices from '../../services/CampanaPromotoraServices';
import env from "react-dotenv";
import swal from 'sweetalert';

export default class EditCampanaPromotorasContainers extends Component {
    state = {
        loading:false, 
        loadingCreated:false,
        listaCadenasCreate:[],
        listaCadenasSeleccionadas:null,
        listaTurnosCreate:[],
        listaTurnosSeleccionados:null,
        listaProveedores:[],
        listProveedorSeleted:[],
        listaSecciones:[],
        listSeccionesSeleted:[],
        listaSalas:[],
        listSalasSeleted:[],
        listEntregaSelected:null,
        listDegustacionSelected:null,
        listMuebleSelected:null,
        listConsursoSelected:null,

        errorsForm: {
            cadenas:'',
            name:'',
            datefrom:'',
            dateto:'',
            proveedor:'',
            seccion:'',
            sala:'',
            turnos:'',
            entrega:'',
            degustacion:'', 
            mueble:'',
            concurso:'',
            description:'',
            file:''

        },
        name:'',
        description:'',
        dateFrom:null,
        dateTo:null,
        file:null,
        fileArc:null,
        fileName:null,
        fileType:null,
        fileSize:null,
        fileBase:null,
        fileHead:null,
        changeFile:false,
        fileEdit:null,
        urlFileToDownload:null,
        lista10:[
            {nombre:'SI',id:1 , isChecked:false} , 
            {nombre:'NO',id:0 , isChecked:false} , 
        ],
        lista102:[
            {nombre:'SI',id:1 , isChecked:false} , 
            {nombre:'NO',id:0 , isChecked:false} , 
        ],
        lista103:[
            {nombre:'SI',id:1 , isChecked:false} , 
            {nombre:'NO',id:0 , isChecked:false} , 
        ],
        lista104:[
            {nombre:'SI',id:1 , isChecked:false} , 
            {nombre:'NO',id:0 , isChecked:false} , 
        ]

    }
    constructor(){
        super();
        this.getDetailsCampanaPromotoras.bind(this);
    }
    getDetailsCampanaPromotoras = async function(){
        this.setState({loading:true , error: null , idFaldontoEdit:this.props.match.params.id})
        let idCamapanaPromo = this.props.match.params.id;
        await CampanaPromotoraServices.getCampanaDetail(idCamapanaPromo).then((data) => {
            
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
    async componentDidMount(){
        await this.getCadenasForCreteCampanaPromo();
        await this.getSecciones();
        await this.getSalas();
        await this.getProveedores();
        await this.getTurnosForCreteCampanaPromo();
        await this.getDetailsCampanaPromotoras();
        await this.preSelectObject();
        await this.getSalasByallInit();
    }


    async getSalasByallInit(){
        await this.getSalas();
        let todaslasalas = this.state.listaSalas;
        let cadena = this.state.faldonDetailsData.cadena.id
        if(cadena){
            todaslasalas = todaslasalas.filter((item) => item.id_cadena == cadena);
        }
        todaslasalas.unshift({id:0 , nombre_sap:'Todas', display_nombre_sap:'Todas'})

         this.setState({
            loading:false,
            listaSalas: todaslasalas,
        }) 
    }

    async getSalasByallOnchange(){
        let listaCadenascreateLocal = this.state.listaCadenasCreate;
        let cadenaSelect =  listaCadenascreateLocal.find((item) => item.isChecked == true); 
        await this.getSalas();
        let todaslasalas = this.state.listaSalas;
       
        let cadena = cadenaSelect.id;
        if(cadena){
            todaslasalas = todaslasalas.filter((item) => item.id_cadena == cadena);
        }
      
        todaslasalas.unshift({id:0 , nombre_sap:'Todas', display_nombre_sap:'Todas'})
        this.setState({
            loading:false,
            listaSalas: todaslasalas,
        }) 
        

    }



    getCadenasForCreteCampanaPromo = async function(){
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
    getTurnosForCreteCampanaPromo = async function(){
        this.setState({loading:true , error: null})
         await AdminServices.getTurnos().then((data) => {    
            if(!data.hasOwnProperty('errorInfo')){
                data = data.data.map(element => ({
                    ...element,
                    isChecked: false
                }))
                this.setState({
                    loading:false,
                    listaTurnosCreate: data,
                });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
    }
    getProveedores = async function(){
        this.setState({loading:true , error: null})
         await CampanasServices.getProveedor().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({
                    loading:false,
                    listaProveedores: data.data.filter(p => p.tipo == 1),
                });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
    }
    getSecciones = async function(){
        this.setState({loading:true , error: null})
         await CampanasServices.getSecciones().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({
                    loading:false,
                    listaSecciones: data.data,
                });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
    }
     getSalas = async function(){
        this.setState({loading:true , error: null})
        let cadenas = [];

        Object.values(this.state.listaCadenasCreate).forEach(val => {
            cadenas.push(val.id)
          });
         await AdminServices.getSalasUserCadenas([cadenas]).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                data.data.unshift({id:0 , nombre_sap:'Todas', display_nombre_sap:'Todas'})
                this.setState({
                    loading:false,
                    listaSalas: data.data,
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
        let allCadenasLocal = this.state.listaCadenasCreate;
        allCadenasLocal.forEach(cadenaI => {
            if(Number(cadenaI.id) === Number(e.target.value)){
                cadenaI.isChecked = true;
            }else{
                cadenaI.isChecked = false
            }
        });
        this.setState({listaCadenasCreate : allCadenasLocal, listSalasSeleted: [],  listSeccionesSeleted: [] });
        this.setState({listaCadenasSeleccionadas: resultado});
        this.getSalasByallOnchange();
    }
    handleCheckChieldElementTurnos= e =>{
        this.setState({errorsForm: {...this.state.errorsForm,turnos: ''}});
        let turnosLocal =  this.state.listaTurnosCreate;
        let resultado = turnosLocal.find( turno => Number(turno.id) === Number(e.target.value));
        
        turnosLocal.forEach(TurnoI => {
            if(Number(TurnoI.id) === Number(e.target.value)){
                TurnoI.isChecked = true;
            }
        });
        this.setState({listaTurnosCreate : turnosLocal });
        this.setState({
            listaTurnosSeleccionados: resultado,
        });
        
    }
    handleCheckChieldElementEntregaRegalo= e =>{
        this.setState({errorsForm: {...this.state.errorsForm,entrega: ''}});
        let entregaLocal =  this.state.lista10;
        let resultado = entregaLocal.find( entrega => Number(entrega.id) === Number(e.target.value));
        entregaLocal.forEach(EntreI => {
            if(Number(EntreI.id) === Number(e.target.value)){
                EntreI.isChecked = true;
            }
        });
        this.setState({lista10 : entregaLocal });

        this.setState({
            listEntregaSelected: resultado,
        });
        
    }
    handleCheckChieldElementDegustacion= e =>{
        this.setState({errorsForm: {...this.state.errorsForm,degustacion: ''}});
        let degutacionLocal =  this.state.lista102;
        let resultado = degutacionLocal.find( degustacion => Number(degustacion.id) === Number(e.target.value));
        degutacionLocal.forEach(depuI => {
            if(Number(depuI.id) === Number(e.target.value)){
                depuI.isChecked = true;
            }
        });
        this.setState({lista102 : degutacionLocal });
        this.setState({
            listDegustacionSelected: resultado,
        });
        
    }
    handleCheckChieldElementMueble= e =>{
        this.setState({errorsForm: {...this.state.errorsForm,mueble: ''}});
        let muebleLocal =  this.state.lista103;
        let resultado = muebleLocal.find( mueble => Number(mueble.id) === Number(e.target.value));
        muebleLocal.forEach(muebleI => {
            if(Number(muebleI.id) === Number(e.target.value)){
                muebleI.isChecked = true;
            }
        });
        this.setState({lista103 : muebleLocal });
        this.setState({
            listMuebleSelected: resultado,
        });
        
    }
    handleCheckChieldElementConcurso= e =>{
        this.setState({errorsForm: {...this.state.errorsForm,concurso: ''}});
        let consursoLocal =  this.state.lista104;
        let resultado = consursoLocal.find( consurso => Number(consurso.id) === Number(e.target.value));
        consursoLocal.forEach(consuI => {
            if(Number(consuI.id) === Number(e.target.value)){
                consuI.isChecked = true;
            }
        });
        this.setState({lista104 : consursoLocal });
        this.setState({
            listConsursoSelected: resultado,
        });
        
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
                    errors.name ='El nombre debe tener mas de 3 caracteres!';
                } 
                if(value===''){
                    errors.name =' El nombre es requerido';
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
                
                this.setState({errorsForm: {...this.state.errorsForm,dateto: 'La fecha hasta debe ser mayor a la fecha desde verifique'}});
            }
        }
        this.setState({dateTo:date});
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
    onSelectProveedor = (selectedList, _selectedItem) =>{
        this.setState({
            listProveedorSeleted : selectedList
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  proveedor: 'Debe seleccionar al menos un Proveedor'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  proveedor: ''
                }
              });
        }   
    }
    onRemovProveedor = (selectedList, _removedItem) => {
        this.setState({
            listProveedorSeleted : selectedList
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  proveedor: 'Debe seleccionar al menos un proveedor'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  proveedor: ''
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
                  seccion: 'Debe seleccionar al menos un sección'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  seccion: ''
                }
              });
        }   
    }
    onRemovSecciones = (selectedList, _removedItem) => {
        this.setState({
            listSeccionesSeleted : selectedList
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  seccion: 'Debe seleccionar al menos una sección'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  seccion: ''
                }
              });
        }
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
    handleSubmitBs = async e =>{
        e.preventDefault();
        this.setState({loadingCreated: true});
        await this.validateFormPreSubmit();
        if(this.validateForm(this.state.errorsForm)) {
            await this.construcObjt();
            await this.CreatedCampanaPromotoras();
        }else{
            console.error('Invalid Form')
        }
        this.setState({loadingCreated: false});
    }
    construcObjt = async function(){
        
        let objectTosend= {
            cadena:this.state.listaCadenasSeleccionadas,
            name:this.state.name,
            desde: customFormatterToSent(this.state.dateFrom),
            hasta: customFormatterToSent(this.state.dateTo),
            seccion: getFirtsEmentArray(this.state.listSeccionesSeleted),
            salas: this.state.listSalasSeleted,
            id_turnos:this.state.listaTurnosSeleccionados,
            entrega_regalo:this.state.listEntregaSelected,
            degustacion:this.state.listDegustacionSelected,
            materialInt:this.state.listMuebleSelected,
            concurso_asociado:this.state.listConsursoSelected,
            proveedor: getFirtsEmentArray(this.state.listProveedorSeleted),
            description:this.state.description
        }
        this.setState({objectTosend:  objectTosend});        
        
    }
    async validateFormPreSubmit(){
        let errors = this.state.errorsForm;
        errors.name ='';
        errors.cadenas='';
        errors.dateto = '';
        errors.datefrom='';
        errors.sala = '';
        errors.seccion = '';
        errors.turnos = '';
        errors.entrega = '';
        errors.mueble = '';
        errors.consurso = '';
        errors.degustacion= '';

        if(this.state.name.length<3){
             errors.name  ='el nombre de la campaña debe tener mas de 3 caracteres!';
        }
        if(this.state.name===''){
            errors.name ='El nombre de la campaña es requerido!';
        }
        if(this.state.listaCadenasSeleccionadas === null){
            errors.cadenas='Debe Seleccionar al menos 1 cadena !'; 
        }
        if(this.state.dateFrom === null){
            errors.datefrom = 'Debe seleccionar una Fecha de inicio para la campaña';
        }
        if(this.state.dateTo === null){
            errors.dateto = 'Debe seleccionar una Fecha de fin para la campaña';
        }
        if(this.state.listSalasSeleted.length ===0){
            errors.sala = 'Debe Seleccionar al menos una o todas las salas';
        }
        if(this.state.listSeccionesSeleted.length ===0){
            errors.seccion='Debe Seleccionar al menos 1 seccion !'; 
        }
        if(this.state.listProveedorSeleted.length ===0){
            errors.proveedor='Debe Seleccionar al menos 1 proveedor !'; 
        }
        if(this.state.listaTurnosSeleccionados === null){
            errors.turnos='Debe Seleccionar al menos 1 turno !'; 
        }
        if(this.state.listEntregaSelected === null){
            errors.entrega='Debe Seleccionar una opción de entrega Regalo !'; 
        }
        if(this.state.listDegustacionSelected === null){
            errors.degustacion='Debe Seleccionar una opción de Degustación !'; 
        }
        if(this.state.listMuebleSelected === null){
            errors.mueble='Debe Seleccionar una opción de Mueble Externo !'; 
        }
        if(this.state.listConsursoSelected === null){
            errors.concurso='Debe Seleccionar una opción de Concurso Asociado !'; 
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
    CreatedCampanaPromotoras = async function(){
        let idCamapanaPromo = this.props.match.params.id;
        try{
         await CampanaPromotoraServices.updateCampana(this.state.objectTosend , idCamapanaPromo).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                swal({
                    title: `Campaña actualizada con éxito`,
                    text: "!",
                    icon: "success",
                    button: "Ok!",
                });
                this.props.history.push("/CampanasPromotoras")
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
    preSelectObject = async function(){
        this.setState({loading:true , error: null})
        let localCamapanaList = this.state.listaCadenasCreate;
        let localTurnosList = this.state.listaTurnosCreate;
        let localTurnoSeleted = null;
        let localcampanaSeleted = null;

        let localCampanaSectToedit = this.state.faldonDetailsData.cadena;
        let localTurnoSelectToedit =  this.state.faldonDetailsData.turno;
        let localname = this.state.faldonDetailsData.nombre;
        let localdescripcion = this.state.faldonDetailsData.descripcion;

        let localfrom = customFormatterDate(this.state.faldonDetailsData.desde);
        let localto = customFormatterDate(this.state.faldonDetailsData.hasta);
        let localProveedor = this.state.faldonDetailsData.proveedor;
        let localSeccion = this.state.faldonDetailsData.sesion;
        let localSalas = this.state.faldonDetailsData.salas;

        let localListEntregaRegaloOption = this.state.lista10;
        let localEntregaRegaloSelectToEdit = this.state.faldonDetailsData.entrega_regalo;
        let localEntregaRegaloSeleted = null;

        let localListDegiustacionOption = this.state.lista102;
        let localDegustacionSelectToEdit = this.state.faldonDetailsData.degustacion;
        let localDegustacionSeleted = null;

        let localListMaterialOption = this.state.lista103;
        let localMaterialToEdit = this.state.faldonDetailsData.material_externo;
        let localMaterialSeleted = null;

        let localListConsursoOption = this.state.lista104;
        let localConsursoSelectToEdit = this.state.faldonDetailsData.concurso_asociado;
        let localConcursoSeleted = null;
        let dataFileLocal64 =  this.state.faldonDetailsData.base;
        localCamapanaList.forEach(element => {
            if(Number(element.id)===Number(localCampanaSectToedit.id)){
             localcampanaSeleted= element;
                 element.isChecked = true;
            }
        });
        localTurnosList.forEach(element => {
            if(Number(element.id)===Number(localTurnoSelectToedit.id)){
                localTurnoSeleted= element;
                 element.isChecked = true;
            }
        });

        localListEntregaRegaloOption.forEach(element => {
            if(Number(element.id)===Number(localEntregaRegaloSelectToEdit)){
                localEntregaRegaloSeleted= element;
                 element.isChecked = true;
            }
        });

        localListDegiustacionOption.forEach(element => {
            if(Number(element.id)===Number(localDegustacionSelectToEdit)){
                localDegustacionSeleted= element;
                 element.isChecked = true;
            }
        });

        localListMaterialOption.forEach(element => {
            if(Number(element.id)===Number(localMaterialToEdit)){
                localMaterialSeleted= element;
                 element.isChecked = true;
            }
        });


        localListConsursoOption.forEach(element => {
            if(Number(element.id)===Number(localConsursoSelectToEdit)){
                localConcursoSeleted= element;
                 element.isChecked = true;
            }
        });
        let transFile = '';
        const BaseUrl = env.REACT_APP_BASE_URL;
        transFile = `data:application/pdf;base64,${dataFileLocal64}`;
                    fetch(transFile).then(res => {
                        res.arrayBuffer().then(buf => {
                        const fileEdit = new File([buf],   'BasesLegalesCampanaPromotoras'+localname , { type: 'pdf' })
                        this.setState({ fileEdit : fileEdit , urlFileToDownload:`${BaseUrl}/${this.state.faldonDetailsData.doc_bases_legales}`})
                        })
                    })
        
        this.setState(
            {loading:false , 
             error: null , 
             listaCadenasCreate: localCamapanaList,
             listaCadenasSeleccionadas: localcampanaSeleted,
             name:localname,
             dateFrom:localfrom,
             dateTo:localto,
             listProveedorSeleted : [localProveedor],
             listSeccionesSeleted : [localSeccion] ,
             listSalasSeleted : localSalas,
             listaTurnosSeleccionados: localTurnoSeleted,

             lista10 : localListEntregaRegaloOption,
             listEntregaSelected: localEntregaRegaloSeleted, 
             lista102 : localListDegiustacionOption,
             listDegustacionSelected : localDegustacionSeleted,
             lista103: localListMaterialOption, 
             listMuebleSelected : localMaterialSeleted,
             lista104 : localListConsursoOption,
             listConsursoSelected : localConcursoSeleted ,
             description : localdescripcion

         })
 
     }
     handleChangeStatus = ({ meta }, status) => {
        
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
                
            };
    }
    render() {
        return (
            <EditCampanaPromotoras
            state = {this.state}
            handleCheckChieldElement={this.handleCheckChieldElement}
            handleCheckChieldElementTurnos ={this.handleCheckChieldElementTurnos}

            handleCheckChieldElementEntregaRegalo={this.handleCheckChieldElementEntregaRegalo}
            handleCheckChieldElementDegustacion ={this.handleCheckChieldElementDegustacion}
            handleCheckChieldElementMueble= {this.handleCheckChieldElementMueble}
            handleCheckChieldElementConcurso={this.handleCheckChieldElementConcurso}

            handleChangeI={this.handleChangeI}
            setDateFrom={this.setDateFrom}
            setDateTo={this.setDateTo}
            onSelectProveedor={this.onSelectProveedor}
            onRemovProveedor={this.onRemovProveedor}
            onSelectSecciones={this.onSelectSecciones}
            onRemovSecciones={this.onRemovSecciones}
            onSelectSalas={this.onSelectSalas}
            onRemovSalas={this.onRemovSalas}
            handleSubmitBs={this.handleSubmitBs}
            >
            </EditCampanaPromotoras>
        )
    }
}

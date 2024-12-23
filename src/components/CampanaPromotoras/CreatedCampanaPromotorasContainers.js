import React, { Component } from 'react'
import CreatedCampanaPromotoras from './CreatedCampanaPromotoras.js';
import AdminServices from '../../services/AdminServices';
import CampanasServices from '../../services/CampanasServices';
import {customFormatterToSent , getFirtsEmentArray } from '../../util/formats';
import CampanaPromotoraServices from '../../services/CampanaPromotoraServices';

import swal from 'sweetalert';

export default class CreatedCampanaPromotorasContainers extends Component {
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
        listMuebleSelected:{nombre:'NO',id:0},
        listConsursoSelected:{nombre:'NO',id:0},

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
            file:'',

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
        lista10:[
            {nombre:'SI',id:1} , 
            {nombre:'NO',id:0} , 
        ]

    }
    async componentDidMount(){
        await this.getCadenasForCreteCampanaPromo();
        await this.getSecciones();
        await this.getSalas();
        await this.getProveedores();
        await this.getTurnosForCreteCampanaPromo();
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
    // getSalas = async function(){
    //     this.setState({loading:true , error: null})
    //      await AdminServices.getSalasUser().then((data) => {
    //         if(!data.hasOwnProperty('errorInfo')){
    //             data.data.unshift({id:0 , nombre_sap:'Todas', display_nombre_sap:'Todas'})
    //             this.setState({
    //                 loading:false,
    //                 listaSalas: data.data,
    //             });
    //         }else{
    //             this.setState({ loading:false , error : data.error})
    //         }
    //     });
    // }

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
         AdminServices.getSalasUserCadenas([resultado.id]).then((data) => {
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
        this.setState({
            listaCadenasSeleccionadas: resultado,
            listaSalas: resultado.salas_cadena,
            listSalasSeleted : []
        });
        
    }
    handleCheckChieldElementTurnos= e =>{
        this.setState({errorsForm: {...this.state.errorsForm,turnos: ''}});
        let turnosLocal =  this.state.listaTurnosCreate;
        let resultado = turnosLocal.find( turno => Number(turno.id) === Number(e.target.value));
        this.setState({
            listaTurnosSeleccionados: resultado,
        });
    }
    handleCheckChieldElementEntregaRegalo= e =>{
        this.setState({errorsForm: {...this.state.errorsForm,entrega: ''}});
        let entregaLocal =  this.state.lista10;
        let resultado = entregaLocal.find( entrega => Number(entrega.id) === Number(e.target.value));
        this.setState({
            listEntregaSelected: resultado,
        });
    }
    handleCheckChieldElementDegustacion= e =>{
        this.setState({errorsForm: {...this.state.errorsForm,degustacion: ''}});
        let degutacionLocal =  this.state.lista10;
        let resultado = degutacionLocal.find( degustacion => Number(degustacion.id) === Number(e.target.value));
        this.setState({
            listDegustacionSelected: resultado,
        });
    }
    handleCheckChieldElementMueble= e =>{
        this.setState({errorsForm: {...this.state.errorsForm,mueble: ''}});
        let muebleLocal =  this.state.lista10;
        let resultado = muebleLocal.find( mueble => Number(mueble.id) === Number(e.target.value));
        this.setState({
            listMuebleSelected: resultado,
        });
    }
    handleCheckChieldElementConcurso= e =>{
        this.setState({errorsForm: {...this.state.errorsForm,concurso: ''}});
        let consursoLocal =  this.state.lista10;
        let resultado = consursoLocal.find( consurso => Number(consurso.id) === Number(e.target.value));
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
                    errors.name ='El nombre   debe tener mas de 3 caracteres!';
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

    handleKeyDown = (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
        }
      };

    handleSubmitBs = async event =>{
        event.preventDefault();
     
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
            description:this.state.description,
            archivo_64_sin_cabecera:this.state.fileHead,
            name_archivo:this.state.fileName,
        }
        this.setState({objectTosend:  objectTosend});        
        console.log('OBJ PROMOTORAS::::::----',objectTosend)
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
        if(this.state.listConsursoSelected.id ===1){
            if(this.state.fileHead === null){
                errors.file = 'Debe seleccionar un archivo de bases legales';
            }
        }
        
        console.log('errores antes del submit' , errors)
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
        try{
         await CampanaPromotoraServices.storeCampana(this.state.objectTosend).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                swal({
                    title: `Campaña registrada con éxito`,
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
    handleChangeStatus = ({ meta }, status) => {
        console.log(status, meta)
    }
    render() {
        return (
            <CreatedCampanaPromotoras
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
            getUploadParams={this.getUploadParams}
            handleChangeStatus={this.handleChangeStatus}
            handleKeyDown={this.handleKeyDown}
            >
            </CreatedCampanaPromotoras>
        )
    }
}

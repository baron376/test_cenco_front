import React, { Component } from 'react'
import CreatedIncidencias from './CreatedIncidencias';
import CampanasServices from '../../services/CampanasServices';
import CampanaPromotoraServices from '../../services/CampanaPromotoraServices';
import IncidenciasServices from '../../services/IncidenciasServices';
import {customFormatterToSent , getFirtsEmentArray } from '../../util/formats';
import swal from 'sweetalert';

export default class CreatedIncidenciasContainers extends Component {
    state = {
        description:null,
        errorsForm: {
            description:'',
            tipoCampana:'',
            campanaProvvedor:'',
            campanaPromotora:''
        },
        listaTipoCampanaCreated:[
            {id:1 ,nombre:'Campaña Promotora'},
            {id:2 ,nombre:'Campaña Proveedor'}
        ],
        tipoCampanaSeleccionada : [],
        dataCampanaProvvedor:[],
        campanaProveedorSeleccionada: [],
        dataCampanaPromotora:[],
        campanaPromotoraSeleccionada: [],
        loadingCreate:false,
        tipoCampanaSelectAuxiliar:null,
        cadenaNombre:null,
        campanaNombre:null,
        proveedorNombre:null,
        seccionNombre:null,
        objectTosend:{tipo_campana: null , id_campana : null , descripcion_incidencia : ''},
    }
    async componentDidMount(){
        await this.getDataCampanaProveedor();
        await this.getDataCampanaPromotoras();
    }

    handleChangeI = e =>{
        this.setState({
            [e.target.name] : e.target.value
        });
        e.preventDefault();
        const { name, value } = e.target;
        let errors = this.state.errorsForm;

        switch (name) {
            case 'description': 
                errors.description ='';
                if(value.length<3){
                    errors.description ='la descripción de la incidencia debe tener mas de 3 Letras!';
                } 
                if(value===''){
                    errors.description =' El descripción es requerido';
                }
               
            break;
            default:
            break;
          }
        this.setState({errors, [name]: value});
    }
    onSelectTipoCampana = (selectedList, _selectedItem) =>{
        this.setState({
            tipoCampanaSeleccionada : selectedList,
            tipoCampanaSelectAuxiliar : getFirtsEmentArray(selectedList).id
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  tipoCampana: 'Debe seleccionar al menos un tipo de campana'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  tipoCampana: ''
                }
              });
        }   
    }
    onRemoveTipoCampana = (selectedList, _removedItem) => {
        this.setState({
            tipoCampanaSeleccionada : selectedList
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  tipoCampana: 'Debe seleccionar al menos una sección'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm, 
                  tipoCampana: ''
                }
              });
        }
    }

    getDataCampanaProveedor = async function(){
        this.setState({loadingCreate:true , error: null})
         await CampanasServices.getCampanasAll().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                let dataT = data.data.map(element => ({
                    ...element,
                    nombre_completo: element.cadena.nombre+' '+element.nombre+' '+element.proveedor.nombre
                }))
                    this.setState({loadingCreate:false, dataCampanaProvvedor: dataT});
                }else{
                    this.setState({ loadingCreate:false , error : data.error})
                }
        })
    }

    onSelectCampanaProveedor = (selectedList, _selectedItem) =>{
        this.setState({
            campanaProveedorSeleccionada : selectedList,
            cadenaNombre : _selectedItem.cadena.nombre,
            campanaNombre : _selectedItem.nombre,
            proveedorNombre: _selectedItem.proveedor.nombre,
            seccionNombre:_selectedItem.sesion.numero+' - '+_selectedItem.sesion.cdg_int+' - '+_selectedItem.sesion.nombre
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  campanaProvvedor: 'Debe seleccionar al menos una campana'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  campanaProvvedor: ''
                }
              });
        }   
    }
    onRemoveCampanaProveedor = (selectedList, _removedItem) => {
        this.setState({
            campanaProveedorSeleccionada : selectedList,
            cadenaNombre : null,
            campanaNombre : null,
            proveedorNombre: null,
            seccionNombre:null
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  campanaProvvedor: 'Debe seleccionar al menos una sección'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm, 
                  campanaProvvedor: ''
                }
              });
        }
    }

    getDataCampanaPromotoras = async function(){
        this.setState({loadingCreate:true , error: null})
        await CampanaPromotoraServices.getCampanaPromotorasAll().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                let dataT = data.data.map(element => ({
                    ...element,
                    nombre_completo: element.cadena.nombre+' '+element.nombre+' '+element.proveedor.nombre
                }))
                    this.setState({loadingCreate:false, dataCampanaPromotora: dataT});
                }else{
                    this.setState({ loadingCreate:false , error : data.error})
                }
        })
    }

    onSelectCampanaPromotora = (selectedList, _selectedItem) =>{
        this.setState({
            campanaPromotoraSeleccionada : selectedList,
            cadenaNombre : _selectedItem.cadena.nombre,
            campanaNombre : _selectedItem.nombre,
            proveedorNombre: _selectedItem.proveedor.nombre,
            seccionNombre:_selectedItem.sesion.numero+' - '+_selectedItem.sesion.cdg_int+' - '+_selectedItem.sesion.nombre
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  campanaPromotora: 'Debe seleccionar al menos una campana'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  campanaPromotora: ''
                }
              });
        }   
    }
    onRemoveCampanaPromotora = (selectedList, _removedItem) => {
        this.setState({
            campanaPromotoraSeleccionada : selectedList,
            cadenaNombre : null,
            campanaNombre : null ,
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  campanaPromotora: 'Debe seleccionar al menos una seccion'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm, 
                  campanaPromotora: ''
                }
              });
        }
    }
    handleSubmitBs = async e =>{
        e.preventDefault();
        await this.validateFormPreSubmit();
        if(this.validateForm(this.state.errorsForm)) {
            swal({
                title: "Esta seguro que desea Crear la Incidencia ?",
                text: " ",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    this.construcObjt();
                    this.createIncidencia();
                }
            });
        }else{
           return
        }
    }
    async validateFormPreSubmit(){
        let errors = this.state.errorsForm;
        errors.description ='';
        errors.tipoCampana = '';
        errors.campanaProvvedor = '';
        errors.campanaPromotora = '';
        if(this.state.tipoCampanaSeleccionada.length<1){
            errors.tipoCampana = 'Debe seleccionar al menos un tipo de Campaña!';
        }
        if(this.state.tipoCampanaSelectAuxiliar === 1){
            if(this.state.campanaPromotoraSeleccionada.length<1){
                errors.campanaPromotora = 'Debe seleccionar al menos una Campaña!';
            }
        }
        if(this.state.tipoCampanaSelectAuxiliar === 2){
            if(this.state.campanaProveedorSeleccionada.length<1){
                errors.campanaProvvedor = 'Debe seleccionar al menos un Proveedor!';
            }
        } 
        if(this.state.description==='' || this.state.description===null){
            errors.description ='La Descripción es requerida!';
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
    construcObjt = async function(){
        let CampanaIdPromotora = null;
        let CampanaIdProveedor = null;
        if(this.state.tipoCampanaSelectAuxiliar === 1){
            CampanaIdPromotora = getFirtsEmentArray(this.state.campanaPromotoraSeleccionada).id;
        }
        if(this.state.tipoCampanaSelectAuxiliar === 2){
            CampanaIdProveedor = getFirtsEmentArray(this.state.campanaProveedorSeleccionada).id;
        }
        let objectTosend= {
            tipo_campana: getFirtsEmentArray(this.state.tipoCampanaSeleccionada).nombre , 
            id_campana_promotora : CampanaIdPromotora ,
            id_campana_proveedor : CampanaIdProveedor,
            descripcion_incidencia : this.state.description,
        }
        this.setState({objectTosend:  objectTosend});        
        console.log('Objeto armado::::::---- ',objectTosend)
    }
    createIncidencia = async function(){

        try{
         await IncidenciasServices.storeIncidencia(this.state.objectTosend).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                swal({
                    title: `Incidencia registrada con éxito`,
                    text: "!",
                    icon: "success",
                    button: "Ok!",
                });
                this.props.history.push("/Incidencias")
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
            this.setState({loadingCreate:false , error: error})
        }

    }
    render() {
        return (
            <CreatedIncidencias
            state = {this.state}
            handleChangeI={this.handleChangeI}
            onSelectTipoCampana={this.onSelectTipoCampana}
            onRemoveTipoCamapna={this.onRemoveTipoCampana}
            onSelectCampanaProveedor={this.onSelectCampanaProveedor}
            onRemoveCampanaProveedor={this.onRemoveCampanaProveedor}
            onSelectCampanaPromotora={this.onSelectCampanaPromotora}
            handleSubmitBs={this.handleSubmitBs}
            onRemoveCampanaPromotora={this.onRemoveCampanaPromotora}>
            </CreatedIncidencias>
        )
    }
}

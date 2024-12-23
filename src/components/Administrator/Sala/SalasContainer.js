import React, { Component } from 'react';
import Sala from './Salas';
import AdminServices from '../../../services/AdminServices';
import swal from 'sweetalert';
import $ from "jquery";
import { faPencilAlt , faEye , faTrashAlt, faThumbsDown, faThumbsUp , faLayerGroup} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../styles/users.css';
import {hasPermission} from '../../../util/auth';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import CampanasServices from '../../../services/CampanasServices';

export default class SalasContainer extends Component {
    state = {
        modalIsopen:false,
        modalCreateTitle:'Created User',
        modalTitle:'Crear Sala',
        dataActive:[],
        dataCadena:[],
        dataInactive: [],
        dataActiveAll:[],
        dataInactiveAll: [],
        dataDeleted: [],
        dataDeletedAll: [],
        error: null,
        errorsForm: {
            cdg_sap:'',
            name: '',
            direccion:'',
            cadenas:'',
            region:'',
            provincia:'',
            comuna:'',
            zona_err:'',
            tipo_err:''
        },
        headData:[{
            dataField: '',
            text: ''
        }],
        cdg_sap:'',
        name: '',
        zona_err: '',
        tipo_err: '',
        direccion:'',
        loading: false,
        listaCadenas:[],
        cadenaSeleccionada:[],
        listaZonas:[],
        listaTipoSalas:[],
        listaTipoSalasAll:[],
        listaZonasModal:[],
        ZonaSeleccionada:[],
        ZonaModalSeleccionada:[],
        TipoSalaeleccionada:[],
        dataRegiones:[],
        regionesSeleccionada:[],
        provinciasSeleccionada:[],
        comunasSeleccionada:[],
        dataComuna:[],
        editCadenaEstate:false,
        cadenaDetailsData:{},
        cdgDetailsData:{}
    }
    /*constructor(){
        super();
    }*/
    async componentDidMount(){
        await this.trasfData();
        await this.getSalaActive();
        await this.getSalaDelete();
        await this.getSalaInactive();
        await this.getCadena();
        await this.getZonas();
        await this.getRegiones();
        await this.getTipoSalas();
    }
    onSelectCadenas = (selectedItem) =>{
        this.setState({
            cadenaSeleccionada : selectedItem
        });
        let zona = this.state.ZonaSeleccionada;
        this.filtrarSalas(selectedItem,zona);
    }
    onRemoveCadenas = (selectedList, removedItem) => {
        console.log('pruebas selector cuando remueve' , selectedList, removedItem)
        this.setState({
            cadenaSeleccionada : []
        });
        let zona = this.state.ZonaSeleccionada;
        this.filtrarSalas([],zona);
    }

    onSelectCadenasModal = (selectedItem) =>{
        this.setState({
            cadenaSeleccionada : selectedItem,
            listaTipoSalas : this.state.listaTipoSalasAll.filter(tipoSala => tipoSala.id_cadena == selectedItem[0].id)
        });
    }
    onRemoveCadenasModal = (selectedList, removedItem) => {
        this.setState({
            cadenaSeleccionada : []
        });
    }

    onSelectZonas = (selectedItem) =>{
        this.setState({
            ZonaSeleccionada : selectedItem
        });
        let cadena = this.state.cadenaSeleccionada;
        this.filtrarSalas(cadena,selectedItem);
    }

    onRemoveZonas = (selectedList, removedItem) => {
        console.log('pruebas selector cuando remueve' , selectedList, removedItem)
        this.setState({
            ZonaSeleccionada : []
        });
        let cadena = this.state.cadenaSeleccionada;
        this.filtrarSalas(cadena,[]);
    }

    onSelectZonasModal = (selectedItem) =>{
        this.setState({
            ZonaModalSeleccionada : selectedItem
        });
    }

    onRemoveZonasModal = (selectedList, removedItem) => {
        this.setState({
            ZonaModalSeleccionada : []
        });
    }

    onSelectTipoSalas = (selectedItem) =>{
        this.setState({
            TipoSalaeleccionada : selectedItem
        });
    }

    onRemoveTipoSalas = (selectedList, removedItem) => {
        this.setState({
            TipoSalaeleccionada : []
        });
    }

    getCadena = async function(){
        this.setState({loading:true , error: null})
        await AdminServices.getCadenas().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, dataCadena: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }

    getZonas = async function(){
        this.setState({loading:true , error: null})
        await CampanasServices.getzonas().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({
                    loading:false,
                    listaZonas: data.data,
                    listaZonasModal: data.data
                });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
    }

    onSelectRegiones = (selectedItem) =>{
        this.setState({
            regionesSeleccionada : selectedItem,
            provinciasSeleccionada:[],
            comunasSeleccionada:[],
        })
        this.getComunasByRegion(selectedItem[0]['id']);  ;
    } 
    onRemoveRegiones = (selectedList, removedItem) => {
        console.log('pruebas selector cuando remueve' , selectedList, removedItem)
        this.setState({
            regionesSeleccionada : [],
            provinciasSeleccionada:[],
            comunasSeleccionada:[],
        })
    }
    getRegiones = async function(){
        this.setState({loading:true , error: null})
        await AdminServices.getRegiones().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, dataRegiones: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })        
    }
    getTipoSalas = async function(){
        this.setState({loading:true , error: null})
        await AdminServices.getTiposSala().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, listaTipoSalas: data.data, listaTipoSalasAll : data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })        
    }
    getProvincias = async function(cadenas){
        this.setState({loading:true , error: null })
        let data = [];
        if(cadenas.length !== 0){
            cadenas.forEach(element => {
                data = data.concat(element.provincias)
            })
        }else{
                data = [];
        }
        this.setState({
            loading:false,
            listaSelecProvincias: data,
        }) 
    }
    getComunasByRegion = async function(comuna){
        this.setState({loading:false , error: null})
        await AdminServices.getComunasByRegion(comuna).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, dataComuna: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }
    onSelectProvincias = (selectedItem) =>{
        this.setState({
            provinciasSeleccionada : selectedItem,
            comunasSeleccionada:[]
        })
        this.getComunas(selectedItem[0]['id']);  ;
    }
    onRemoveProvincias = (selectedList, removedItem) => {
        console.log('pruebas selector cuando remueve' , selectedList, removedItem)
        this.setState({
            provinciasSeleccionada : [],
            comunasSeleccionada:[]
        })
    }
    getComunas = async function(comuna){
        console.log('ssss',comuna);
        this.setState({loading:false , error: null})
        await AdminServices.getComunas(comuna).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, dataComuna: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }
    onSelectComuna = (selectedItem) =>{
        this.setState({
            comunasSeleccionada : selectedItem
        })
        //this.getComunas(selectedItem[0]['id']);  ;
        if(selectedItem.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  comuna: 'Debe seleccionar al menos una rol'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  comuna: ''
                }
            });
        }
    }
    onRemoveComuna = (selectedList, removedItem) => {
        console.log('pruebas selector cuando remueve' , selectedList, removedItem)
    }
    getSalaActive = async function(){
        this.setState({loading:true , error: null})
        await AdminServices.getSalasActivas().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, dataActive: data.data , dataActiveAll: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }
    getSalaInactive = async function(){
        this.setState({loading:true , error: null})
        await AdminServices.getSalaInactive().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, dataInactive: data.data  , dataInactiveAll: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }      
    getSalaDelete = async function(){
        this.setState({loading:true , error: null})
        await AdminServices.getSalaDelete().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, dataDeleted: data.data, dataDeletedAll: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }

    filtrarSalas = async function(cadena,zona){
        let active = this.state.dataActiveAll;
        let inactive = this.state.dataInactiveAll;
        let deleted = this.state.dataDeletedAll;
        if(cadena.length != 0){
            if(zona.length != 0){
                active = [];
                inactive = [];
                deleted = [];
                this.state.dataActiveAll.forEach(sala => {
                    if(sala.id_cadena == cadena[0]['id'] && sala.id_zona == zona[0]["id"]){
                        active.push(sala);
                    }
                })

                this.state.dataInactiveAll.forEach(sala => {
                    if(sala){
                        if(sala.id_cadena == cadena[0]['id'] && sala.id_zona == zona[0]["id"]){
                            inactive.push(sala);
                        }
                    }
                })

                this.state.dataDeletedAll.forEach(sala => {
                    if(sala){
                        if(sala.id_cadena == cadena[0]['id'] && sala.id_zona == zona[0]["id"]){
                            deleted.push(sala);
                        }
                    }
                })

                this.setState({ 
                    dataActive: active , 
                    dataInactive : inactive,
                    dataDeleted : deleted,
                })
            }
            else{
                active = [];
                inactive = [];
                deleted = [];
                this.state.dataActiveAll.forEach(sala => {
                    if(sala.id_cadena == cadena[0]['id']){
                        active.push(sala);
                    }
                })

                this.state.dataInactiveAll.forEach(sala => {
                    if(sala){
                        if(sala.id_cadena == cadena[0]['id']){
                            inactive.push(sala);
                        }
                    }
                })

                this.state.dataDeletedAll.forEach(sala => {
                    if(sala){
                        if(sala.id_cadena == cadena[0]['id']){
                            deleted.push(sala);
                        }
                    }
                })

                this.setState({ 
                    dataActive: active , 
                    dataInactive : inactive,
                    dataDeleted : deleted,
                })
            }
        }
        else{
            if(zona.length != 0){
                active = [];
                inactive = [];
                deleted = [];
                this.state.dataActiveAll.forEach(sala => {
                    if(sala.id_zona == zona[0]["id"]){
                        active.push(sala);
                    }
                })

                this.state.dataInactiveAll.forEach(sala => {
                    if(sala){
                        if(sala.id_zona == zona[0]["id"]){
                            inactive.push(sala);
                        }
                    }
                })

                this.state.dataDeletedAll.forEach(sala => {
                    if(sala){
                        if(sala.id_zona == zona[0]["id"]){
                            deleted.push(sala);
                        }
                    }
                })

                this.setState({ 
                    dataActive: active , 
                    dataInactive : inactive,
                    dataDeleted : deleted,
                })
            }
            else{
                this.setState({ 
                    dataActive: active , 
                    dataInactive : inactive,
                    dataDeleted : deleted,
                })
            }
        }
    }

    async validateFormPreSubmit(){
        let errors = this.state.errorsForm;
        errors.cdg_sap=''; 
        errors.name=''; 
        errors.direccion=''; 
        errors.cadenas=''; 
        errors.region=''; 
        errors.provincia=''; 
        errors.comuna='';                
        errors.zona_err='';                
        errors.tipo_err='';                
        if(this.state.name===''){
            errors.name ='El nombre de la Sala es requerido!';
        }
        if(this.state.cdg_sap.length<4){
            errors.cdg_sap ='El CDG  de la Sala debe tener mas de 3 caracteres!';
        }
        if(this.state.ZonaModalSeleccionada.length<1){
            errors.zona_err ='La zona  de la Sala es requerido!';
        }
        if(this.state.TipoSalaeleccionada.length<1){
            errors.tipo_err ='El tamaño de la Sala es requerido!';
        }
        if(this.state.cdg_sap===''){
           errors.cdg_sap ='El CDG  de la Sala es requerido!';
        }else{
            await this.getCdgSala(this.state.cdg_sap);
            if(this.state.cdgDetailsData['id']){
                if(!this.state.editCadenaEstate){
                    errors.cdg_sap =' El Código de la sala ya existe';
                }               
            }
        }
        if(this.state.direccion===''){
            errors.direccion ='La Dirección de la sala es requerido!';
        }
        if(this.state.cadenaSeleccionada.length<1){
            errors.cadenas = 'Debe seleccionar una cadena para la Sala!';
        }
        if(this.state.regionesSeleccionada.length<1){
            errors.region = 'Debe seleccionar una Región para la Sala!';
        }
        // if(this.state.provinciasSeleccionada.length<1){
        //     errors.provincia = 'Debe seleccionar una Provincia para la Sala!';
        // }
        if(this.state.comunasSeleccionada.length<1){
            errors.comuna = 'Debe seleccionar una Comuna para la Sala!';
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
    handleSubmitBs = async e =>{
        e.preventDefault();
        await this.validateFormPreSubmit();
        if(this.validateForm(this.state.errorsForm)) {
            if(!this.state.editCadenaEstate){
                swal({
                    title: "Esta seguro de Guardar la Sala?",
                    text: "La Sala se habilitara para todo el Sistema!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        this.createSalas()
                    }
                });
            }else{
                swal({
                    title: "Esta seguro de Actualizar la Sala?",
                    text: "La Sala se habilitara para todo el Sistema!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        this.updateSala()
                    }
                });
            }    
        }else{
            return
        }   
    }
    createSalas = async function(){        
        let newSala = ({
            id_cadena:this.state.cadenaSeleccionada[0]['id'],
            nombre_sap:this.state.name,
            direccion:this.state.direccion,
            cdg_local: this.state.cdg_sap,
            id_region: this.state.regionesSeleccionada[0]['id'],
            id_provincia: this.state.comunasSeleccionada[0]['id_provincia'],
            id_comuna: this.state.comunasSeleccionada[0]['id'],
            id_tipo_sala: this.state.TipoSalaeleccionada[0]['id'],
            id_zona: this.state.ZonaModalSeleccionada[0]['id']
        });
        this.setState({
            formAlldate : newSala
        })
        try{
            this.setState({loading:true , error: null})
            AdminServices.storeSala(newSala).then((data) => {                
                console.log('esto es le retornoooooooooooooooooooo' ,data)
                if(!data.hasOwnProperty('errorInfo')){
                    swal({
                        title: `¡Salas registrada con Éxito!`,
                        //text: "!",
                        icon: "success",
                        button: "Ok!",
                    });
                }else{
                    swal({
                        title: `Error ${data.data.errorInfo.toString()} `,
                        text: "!",
                        icon: "error",
                        button: "Ok!",
                    });
                }
            })
            $('.modal-backdrop').remove();
            this.deleteVariables();
            await this.trasfData();
            await this.getSalaActive();
            await this.getSalaDelete();
            await this.getSalaInactive();
            await this.getCadena();
            await this.getRegiones();
            this.setState({loading:false , error: null})
        } catch(error){
            this.setState({loading:false , error: error})
        }
    }
    updateSala = async function(){ 
        this.setState({loading:true})
        let UpdateSala = ({
            id_cadena:this.state.cadenaSeleccionada[0]['id'],
            nombre_sap:this.state.name,
            direccion:this.state.direccion,
            cdg_local: this.state.cdg_sap,
            id_region: this.state.regionesSeleccionada[0]['id'],
            id_provincia: this.state.comunasSeleccionada[0]['id_provincia'],
            id_comuna: this.state.comunasSeleccionada[0]['id'],
            id_tipo_sala: this.state.TipoSalaeleccionada[0]['id'],
            id_zona: this.state.ZonaModalSeleccionada[0]['id']
        });
        this.setState({
            formAlldate : UpdateSala
        })
        try{
            AdminServices.updateSala(UpdateSala, this.state.cadenaDetailsData.id).then((data) => {
                console.log('esto es le retornoooooooooooooooooooo' ,data)
                if(!data.hasOwnProperty('errorInfo')){
                    swal({
                        title: `¡Sala Actualizada con Éxito!`,
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
            await this.deleteVariables();
            await this.trasfData();
            await this.getSalaActive();
            await this.getSalaDelete();
            await this.getSalaInactive();
            await this.getCadena();
            await this.getRegiones();
            this.setState({loading:false , error: null})
        } catch(error){
            this.setState({loading:false , error: error})
        }
    }
    deleteSalas = async function(sala){
        swal({
            title: "Esta seguro que desea Eliminar la Sala ?",
            text: "La Sala no podrá ser usada en el sistema!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {        
                let deleteSala = ({
                    id:sala
                });
                console.log(deleteSala)
                this.setState({
                    formAlldate : deleteSala
                })
                try{
                    this.setState({loading:true , error: null})
                    AdminServices.deleteSala(deleteSala).then((data) => {
                        if (data instanceof Error) {
                            let errorMessage = '';
                            if (data.response.status === 400) {
                              errorMessage = data.response.data;
                            } else {
                              errorMessage = `Error ${data.response.data.toString()}`;
                            }
                            swal({
                              title: errorMessage,
                              icon: "error",
                              button: "Ok!",
                            });
                          } else {
                            swal({
                              title: `Sala eliminada con éxito`,
                              icon: "success",
                              button: "Ok!",
                            });
                          }
                        });
                    //this.deleteVariables();
                    this.setState({loading:false , error: null})
                } catch(error){
                    this.setState({loading:false , error: error})
                }
            }
        });
    }
    statusSalas = async function(sala){
        swal({
            title: "Esta seguro que desea Desactivar la Sala ?",
            text: "La Sala no podrá ser usada en el sistema!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
        
                let statusSalas = ({
                    id:sala
                });
                console.log(statusSalas)
                this.setState({
                    formAlldate : statusSalas
                })
                try{
                    this.setState({loading:true , error: null})
                    AdminServices.statusSalas(statusSalas).then((data) => {
                        console.log('esto es le retornoooooooooooooooooooowwEE' ,data)
                        if(!data.hasOwnProperty('errorInfo')){
                            swal({
                                title: `¡Sala Desactivada con Éxito!`,
                                //text: "!",
                                icon: "success",
                                button: "Ok!",
                            });
                            this.setState({modalIsopen:false})
                            this.getSalaActive();
                            this.getSalaDelete();
                            this.getSalaInactive();
                            this.setState({modalIsopen:false})
                        }else{
                            swal({
                                title: `Error ${data.errorInfo.toString()} `,
                                text: "!",
                                icon: "error",
                                button: "Ok!",
                            });
                        }
                    })
                    //this.deleteVariables();
                    this.setState({loading:false , error: null})
                    
                } catch(error){
                    this.setState({loading:false , error: error})
                }
            }
        });
    }
    InactivestatusSalas = async function(sala){
        swal({
            title: "Esta seguro que desea Activar la Sala ?",
            text: "La Sala podrá ser usada en el sistema!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
        
                let statusSalas = ({
                    id:sala
                });
                console.log(statusSalas)
                this.setState({
                    formAlldate : statusSalas
                })
                try{
                    this.setState({loading:true , error: null})
                    AdminServices.statusSalas(statusSalas).then((data) => {
                        console.log('esto es le retornoooooooooooooooooooowwEE' ,data)
                        if(!data.hasOwnProperty('errorInfo')){
                            swal({
                                title: `¡Sala Activada con Éxito!`,
                                //text: "!",
                                icon: "success",
                                button: "Ok!",
                            });
                            this.getSalaActive();
                            this.getSalaDelete();
                            this.getSalaInactive();
                            this.setState({modalIsopen:false})
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
                } catch(error){
                    this.setState({loading:false , error: error})
                }
            }
        });
    }
    handleClickBs = e =>{
        console.log('boton precionDO');
    }
    cadenaFormater (cell){
        //let namesCad = cell.map(cad => cad.nombre)
        let namesCad = cell.nombre
        return namesCad;
    }
    newOrEditSala = async (sala) =>{
        if(sala === 0){
            this.setState({loadingModalEdit:true});
            await this.deleteVariables();
            this.setState({modalIsopen:true});            
            this.setState({modalIsopen:true , modalTitle:'Crear Sala'});
            this.setState({loadingModalEdit:false});
        }else{
            this.setState({modalIsopen:true , modalTitle:'Editar Sala', loadingModalEdit:true});
            await this.getDetailsSala(sala);
            await this.setVarEditSala();
            this.setState({loadingModalEdit:false});
        }
    }

    limpiarFiltros = async (sala) =>{
        this.setState({
            cadenaSeleccionada : [],
            ZonaSeleccionada : []
        });

        this.filtrarSalas([],[]);
    }

    getDetailsSala = async function(salaId){
        this.setState({loading:false , error: null})
        await AdminServices.getSalasDetail(salaId).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, cadenaDetailsData: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }
    getCdgSala = async function(salaCdg){
        this.setState({loading:false , error: null})
        await AdminServices.getCdgDetail(salaCdg).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, cdgDetailsData: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }
    setVarShowSala = async () =>{
        this.setState(
            {
               modalTitle:'Detalles de la Sala',
               editCadenaEstate:true,
               id_cadena:this.state.cadenaDetailsData.id_cadena,
               cdg_sap:this.state.cadenaDetailsData.cdg_local,
               name:this.state.cadenaDetailsData.nombre_sap,
               direccion:this.state.cadenaDetailsData.direccion,
               id_provincia:this.state.cadenaDetailsData.id_provincia,
               id_region:this.state.cadenaDetailsData.id_region,
               id_comuna:this.state.cadenaDetailsData.id_comuna,
               cadenaSeleccionada: [this.state.cadenaDetailsData.cadenas_salas],
               cadenaName: this.state.cadenaDetailsData.cadenas_salas['nombre'],
               regionesSeleccionada: [this.state.cadenaDetailsData.region],
               regionesName: this.state.cadenaDetailsData.region['region_nombre'],
               comunasSeleccionada: [this.state.cadenaDetailsData.comunas],
            })
            if(this.state.cadenaDetailsData.provincia != null){
                this.setState({provinciasSeleccionada:[this.state.cadenaDetailsData.provincia], provinciaName: this.state.cadenaDetailsData.provincia['provincia_nombre']})
            }else{
                this.setState({provinciaName: 'Sin Información'})
            }
        this.setState({modalIsopen:true})
    }
    setVarEditSala = async () =>{
        this.setState(
            {
               modalTitle:'Editar Sala',
               editCadenaEstate:true,
               id_cadena:this.state.cadenaDetailsData.id_cadena,
               cdg_sap:this.state.cadenaDetailsData.cdg_local,
               name:this.state.cadenaDetailsData.nombre_sap,
               direccion:this.state.cadenaDetailsData.direccion,
               id_provincia:this.state.cadenaDetailsData.id_provincia,
               id_region:this.state.cadenaDetailsData.id_region,
               id_comuna:this.state.cadenaDetailsData.id_comuna,
               cadenaSeleccionada: [this.state.cadenaDetailsData.cadenas_salas],
               regionesSeleccionada: [this.state.cadenaDetailsData.region],
               comunasSeleccionada: [this.state.cadenaDetailsData.comunas], 
               ZonaModalSeleccionada: [this.state.cadenaDetailsData.zona],
               TipoSalaeleccionada: [this.state.cadenaDetailsData.tipo]             
            })
            if(this.state.cadenaDetailsData.provincia != null){
                this.setState({provinciasSeleccionada:[this.state.cadenaDetailsData.provincia]})
            }
        this.setState({modalIsopen:true})
    }
    showSala = async (sala) =>{
        this.setState({modalIsopen:true , modalTitle:'Detalle de Sala', loadingModalShow:true});
            await this.getDetailsSala(sala);
            await this.setVarShowSala();
        this.setState({loadingModalShow:false});
    }
    actionsFormater(cell , row){
        if(row.id_estatus_salas ===1 && row.deleted_at === null){
            return(
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu"> 
                        {hasPermission([114]) &&
                            <button  title="Ver detalles" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"  onClick={() => {this.showSala(row.id)}}><FontAwesomeIcon icon={faEye}/> Ver detalles</button>
                        }    
                        {hasPermission([106]) &&
                            <button  title="Editar" className="dropdown-item" data-toggle="modal" data-target="#modal-lg"  onClick={() => {this.newOrEditSala(row.id)}}><FontAwesomeIcon icon={faPencilAlt}/> Editar</button>
                        }               
                        {hasPermission([107]) &&
                            <button   title="Desactivar" className="dropdown-item"   onClick={() => {this.statusSalas(row.id)}}> <FontAwesomeIcon icon={faThumbsDown} /> Desactivar</button>
                        }
                        <Link to={`/SalasCupo-${row.id}`} title="Editar Cupo" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"  ><FontAwesomeIcon icon={faLayerGroup}/> Editar Cupo</Link>
                        {hasPermission([108]) &&
                            <button  title="Eliminar"   className="dropdown-item btn-delete" onClick={() => {this.deleteSalas(row.id)}}> <FontAwesomeIcon icon={faTrashAlt} /> Eliminar</button>
                        }
                    </div>
                </div>
            )
        }
        if(row.id_estatus_salas ===2 && row.deleted_at === null){
            return(
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">    
                        {hasPermission([114]) &&
                            <button  title="Ver detalles" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"  onClick={() => {this.showSala(row.id)}}><FontAwesomeIcon icon={faEye}/> Ver detalles</button>
                        }  
                        {hasPermission([106]) &&
                            <button  title="Editar" className="dropdown-item" data-toggle="modal" data-target="#modal-lg"  onClick={() => {this.newOrEditSala(row.id)}}><FontAwesomeIcon icon={faPencilAlt}/> Editar</button>
                        }              
                        {hasPermission([107]) &&
                            <button   title="Activar" className="dropdown-item"   onClick={() => {this.InactivestatusSalas(row.id)}}> <FontAwesomeIcon icon={faThumbsUp} /> Activar</button>
                        }
                        {hasPermission([108]) &&
                            <button  title="Eliminar"   className="dropdown-item btn-delete" onClick={() => {this.deleteSalas(row.id)}}> <FontAwesomeIcon icon={faTrashAlt} /> Eliminar</button>
                        }
                    </div>
                </div>
            )
        }
        if(row.deleted_at != null){
            return(
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">                    
                        {hasPermission([114]) &&
                            <button  title="Ver detalles" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"  onClick={() => {this.showSala(row.id)}}><FontAwesomeIcon icon={faEye}/> Ver detalles</button>
                        }
                    </div>
                </div>
            )
        }

    }
    trasfData = async function(){
        this.setState({
            loading:true,
        });
        const columns = [
            {
                dataField: 'cadenas_salas',
                text: 'Cadena',
                formatter:this.cadenaFormater,
                headerStyle: {
                    width: '6%',
                  },
                sort: true,
                
            },
            {
                dataField: 'cdg_local',
                sort: true,
                text: 'CDG Local',
                headerStyle: {
                    width: '6%'
                  },
                //sort: true,
            }, 
            {
                dataField: 'nombre_sap',
                text: 'Nombre',
                headerStyle: {
                    width: '10%'
                  },
                sort: true,
            }, 
            {
                dataField: 'direccion',
                text: 'Dirección',
                headerStyle: {
                    width: '10%'
                  },
                sort: true,
            },
            {
                dataField: 'actions',
                text: 'Acciones',
                formatter:this.actionsFormater.bind(this),
                headerStyle: {
                    width: '5%'
                }
            },    
        ];
          this.setState({
            loading:false,
            headData: columns,
        });
    }
    handleCloseModal = e =>{
        this.setState({modalIsopen:false})
    }
    handleOpenModal = e =>{
        this.setState({modalIsopen:true})
    }
    handleChangeI = e =>{
        this.setState({
            [e.target.name] : e.target.value
        });
        const { name, value } = e.target;
        let errors = this.state.errorsForm;
        switch (name) {
            case 'name': 
                errors.name ='';
                if(value===''){
                    errors.name ='El nombre de la Sala es requerido!';
                }
            break;
            case 'cdg_sap': 
                errors.cdg_sap ='';
                if(value===''){
                    errors.cdg_sap ='El CDG  de la Sala es requerido!';
                }
                if(value.length<4){
                    errors.cdg_sap ='El CDG  de la Sala debe tener mas de 3 caracteres!';
                }
            break;
            case 'direccion': 
                errors.direccion ='';               
                if(value===''){
                    errors.direccion ='La Dirección de la Sala es requerido!';
                }
            break;
            default:
              break;
          }
        this.setState({errors, [name]: value});

    }
    deleteVariables = e =>{
        this.setState({
            modalIsopen:false,
            modalCreateTitle:'Created Sala',
            modalTitle:'Crear Sala',
            cdg_sap:'',
            name:'',
            direccion:'',
            listaCadenasSeleccionadas:[],
            cadenaSeleccionada:[],
            regionesSeleccionada:[],
            provinciasSeleccionada:[],
            comunasSeleccionada:[],
            editCadenaEstate:false,
            cadenaDetailsData:{},
            cdgDetailsData:{},
            errorsForm: {
                cdg_sap:'',
                name: '',
                direccion:'',
                cadenas:'',
                region:'',
                provincia:'',
                comuna:'',
            }
        });
    }
    render() {
        return (           
            <Sala
            state = {this.state}
            modalIsopen={this.state.modalIsopen}            
            newOrEditSala={this.newOrEditSala}
            limpiarFiltros={this.limpiarFiltros}
            onCloseModal={this.handleCloseModal}
            onOpenModal={this.handleOpenModal}
            handleChangeI={this.handleChangeI}
            deleteVariables = {this.deleteVariables}
            onSelectCadenas={this.onSelectCadenas}
            onRemoveCadenas={this.onRemoveCadenas}
            onSelectCadenasModal={this.onSelectCadenasModal}
            onRemoveCadenasModal={this.onRemoveCadenasModal}
            onSelectZonas={this.onSelectZonas}
            onSelectZonasModal={this.onSelectZonasModal}
            onRemoveZonas={this.onRemoveZonas}
            onRemoveZonasModal={this.onRemoveZonasModal}
            onSelectRegiones = {this.onSelectRegiones}
            onRemoveRegiones = {this.onRemoveRegiones}
            onSelectProvincias = {this.onSelectProvincias}
            onRemoveProvincias = {this.onRemoveProvincias}
            onSelectComuna = {this.onSelectComuna}
            onRemoveComuna ={this.onRemoveComuna}
            handleSubmitBs={this.handleSubmitBs}
            onSelectTipoSalas = {this.onSelectTipoSalas}
            onRemoveTipoSalas ={this.onRemoveTipoSalas}
            modalTitle={this.state.modalTitle}
            >
            </Sala>           
        )
    }
}
                                            
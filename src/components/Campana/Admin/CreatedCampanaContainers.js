import React, { Component } from 'react'
import CreatedCampanas from './CreatedCampana';
import AdminServices from '../../../services/AdminServices';
import CampanasServices from '../../../services/CampanasServices';
import {customFormatterToSent , getFirtsEmentArray } from '../../../util/formats';
import swal from 'sweetalert';
export default class CreatedCampanaContainers extends Component {
    state = {
        listaCadenasCreate:[],
        listaCadenasSeleccionadas:[],
        prueba:[],
        listaProveedores:[],
        listProveedorSeleted:[],
        listaSecciones:[],
        listSeccionesSeleted:[],
        listaZonas:[],
        listaZonasAll:[],
        listZonasSeleted:[],
        listaSalas:[],
        listSalasSeleted:[],
        espaciosDatas:[],
        name:'',
        dateFrom:'',
        dateTo:'',
        minDateValue:'',
        espaciosSeleccionada:[],
        listaZonasExhibicion:[],
        listZonasExhibicionSeleted:[],
        listaTipoSalas: [],
        listaTipoSalasAll:[],
        TipoSalaeleccionada:[],
        //dateFrom:null,
        //dateTo:null,
        description:'',
        material:null,
        errorsForm: {
            cadena: '',
            name:'',
            desde:'',
            hasta:'',
            proveedor:'',
            seccion:'',
            zona:'',
            zonaExhibicion:'',
            salas:'',
            espacio:'',
            description:''
        },
        objectTosend:{
            cadena: null,
            name: null,
            dateFrom: null,
            dateTo:null,
            proveedor:null,
            seccion:null,
            zona:null,
            salas:null,
            description: null,
            materialInt: 0,
            espacio:null           
        },
        material: false,
        materialInt: 0,
    }
    constructor(){
        super(); 
    } 
    async componentDidMount(){
        let date = new Date();
        date.setDate(date.getDate() + 1);  // tomorrow
        const minDateValue = date.toISOString();
        this.setState({
            minDateValue:minDateValue
        });
        
        await this.getCadenas();
        await this.getProveedores();
        await this.getSecciones();
        await this.getTipoSalas();
        await this.getZonas();
        await this.getEspacios();
        await this.getZonasExhibicion();
    }

    getCadenas = async function(){
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

    getTipoSalas = async function(){
        this.setState({loading:true , error: null})
        let dataTiposSala = [];
        dataTiposSala [0] = {id:0 , nombre:'Todas'}
        await AdminServices.getTiposSala().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                dataTiposSala = dataTiposSala.concat(data.data);
                this.setState({loading:false, listaTipoSalas: dataTiposSala, listaTipoSalasAll : dataTiposSala});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })        
    }

    onRemoveTipoSalas = (selectedList, removedItem) => {
        this.setState({
            TipoSalaeleccionada : []
        });
    }

    onSelectTipoSalas = (selectedList, _selectedItem) =>{
        if(Number(_selectedItem.id) === 0){
            let arrayTipoSalasTodas = this.state.listaTipoSalas;
            arrayTipoSalasTodas.shift();
            this.setState({
                TipoSalaeleccionada : arrayTipoSalasTodas
            })
            this.getSalasByTipo(arrayTipoSalasTodas);
        }
        else{
            this.setState({
                TipoSalaeleccionada : selectedList,
                listaZonas:[],
                listSalasSeleted:[],
            })
            this.getSalasByTipo(selectedList);
        }
    }
    
    getSalasByTipo = async function(tiposDeSala){
        this.setState({loading:true , error: null })
        let data = [];
        let cadena  =  this.state.listaCadenasSeleccionadas;
        data [0] = {id:0 , nombre:'Todas'}
        if(tiposDeSala.length !== 0){
            tiposDeSala.forEach(tipoZona => {
                this.state.listaZonasAll.forEach(zona => {
                    if(zona.id !== 0){
                        var flagTipo = zona.salas.filter(s => s.id_tipo == tipoZona.id)
                        var flagExist = data.filter(value => value.id == zona.id);
                        if(flagTipo.length > 0 && flagExist.length === 0 ){
                            data.push(zona);
                        }
                    }
                });
            });
            this.setState({
                listaZonas: data,
                loading:false,
            })
        }else{
            data = [];
        }
        this.setState({
            loading:false,
            listaZonas: data,
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

    getZonasExhibicion = async function(){
        this.setState({loading:false , error: null})
        await CampanasServices.getzonasExhibicion().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                
                this.setState({loading:false, listaZonasExhibicion: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }

    onSelectEspacios = (selectedItem) =>{
        this.setState({
            espaciosSeleccionada : selectedItem,
            listZonasExhibicionSeleted : [],
        });
        
        this.getzonaExhibicionByespacio(selectedItem[0].id);   
    }
    onRemoveEspacios = (selectedList, removedItem) => {
        this.setState({
            espaciosSeleccionada : []
        });
    }

    onSelectZonaExhibicion = (selectedItem) =>{
        this.setState({
            listZonasExhibicionSeleted : selectedItem
        });
    }
    onRemoveZonaExhibicion = (selectedList, removedItem) => {
        this.setState({
            listZonasExhibicionSeleted : []
        });
    }

    getespacioByseccion = async function(seccion){
        this.setState({loading:false , error: null})
        await CampanasServices.getespacioByseccion(seccion).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, espaciosDatas: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }

    getzonaExhibicionByespacio = async function(espacio){
        this.setState({loading:false , error: null})
        await CampanasServices.getzonasExhibicionByEspacio(espacio).then((data) => {
            
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, listaZonasExhibicion: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }

    setDateFrom = (date) =>{
        this.setState({dateFrom:date})
        let hoy = new Date();
        if(date !==  null){
            if(hoy>date){
                this.setState({errorsForm: {...this.state.errorsForm,desde: 'La fecha Desde debe ser mayor a la fecha de HOY verifique'}});
            }else{
                this.setState({errorsForm: {...this.state.errorsForm,desde: ''}});
            }
        }
    }
    setDateTo =  (date) =>{
        this.setState({dateTo:date})
        let desde = this.state.dateFrom;
        let hasta = date;
        if(hasta !==  null){
            if(desde>hasta){
                this.setState({errorsForm: {...this.state.errorsForm,hasta: 'La fecha hasta debe ser mayor a la fecha desde verifique'}});
            }
        }
    }

    handleCheckChieldCadena= e =>{
        let cadenasLocal =  this.state.listaCadenasCreate;
        let resultado = cadenasLocal.find( cadena => Number(cadena.id) === Number(e.target.value));
        this.setState({
            listaCadenasSeleccionadas: resultado,
            prueba: resultado,
            listaTipoSalas : this.state.listaTipoSalasAll.filter(tipoSala => tipoSala.id_cadena == e.target.value || tipoSala.id == 0),
            TipoSalaeleccionada:[],
            listSalasSeleted:[],
            listZonasSeleted:[],
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
                  plantillas: ''
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
    onSelectSecciones = (selectedList, _selectedItem) =>{
        this.setState({
            listSeccionesSeleted : selectedList,
            listZonasExhibicionSeleted : [],
            espaciosSeleccionada : []
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
                  plantillas: ''
                }
              });
        }
        this.getespacioByseccion(_selectedItem.id);   
    }
    onRemovSecciones = (selectedList, _removedItem) => {
        this.setState({
            listSeccionesSeleted : selectedList
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

    getZonas = async function(){
        this.setState({loading:true , error: null})
        let dataZonas = [];
        dataZonas [0] = {id:0 , nombre:'Todas'}
        await CampanasServices.getzonas().then((data) => {
        if(!data.hasOwnProperty('errorInfo')){
            dataZonas = dataZonas.concat(data.data);
            this.setState({loading:false,listaZonas: dataZonas, listaZonasAll : dataZonas});
        }else{
            this.setState({ loading:false , error : data.error})
        }
        });
    }

    onSelectZonas = (selectedList, _selectedItem) =>{
        if(Number(_selectedItem.id) === 0){
            let arrayZonasTodas = this.state.listaZonas;
            arrayZonasTodas.shift();
            this.setState({
                listZonasSeleted : arrayZonasTodas,
                listSalasSeleted:[]
            })

            this.getSalas(arrayZonasTodas);
        }else{
            this.setState({
                listZonasSeleted : selectedList,
                listSalasSeleted:[]
            })

            this.getSalas(selectedList);
        }
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  zona: 'Debe seleccionar al menos una Zona'
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
    
    onRemovZonas = (selectedList, _removedItem) => {
        this.setState({
            listZonasSeleted : selectedList
        })

        this.getSalas(selectedList);

        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  zona: 'Debe seleccionar al menos una Zona'
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

    getSalas = async function(zonas){
        this.setState({loading:true , error: null })
        let data = [];
        data [0] = {id:0 , nombre_sap:'Todas', display_nombre_sap:'Todas'}
        if(zonas.length !== 0){
            zonas.forEach(zona => {
                data = data.concat(zona.salas)
                if(this.state.listaCadenasSeleccionadas.length != 0){
                    let cadena  =  this.state.listaCadenasSeleccionadas;
                    data = data.filter(value => value.id_cadena == cadena.id || value.id == 0);
                }
            });
            this.setState({
                listaSalas: data,
                loading:false,
            })
        }else{
            data = [];
        }
        this.setState({
            loading:false,
            listaSalas: data,
        }) 
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
                  zona: 'Debe seleccionar al menos una Zona'
                }
            });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  zona: ''
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

    checkMaterial = e =>{
        if(Number(e.target.value) === 0){
            
            this.setState({material: true, materialInt: 1 })
        }else{
            this.setState({material: false, materialInt: 0})
        }        
    }

    handleKeyDown = (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
        }
      };

    handleSubmitBs = async e =>{
        e.preventDefault();    
        /*await this.construcObjt();
        await this.createCampana();*/
        await this.validateFormPreSubmit();
        console.log('vino handleSubmitBs');
        console.log(this.state.errorsForm);
        console.log('vino handleSubmitBs');
        if(this.validateForm(this.state.errorsForm)) {
            swal({
                title: "Esta seguro que desea Crear la Campaña ?",
                text: "La Campana se enviara para ser subida al proveedor!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    this.construcObjt();
                    this.createCampana();
                }
            });
        }else{
           return
        }
    }

    construcObjt = async function(){       
        let objectTosend= {
            name:this.state.name,
            cadena: this.state.listaCadenasSeleccionadas,
            desde: customFormatterToSent(this.state.dateFrom),
            hasta: customFormatterToSent(this.state.dateTo),
            proveedor:this.state.listProveedorSeleted,
            seccion:this.state.listSeccionesSeleted,
            zonaExhibicion:this.state.listZonasExhibicionSeleted,
            zona:this.state.listZonasSeleted,
            salas:this.state.listSalasSeleted,
            description: this.state.description,
            materialInt: this.state.materialInt,
            espacio:this.state.espaciosSeleccionada,
        }
        this.setState({objectTosend:  objectTosend});        
    }

    createCampana = async function(){

        try{
         await CampanasServices.storeCampana(this.state.objectTosend).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                swal({
                    title: `Campaña registrada con éxito`,
                    text: "!",
                    icon: "success",
                    button: "Ok!",
                });
                this.props.history.push("/Campanas")
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

    async validateFormPreSubmit(){
        let errors = this.state.errorsForm;
        errors.cadena= '';
        errors.name='';
        errors.desde='';
        errors.hasta='';
        errors.proveedor='';
        errors.seccion='';
        errors.zona='';
        errors.salas='';
        errors.espacio='';
        errors.description='';
        if(this.state.listaCadenasSeleccionadas.length<1){
            errors.cadena = 'Debe seleccionar una cadena para la Campaña!';
        }
        if(this.state.name===''){
            errors.name ='El nombre de la campaña es requerido!';
        }
        if(this.state.dateFrom===''){
            errors.desde ='La fecha desde de la campaña es requerida!';
        } 
        if(this.state.dateTo===''){
            errors.hasta ='La fecha hasta de la campaña es requerida!';
        } 

        if(this.state.listProveedorSeleted.length<1){
            errors.proveedor = 'Debe seleccionar un Proveedor para la Campaña!';
        }

        if(this.state.listSeccionesSeleted.length<1){
            errors.seccion = 'Debe seleccionar una Sección para la Campaña!';
        }

        if(this.state.listZonasSeleted.length<1){
            errors.zona = 'Debe seleccionar una Zona para la Campaña!';
        }

        if(this.state.listSalasSeleted.length<1){
            errors.salas = 'Debe seleccionar al menos una Sala para la Campaña!';
        }

        if(this.state.espaciosSeleccionada.length<1){
            errors.espacio = 'Debe seleccionar un Espacio para la Campaña!';
        }

        if(this.state.listZonasExhibicionSeleted.length<1){
            errors.zonaExhibicion = 'Debe seleccionar una zona de exhibicion para la Campaña!';
        }

        if(this.state.description===''){
            errors.description ='La Descripción es requerido!';
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

    handleChangeI = e =>{
        this.setState({
            [e.target.name] : e.target.value
        });
        e.preventDefault();
        const { name, value } = e.target;
        let errors = this.state.errorsForm;

        /*switch (name) {
            case 'name': 
                errors.name ='';
                if(value.length<3){
                    errors.name ='El nombre del usuario nombre debe tener mas de 3 caracteres!';
                } 
                if(value===''){
                    errors.name =' El nombre del usuario es requerido';
                }
                if(!this.onlyLeterValidateForce(value)){
                    errors.name ='Caracteres invalidos!';
                }
            break;
         
            default:
              break;
          }
        this.setState({errors, [name]: value});*/
    }

    render() {
        return (
            <CreatedCampanas
                state = {this.state}
                handleCheckChieldCadena={this.handleCheckChieldCadena}
                setDateFrom={this.setDateFrom}
                setDateTo={this.setDateTo}
                handleChangeI={this.handleChangeI}
                onSelectProveedor={this.onSelectProveedor}
                onRemovProveedor={this.onRemovProveedor}
                onSelectSecciones={this.onSelectSecciones}
                onRemovSecciones={this.onRemovSecciones}
                onSelectZonas={this.onSelectZonas}
                onRemovZonas={this.onRemovZonas}
                onSelectSalas={this.onSelectSalas}
                onRemovSalas={this.onRemovSalas}
                checkMaterial={this.checkMaterial}
                handleSubmitBs={this.handleSubmitBs}
                onSelectEspacios={this.onSelectEspacios}
                onRemoveEspacios={this.onRemoveEspacios}
                onSelectZonaExhibicion = {this.onSelectZonaExhibicion}
                onRemoveZonaExhibicion = {this.onRemoveZonaExhibicion}
                onSelectTipoSalas = {this.onSelectTipoSalas}
                onRemoveTipoSalas = {this.onRemoveTipoSalas}
                handleKeyDown = {this.handleKeyDown}
            /*
            handleCheckChieldElement={this.handleCheckChieldElement}
            onlyLetter={this.onlyLetter}
            handleChangeI={this.handleChangeI}
            setDateFrom={this.setDateFrom}
            setDateTo={this.setDateTo} 
            onSelectFormatos={this.onSelectFormatos}
            onRemoveFormatos={this.onRemoveFormatos} 
            onSelectPlantillas={this.onSelectPlantillas}
            onRemovePlantillas={this.onRemovePlantillas}
            onChangeValueQr={this.onChangeValueQr}
            handleChangeStatus={this.handleChangeStatus}
            handleSubmitFile={this.handleSubmitFile}
            getUploadParams={this.getUploadParams}
            handleSubmitBs={this.handleSubmitBs}*/>
            </CreatedCampanas>
        )
    }
}

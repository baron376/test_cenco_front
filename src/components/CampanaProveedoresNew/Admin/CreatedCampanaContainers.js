import React, { Component } from 'react'
import CreatedCampanas from './CreatedCampana';
import AdminServices from '../../../services/AdminServices';
import CampanasServices from '../../../services/CampanasProveedoresServices';
import {customFormatterToSent , getFirtsEmentArray } from '../../../util/formats';
import swal from 'sweetalert';
import { __esModule } from 'react-datepicker';

export default class CreatedCampanaContainers extends Component {
    state = {
        listaCadenasCreate:[],
        listaCadenasSeleccionadas:[],
        
        prueba:[],
        listaProveedores:[],
        listProveedorSeleted:[],
        listaSecciones:[],
        listaSubSecciones:[],
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
        fechas: [{ id: 0, dateFrom: null, dateTo: null }],
        minDateValue:'',
        espaciosSeleccionada:[],
        listaZonasExhibicion:[],
        listZonasExhibicionSeleted:[],
        listaTipoSalas: [],
        listaTipoSalasAll:[],
        TipoSalaseleccionada:[],
        loading:false,
        listaTpCampana:[],
        listTpCampanaSeleted:[],
        listVisibilidadCampanaSeleted:[],
        listaElementosCampanaSeleted:[],
        fileNameAreaComercial:[],
        fileNameBasesLegales:[],
        fileNameOrdenCompra:[],
        filenameareacomercialok:'',
        fileextareacomercialok:'',
        filenamebaselegal:'',
        fileextbaselegal:'',
        filenameordencompra:'',
        fileextordencompra:'',
        comentario_gestion:'',
        //dateFrom:null,
        //dateTo:null,
        //description:'',
        
        errorsForm: {
            cadena: '',
            name:'',
            desde:'',
            hasta:'',
            proveedor:'',
            seccion:'',
            sub_seccion:'',
            zona:'',
            //zonaExhibicion:'',
            salas:'',
            espacio:'',
            //description:'',
            tpCampana:'',
            visibilidadCampana:'',
            elementoCampana:'',
            comentario_gestion:'',
        },
        objectTosend:{
            cadena: null,
            //name: null,
            dateRange: null,
           // dateTo:null,
            proveedor:null,
            seccion:null,
            zona:null,
            salas:null,
            //description: null,
            //materialInt: 0,
            espacio:null,  
            tpCampana:null,
            visibilidadCampana:null,
            elementoCampana:null,
            comentario_gestion:null     
        },
        material: false,
        //materialInt: 0,
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
        //await this.getSecciones();
        await this.getTipoSalas();
        // await this.getZonas();
        await this.getEspacios();
        //await this.getTpCampana();
        await this.getVisibilidadCampana();
        //await this.getElementosCampana();
    }

    getCadenas = async function(){
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
        this.setState({
            listaCadenasSeleccionadas : selectedList,
            listaTipoSalas : this.filterTipoSalas(selectedList, _selectedItem),
            TipoSalaseleccionada:[],
            listZonasSeleted:[],
            listSalasSeleted:[],
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
        this.getZonas(selectedList[0].id); 
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

    filterTipoSalas = (selectedList, selectedItem) => {
        let filteredTipoSalas = this.state.listaTipoSalasAll;
        if (selectedList.length > 0) {
            filteredTipoSalas = this.state.listaTipoSalasAll.filter(tipoSala => tipoSala.id_cadena === selectedItem.id);
        }
        // Añadir el elemento {id:0 , nombre:'Todas'} al principio del array
        filteredTipoSalas.unshift({id: 0, nombre: 'Todas'});
        return filteredTipoSalas;
    }

    getTipoSalas = async function(){
        this.setState({loading:true , error: null})
        await AdminServices.getTiposSala().then((data) => {
            let dataTiposSala = [];
            if(!data.hasOwnProperty('errorInfo')){
                dataTiposSala = [{id:0 , nombre:'Todas'}].concat(data.data);
                this.setState({loading:false, listaTipoSalas: dataTiposSala, listaTipoSalasAll : dataTiposSala});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })        
    }

onRemoveTipoSalas = (selectedList, removedItem) => {
    const remainingSelected = this.state.TipoSalaseleccionada.filter(item => item !== removedItem);
    this.setState({
        TipoSalaseleccionada: remainingSelected,
        listZonasSeleted: [],
    });
}

    onSelectTipoSalas = (selectedList, _selectedItem) =>{
        if(Number(_selectedItem.id) === 0){
            let arrayTipoSalasTodas = this.state.listaTipoSalas;
            arrayTipoSalasTodas.shift();
            this.setState({
                TipoSalaseleccionada : arrayTipoSalasTodas,
                listZonasSeleted:[]
            })
            this.getSalasByTipo(arrayTipoSalasTodas);
        }
        else{
            this.setState({
                TipoSalaseleccionada : selectedList,
                listaZonas:[],
                listSalasSeleted:[],
                listZonasSeleted:[],
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

    onSelectEspacios = (selectedItem) =>{
        console.log(selectedItem);
        this.setState({
            espaciosSeleccionada : selectedItem,
            listSeccionesSeleted : [],
        });

        this.getSecciones(selectedItem[0].id); 
        //this.getzonaExhibicionByespacio(selectedItem[0].id);   
    }
    onRemoveEspacios = (selectedList, removedItem) => {
        this.setState({
            espaciosSeleccionada : []
        });
    }

    getElementosCampana = async function(idTpCampana){
        this.setState({loading:false , error: null})
        await CampanasServices.getElementosCampana(idTpCampana).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                
                this.setState({loading:false, listaElementosCampana: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }

    onSelectElementosCampana = (selectedItem) =>{
        this.setState({
            listaElementosCampanaSeleted : selectedItem
        });
    }
    onRemoveElementosCampana = (selectedList, removedItem) => {
        this.setState({
            listaElementosCampanaSeleted : []
        });
    }


    getVisibilidadCampana = async function(){
        this.setState({loading:false , error: null})
        await CampanasServices.getVisibilidadCampana().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                
                this.setState({loading:false, listaVisibilidadCampana: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }
    
    onSelectVisibilidadCampana = (selectedItem) =>{
        this.setState({
            listVisibilidadCampanaSeleted : selectedItem,
            listTpCampanaSeleted: []
        });
        this.getTpCampana(selectedItem[0].id);
    }

    onRemoveVisibilidadCampana = (selectedList, removedItem) => {
        this.setState({
            listVisibilidadCampanaSeleted : []
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
        // if(date !==  null){
        //     if(hoy>date){
        //         this.setState({errorsForm: {...this.state.errorsForm,desde: 'La fecha Desde debe ser mayor a la fecha de HOY verifique'}});
        //     }else{
        //         this.setState({errorsForm: {...this.state.errorsForm,desde: ''}});
        //     }
        // }
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
    
    getSecciones = async function(espacio){
        this.setState({loading:true , error: null})
        await CampanasServices.getSeccionesEspaciosnew(espacio).then((data) => {
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
            listSubSeccionesSeleted : [],
        })
        this.getSubSecciones(selectedList[0].id); 
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
       // this.getespacioByseccion(_selectedItem.id);   
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

    getSubSecciones = async function(seccion){
        this.setState({loading:true , error: null})
        await CampanasServices.getSubSecciones(seccion).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                console.log('data sub_seccion:: ', data)
                this.setState({
                    loading:false,
                    listaSubSecciones: data.data,
                });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
    }
    onSelectSubSecciones = (selectedList, _selectedItem) =>{
        this.setState({
            listSubSeccionesSeleted : selectedList,
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
       // this.getespacioByseccion(_selectedItem.id);   
    }
    onRemovSubSecciones = (selectedList, _removedItem) => {
        this.setState({
            listSubSeccionesSeleted : selectedList
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

    getZonas = async function(id_cadena){
        this.setState({loading:true , error: null})
        let dataZonas = [];
        dataZonas [0] = {id:0 , nombre:'Todas'}
        await CampanasServices.getzonas(id_cadena).then((data) => {
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
                  zona: ''
                }
              });
        }   
    }
    
    onRemovZonas = (selectedList, _removedItem) => {
        this.setState({
            listZonasSeleted : selectedList,
            listSalasSeleted:[]
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
        this.setState({loading: true, error: null});
        let data = [];
        data[0] = {id: 0, nombre_sap: 'Todas', display_nombre_sap: 'Todas'};
        if(zonas.length !== 0){
            zonas.forEach(zona => {
                data = data.concat(zona.salas);
            });
            if(this.state.listaCadenasSeleccionadas.length !== 0){
                let listaCadenas = this.state.listaCadenasSeleccionadas;
                data = data.filter(value => {
                    // Verifica si alguna de las cadenas seleccionadas coincide con la cadena de la sala
                    return listaCadenas.some(cadena => value.id_cadena === cadena.id || value.id === 0);
                });
            }
            this.setState({
                listaSalas: data,
                loading: false,
            });
        } else {
            this.setState({
                listaSalas: [],
                loading: false,
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


    getTpCampana = async function(idTpVisibilidad){
        this.setState({loading:true , error: null})
         await CampanasServices.getTpCampana(idTpVisibilidad).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({
                    loading:false,
                    listaTpCampana: data.data,
                });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
    }

    onSelectTpCampana = (selectedList, _selectedItem) =>{
        this.setState({
            listTpCampanaSeleted : selectedList,
            listaElementosCampanaSeleted: []
            

        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  tpCampana: 'Debe seleccionar al menos un Tipo de Campaña'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  tpCampana: ''
                }
              });
        }   
        this.getElementosCampana(selectedList[0].id);
    }

    onRemovTpCampana = (selectedList, _removedItem) => {
        this.setState({
            listTpCampanaSeleted : selectedList
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  plantillas: 'Debe seleccionar al menos un Tipo de Campaña'
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

    handleImageUpload = (event) => {
        const imageFile = event.target.files[0];
        // Aquí puedes manejar la carga del archivo de imagen, por ejemplo, subirlo a un servidor.
        console.log('Archivo de imagen seleccionado:', imageFile);
    };
    
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
        if(this.validateForm(this.state.errorsForm)) {

                    this.construcObjt();
                    this.createCampana();
        }else{
            console.log('vino al return');
           return
        }
    }
    


    construcObjt = async function(){  
        let objectTosend= {
            cadena: this.state.listaCadenasSeleccionadas,
            fechasarray:this.state.fechas,
            seccion:this.state.listSeccionesSeleted,
            formato:this.state.TipoSalaseleccionada,
            espacio:this.state.espaciosSeleccionada,
            tpCampana: this.state.listTpCampanaSeleted,
            visibilidadCampana: this.state.listVisibilidadCampanaSeleted,
            zona:this.state.listZonasSeleted,
            salas:this.state.listSalasSeleted,
            id_sub_seccion:this.state.listSubSeccionesSeleted,
        }

            // Verifica si el ID de la campaña está presente en responseData
        if (this.state.responseData && this.state.responseData.data && this.state.responseData.data.campana && this.state.responseData.data.campana.id) {
            objectTosend.idCampana = this.state.responseData.data.campana.id;
        }

        console.log(objectTosend);
        this.setState({objectTosend:  objectTosend});        
    }

    createCampana = async function() {
        swal({
            title: "Procesando",
            text: "Por favor, espera...",
            icon: "info",
            buttons: false,
            closeOnClickOutside: false,
            closeOnEsc: false
        });
    
        try {
            console.log('ENVIANDOOOOOOOOO -+------++-+-+- ', this.state.objectTosend);
            const data = await CampanasServices.storeCampana(this.state.objectTosend);
            swal.close(); // Cerrar el swal de carga
    
            if (!data.hasOwnProperty('errorInfo')) {
                console.log("¡Campaña registrada con éxito!");
                // Paso de la respuesta al componente hijo
                console.log("¡Campaña registrada con éxito!", data);
                this.setState({ responseData: data });
            } else {
                console.error(`Error ${data.errorInfo.toString()}`);
            }
        } catch(error) {
            this.setState({loading:false , error: error});
        }
    }
    

    validateFormPreSubmit = async function(){
        let errors = this.state.errorsForm;
        errors.cadena= '';
        errors.name='';
        errors.desde='';
        errors.hasta='';
        errors.proveedor='';
        errors.formato='';
        errors.seccion='';
        errors.sub_seccion='';
        errors.zona='';
        errors.salas='';
        errors.espacio='';
        //errors.description='';
        errors.tpCampana='';
        errors.visibilidadCampana='';
        errors.elementoCampana='';

        if(this.state.listaCadenasSeleccionadas.length<1){
            errors.cadena = 'Debe seleccionar una cadena para la Campaña!';
        }
        // if(this.state.name===''){
        //     errors.name ='El nombre de la campaña es requerido!';
        // }
        let errorfechas = null;
        //this.state.fechas.forEach((fecha, index) => (
        this.state.fechas.forEach((fecha, index) => {
            console.log("hola",fecha)
            if(!fecha.selectedValues){
                errors.desde ='Debe seleccionar un Elemento para la Campaña!';
            }
            if(!fecha.dateRange){
                errors.hasta ='Debe seleccionar la fecha de la campaña!';
            }
        });
    
            //errorfechas = fecha.dateFrom ? 'error una de las fechas no tiene dese':null;
        //));
        
        /*if(this.state.dateFrom===''){
            errors.desde ='La fecha desde de la campaña es requerida!';
        } 
        if(this.state.dateTo===''){
            errors.hasta ='La fecha hasta de la campaña es requerida!';
        } */

        // if(this.state.listProveedorSeleted.length<1){
        //     errors.proveedor = 'Debe seleccionar un Proveedor para la Campaña!';
        // }

        if(this.state.listSeccionesSeleted.length<1){
            errors.seccion = 'Debe seleccionar una Sección para la Campaña!';
        }

        if(this.state.listSubSeccionesSeleted.length<1){
            errors.sub_seccion = 'Debe seleccionar una Categoría para la Campaña!';
        }

        if(this.state.listZonasSeleted.length<1){
            errors.zona = 'Debe seleccionar una Zona para la Campaña!';
        }

        if(this.state.listSalasSeleted.length<1){
            errors.salas = 'Debe seleccionar el Formato para la Campaña!';
        }

        if(this.state.espaciosSeleccionada.length<1){
            errors.espacio = 'Debe seleccionar un Espacio para la Campaña!';
        }

        if(this.state.listTpCampanaSeleted.length<1){
            errors.tpCampana = 'Debe seleccionar un Tipo de Campaña!';
        }

        if(this.state.listVisibilidadCampanaSeleted.length<1){
            errors.visibilidadCampana = 'Debe seleccionar la visibilidad de la Campaña!';
        }

        this.setState({errorsForm:errors});

           // Log de errores
    console.log("Errores en el formulario:", errors);
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
    }



    getBase64= async function(file) {
        let me = this;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        let a = reader.onload = async function () {
            console.log('sin cabeceras' , reader.result.split(',').pop())
            me.setState({fileNameAreaComercial: reader.result.split(',').pop()});
            return  reader.result;
        };
        this.setState({fileBase: a });
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
    }

    setFileAreaComercial = async (event) => {
        let me = this;
        const files = event.target.files;
        console.log('objeto fine ' , files[0]);
        console.log('lo que wao wao' ,files[0].name , files[0].type)
        me.setState({filenameareacomercialok: files[0].name});
        me.setState({fileextareacomercialok: files[0].type});
        this.getBase64(files[0]);
    }

    removeFileAreaComercial = () => {
        // Reinicia el estado para eliminar el archivo cargado
        this.setState({
            filenameareacomercialok: null,
            fileextareacomercialok: null,
            fileNameAreaComercial: null
        });
    }

    // getBase64BasesLegales= async function(file) {
    //     let me = this;
    //     var reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     let a = reader.onload = async function () {
    //         console.log('sin cabeceras' , reader.result.split(',').pop())
    //         me.setState({fileNameBasesLegales: reader.result.split(',').pop()});
    //         return  reader.result;
    //     };
    //     this.setState({fileBase: a });
    //         reader.onerror = function (error) {
    //             console.log('Error: ', error);
    //         };
    // }

    // setFileBasesLegales = async (event) => {
    //     let me = this;
    //     const files = event.target.files;
    //     console.log('objeto fine ' , files[0]);
    //     console.log('lo que wao wao' ,files[0].name , files[0].type)
    //     me.setState({filenamebaselegal: files[0].name});
    //     me.setState({fileextbaselegal: files[0].type});
    //     this.getBase64BasesLegales(files[0]);

    // }

    getBase64BasesLegales = async function(file) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.onload = function () {
                console.log('sin cabeceras', reader.result.split(',').pop());
                resolve(reader.result);
            };
            reader.onerror = function (error) {
                console.log('Error al leer el archivo:', error);
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    }
    
    setFileBasesLegales = async (event) => {
        const file = event.target.files[0];
        console.log('objeto fine', file);
        console.log('lo que wao wao', file.name, file.type);
    
        this.setState({
            filenamebaselegal: file.name,
            fileextbaselegal: file.type
        });
    
        try {
            const base64 = await this.getBase64BasesLegales(file);
            console.log('Base64:', base64);
            // Hacer algo con el Base64 (por ejemplo, establecerlo en el estado)
            this.setState({ fileBase: base64 });
        } catch (error) {
            console.error('Error al obtener el Base64:', error);
        }
    }

    removeFileBasesLegales = () => {
        // Reinicia el estado para eliminar el archivo cargado
        this.setState({
            filenamebaselegal: null,
            fileextbaselegal: null,
            fileNameBasesLegales: null
        });
    }

    getBase64OrdenCompra= async function(file) {
        let me = this;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        let a = reader.onload = async function () {
            me.setState({fileNameOrdenCompra: reader.result.split(',').pop()});
            return  reader.result;
        };
        this.setState({fileBase: a });
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
    }

    setFileOrdenCompra = async (event) => {
        let me = this;
        const files = event.target.files;
        me.setState({filenameordencompra: files[0].name});
        me.setState({fileextordencompra: files[0].type});
        this.getBase64OrdenCompra(files[0]);

    }

    removeFileOrdenCompra = () => {
        // Reinicia el estado para eliminar el archivo cargado
        this.setState({
            filenameordencompra: null,
            fileextordencompra: null,
            fileNameOrdenCompra: null
        });
    }
    setFechasAr = (fechashija)=> {
        this.setState({
            fechas: fechashija,
        });
    }

    handleDownload = (campanaId) => {
        console.log('Descargando archivo Excel');
    
        // Actualiza el estado para mostrar carga y reiniciar errores
        this.setState({ loadingDescarga: true, error: null });
    
        try {
            // Llama al servicio para descargar el archivo Excel
            CampanasServices.downloadCuposCampana(campanaId).then((response) => {
                swal.close(); // Cierra el swal de carga
    
                if (response.status === 200) {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const downloadLink = document.createElement('a');
                    downloadLink.href = url;
                    downloadLink.setAttribute('download', 'campana_proveedor.xlsx');
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    URL.revokeObjectURL(url);
    
                    this.setState({ loadingDescarga: false, error: null });
    
                    swal({
                        title: 'Excel descargado con éxito',
                        text: '',
                        icon: 'success',
                        button: 'Ok',
                    });
                } else {
                    this.setState({ loadingDescarga: false, error: 'Error al descargar el Excel' });
    
                    swal({
                        title: 'Error al descargar el Excel',
                        text: 'Error al descargar el Excel',
                        icon: 'error',
                        button: 'Ok',
                    });
                }
            });
        } catch (error) {
            // Maneja errores generales
            this.setState({ loadingDescarga: false, error: error.message });
    
            swal({
                title: 'Error',
                text: error.message,
                icon: 'error',
                button: 'Ok',
            });
        }
    };

    handleSubmit = () => {
        const { selectedSalas } = this.state;
        console.log('ino al nuevo');
    }

    render() {
        return (
            <CreatedCampanas
                state = {this.state}
                onSelectCadenas={this.onSelectCadenas}
                onRemovCadenas={this.onRemovCadenas}
                setDateFrom={this.setDateFrom}
                setDateTo={this.setDateTo}
                handleChangeI={this.handleChangeI}
                onSelectProveedor={this.onSelectProveedor}
                setFileAreaComercial={this.setFileAreaComercial}
                setFileBasesLegales={this.setFileBasesLegales}
                setFileOrdenCompra={this.setFileOrdenCompra}
                onRemovProveedor={this.onRemovProveedor}
                onSelectSecciones={this.onSelectSecciones}
                onRemovSecciones={this.onRemovSecciones}

                onSelectSubSecciones={this.onSelectSubSecciones}
                onRemovSubSecciones={this.onRemovSubSecciones}

                onSelectZonas={this.onSelectZonas}
                onRemovZonas={this.onRemovZonas}
                onSelectSalas={this.onSelectSalas}
                onRemovSalas={this.onRemovSalas}
                fechas =  {this.fechas}
                setFechasAr={this.setFechasAr}
                onSelectEspacios={this.onSelectEspacios}
                onRemoveEspacios={this.onRemoveEspacios}
                onSelectTipoSalas = {this.onSelectTipoSalas}
                onRemoveTipoSalas = {this.onRemoveTipoSalas}
                onSelectTpCampana = {this.onSelectTpCampana}
                onRemovTpCampana = {this.onRemovTpCampana}
                onSelectVisibilidadCampana = {this.onSelectVisibilidadCampana}
                onRemoveVisibilidadCampana = {this.onRemoveVisibilidadCampana}
                onSelectElementosCampana = {this.onSelectElementosCampana}
                onRemoveElementosCampana = {this.onRemoveElementosCampana}
                handleKeyDown = {this.handleKeyDown}
                handleSubmitBs={this.handleSubmitBs}
                filenameareacomercialok={this.state.filenameareacomercialok}
                filenamebaselegal={this.state.filenamebaselegal}
                filenameordencompra={this.state.filenameordencompra}
                removeFileBasesLegales={this.removeFileBasesLegales}
                removeFileOrdenCompra={this.removeFileOrdenCompra}
                removeFileAreaComercial={this.removeFileAreaComercial}
                handleDownload={this.handleDownload}>
            </CreatedCampanas>            
        )
    }
}

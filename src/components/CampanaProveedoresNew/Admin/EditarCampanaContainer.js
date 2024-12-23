import React, { Component } from 'react'
import EditarCampana from './EditarCampana';
import AdminServices from '../../../services/AdminServices';
import CampanasServices from '../../../services/CampanasProveedoresServices';
//import {customFormatterToSent , getFirtsEmentArray } from '../../../util/formats';
import {customFormatterToSent , getFirtsEmentArray, customFormatterDate } from '../../../util/formats';
import swal from 'sweetalert';
import env from "react-dotenv";
export default class EditarCampanaContainer extends Component {
    state = {
        listaCadenasCreate:[],
        idCadenaCreate:null,
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
        listaZonasExhibicion:[],
        listZonasExhibicionSeleted:[],
        listaTipoSalas: [],
        listaTipoSalasAll:[],
        TipoSalaseleccionada:[],
        listaSalasAll:[],
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
        campanaComentariosData:[],
        fechas: [{ id: 0, dateFrom: null, dateTo: null }],
        name:'',
        dateFrom:'',
        dateTo:'',
        minDateValue:'',
        //espaciosSeleccionada:[],
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
            salas:'',
            espacio:'',
            description:'',
            zonaExhibicion:'',
            tpCampana:'',
            visibilidadCampana:'',
            elementoCampana:'',
            comentario_gestion:''
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
            espacio:null,
            tpCampana:null,
            visibilidadCampana:null,
            elementoCampana:null,
            comentario_gestion:null       
        },
        material: false,
        materialInt: 0,
    }
    constructor(){
        super(); 
    }
    downloadUrl = async function(material) {
        const BaseUrl = env.REACT_APP_BASE_URL;
        window.open(`${BaseUrl}/`+ material, '_blank');
    }
    async componentDidMount(){
        let date = new Date();
        date.setDate(date.getDate() + 1);  // tomorrow
        const minDateValue = date.toISOString();
        this.setState({
            minDateValue:minDateValue
        });

        let idCampana = this.props.match.params.id;  
        await this.getDetailsCampana(idCampana);
        await this.fechasFormater();
        await this.ElementosFormater();
        await this.setVarShowCadena();      
        await this.getCadenas();
        await this.getProveedores();
        await this.getSecciones();
        await this.getTipoSalas();
        await this.getZonas();
        //await this.getSalasByallInit();
        await this.getEspacios();
        await this.getVisibilidadCampana();
        await this.comentarios_on(idCampana);
        
    }
    async getSalasByallInit(){
        await this.getSalaActive();
        let todaslasalas = this.state.listaSalasAll;
        
        /*inicio de filtrado manual*/
        /*porcadena*/
        let cadena = this.state.campanaDetailsData.id_cadena
        
        if(cadena){
            todaslasalas = todaslasalas.filter((item) => item.id_cadena == cadena);
        }
        /* por tipo*/
        let tpsA =[];
        let salastmp = [];
        if( this.state.TipoSalaseleccionada.length>0){
            let tps = this.state.TipoSalaseleccionada;
            tpsA =[];
            tps.map(x =>tpsA.push(x.id));
            todaslasalas.map(y =>{if(tpsA.includes(y.id_tipo)){salastmp.push(y)}});
            todaslasalas=salastmp
            this.setState({listaTipoSalas : this.state.listaTipoSalasAll.filter(tipoSala => tipoSala.id_cadena == cadena || tipoSala.id == 0)})
        }
        /*por zona*/
        let znzA =[];
        let salastmp2 = [];
        if(this.state.campanaDetailsData.zonas.length>0){
            let zs = this.state.campanaDetailsData.zonas
            znzA =[];
            zs.map(k =>znzA.push(k.id));
            todaslasalas.map(z =>{if(znzA.includes(z.id_zona)){salastmp2.push(z)}});
            todaslasalas=salastmp2
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
        await this.getSalaActive();
        let todaslasalas = this.state.listaSalasAll;
        /*inicio de filtrado manual*/
        /*porcadena*/
        let cadena = cadenaSelect.id;
        if(cadena){
            todaslasalas = todaslasalas.filter((item) => item.id_cadena == cadena);
        }
        /*inicio de filtrado manual*/
       
        /* por tipo*/
        let tpsA =[];
        let salastmp = [];
        if( this.state.TipoSalaseleccionada.length>0){
            let tps = this.state.TipoSalaseleccionada;
            tpsA =[];
            tps.map(x =>tpsA.push(x.id));
            todaslasalas.map(y =>{if(tpsA.includes(y.id_tipo)){salastmp.push(y)}});
            todaslasalas=salastmp
        }
        /*por zona*/
        let znzA =[];
        let salastmp2 = [];
        if(this.state.listZonasSeleted.length>0){
            let zs = this.state.listZonasSeleted
            znzA =[];
            zs.map(k =>znzA.push(k.id));
            todaslasalas.map(z =>{if(znzA.includes(z.id_zona)){salastmp2.push(z)}});
            todaslasalas=salastmp2
            
        }
        todaslasalas.unshift({id:0 , nombre_sap:'Todas', display_nombre_sap:'Todas'})
        this.setState({
            loading:false,
            listaSalas: todaslasalas,
        }) 
        

    }

    getSalaActive = async function(){
        this.setState({loading:true , error: null})
        let cadenas = [];

        Object.values(this.state.listaCadenasCreate).forEach(val => {
            cadenas.push(val.id)
          });
        await AdminServices.getSalasUserCadenas([cadenas]).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                // data.data.unshift({id:0 , nombre_sap:'Todas', display_nombre_sap:'Todas'})
                this.setState({loading:false, listaSalasAll: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }

    getDetailsCampana = async function(CadenaId){
        this.setState({loading:false , error: null})
        await CampanasServices.getDetailsCampanaNew(CadenaId).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({campanaDetailsData: data.data});
            }else{
                this.setState({error : data.error})
            }
        })
    }

    setFechasAr = (fechashija)=> {
        this.setState({
            fechas: fechashija,
        });
    }

    setVarShowCadena = async () =>{
        // let salas = this.state.campanaDetailsData.salas_disponibles
        // let tipos = []
        // salas.forEach(sala => {
        //     var flag = tipos.filter(t => t.id === sala.id_tipo)
        //     if(flag.length === 0){
        //         tipos.push(sala.tipo)
        //     }
        // });
        this.setState(
            {
               listaCadenasSeleccionadas:[this.state.campanaDetailsData.cadena],
               name: this.state.campanaDetailsData.nombre,
               dateFrom : customFormatterDate(this.state.campanaDetailsData.desde),
               dateTo : customFormatterDate(this.state.campanaDetailsData.hasta),
               listProveedorSeleted: [this.state.campanaDetailsData.proveedor],
               listSeccionesSeleted:[this.state.campanaDetailsData.sesion],
               listZonasSeleted: this.state.campanaDetailsData.zonas,
               listZonasExhibicionSeleted: [this.state.campanaDetailsData.zona_exhibicion],
               listSalasSeleted:this.state.campanaDetailsData.salas,
               description: this.state.campanaDetailsData.descripcion,
               espaciosSeleccionada: [this.state.campanaDetailsData.espacio],
            //    TipoSalaseleccionada:tipos,
               listTpCampanaSeleted:[this.state.campanaDetailsData.tp_campana],
               listVisibilidadCampanaSeleted: [this.state.campanaDetailsData.visibilidad],
               listaElementosCampanaSeleted: this.state.campanaDetailsData.elementos,
               filenameAreaComercial: this.state.campanaDetailsData.url_area_comercial,
               filenameOrdenCompra: this.state.campanaDetailsData.url_orden_compra,
               filenameBasesLegales: this.state.campanaDetailsData.url_bases_legales,
               filenameMaterial: this.state.campanaDetailsData.material && this.state.campanaDetailsData.material.url ? this.state.campanaDetailsData.material.url : null,
            }
        )
    }
    fechasFormater = async function(){
    //fechasFormater (){
        let cell = this.state.campanaDetailsData.vigencias
        //console.log(cell)
        let fechas = []
        cell.forEach((fecha, index) => {   
         fechas.push({ id: index, dateFrom:customFormatterDate(fecha.desde), dateTo: customFormatterDate(fecha.hasta) }) ;
           
        });

        this.setState(
            {
                fechas: fechas,              
                
            })
    
        console.log("ACaaaaaaa Fechas   ",fechas)
    }

    ElementosFormater() {
        let cell = this.state.campanaDetailsData.elementos;
   
        this.setState({
            elementos: cell,
        });
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
            listaTipoSalas : this.state.listaTipoSalasAll.filter(tipoSala => tipoSala.id_cadena == _selectedItem.id),
            TipoSalaseleccionada:[],
            listZonasSeleted:[],
            listSalasSeleted:[]
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
        this.setState({
            espaciosSeleccionada : selectedItem,
            listSeccionesSeleted : [],
        });
        
        this.getSecciones(selectedItem[0].id);  
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
            listZonasExhibicionSeleted : [],
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
        //this.getespacioByseccion(_selectedItem.id);   
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
        console.log("infosala",dataTiposSala)
    }

    onRemoveTipoSalas = (selectedList, removedItem) => {
        //this.getSalasByallOnchange()
        this.setState({
            TipoSalaseleccionada : selectedList,
            listZonasSeleted:[],
            listSalasSeleted:[]
        })
        //this.getSalasByallOnchange();
    }

    onSelectTipoSalas = (selectedList, _selectedItem) =>{
        if(Number(_selectedItem.id) === 0){
            let arrayTipoSalasTodas = this.state.listaTipoSalas;
            arrayTipoSalasTodas.shift();
            this.setState({
                TipoSalaseleccionada : arrayTipoSalasTodas,
                listZonasSeleted:[],
                listSalasSeleted:[]
            })
            this.getSalasByTipo(arrayTipoSalasTodas);
         
        }
        else{
            this.setState({
                TipoSalaseleccionada : selectedList,
                listaZonas:[],
                listSalasSeleted:[],
                listZonasSeleted:[],
                listSalasSeleted:[]
            })
            this.getSalasByTipo(selectedList);
        }
        //this.getSalasByallOnchange()
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
       // this.getSalasByallOnchange();   
    }
    
    onRemovZonas = (selectedList, _removedItem) => {
        this.setState({
            listZonasSeleted : selectedList
        })

        //this.getSalas(selectedList);

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
        //this.getSalasByallOnchange()
    }

    getSalas = async function(zonas){
        this.setState({loading:true , error: null })
        let lista = [];
        let result = [];
        lista = this.state.listaZonas;

        if(zonas.length !== 0){
            zonas.forEach(zona => {
                
                 result = lista.filter(item => item.id == zona.id )
                 result.forEach( sala => {
                    result = sala.salas
                })
            });
            this.setState({
                listaSalas: result,
                loading:false,
            })
        }else{
            result = [];
        }
        this.setState({
            loading:false,
            listaSalas: result,
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

    getTpCampana = async (idTpVisibilidad) => {
        this.setState({loading: true, error: null});
        try {
            const data = await CampanasServices.getTpCampana(idTpVisibilidad);
            if (!data.hasOwnProperty('errorInfo')) {
                this.setState({
                    loading: false,
                    listaTpCampana: data.data,
                });

                const selectedTpCampanaId =  this.state.campanaDetailsData.tp_campana.id;
                await this.getElementosCampana(selectedTpCampanaId);
            } else {
                this.setState({loading: false, error: data.error});
            }
        } catch (error) {
            this.setState({loading: false, error: error.message});
        }
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

    getElementosCampana = async (idTpCampana) => {
        this.setState({loading: true, error: null});
        try {
            const data = await CampanasServices.getElementosCampana(idTpCampana);
            if (!data.hasOwnProperty('errorInfo')) {
                this.setState({
                    loading: false,
                    listaElementosCampana: data.data,
                });
            } else {
                this.setState({loading: false, error: data.error});
            }
        } catch (error) {
            this.setState({loading: false, error: error.message});
        }
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

    getVisibilidadCampana = async () => {
        this.setState({loading: true, error: null});
    
        try {
            const data = await CampanasServices.getVisibilidadCampana();
            if (!data.hasOwnProperty('errorInfo')) {
                this.setState({
                    loading: false,
                    listaVisibilidadCampana: data.data,
                });

                const selectedVisibilidadId =  this.state.campanaDetailsData.visibilidad.id;
                await this.getTpCampana(selectedVisibilidadId);
            } else {
                this.setState({loading: false, error: data.error});
            }
        } catch (error) {
            this.setState({loading: false, error: error.message});
        }
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

    handleSubmitBs = async e =>{
        console.log('vino al handleSubmitBs');
        e.preventDefault();     
        /*await this.construcObjt();
        await this.createCampana();*/
        await this.validateFormPreSubmit();
        if(this.validateForm(this.state.errorsForm)) {
            swal({
                title: "Esta seguro que desea Editar la Campaña ?",
                text: "La Campaña se enviara para ser subida al proveedor!",
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

    getBase64AreaComercial= async function(file) {
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
        this.getBase64AreaComercial(files[0]);

    }

    removeFileAreaComercial = () => {
        // Reinicia el estado para eliminar el archivo cargado
        this.setState({
            filenameareacomercialok: null,
            fileextareacomercialok: null,
            fileNameAreaComercial: null
        });
    }

    getBase64BasesLegales= async function(file) {
        let me = this;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        let a = reader.onload = async function () {
            console.log('sin cabeceras' , reader.result.split(',').pop())
            me.setState({fileNameBasesLegales: reader.result.split(',').pop()});
            return  reader.result;
        };
        this.setState({fileBase: a });
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
    }

    setFileBasesLegales = async (event) => {
        let me = this;
        const files = event.target.files;
        console.log('objeto fine ' , files[0]);
        console.log('lo que wao wao' ,files[0].name , files[0].type)
        me.setState({filenamebaselegal: files[0].name});
        me.setState({fileextbaselegal: files[0].type});
        this.getBase64BasesLegales(files[0]);

    }

    removeFileBasesLegales = () => {
        console.log('vino');
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

    comentarios_on = async function (idCampanaFaldontoEdit){
        this.setState({error: null})
        await CampanasServices.getComentarios(idCampanaFaldontoEdit).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({campanaComentariosData: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }
    
    construcObjt = async function(){ 
        let objectTosend= {
            name:this.state.name,
            fechasarray:this.state.fechas,
            cadena: this.state.listaCadenasSeleccionadas,
            desde: customFormatterToSent(this.state.dateFrom),
            hasta: customFormatterToSent(this.state.dateTo),
            proveedor:this.state.listProveedorSeleted,
            seccion:this.state.listSeccionesSeleted,
            zona:this.state.listZonasSeleted,
            salas:this.state.listSalasSeleted,
            description: this.state.description,
            materialInt: this.state.materialInt,
            espacio:this.state.espaciosSeleccionada,
            formato:this.state.TipoSalaseleccionada,
            tpCampana: this.state.listTpCampanaSeleted,
            visibilidadCampana: this.state.listVisibilidadCampanaSeleted,
            elementoCampana: this.state.listaElementosCampanaSeleted,
            fileAreaComercial: this.state.fileNameAreaComercial,
            filenameareacomercialok : this.state.filenameareacomercialok,
            fileextareacomercialok : this.state.fileextareacomercialok,
            fileBasesLegales: this.state.fileNameBasesLegales,
            filenamebaselegal : this.state.filenamebaselegal,
            fileextbaselegal : this.state.fileextbaselegal,
            fileOrdenCompra: this.state.fileNameOrdenCompra,
            filenameordencompra : this.state.filenameordencompra,
            fileextordencompra : this.state.fileextordencompra,
            comentario_gestion : this.state.comentario_gestion,
            //fileOrdenCompra: this.state.fileNameOrdenCompra,
            //filenameordencompra : this.state.filenameordencompra,
            //fileextordencompra : this.state.fileextordencompra,
        }
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
            //console.log('Enviooooo', this.state.objectTosend);
            const data = await CampanasServices.updateCampana(this.state.objectTosend, this.state.campanaDetailsData.id);
            swal.close(); // Cerrar el swal de carga
    
            if (!data.hasOwnProperty('errorInfo')) {
                swal({
                    title: "¡Campaña Actualizada con éxito!",
                    text: "¡",
                    icon: "success",
                    button: "Ok!",
                });
                this.props.history.push("/CampanasProveedoresNew");
            } else {
                swal({
                    title: `Error ${data.errorInfo.toString()}`,
                    text: "¡",
                    icon: "error",
                    button: "Ok!",
                });
            }
        } catch(error) {
            this.setState({loading:false , error: error});
            swal({
                title: "Error",
                text: "Ocurrió un error al procesar la solicitud",
                icon: "error",
                button: "Ok!",
            });
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
        errors.tpCampana='';
        errors.visibilidadCampana='';
        errors.elementoCampana='';
        console.log('vino al validateFormPreSubmit');
        // if(this.state.listaCadenasSeleccionadas.length<1){
        //     errors.cadena = 'Debe seleccionar una cadena para la Campaña!';
        // }
        if(this.state.name===''){
            errors.name ='El nombre de la campaña es requerido!';
        }
        /*if(this.state.dateFrom===''){
            errors.desde ='La fecha desde de la campaña es requerida!';
        } 
        if(this.state.dateTo===''){
            errors.hasta ='La fecha hasta de la campaña es requerida!';
        } */
        // this.state.fechas.forEach((fecha, index) => {
        //     console.log("hola",fecha)
        //     if(!fecha.dateFrom){
        //         errors.desde ='PROBLEMA CON LA FECHA!';
        //     }
        //     if(!fecha.dateTo){
        //         errors.hasta ='PROBLEMA CON LA FECHA!';
        //     }
        // });

        if(this.state.listProveedorSeleted.length<1){
            errors.proveedor = 'Debe seleccionar un Proveedor para la Campaña!';
        }

        // if(this.state.listSeccionesSeleted.length<1){
        //     errors.seccion = 'Debe seleccionar una Sección para la Campaña!';
        // }

        // if(this.state.listZonasSeleted.length<1){
        //     errors.zona = 'Debe seleccionar una Zona para la Campaña!';
        // }

        // if(this.state.listZonasExhibicionSeleted.length<1){
        //     errors.zonaExhibicion = 'Debe seleccionar una zona de exhibicion para la Campaña!';
        // }

        // if(this.state.listSalasSeleted.length<1){
        //     errors.salas = 'Debe seleccionar al menos una Sala para la Campaña!';
        // }

        // if(this.state.espaciosSeleccionada.length<1){
        //     errors.espacio = 'Debe seleccionar un Espacio para la Campaña!';
        // }

        // if(this.state.listTpCampanaSeleted.length<1){
        //     errors.tpCampana = 'Debe seleccionar un Tipo de Campaña!';
        // }

        // if(this.state.listVisibilidadCampanaSeleted.length<1){
        //     errors.visibilidadCampana = 'Debe seleccionar la visibilidad de la Campaña!';
        // }

        // if(this.state.listaElementosCampanaSeleted.length<1){
        //     errors.elementoCampana = 'Debe seleccionar un Elemento para la Campaña!';
        // }

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
            <EditarCampana
                setFechasAr={this.setFechasAr}
                state = {this.state}
                onSelectCadenas={this.onSelectCadenas}
                onRemovCadenas={this.onRemovCadenas}
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
                onSelectTipoSalas={this.onSelectTipoSalas}
                onRemoveTipoSalas={this.onRemoveTipoSalas}
                onSelectZonaExhibicion = {this.onSelectZonaExhibicion}
                onRemoveZonaExhibicion = {this.onRemoveZonaExhibicion}
                fechas =  {this.fechas}
                onSelectTpCampana = {this.onSelectTpCampana}
                onRemovTpCampana = {this.onRemovTpCampana}
                onSelectVisibilidadCampana = {this.onSelectVisibilidadCampana}
                onRemoveVisibilidadCampana = {this.onRemoveVisibilidadCampana}
                onSelectElementosCampana = {this.onSelectElementosCampana}
                onRemoveElementosCampana = {this.onRemoveElementosCampana}

                setFileAreaComercial={this.setFileAreaComercial}
                setFileBasesLegales={this.setFileBasesLegales}
                setFileOrdenCompra={this.setFileOrdenCompra}

                filenameareacomercialok={this.state.filenameareacomercialok}
                filenamebaselegal={this.state.filenamebaselegal}
                filenameordencompra={this.state.filenameordencompra}

                
                removeFileBasesLegales={this.removeFileBasesLegales}
                removeFileOrdenCompra={this.removeFileOrdenCompra}
                removeFileAreaComercial={this.removeFileAreaComercial}
                downloadUrl={this.downloadUrl}>
                    
            </EditarCampana>
        )
    }
}

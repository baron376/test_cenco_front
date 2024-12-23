import React, { Component } from 'react'
import CreatedCampanaInterna from './CreatedCampanaInterna';
import AdminServices from '../../../services/AdminServices';
import CampanaInternaServices from '../../../services/CampanaInternaServices';
import {customFormatterToSent , getFirtsEmentArray } from '../../../util/formats';
import swal from 'sweetalert';
import $ from "jquery";

export default class CreatedCampanaInternaContainers extends Component {
    state = {
        listaCadenasCreate:[],
        listaCadenasSeleccionadas:[],
        prueba:[],
        listaInstaladores:[],
        listaInstaladoresSeleted:[],
        listaSecciones:[],
        listSeccionesSeleted:[],
        listaZonas:[],
        listZonasSeleted:[],
        listaSalas:[],
        listSalasSeleted:[],
        espaciosDatas:[],
        name:'',
        dateFrom:'',
        dateTo:'',
        minDateValue:'',
        espaciosSeleccionada:[],
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
            instalador:'',
            seccion:'',
            zona:'',
            salas:'',
            espacio:'',
            description:'',
            objeto: '',
            comentario: ''
        },
        objectTosend:{
            cadena: null,
            name: null,
            dateFrom: null,
            dateTo:null,
            instalador:null,
            seccion:null,
            zona:null,
            salas:null,
            description: null,
            materialInt: 0,
            espacio:null           
        },
        material: false,
        materialInt: 0,
        name_materia : '',
        medida_materia:'',
        carrucelImage64 :[],
        comentario:'',
        campanaComentariosData:[],
        errorsMaterial: {
            name_materia: '',
            medida_materia:'', 
            fileHead:'',
            file :''

        },
        errorsExterno: {
            materiales: '',
            comentario:''

        },
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
        await this.getInstaladores();
        await this.getSecciones();
        await this.getZonas();
        await this.getEspacios();
        await this.getTipoSalas();
    }

    getCadenas = async function(){
        this.setState({loading:true , error: null})
         await AdminServices.getCadenas().then((data) => {    
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

    getEspacios = async function(){
        this.setState({loading:false , error: null})
        await CampanaInternaServices.getEspacios().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, espaciosDatas: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }

    onSelectEspacios = (selectedItem) =>{
        this.setState({
            espaciosSeleccionada : selectedItem
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

    onRemoveEspacios = (selectedList, removedItem) => {
        console.log('pruebas selector cuando remueve' , selectedList, removedItem)
        this.setState({
            espaciosSeleccionada : []
        });
    }

    setDateFrom = (date) =>{
        this.setState({dateFrom:date})
        let hoy = new Date();
        if(date !==  null){
            if(hoy>date){
                console.log('entra en la comparación')
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
                console.log('entra en la comparación')
                this.setState({errorsForm: {...this.state.errorsForm,hasta: 'La fecha hasta debe ser mayor a la fecha desde verifique'}});
            }
        }
    }

    handleCheckChieldCadena= e =>{
        console.log('HPOLAAAA PRUEBLO',e.target.value);
        let cadenasLocal =  this.state.listaCadenasCreate;
        let resultado = cadenasLocal.find( cadena => Number(cadena.id) === Number(e.target.value));
        console.log('ESTO ES CADENA11', resultado)
        this.setState({
            listaCadenasSeleccionadas: resultado,
            listaTipoSalas : this.state.listaTipoSalasAll.filter(tipoSala => tipoSala.id_cadena == e.target.value || tipoSala.id == 0),
            TipoSalaeleccionada:[],
            listSalasSeleted:[]
        });
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
                TipoSalaeleccionada : arrayTipoSalasTodas,
                listSalasSeleted:[]
            })
            this.getSalasByTipo(arrayTipoSalasTodas);
        }
        else{
            this.setState({
                TipoSalaeleccionada : selectedList,
                listSalasSeleted:[]
            })
            this.getSalasByTipo(selectedList);
        }
    }

    getInstaladores = async function(){
        this.setState({loading:true , error: null})
         await CampanaInternaServices.getInstalador().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({
                    loading:false,
                    listaInstaladores: data.data,
                });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
    }

    onSelectInstalador = (selectedList, _selectedItem) =>{
        this.setState({
            listaInstaladoresSeleted : selectedList
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

    onRemovInstalador = (selectedList, _removedItem) => {
        this.setState({
            listaInstaladoresSeleted : selectedList
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
         await CampanaInternaServices.getSecciones().then((data) => {
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
            listSeccionesSeleted : selectedList
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
        await CampanaInternaServices.getzonas().then((data) => {
        if(!data.hasOwnProperty('errorInfo')){
            dataZonas = dataZonas.concat(data.data);
            this.setState({loading:false,listaZonas: dataZonas,});
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

    getSalasByTipo = async function(tiposDeSala){
        this.setState({loading:true , error: null })
        let data = [];
        data [0] = {id:0 , nombre_sap:'Todas', display_nombre_sap:'Todas'}
        if(tiposDeSala.length !== 0){
            tiposDeSala.forEach(tipoZona => {
                data = data.concat(tipoZona.salas)
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

    handleSubmitBs = async e =>{
        e.preventDefault();
        console.log('HPOLAAAA PRUEBLO');        
        /*await this.construcObjt();
        await this.createCampana();*/
        await this.validateFormPreSubmit();
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
        console.log('HPOLAAAA PRUEBLO22333',);        
        let objectTosend= {
            name:this.state.name,
            cadena: this.state.listaCadenasSeleccionadas,
            desde: customFormatterToSent(this.state.dateFrom),
            hasta: customFormatterToSent(this.state.dateTo),
            instalador:this.state.listaInstaladoresSeleted,
            seccion:this.state.listSeccionesSeleted,
            zona:this.state.listZonasSeleted,
            salas:this.state.listSalasSeleted,
            description: this.state.description,
            materialInt: this.state.materialInt,
            espacio:this.state.espaciosSeleccionada,
            objElementos:this.state.carrucelImage64,
        }
        this.setState({objectTosend:  objectTosend});        
        console.log('Objeto armado::::::---- ',objectTosend)
    }

    createCampana = async function(){

        try{
         await CampanaInternaServices.storeCampanaInterna(this.state.objectTosend).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                swal({
                    title: `Campaña registrada con éxito`,
                    text: "!",
                    icon: "success",
                    button: "Ok!",
                });
                this.props.history.push("/CampanaInterna")
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
        errors.comentario = '';
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
        if(this.state.listaInstaladoresSeleted.length<1){
            errors.instalador = 'Debe seleccionar un instalador para la Campaña!';
        }
        else{
            errors.instalador = '';
        }

        if(this.state.listSalasSeleted.length<1){
            errors.salas = 'Debe seleccionar al menos una Sala para la Campaña!';
        } 

        if(this.state.carrucelImage64.length<1){
            errors.objeto = 'Debe seleccionar al menos un material para la campaña!';
        }
        else{
            errors.objeto = '';
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

    createElement = (mantecncion) =>{
        this.setState({modalIsopen:true});
    }

    handleCloseModal = e =>{
        this.setState({modalIsopen:false})
    }

    handleChangeI = e =>{
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    handleOpenModal = e =>{
        this.setState({modalIsopen:true})
    }

    handleSubmitBsMateriales = async e =>{
        console.log('-');
    }

    /*FUNCIONES ARCHIVOS */
    handleSubmitFile = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }
    
    handleChangeStatus = ({ meta }, status) => {
        console.log(status, meta)
    }

    getUploadParams = ({ file, meta }) => {
        //let errors = this.state.errorsMaterial;
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
        // console.log("acaacacacaca", reader.result.split(',').pop())
            return  reader.result;
        };
        this.setState({fileBase: a });
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
    }

    /*FIN FUNCIONES ARCHIVOS */

    handleSubmitBsModal = async e =>{
        e.preventDefault();
        await this.validateFormMAteriales();
        if(this.state.errorsMaterial.name_materia === '' && this.state.errorsMaterial.medida_materia === ''&& this.state.errorsMaterial.fileHead === '') {
            console.log('holaaaaaaaaaaaaaaaa')
            let arrayLocalImage = this.state.carrucelImage64;
            let objcIntImage = {
                name:this.state.name_materia,
                medida:this.state.medida_materia,
                type:this.state.fileType,
                name_archivo:this.state.fileName,
                cdc64 :this.state.fileHead 
            }
            arrayLocalImage.push(objcIntImage);
            this.setState({carrucelImage64:arrayLocalImage , modalIsopen:false }); 
            console.log('tipo' ,this.state.fileType)
            console.log('array de imagenes' , arrayLocalImage);
            swal({
                title: `Material Agregado con éxito`,
                text: "!",
                icon: "success",
                button: "Ok!",
            });
            await this.clearVarModal(); 
            $('.modal-backdrop').remove();      
        }
        
        
    }

    async validateFormMAteriales(){
        let errors = this.state.errorsMaterial;
        errors.name_materia= '';
        errors.medida_materia=''; 
        errors.fileHead='';
        if(this.state.name_materia===''){
            errors.name_materia ='El Nombre del material es obligatorio!';
        }
        if(this.state.medida_materia===''){
            errors.medida_materia ='Las medidas del material son obligatorio!';
        }

        if(this.state.file===''){
            errors.file ='La imagen del material es obligatorio!';
        }
        console.log(errors);
        this.setState({errorsMaterial:errors});
    }

    InactivestaImage = (i) => {
        swal({
            title: "¿Esta seguro que desea Eliminar el material ?",
            text: "¡La Mantención se actualizara al Guardar los Cambios!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
        .then((willDelete) => {
            if (willDelete) {
                let arrayLocalImage = this.state.carrucelImage64;
                arrayLocalImage.splice(i,1);
                this.setState({carrucelImage64:arrayLocalImage , modalIsopen:false }); 
            }
        });
    }

    clearVarModal = () =>{
        this.setState({name_materia: '' , medida_materia:'' , fileHead: null, modalIsopen:false});
    }

    render() {
        return (
            <CreatedCampanaInterna
                state = {this.state}
                handleCheckChieldCadena={this.handleCheckChieldCadena}
                setDateFrom={this.setDateFrom}
                setDateTo={this.setDateTo}
                handleChangeI={this.handleChangeI}
                onSelectInstalador={this.onSelectInstalador}
                onRemovInstalador={this.onRemovInstalador}
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
                createElement={this.createElement}
                onCloseModal={this.handleCloseModal}
                modalIsopen={this.state.modalIsopen}
                onOpenModal={this.handleOpenModal}
                handleSubmitBsMateriales={this.handleSubmitBsMateriales}
                handleSubmitFile = {this.handleSubmitFile}
                getUploadParams = {this.getUploadParams}
                handleChangeStatus = {this.handleChangeStatus}
                handleSubmitBsModal = {this.handleSubmitBsModal}
                clearVarModal = {this.clearVarModal}
                InactivestaImage = {this.InactivestaImage}
                onSelectTipoSalas = {this.onSelectTipoSalas}
                onRemoveTipoSalas = {this.onRemoveTipoSalas}
                >
            </CreatedCampanaInterna>
        )
    }
}

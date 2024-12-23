import React, { Component } from 'react'
import CreatedMantencion from './CreatedMantencion';
import AdminServices from '../../../services/AdminServices';
import CampanasServices from '../../../services/CampanasServices';
import MantencionServices from '../../../services/MantencionServices';
import {customFormatterToSent , getFirtsEmentArray } from '../../../util/formats';
import swal from 'sweetalert';
import $ from "jquery";

export default class CreatedMantencionContainers extends Component {
    state = {
        solicitarMedidas: false,
        listaCadenasCreate:[],
        listaCadenasSeleccionadas:[],
        prueba:[],
        listaProveedores:[],
        listProveedorSeleted:[],
        listaSecciones:[],
        listSeccionesSeleted:[],
        listaZonas:[],
        listZonasSeleted:[],
        listaSalas:[],
        listSalasSeleted:[],
        espaciosDatas:[],
        asunto:'',
        name:'',
        dateFrom:'',
        dateTo:'',
        minDateValue:'',
        espaciosSeleccionada:[],
        description:'',
        material:null,
        errorsForm: {
            cadena: '',
            asunto:'',
            desde:'',
            hasta:'',
            proveedor:'',
            seccion:'',
            zona:'',
            salas:'',
            espacio:'',
            description:'',
            materiales: '',
            objeto: '',
            comentario: ''
        },
        modalTitle:'Subir Elemento',
        objectTosend:{
            cadena: null,
            asunto: null,
            dateFrom: null,
            dateTo:null,
            proveedor:null,
            seccion:null,
            zona:null,
            salas:null,
            description: null,
            materialInt: 0,
            espacio:null,
            comentario:null,
            objElementos:null
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
        hidden:false
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
        await this.getZonas();
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

                if(data.length == 1){
                    this.setState({
                        listaCadenasSeleccionadas: data[0],
                        prueba: data[0]
                    });
                }
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
    }

    handleCheckChieldCadena= e =>{
        let cadenasLocal =  this.state.listaCadenasCreate;
        let resultado = cadenasLocal.find( cadena => Number(cadena.id) === Number(e.target.value));
        this.setState({
            listaCadenasSeleccionadas: resultado,
            prueba: resultado
        });
    }

    getZonas = async function(){
        this.setState({loading:true , error: null})
         await CampanasServices.getzonas().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({
                    loading:false,
                    listaZonas: data.data,
                });

                if(data.data.length == 1){
                    this.setState({
                        listZonasSeleted: data.data,
                    });

                    this.getSalas(data.data);
                }
                
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
    }

    onSelectZonas = (selectedList, _selectedItem) =>{
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

    onRemovZonas = (selectedList, _removedItem) => {
        this.setState({
            listZonasSeleted : selectedList
        })
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
        if(zonas.length !== 0){
            zonas.forEach(zona => {
                data = data.concat(zona.salas)
                if(this.state.listaCadenasSeleccionadas.length != 0){
                    let cadena  =  this.state.listaCadenasSeleccionadas;
                    data = data.filter(value => value.id_cadena == cadena.id);
                }
            });
            this.setState({
                listaSalas: data,
                loading:false,
            })
            if(data.length == 1){
                this.setState({
                    listSalasSeleted: data,
                })
            }
        }else{
            data = [];
        }
        this.setState({
            loading:false,
            listaSalas: data,
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

    handleSubmitBs = async e =>{
        e.preventDefault();
        console.log('HPOLAAAA PRUEBLO');        
        await this.validateFormPreSubmit();
        if(this.validateForm(this.state.errorsForm)) {
            swal({
                title: "Esta seguro que desea Crear la Mantencion ?",
                text: "",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    this.construcObjt();
                    this.CreateMantencion();
                }
            });
        }else{
           return
        }
    }

    construcObjt = async function(){ 
        let objectTosend= {
            asunto:this.state.asunto,
            cadena: this.state.listaCadenasSeleccionadas,
            salas:this.state.listSalasSeleted,
            comentario:this.state.comentario,
            objElementos:this.state.carrucelImage64,
        }
        this.setState({objectTosend:  objectTosend});        
    }

    CreateMantencion = async function(){
        try{
        console.log('SEND');
        console.log(this.state.objectTosend);
        this.setState({loading:true});

         await MantencionServices.storeMantencion(this.state.objectTosend).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                swal({
                    title: `Mantencion registrada con éxito`,
                    text: "!",
                    icon: "success",
                    button: "Ok!",
                });
                this.props.history.push("/Mantencion")
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

    async validateFormPreSubmit(){
        let errors = this.state.errorsForm;
        errors.cadena= '';
        errors.asunto='';
        errors.zona='';
        errors.salas='';
        errors.objeto='';
        errors.comentario='';
        
        if(this.state.listaCadenasSeleccionadas.length<1){
            errors.cadena = 'Debe seleccionar una cadena para la Mantencion!';
        }
        if(this.state.asunto===''){
            errors.asunto ='El asunto de la Mantencion es requerido!';
        }

        if(this.state.listZonasSeleted.length<1){
            errors.zona = 'Debe seleccionar una Zona para la Mantencion!';
        }

        if(this.state.listSalasSeleted.length<1){
            errors.salas = 'Debe seleccionar al menos una Sala para la Mantencion!';
        }

        if(this.state.carrucelImage64.length<1){
            errors.objeto = 'Debe seleccionar al menos un objeto para la Mantencion!';
        }

        if(this.state.comentario===''){
            errors.comentario = 'Debe añadir un comentario para la Mantención!';
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
    }

    handleCheckboxChange = (selectedList, _removedItem) => {
        const check = this.state.solicitarMedidas == true ? false : true;
        const hidden = check
        this.setState({
            solicitarMedidas: check,
            hidden: hidden
        });
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
            errors.name_materia ='El Nombre del objeto es obligatorio!';
        }
        if(this.state.medida_materia==='' && !this.state.solicitarMedidas){
            errors.medida_materia ='Las medidas del objeto son obligatorio!';
        }

        if(this.state.file===''){
            errors.file ='La imagen del objeto es obligatorio!';
        }
        console.log(errors);
        this.setState({errorsMaterial:errors});
    }

    InactivestaImage = (i) => {
        swal({
            title: "¿Esta seguro que desea Eliminar el Objeto?",
            text: "¡La Mantencion se actualizara al Guardar los Cambios!",
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
        this.setState({
            name_materia: '' , medida_materia:'' , fileHead: null, modalIsopen:false , hidden :false , solicitarMedidas: false
        });
    }

    render() {
        return (
            <CreatedMantencion
                state = {this.state}
                handleCheckChieldCadena={this.handleCheckChieldCadena}
                handleChangeI={this.handleChangeI}
                onSelectZonas={this.onSelectZonas}
                onRemovZonas={this.onRemovZonas}
                onSelectSalas={this.onSelectSalas}
                onRemovSalas={this.onRemovSalas}
                handleSubmitBs={this.handleSubmitBs}
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
                handleCheckboxChange = {this.handleCheckboxChange}>
            </CreatedMantencion>
        )
    }
}

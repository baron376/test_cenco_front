import React, { Component } from 'react'
import VerMantencion from './VerMantencion';
import AdminServices from '../../../services/AdminServices';
import CampanasServices from '../../../services/CampanasServices';
import MantencionServices from '../../../services/MantencionServices';
import swal from 'sweetalert';
import $ from "jquery";
import env from "react-dotenv";
import {customFormatterToSent , getFirtsEmentArray,customFormatterDate } from '../../../util/formats';
import Moment from 'moment';

export default class EditarMantencionContainers extends Component {
    state = {
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
        localImgs:[],
        localImgTodelete:[],
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
        fechaImplementacion: '',
        proveeador: null,
        montoCootizacion:null
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
        let idMantencion = this.props.match.params.id;  
        await this.getCadenas();
        await this.getZonas();
        await this.getDetailsMantencion(idMantencion);
    }

    getDetailsMantencion = async function(idMantencion){
        this.setState({loading:false , error: null})
        await MantencionServices.getDetailsMantencion(idMantencion).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({
                    asunto: data.data.asunto,
                    cadena: data.data.cadena.nombre,
                    sala: data.data.salas.nombre_sap,
                    campanaComentariosData:data.data.comentarios,
                    campanaComentariosData:data.data.comentarios,
                    fechaImplementacion: data.data.fecha_implementacion ? Moment(data.data.fecha_implementacion).format('DD-MM-YYYY') : '',
                    proveeador:data.data.proveedor ? data.data.proveedor.nombre : '',
                    montoCootizacion:data.data.monto_cotizacion
                });
                data.data.elementos.forEach( function(img,arrayLocalImage) {
                    var url = env.REACT_APP_BASE_URL+'/'+ img.url;
                    img.url = url
                });

                this.setState({localImgs : data.data.elementos})
            }else{
                this.setState({error : data.error})
            }
        })
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

    handleCheckChieldCadena= e =>{
        console.log('HPOLAAAA PRUEBLO',e.target.value);
        let cadenasLocal =  this.state.listaCadenasCreate;
        let resultado = cadenasLocal.find( cadena => Number(cadena.id) === Number(e.target.value));
        console.log('ESTO ES CADENA11', resultado)
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
    
    getSalas = async function(zona){
        this.setState({loading:true , error: null })
        let data = [];
        if(zona.length !== 0){
            zona.forEach(element => {
                data = data.concat(element.salas)
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
                title: "Esta seguro que desea Editar la Mantencion ?",
                text: "",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    this.construcObjt();
                    this.updateMantencion();
                }
            });
        }else{
           return
        }
    }

    construcObjt = async function(){ 
        let objectTosend= {
            id: this.props.match.params.id,
            imgTodelete: this.state.localImgTodelete,
            comentario: this.state.comentario,
            objElementos: this.state.carrucelImage64,
        }
        this.setState({objectTosend:  objectTosend});        
    }

    updateMantencion = async function(){
        try{
        console.log('SEND');
        console.log(this.state.objectTosend);
         await MantencionServices.updateMantencion(this.state.objectTosend).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                swal({
                    title: `Mantencion editada con éxito`,
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

        if(this.state.carrucelImage64.length<1 && this.state.localImgs.length<1){
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
            console.log('array de imágenes' , arrayLocalImage);
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
        if(this.state.medida_materia===''){
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
    
    RemoveImg = (id,i) => {
        swal({
            title: "¿Esta seguro que desea Eliminar el Objeto?",
            text: "¡La Mantencion se actualizara al Guardar los Cambios!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
        .then((willDelete) => {
            if (willDelete) {
                let arrayLocalImage = this.state.localImgs;
                arrayLocalImage.splice(i,1);
                let ImgTodelete = this.state.localImgTodelete;
                ImgTodelete.push(id);
                this.setState({localImgs:arrayLocalImage,localImgTodelete:ImgTodelete}); 
            }
        });
    }

    clearVarModal = () =>{
        this.setState({name_materia: '' , medida_materia:'' , fileHead: null, modalIsopen:false});
    }

    render() {
        return (
            <VerMantencion
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
                RemoveImg = {this.RemoveImg}>
            </VerMantencion>
        )
    }
}

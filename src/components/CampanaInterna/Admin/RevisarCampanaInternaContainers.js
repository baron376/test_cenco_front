import React, { Component } from 'react'
import RevisarCampanaInterna from './RevisarCampanaInterna';
import AdminServices from '../../../services/AdminServices';
import CampanaInternaServices from '../../../services/CampanaInternaServices';
import {customFormatterToSent , getFirtsEmentArray,customFormatterDate } from '../../../util/formats';
import swal from 'sweetalert';
import $ from "jquery";
import env from "react-dotenv";


export default class RevisarCampanaInternaContainers extends Component {
    state = {
        material:null,
        errorsForm: {
            comentario: ''
        },
        objectTosend:{
            comentario: null,
            materialInt: 0,         
        },
        material: false,
        listaSalas:[],
        listSalasSeleted:[],
        materialInt: 0,
        name_materia : '',
        medida_materia:'',
        carrucelImage64 :[],
        comentario:'',
        errorsMaterial: {
            name_materia: '',
            medida_materia:'', 
            fileHead:'',
            file :''
        },
        errorsForm: {
            objeto: '',
            comentario: '',
            salas:'',
        },
        errorsExterno: {
            objeto: '',
            comentario:'',
            salas:'',
        },
        localImgTodelete:[],
        localImgs: []
    }
    constructor(){
        super(); 
    } 
    async componentDidMount(){
        await this.getSalas();
    }

    RemoveImg = (id,i) => {
        swal({
            title: "¿Esta seguro que desea Eliminar el Material?",
            text: "¡La Mantención se actualizara al Guardar los Cambios!",
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

    checkMaterial = e =>{
        if(Number(e.target.value) === 0){
            
            this.setState({material: true, materialInt: 1 })
        }else{
            this.setState({material: false, materialInt: 0})
        }        
    }

    getSalas = async function(){
        this.setState({loading:true , error: null})
         await AdminServices.getSalasUser().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                // data.data.unshift({id:0 , nombre_sap:'Todas', display_nombre_sap:'Todas'})
                this.setState({
                    loading:false,
                    listaSalas: data.data,
                });

                if(data.data.length == 1){
                    this.setState({
                        listSalasSeleted: data.data,
                    });
                }
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
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
        console.log('HPOLAAAA PRUEBLO');        
        await this.validateFormPreSubmit();
        if(this.validateForm(this.state.errorsForm)) {
            swal({
                title: "Esta seguro que desea comentar la Campaña ?",
                text: "La Campana se enviara para ser subida al proveedor!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    this.construcObjt();
                    this.editCampana();
                }
            });
        }else{
           return
        }
    }

    construcObjt = async function(){
        let objectTosend= {
            id: this.props.match.params.id,
            id_sala: this.state.listSalasSeleted[0].id,
            comentario: this.state.comentario,
            materialInt: this.state.materialInt,
            objElementos:this.state.carrucelImage64,
            imgTodelete: this.state.localImgTodelete,
        }
        this.setState({objectTosend:  objectTosend});        
    }

    editCampana = async function(){
        try{
         await CampanaInternaServices.CommentCampanaInterna(this.state.objectTosend,this.props.match.params.id).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                swal({
                    title: `Comentario registrado con éxito`,
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
        } catch(error){
            this.setState({loading:false , error: error})
        }
    }

    async validateFormPreSubmit(){
        let errors = this.state.errorsForm;;
        errors.comentario = '';
        if(this.state.comentario===''){
            errors.comentario ='La el comentario es requerido!';
        }
        if(this.state.listSalasSeleted.length < 1){
            errors.salas ='Debe seleccionar una sala!';
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
            <RevisarCampanaInterna
                state = {this.state}
                handleChangeI={this.handleChangeI}
                checkMaterial={this.checkMaterial}
                handleSubmitBs={this.handleSubmitBs}
                createElement={this.createElement}
                onCloseModal={this.handleCloseModal}
                onOpenModal={this.handleOpenModal}
                handleSubmitBsMateriales={this.handleSubmitBsMateriales}
                handleSubmitFile = {this.handleSubmitFile}
                getUploadParams = {this.getUploadParams}
                handleChangeStatus = {this.handleChangeStatus}
                handleSubmitBsModal = {this.handleSubmitBsModal}
                clearVarModal = {this.clearVarModal}
                InactivestaImage = {this.InactivestaImage}
                RemoveImg = {this.RemoveImg}
                onSelectSalas={this.onSelectSalas}
                onRemovSalas={this.onRemovSalas}
            >
            </RevisarCampanaInterna>
        )
    }
}

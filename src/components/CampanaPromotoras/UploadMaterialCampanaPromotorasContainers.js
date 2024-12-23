import React, { Component } from 'react'
import UploadMaterialCampanaPromotoras from './UploadMaterialCampanaPromotoras';
import CampanaPromotoraServices from '../../services/CampanaPromotoraServices';
import swal from 'sweetalert';
import $ from "jquery";


export default class UploadMaterialCampanaPromotorasContainers extends Component {
    state = {
        loading:false,
        idCampanaPromotoraToEdit:null,
        error:null,
        campanaPromoDetailsData:null,
        cadenaCampana:null,
        nombreCampana:null,
        dateInitCampana:null,
        dateFinishCampana:null,
        proveedorCampana:null,
        seccionCampana:null,
        listaSalas:[],
        turnoCampana:null,
        entregaRegalo:null,
        degustacion:null,
        mueble:null,
        consurso:null,
        descripcion:null,
        modalIsopen:false,
        modalTitle:'Subir Material',
        name_materia:null,
        medida_materia:null,
        errorsMaterial:{
            name_materia:'',
            medida_materia:'',
            file:''
        },
        fileArc:null,
        fileName:null,
        fileType:null,
        fileSize:null,
        errorsForm:{
            file:''
        },
        errorsExterno:{
        comentario:'',
        materiales:''
        },
        carrucelImage64:[],
        localImgs: [],
        localImgTodelete:[],
        fileHead:null,
        formAlldate:null,
        campanaComentariosData:[{comentario:null , fecha:null , usuario:null}],
        comentario:null,
        fileBase:null
    }
    constructor(){
        super();
        this.getDetailsCampanaPromo.bind(this)
    }
    async componentDidMount(){
        await this.getDetailsCampanaPromo();
        await this.preSelectObject();
        await this.comentariosOn();
        await this.materialesOn();
    }
    getDetailsCampanaPromo = async function(){
        this.setState({loading:true , error: null , idCampanaPromotoraToEdit:this.props.match.params.id})
        let idCampanaPromotoEdit = this.props.match.params.id;
        await CampanaPromotoraServices.getCampanaDetail(idCampanaPromotoEdit).then((data) => {
            console.log('data del detalle' , data);
                if(!data.hasOwnProperty('errorInfo')){
                    this.setState({
                        loading:false,
                        campanaPromoDetailsData: data.data,
                        idCampanaPromotoraToEdit: data.data.id
                    });
                }else{
                    this.setState({ loading:false , error : data.error})
                }
            })
    }
    preSelectObject = async function(){
        this.setState({loading:true , error: null})
        let localCadenaCampana = this.state.campanaPromoDetailsData.cadena.nombre;
        let localNombreCampana = this.state.campanaPromoDetailsData.nombre
        let localDateInitCampanaA = this.state.campanaPromoDetailsData.desde;
        let localDateFinishCampanaA = this.state.campanaPromoDetailsData.hasta;
        let localProveedor = this.state.campanaPromoDetailsData.proveedor.nombre;
        let localSeccion = this.state.campanaPromoDetailsData.sesion.nombre;
        let salasLocal = this.state.campanaPromoDetailsData.salas;
        let turnoLocal = this.state.campanaPromoDetailsData.turno.nombre;
        let entregaRegaloLocal = Number(this.state.campanaPromoDetailsData.entrega_regalo) == 1? 'SI' : 'NO';
        let degustacionLocal = Number(this.state.campanaPromoDetailsData.degustacion) == 1? 'SI' : 'NO';
        let muebleLocal = Number(this.state.campanaPromoDetailsData.material_externo) == 1? 'SI' : 'NO';
        let consursoLocal = Number(this.state.campanaPromoDetailsData.concurso_asociado) == 1? 'SI' : 'NO';
        let descripcionLocal =   this.state.campanaPromoDetailsData.descripcion; 
        let basesLegalesDocumento = this.state.campanaPromoDetailsData.base;

        this.setState({loading:false ,
             error: null , 
             cadenaCampana:localCadenaCampana,
             nombreCampana: localNombreCampana,
             dateInitCampana : localDateInitCampanaA,
             dateFinishCampana : localDateFinishCampanaA,
             proveedorCampana : localProveedor,
             seccionCampana : localSeccion,
             listaSalas: salasLocal,
             turnoCampana : turnoLocal,
             entregaRegalo : entregaRegaloLocal,
             degustacion : degustacionLocal,
             mueble:muebleLocal,
             consurso:consursoLocal,
             descripcion :descripcionLocal,
             fileBase:basesLegalesDocumento
            })
     }
     createMaterial = (campana) =>{
        this.setState({modalIsopen:true});
    }
    handleCloseModal = e =>{
        this.setState({modalIsopen:false})
    }
    handleSubmitBsMateriales = async e =>{
        console.log('holaaaaaaaaaaaaaaaguarde rrr');
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
    handleChangeStatus = ({ meta }, status) => {
        console.log(status, meta)
    }
    handleSubmitFile = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }
    handleChangeI = e =>{
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    handleSubmitBsModal = async e =>{
        console.log('holaaaaaaaaaaaaaaaa')
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
    clearVarModal = () =>{
        this.setState({name_materia: '' , medida_materia:'' , fileHead: null, modalIsopen:false});
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
    async validateFormMAteriales(){
        let errors = this.state.errorsMaterial;
        errors.name_materia= '';
        errors.medida_materia=''; 
        errors.fileHead='';
        if(this.state.name_materia===''){
            errors.name_materia ='El Nombre del Material es obligatorio!';
        }
        if(this.state.medida_materia===''){
            errors.medida_materia ='Las medidas del Material es obligatorio!';
        }

        if(this.state.file===''){
            errors.file ='La imagen del material es obligatorio!';
        }
        console.log(errors);
        this.setState({errorsMaterial:errors});
    }
    handleSubmitBs = async e =>{
        e.preventDefault();
        console.log('submit externo');
        await this.validateFormExternal();
        if(this.validateForm(this.state.errorsExterno)) {
  
          swal({
              title: "Esta seguro que desea Subir el Material ?",
              text: "!",
              icon: "warning",
              buttons: true,
              dangerMode: true,
          })
          .then((willDelete) => {
              if (willDelete) {
                  this.SubirCampana();
              }
          });
  
        }
      }
      async validateFormExternal(){
        let errors = this.state.errorsExterno;
        errors.comentario= '';
        errors.materiales=''; 
        console.log(this.state.comentario)
        if(this.state.comentario===''){
            errors.comentario ='El comentario es obligatorio!';
        }
        if(this.state.carrucelImage64.length<1 && this.state.localImgs.length<1){
            errors.objeto = 'Debe seleccionar al menos un material para la campaña!';
        }
        console.log(errors);
        this.setState({errorsExterno:errors});
    }
    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
          (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }
    SubirCampana = async function(){   
        let idCampanaFaldontoEdit = this.props.match.params.id;     
        let subCampana = ({
            comentario:this.state.comentario,
            objMuebles:this.state.carrucelImage64,
            imgTodelete: this.state.localImgTodelete
        });
        console.log('data para el enviooooo' , subCampana);
        this.setState({
            formAlldate : subCampana
        })
        try{
            CampanaPromotoraServices.upCampana(subCampana, idCampanaFaldontoEdit).then((data) => {
                //console.log('esto es le retornoooooooooooooooooooo' ,data)
                if(!data.hasOwnProperty('errorInfo')){
                    swal({
                        title: `¡Campana subida con Éxito!`,
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
           // $('.modal-backdrop').remove();
            await this.clearVarModal();
            await this.clearForExterno();
            this.setState({loading:false , error: null})
            this.props.history.push("/CampanasPromotoras")
        } catch(error){
            this.setState({loading:false , error: error})
        }
    }
    comentariosOn = async function (){
        this.setState({error: null})
        await CampanaPromotoraServices.getComentarios(this.state.idCampanaPromotoraToEdit).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({campanaComentariosData: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }
    clearForExterno = () =>{
        this.setState({comentario: '', modalIsopen:false});
        let errors = this.state.errorsMaterial;
        errors.name_materia= '';
        errors.medida_materia=''; 
        errors.fileHead='';
        this.setState({errorsMaterial:errors});
        let errors2 = this.state.errorsExterno;
        errors2.comentario= '';
        errors2.materiales='';       
        this.setState({errorsExterno:errors2});
    }
    downloadFaldon= async (campana) =>{
        this.setState({loading:true , error: null})
            let linkSource = `data:application/pdf;base64,${this.state.fileBase}`;
            let downloadLink = document.createElement("a");
            let fileName = 'bases_legales'; //responseLocal.nombre_archivo;
            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.click();
            this.setState({loading:false , error: null})
    }


    materialesOn = async function (){
        this.setState({error: null})
        await CampanaPromotoraServices.getMateriales(this.state.idCampanaPromotoraToEdit).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({localImgs: data.data});
            }else{
                this.setState({ error : data.error})
            }
        })
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

    render() {
        return (
            <UploadMaterialCampanaPromotoras
            state = {this.state}
            clearVarModal={this.clearVarModal}
            createMaterial={this.createMaterial}
            onCloseModal={this.handleCloseModal}
            handleSubmitBsModal={this.handleSubmitBsModal}
            handleSubmitBsMateriales={this.handleSubmitBsMateriales}
            modalTitle  = {this.state.modalTitle}
            getUploadParams = {this.getUploadParams}
            handleChangeStatus = {this.handleChangeStatus}
            handleSubmitFile = {this.handleSubmitFile}
            handleChangeI = {this.handleChangeI}
            handleSubmitBs = {this.handleSubmitBs}
            downloadFaldon = {this.downloadFaldon}
            RemoveImg = {this.RemoveImg}
            >
            </UploadMaterialCampanaPromotoras>
        )
    }
}

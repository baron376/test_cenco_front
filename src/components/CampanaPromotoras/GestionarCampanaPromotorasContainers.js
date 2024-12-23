import React, { Component } from 'react';
import GestionarCampanaPromotoras from './GestionarCampanaPromotoras';
import CampanaPromotoraServices from '../../services/CampanaPromotoraServices';
import swal from 'sweetalert';
import env from "react-dotenv";


export default class GestionarCampanaPromotorasContainers extends Component {
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
        campanaMaterialesData: [],
        carrucelImage64:[],
        campanaComentariosData:[{comentario:null , fecha:null , usuario:null}],
        comentario_gestion:null,
        errorsForm:{
            comentario_gestion:''
        },
        fileBase:null

    }
    constructor(){
        super();
        this.getDetailsCampanaPromo.bind(this)
    }
    async componentDidMount(){
        await this.getDetailsCampanaPromo();
        await this.materialesOn();
        await this.comentariosOn();
        await this.preSelectObject();
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
     materialesOn = async function (){
        this.setState({error: null})
        await CampanaPromotoraServices.getMateriales(this.state.idCampanaPromotoraToEdit).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({carrucelImage64: data.data});
            }else{
                this.setState({ error : data.error})
            }
        })
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
    downloadUrl = async function(material) {
        const BaseUrl = env.REACT_APP_BASE_URL;
        window.open(`${BaseUrl}/`+ material, '_blank');
        
    }
    AprobeCampana= async (campana) =>{
        
        let statusCamapna = ({
            id: this.state.idCampanaPromotoraToEdit,
            comentario_gestion : this.state.comentario_gestion,
        });
      
        swal({
            title: "¿Esta seguro que desea Aprobar la campaña Promotoras?",
            text: "¡La Campaña entrar en Vigencia en su rango de Fecha!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
        .then((willDelete) => {
            if (willDelete) {
                try{
                    
                    CampanaPromotoraServices.AprobeCampana(statusCamapna, campana).then((data) => {;
                        if(!data.hasOwnProperty('errorInfo')){
                            swal({
                                title: `Campaña Promotoras Aprobada con éxito`,
                                text: "!",
                                icon: "success",
                                button: "Ok!",
                            });
                            this.props.history.push("/CampanasPromotoras")
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
                }catch(error){
                    this.setState({loading:false , error: error})
                }
            }
        });        
    }
    
    RechazarCampana= async (campana) =>{
        await this.validateFormRechazo();
        if(this.validateForm(this.state.errorsForm)) {
        
            let statusCamapna = ({
                id: this.state.idCampanaPromotoraToEdit,
                comentario_gestion : this.state.comentario_gestion,
            });
        
            swal({
                title: "Esta seguro que desea Rechazar la campaña Promotoras?",
                text: "Le permitirá al proveedor corregir sus observaciones!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
            .then((willDelete) => {
                if (willDelete) {
                    try{
                        
                        CampanaPromotoraServices.RechazarCampana(statusCamapna, campana).then((data) => {;
                            if(!data.hasOwnProperty('errorInfo')){
                                swal({
                                    title: `Campaña Promotoras Rechazada con éxito`,
                                    text: "!",
                                    icon: "success",
                                    button: "Ok!",
                                });
                                this.props.history.push("/CampanasPromotoras")
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
                    }catch(error){
                        this.setState({loading:false , error: error})
                    }
                }
            });       
        } 
    }
    async validateFormRechazo(){
        let errors = this.state.errorsForm;
        errors.comentario_gestion ='';       
        if(this.state.comentario_gestion==='' || this.state.comentario_gestion===null){
            errors.comentario_gestion ='El Comentario para rechazar es obligatorio!';
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
    render() {
        return (
            <GestionarCampanaPromotoras
            state = {this.state}
            RechazarCampana={this.RechazarCampana}
            AprobeCampana={this.AprobeCampana}
            handleChangeI={this.handleChangeI}
            downloadUrl={this.downloadUrl}
            downloadFaldon={this.downloadFaldon}>
            </GestionarCampanaPromotoras>
        )
    }
}

import React, { Component } from 'react';
import ShowCampanaPromotoras from './ShowCampanaPromotoras';
import CampanaPromotoraServices from '../../services/CampanaPromotoraServices';
import env from "react-dotenv";

export default class ShowCampanaPromotorasContainers extends Component {
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
        fileBase:null,
        material:null


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
 
    downloadUrl = async function(material) {
        const BaseUrl = env.REACT_APP_BASE_URL;
        window.open(`${BaseUrl}/`+ material, '_blank');
        
    }

    render() {
        return (
            <ShowCampanaPromotoras
            state = {this.state}
            downloadFaldon={this.downloadFaldon}
            downloadUrl={this.downloadUrl}>
            </ShowCampanaPromotoras>
        )
    }
}

import React, { Component } from 'react'
import ShowIncidencias from './ShowIncidencias';
import IncidenciasServices from '../../../services/IncidenciasServices';
import {customFormatterToSent , getFirtsEmentArray } from '../../../util/formats';
import swal from 'sweetalert';
export default class ShowIncidenciasContainers extends Component {
    state = {
        description:null,
        errorsForm: {
            description:'',
            tipoCampana:'',
            campanaProvvedor:'',
            campanaPromotora:''
        },
        listaTipoCampanaCreated:[
            {id:1 ,nombre:'Campaña Promotora'},
            {id:2 ,nombre:'Campaña Proveedor'}
        ],
        tipoCampanaSeleccionada : [],
        dataCampanaProvvedor:[],
        campanaProveedorSeleccionada: [],
        dataCampanaPromotora:[],
        campanaPromotoraSeleccionada: [],
        loadingCreate:false,
        tipoCampanaSelectAuxiliar:null,
        cadenaNombre:null,
        campanaNombre:null,
        proveedorNombre:null,
        seccionNombre:null,
        objectTosend:{tipo_campana: null , id_campana : null , descripcion_incidencia : ''},
        idIncidenciaToEdit:null,
        incidenciaDetailsData:null,
    }
    async componentDidMount(){
        await this.getDetailsIncidencia();
        await this.preSelectObject();
    }

    getDetailsIncidencia = async function(){
        this.setState({loadingCreate:true , error: null , idIncidenciaToEdit:this.props.match.params.id})
        let idIncidenciaEdit = this.props.match.params.id;
        await IncidenciasServices.getIncidenciaDetail(idIncidenciaEdit).then((data) => {
            console.log('data del detalle' , data);
                if(!data.hasOwnProperty('errorInfo')){
                    this.setState({
                        loadingCreate:false,
                        incidenciaDetailsData: data.data,
                    });
                }else{
                    this.setState({ loadingCreate:false , error : data.error})
                }
            })
    }
    preSelectObject = async function(){
        this.setState({loadingCreate:true , error: null})
        let tipoCampanaLocal = this.state.incidenciaDetailsData.tipo_campana;
        let TipoCampanaLocalObj = {};
        if(tipoCampanaLocal === 'Campaña Promotora'){
            TipoCampanaLocalObj =    {id:1 ,nombre:'Campaña Promotora'};
        }
        if(tipoCampanaLocal === 'Campaña Proveedor'){
            TipoCampanaLocalObj =      {id:2 ,nombre:'Campaña Proveedor'};
        }
        let cadenaLocal = this.state.incidenciaDetailsData.campana.cadena.nombre;
        let campanaLocal = this.state.incidenciaDetailsData.campana.nombre;
        let proveedorLocal = this.state.incidenciaDetailsData.campana.proveedor.nombre;
        let seccionLocal = this.state.incidenciaDetailsData.campana.sesion.descripcion;
        let descriptionLocal = this.state.incidenciaDetailsData.descripcion_incidencia;
        this.setState(
            {loadingCreate:false , 
             error: null ,
             tipoCampanaSeleccionada: [TipoCampanaLocalObj],
             cadenaNombre:cadenaLocal,
             campanaNombre:campanaLocal,
             proveedorNombre:proveedorLocal,
             seccionNombre:seccionLocal,
             description: descriptionLocal
         })
     }

    render() {
        return (
            <ShowIncidencias
            state = {this.state}>
            </ShowIncidencias>
        )
    }
}

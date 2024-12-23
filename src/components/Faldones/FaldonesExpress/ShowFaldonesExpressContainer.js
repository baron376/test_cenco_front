import React, { Component } from 'react'
import ShowFaldonesExpress from './ShowFaldonesExpress';
import FaldonesServices from '../../../services/FaldonesServices';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default class ShowFaldonesExpressContainer extends Component {
    
    state = {
    
        idCampanaFaldonToEdit:null,
        faldonDetailsData:'',
        loading:false,
        render:false,

        estadoFaldon:null,
        cadenaFaldon:null,
        salaFaldon:null,
        medioFaldon:null,
        tipoMedioFaldon:null,
        tipoVolanteFaldon:null,
        seccionFaldon:null,
        nombreFaldon:null,
        sapFaldon:null,
        codBarraFaldon:null,
        cuotas:null,
        valor_cuota:null,
        cae:null,
        costo_total:null,
        umbFaldon:null,
        descripcionFaldon:null,
        precioReferenciaModaFaldon:null,
        tipoPromoFaldon:null,
        combinacionFaldon:null,
        tmpFaldon:null,
        tcFaldon:null,
        qrFaldon:null,
        fechaInicioPromoFaldon:null,
        fechaTerminoFaldon:null,
        formatoFaldon:null,
        plantillaFaldon:null,
        usuaioCreaFaldon:null,
        usuarioModificaFaldon:null,
        fechaCrearFaldon:null, 
        fechaUltimaActualizacionFaldon:null
    }

    constructor(){
        super();
        this.getDetailsFaldon.bind(this)
    }


    async componentDidMount(){
        await this.getDetailsFaldon();
        await this.faldonesFormater();
        await this.preSelectObject();
    }
    getDetailsFaldon = async function(){
        this.setState({loading:true , error: null , idCampanaFaldonToEdit:this.props.match.params.id})
        let idCampanaFaldontoEdit = this.props.match.params.id;
        await FaldonesServices.getFaldonDetail(idCampanaFaldontoEdit).then((data) => {
            console.log('data del detalle faldon' , data);
                if(!data.hasOwnProperty('errorInfo')){
                    this.setState({
                        loading:false,
                        faldonDetailsData: data.data,
                    });
                }else{
                    this.setState({ loading:false , error : data.error})
                }
            })
    }
    preSelectObject = async function(){
        this.setState({loading:true , error: null})
        
     let estadoFaldon= this.state.faldonDetailsData[0].estado_faldon? this.state.faldonDetailsData[0].estado_faldon.nombre : null;
     let cadenaFaldon = this.state.faldonDetailsData[0].cadena_faldon? this.state.faldonDetailsData[0].cadena_faldon.nombre : null;
     let salaFaldon =   this.state.faldonDetailsData.sala_faldon? this.state.faldonDetailsData.sala_faldon.nombre_sap : null;
     let medioFaldon = this.state.faldonDetailsData.medio_faldon? this.state.faldonDetailsData.medio_faldon.nombre : null;
     let tipoMedioFaldon = this.state.faldonDetailsData.tipo_medio_faldon? this.state.faldonDetailsData.tipo_medio_faldon.nombre : null;
     let tipoVolanteFaldon = this.state.faldonDetailsData.tipo_volante_catalogo_faldon? this.state.faldonDetailsData.tipo_volante_catalogo_faldon.nombre : null;
     let seccionFaldon = this.state.faldonDetailsData.seccion_faldon? this.state.faldonDetailsData.seccion_faldon.nombre : null;
     let nombreFaldon = this.state.faldonDetailsData.nombre_generico_promocion;
     let sapFaldon = this.state.faldonDetailsData.sap;
     let codBarraFaldon = this.state.faldonDetailsData.cod_barra;
     let cuotas = this.state.faldonDetailsData.cuotas;
     let valor_cuota = this.state.faldonDetailsData.valor_cuota;
     let cae = this.state.faldonDetailsData.cae;
     let costo_total = this.state.faldonDetailsData.costo_total;
     let umbFaldon = this.state.faldonDetailsData.umb;
     let descripcionFaldon = this.state.faldonDetailsData.descripcion;
     let precioReferenciaModaFaldon = this.state.faldonDetailsData.precio_referencia_moda;
     let tipoPromoFaldon = this.state.faldonDetailsData.tipo_promo_faldon? this.state.faldonDetailsData.tipo_promo_faldon.nombre : null;
    //  let combinacionFaldon = this.state.faldonDetailsData.combinacion_faldon? this.state.faldonDetailsData.combinacion_faldon.nombre : null;
    let combinacion = this.state.faldonDetailsData.combinacion;
     let tmpFaldon = this.state.faldonDetailsData.tmp;
     let tcFaldon = this.state.faldonDetailsData.tc;
     let qrFaldon = this.state.faldonDetailsData.qr === 0 ? 'NO': 'SI';
     let fechaInicioPromoFaldon = this.state.faldonDetailsData.fecha_inicio_promo;
     let fechaTerminoFaldon = this.state.faldonDetailsData.fecha_termino_promo;
     let formatoFaldon = this.state.faldonDetailsData[0].formato_faldon? this.state.faldonDetailsData[0].formato_faldon.nombre : null;
     let plantillaFaldon =  this.state.faldonDetailsData[0].plantilla_faldon? this.state.faldonDetailsData[0].plantilla_faldon.descripcion : null;
     let usuaioCreaFaldon = this.state.faldonDetailsData.usuario_crea_faldon? this.state.faldonDetailsData.usuario_crea_faldon.rut+'-'+ this.state.faldonDetailsData.usuario_crea_faldon.dv+' '+this.state.faldonDetailsData.usuario_crea_faldon.nombre+' '+this.state.faldonDetailsData.usuario_crea_faldon.apellido : null;
     let usuarioModificaFaldon = this.state.faldonDetailsData.usuario_modifica_faldon? this.state.faldonDetailsData.usuario_modifica_faldon.rut+'-'+ this.state.faldonDetailsData.usuario_modifica_faldon.dv+' '+this.state.faldonDetailsData.usuario_modifica_faldon.nombre+' '+this.state.faldonDetailsData.usuario_modifica_faldon.apellido : null;
     let fechaCrearFaldon = this.state.faldonDetailsData.created_at;
     let fechaUltimaActualizacionFaldon = this.state.faldonDetailsData.updated_at;

        this.setState(
            { 
              loading:false , 
              estadoFaldon:estadoFaldon,
              cadenaFaldon:cadenaFaldon,
              salaFaldon:salaFaldon,
              medioFaldon:medioFaldon,
              tipoMedioFaldon:tipoMedioFaldon,
              tipoVolanteFaldon:tipoVolanteFaldon,
              seccionFaldon:seccionFaldon,
              nombreFaldon:nombreFaldon,
              sapFaldon:sapFaldon,
              codBarraFaldon:codBarraFaldon,
              cuotas:cuotas,
              valor_cuota:valor_cuota,
              cae:cae,
              costo_total:costo_total,
              umbFaldon:umbFaldon,
              descripcionFaldon:descripcionFaldon,
              precioReferenciaModaFaldon:precioReferenciaModaFaldon,
              tipoPromoFaldon:tipoPromoFaldon,
              combinacionFaldon:combinacion,
              tmpFaldon:tmpFaldon,
              tcFaldon:tcFaldon,
              qrFaldon:qrFaldon,
              fechaInicioPromoFaldon:fechaInicioPromoFaldon,
              fechaTerminoFaldon:fechaTerminoFaldon,
              formatoFaldon:formatoFaldon,
              plantillaFaldon:plantillaFaldon,
              usuaioCreaFaldon:usuaioCreaFaldon,
              usuarioModificaFaldon:usuarioModificaFaldon,
              fechaCrearFaldon:fechaCrearFaldon, 
              fechaUltimaActualizacionFaldon:fechaUltimaActualizacionFaldon
         })
     }
     seccionFormater (cell){
        let namesSec = cell.nombre
        return namesSec;
    }

    faldonesFormater = async function() {
        let cell = this.state.faldonDetailsData;
        let faldones = [];
    
        cell.forEach((faldon, index) => {
            // Inicializar la variable de financiamiento
            let financiamiento = false;
    
            // Verificar si alguno de los campos especificados no es nulo
            if (
                faldon.cae !== null ||
                faldon.cuotas !== null ||
                faldon.costo_total !== null ||
                faldon.valor_cuota !== null
            ) {
                financiamiento = true; // Establecer financiamiento a true si alguno de los campos no es nulo
            }
            let pack = faldon.tipo_promo === "PACK";
            // Agregar el objeto "faldon" al arreglo "faldones" incluyendo la información de financiamiento
            faldones.push({
                id: index,
                nombre: faldon.nombre_generico_promocion,
                cod_barra: faldon.cod_barra,
                umb: faldon.umb,
                cae: faldon.cae,
                cuotas: faldon.cuotas,
                costo_total: faldon.costo_total,
                valor_cuota: faldon.valor_cuota,
                precio_referencia: faldon.precio_referencia_moda,
                tipo_promo: faldon.tipo_promo,
                tmp: faldon.tmp,
                tc: faldon.tc,
                fechaInicioPromoFaldon: faldon.fecha_inicio_promo,
                fechaTerminoFaldon: faldon.fecha_termino_promo,
                combinacion: faldon.combinacion,
                financiamiento: financiamiento,
                pack: pack
            });
        });
    
        // Establecer el estado con los "faldones" y la información de financiamiento
        this.setState({
            faldones: faldones
        });
    }
    

    render() {
        return (
                <ShowFaldonesExpress
                state = {this.state}
                ></ShowFaldonesExpress>
        )
    }
}

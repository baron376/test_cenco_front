import React, { Component } from 'react'
import ShowFaldones from '../Admin/ShowFaldones';
import FaldonesServices from '../../../services/FaldonesServices';
import swal from 'sweetalert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
export default class ShowFaldonesContainers extends Component {

    state = {
    
        idCampanaFaldonToEdit:null,
        faldonDetailsData:'',
        loading:false,
        productosValidados:[],
        productosOriginales:[],
        productos:[],
        urlArchivoExcel:null,
        render:false,
        headData:[{
            dataField: '',
            text: ''
          }],
          headDataAlertas:[{
            dataField: '',
            text: ''
          }],
          headDataRechazos:[{
            dataField: '',
            text: ''
          }],
        nombreCampana:null,
        cadenaCampana:null,
        formatCampana:null,
        typeCampana:null,
        dateCreatedCampana:null,
        dateLastUpdateCampana :null,
        userCreatedCampana : null,
        userUpdateCampana : null,
        dateInitCampana : null, 
        dateFinishCampana : null,
        stateCampana : null,
        plantillaCampana : null,
        alertasArchivoCampana :[],
        rechazosArchivoCampana :[],
        qr:null ,
        boleanExistAlertasArchivoCampana : false,
        boleanExistRechazosArchivoCampana :  false,
        loadingDescarga:false
    }

    constructor(){
        super();
        this.getDetailsFaldon.bind(this)
    }


    async componentDidMount(){
        await this.trasfData();
        await this.getDetailsFaldon();
        await this.preSelectObject();

    }
    trasfData = async function(){
        this.setState({
            loading:true,
        });
        const columns = [
          {
                dataField: 'sap',
                text: 'ID | SAP',
                headerStyle: {
                    width: '10%'
                  },
                  sort: true,
          },
          {
            dataField: 'seccion_string',
            // formatter:this.seccionFormater, // Página de detalle de faldones no se muestra correctamente porque funcion seccionFormater define en null formatter.
            text: 'Sección',
            headerStyle: {
                width: '10%'
              },
              sort: true,
          },
          {
            dataField: 'nombre_generico_promocion',
            text: 'Nombre Genérico',
            headerStyle: {
                width: '10%'
              },
              sort: true,
         },
         {
            dataField: 'cod_barra',
            text: 'Código',
            headerStyle: {
                width: '10%'
              },
              sort: true,
         },
         {
            dataField: 'estadoPromocion',
            text: 'Estado Promoción',
            headerStyle: {
                width: '10%'
              },
              sort: true,
         },
         {
            dataField: 'actions',
            text: 'Acciones',
            formatter:this.actionsFormater.bind(this),
            headerStyle: {
                width: '15%'
              }
        }
        ];
        const columnsAlertas = [
            {
                dataField: 'id_alerta_archivos_campana_faldones',
                text: 'Código',
                headerStyle: {
                    width: '10%'
                    },
                    sort: true,
            },
            {
                dataField: 'numero_fila',
                text: 'Fila',
                headerStyle: {
                    width: '10%'
                    },
                    sort: true,
            },
            {
            dataField: 'campo_asociado',
            text: 'Columna',
            headerStyle: {
                width: '10%'
                },
                sort: true,
            },
            {
                dataField: 'descripcion',
                text: 'Descripción',
                headerStyle: {
                    width: '10%'
                    },
                    sort: true,
            },
          ];
          const columnsRechazos = [
            {
                dataField: 'id_rechazos_archivos_campanas_faldones',
                text: 'Código',
                headerStyle: {
                    width: '10%'
                    },
                    sort: true,
            },
            {
                dataField: 'numero_fila',
                text: 'Fila',
                headerStyle: {
                    width: '10%'
                    },
                    sort: true,
            },
            {
            dataField: 'campo_asociado',
            text: 'Columna',
            headerStyle: {
                width: '10%'
                },
                sort: true,
            },
            {
                dataField: 'descripcion',
                text: 'Descripción',
                headerStyle: {
                    width: '10%'
                    },
                    sort: true,
            },
          ];
          this.setState({
            loading:false,
            headData: columns,
            headDataAlertas: columnsAlertas,
            headDataRechazos: columnsRechazos
        });
    }
    downloadFaldon= async (faldon) =>{
        this.setState({loadingDescarga:true })
        try{
            FaldonesServices.downloadFaldonCampana(faldon).then((data) => {
                if(!data.hasOwnProperty('errorInfo')){
                    let responseLocal = data.data;
                    let linkSource = `data:application/pdf;base64,${responseLocal.content}`;
                    let downloadLink = document.createElement("a");
                    let fileName = responseLocal.nombre_archivo;
                    downloadLink.href = linkSource;
                    downloadLink.download = fileName;
                    downloadLink.click();
                    this.setState({loadingDescarga:false });
                swal({
                    title: `Faldon descargado con éxito`,
                    text: "!",
                    icon: "success",
                    button: "Ok!",
                });
                }else{
                    swal({
                        title: `Error`,
                        text: "!",
                        icon: "error",
                        button: "Ok!",
                    });
                }
            })
          
        } catch(error){
            this.setState({loadingDescarga:false })
        }
    }
    actionsFormater(cell , row){
        if (Number (this.state.faldonDetailsData.id_estado_campana === 5)){
        return(
        <button  title="Descargar faldon"   className="btn btn-danger" onClick={() => {this.downloadFaldon(row.id)}}> <FontAwesomeIcon icon={faFilePdf}/> </button>
        )
    }else{
        return(
            null
            )
    }
    }
    getDetailsFaldon = async function(){
        this.setState({loading:true , error: null , idCampanaFaldonToEdit:this.props.match.params.id})
        let idCampanaFaldontoEdit = this.props.match.params.id;
        await FaldonesServices.getCampanaDetail(idCampanaFaldontoEdit).then((data) => {
            console.log('data del detalle' , data);
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
        let localNombreArchivo = this.state.faldonDetailsData.archivo.nombre;
        let localProductosValidados = this.state.faldonDetailsData.archivo.ProductosValidados;
        let localProductosOriginales =  this.state.faldonDetailsData.archivo.productosOriginales;
        let localFechaUploadFile =  this.state.faldonDetailsData.archivo.created_at;
        let localEstadoArchivoFaldon = this.state.faldonDetailsData.archivo.estado.nombre;
        let localEstatusArchivoFaldon = this.state.faldonDetailsData.archivo.estatus.nombre;
//        let localUsuarioCreadorArchivoFaldon = this.state.faldonDetailsData.archivo.usuario_crea.rut+'-'+this.state.faldonDetailsData.archivo.usuario_crea.dv+' '+this.state.faldonDetailsData.archivo.usuario_crea.nombre+' '+this.state.faldonDetailsData.archivo.usuario_crea.apellido;
        let localUsuarioModificaArchivoFaldon = null;
        if(this.state.faldonDetailsData.archivo.id_usuario_modifica){
                localUsuarioModificaArchivoFaldon = this.state.faldonDetailsData.archivo.id_usuario_modifica.rut+'-'+this.state.faldonDetailsData.archivo.id_usuario_modifica.dv+' '+this.state.faldonDetailsData.archivo.id_usuario_modifica.nombre+' '+this.state.faldonDetailsData.archivo.id_usuario_modifica.apellido;
            }else{
                localUsuarioModificaArchivoFaldon = null;
            }
        let localProductos =  Number(this.state.faldonDetailsData.id_estado_campana) === 5? localProductosValidados : localProductosOriginales;
        let localUrlArchivoExcel =  this.state.faldonDetailsData.archivo.url;
        let localnombreCampana = this.state.faldonDetailsData.nombre;
        let localCadenaCampana = this.state.faldonDetailsData.cadena_campana.nombre;
        let localTitypeCampana = this.state.faldonDetailsData.campana_tipo.nombre;
        let localaDateInitCampana =  this.state.faldonDetailsData.created_at;
        let localDateLastUpdte = this.state.faldonDetailsData.updated_at;
        let localUserCreatedCamapna = this.state.faldonDetailsData.usuario_crea_campana.rut+'-'+this.state.faldonDetailsData.usuario_crea_campana.dv+' '+this.state.faldonDetailsData.usuario_crea_campana.nombre+' '+this.state.faldonDetailsData.usuario_crea_campana.apellido ;
        let localUserUpdateCamapna = null;
        if(this.state.faldonDetailsData.usuario_modifica_campana){
            localUserUpdateCamapna = this.state.faldonDetailsData.usuario_modifica_campana.rut+'-'+this.state.faldonDetailsData.usuario_modifica_campana.dv+' '+this.state.faldonDetailsData.usuario_modifica_campana.nombre+' '+this.state.faldonDetailsData.usuario_modifica_campana.apellido ;
        }else{
            localUserUpdateCamapna = null;
        }
        let localDateInitCampanaA = this.state.faldonDetailsData.desde;
        let localDateFinishCampanaA = this.state.faldonDetailsData.hasta;
        let localFormatCamapna = this.state.faldonDetailsData.formato_campana.nombre;
        let localEstadoCampana =  this.state.faldonDetailsData.campana_estado.nombre;
        let localPlantillaCampana = this.state.faldonDetailsData.plantilla_campana.descripcion;
        let localQr = Number(this.state.faldonDetailsData.qr)  === 2 ? 'NO' : 'SI';
        let localAlertaCampana = this.state.faldonDetailsData.archivo.alertas_productos;
        let localRechazosCampana = this.state.faldonDetailsData.archivo.rechazos_productos;
        let localExistAlerta = localAlertaCampana.length >0 ? true : false ;
        let localExistRechazo = localRechazosCampana.length >0 ? true : false ;

        this.setState(
            {loading:false , 
             error: null ,
             productosValidados: localProductosValidados,
             productosOriginales: localProductosOriginales,
             productos:localProductos,
             render:true,
             nombreCampana:localnombreCampana,
             urlArchivoExcel: localUrlArchivoExcel,
             cadenaCampana: localCadenaCampana,
             typeCampana: localTitypeCampana,
             dateCreatedCampana : localaDateInitCampana,
             dateLastUpdateCampana :localDateLastUpdte,
             userCreatedCampana: localUserCreatedCamapna,
             userUpdateCampana: localUserUpdateCamapna,
             dateInitCampana : localDateInitCampanaA,
             dateFinishCampana : localDateFinishCampanaA,
             formatCampana: localFormatCamapna,
             stateCampana: localEstadoCampana,
             plantillaCampana : localPlantillaCampana,
             qr: localQr,
             alertasArchivoCampana: localAlertaCampana , 
             rechazosArchivoCampana: localRechazosCampana,
             boleanExistAlertasArchivoCampana : localExistAlerta,
             boleanExistRechazosArchivoCampana :  localExistRechazo
         })
     }
     seccionFormater (cell){
        let namesSec = cell.nombre
        return namesSec;
    }

    render() {
        return (
                <ShowFaldones
                state = {this.state}
                ></ShowFaldones>
        )
    }
}

import React, { Component } from 'react'
import AdminIncidencias  from './AdminIncidencias';
import { faPencilAlt , faEye , faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {hasPermission} from '../../util/auth';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import IncidenciasServices from '../../services/IncidenciasServices';
import {customFormatterToView} from '../../util/formats';
import swal from 'sweetalert';

export default class AdminIncidenciasContainers extends Component {

    state = {
        dataActive:[],
        dataDeteted:[],
        headData:[{
            dataField: '',
            text: ''
          }],
          //loadingFaldones:false,
          error:null,
          loading:false,
          modalIsopen: false,
          modalCreateTitle: '',
          campanaDetailsData:[],
          loadingIncidencias:false,
          dataActive:[],
          dataDeteted:[]
    }
    async componentDidMount(){
        await this.trasfData();
        await this.getDataAllActive();
        await this.getDataDetele();
        
    }
    trasfData = async function(){
        this.setState({
            loading:true,
        });
        const columns = [
           {
                dataField: 'campana',
                text: 'Cadena',
                formatter:this.cadenaFormater,
                headerStyle: {
                    width: '13%'
                  },
                  sort: true,
           },
           {
                dataField: 'tipo_campana',
                text: 'Tipo de Campaña',
                headerStyle: {
                    width: '20%'
                },
                sort: true,
            },
            {
                dataField: 'campana',
                text: 'Campaña',
                formatter:this.campanaFormater,
                headerStyle: {
                    width: '13%'
                  },
                  sort: true,
           },
           {
            dataField: 'campana',
            text: 'Proveedor',
            formatter:this.proveedorFormater,
            headerStyle: {
                width: '13%'
              },
              sort: true,
            },
            {
                dataField: 'campana',
                text: 'Sección',
                formatter:this.seccionFormater,
                headerStyle: {
                    width: '13%'
                  },
                  sort: true,
            },
            {
                dataField: 'created_at',
                text: 'Fecha Incidencia',
                formatter:this.fechaIncidenciaFormater,
                headerStyle: {
                    width: '20%'
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
            },
        ];
          this.setState({
            loading:false,
            headData: columns,
        });
    }
    cadenaFormater (cell){
        let namesCad = cell.cadena.nombre
        return namesCad;
    }
    campanaFormater (cell){
        let namesCad = cell.nombre
        return namesCad;
    }
    proveedorFormater (cell){
        let namesCad = cell.proveedor.nombre
        return namesCad;
    }
    seccionFormater (cell){
        let namesCad = cell.sesion.descripcion
        return namesCad;
    }
    fechaIncidenciaFormater (cell){
            return customFormatterToView(cell)
    }
    actionsFormater(cell , row){
        if(!row.deleted_at){
            return(            
                <div>
                    {hasPermission([1005]) &&
                        <Link to={`/IncidenciasDetalles-${row.id}`}> <button   title="Ver" className="btn btn-info" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faEye}/></button></Link>
                    }
                    {hasPermission([1003]) &&
                        <Link to={`/IncidenciasEditar-${row.id}`}> <button   title="Editar" className="btn btn-primary actions-icons-t" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faPencilAlt}/></button></Link>
                    }
                    {hasPermission([1004]) &&
                        <a> <button  title="Eliminar"   className="btn btn-danger" onClick={() => {this.deleteIncidencia(row.id)}}> <FontAwesomeIcon icon={faTrashAlt} /> </button></a>
                    }
                </div>
            )        
        }
        else {
            
            return(            
                <div>
                    {hasPermission([1005]) &&
                        <Link to={`/IncidenciasDetalles-${row.id}`}> <button   title="Ver" className="btn btn-info" data-toggle="modal" data-target="#modal-lg-sh"><FontAwesomeIcon icon={faEye}/></button></Link>
                    }
                </div>
            )        
        }
    }
   
    getDataAllActive = async function(){
        this.setState({loadingIncidencias:true , error: null})
         await IncidenciasServices.getIncidenciasActive().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                    this.setState({loadingIncidencias:false, dataActive: data.data});
                }else{
                    this.setState({ loadingIncidencias:false , error : data.error})
                }
        })
    }
    getDataDetele = async function(){
        this.setState({loadingIncidencias:true , error: null})
         await IncidenciasServices.getIncidenciasDeleted().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                    this.setState({loadingIncidencias:false, dataDeteted: data.data});
                }else{
                    this.setState({ loadingIncidencias:false , error : data.error})
                }
        })
    }
    deleteIncidencia= async (incidencia) =>{
        console.log( 'eliminar campana', incidencia)
      
            swal({
                title: "Esta seguro que desea Eliminar la incidencia?",
                text: "No podrá recuperar los datos de la misma!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    try{
                        IncidenciasServices.deleteIncidencia(incidencia).then((data) => {;
                            if(!data.hasOwnProperty('errorInfo')){
                            swal({
                                title: `Incidencia eliminada con éxito`,
                                text: "!",
                                icon: "success",
                                button: "Ok!",
                            });
                            this.getDataAllActive();
                            this.getDataDetele();
                            }else{
                                swal({
                                    title: `Error ${data.errorInfo.toString()} `,
                                    text: "!",
                                    icon: "error",
                                    button: "Ok!",
                                });
                            }
                        })
                        this.setState({loadingIncidencias:false , error: null})
                    } catch(error){
                        this.setState({loadingIncidencias:false , error: error})
                    }
                }
            });
        
    }

    render() {
        return (
            <AdminIncidencias
            state = {this.state}>
            </AdminIncidencias>
        )
    }
}

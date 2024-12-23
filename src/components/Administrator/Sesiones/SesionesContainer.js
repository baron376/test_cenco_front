import React, { Component } from 'react';
import Sesiones from '../Sesiones/Sesiones';
import AdminServices from '../../../services/AdminServices';
import swal from 'sweetalert';
import $ from "jquery";
import { faPencilAlt , faEye , faTrashAlt, faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../styles/users.css';
import {hasPermission} from '../../../util/auth';
export default class SalasContainer extends Component {
    state = {
        modalIsopen:false,
        modalCreateTitle:'Created Sesion',
        modalTitle:'Crear Sección',
        dataActive:[],
        dataInactive: [],
        dataDeleted: [],
        error: null,
        errorsForm: {
            name: '',
            number:'',
            descripcion:'',
        },
        fallo: false,
        headData:[{
            dataField: '',
            text: ''
        }],
        number:'',
        name:'',
        descripcion:'',
        sesionesDetailsData: {},
        sesionesNumeroData: {}
    }
    /*constructor(){
        super(); 
    }*/

    async componentDidMount(){
        await this.trasfData();
        await this.getSesionesActive();
        await this.getSesionesInactive();
        await this.getSesionesDelete();        
    }

    getSesionesActive = async function(){
        this.setState({loading:true , error: null})
        await AdminServices.getSesionActivas().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, dataActive: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }
    getSesionesInactive = async function(){
        this.setState({loading:true , error: null})
        await AdminServices.getSesionInactive().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, dataInactive: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }    
    getSesionesDelete = async function(){
        this.setState({loading:true , error: null})
        await AdminServices.getSesionDelete().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, dataDeleted: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }
    trasfData = async function(){
        this.setState({
            loading:true,
        });
        const columns = [
            {
                dataField: 'numero',
                sort: true,
                text: 'Numero',
                headerStyle: {
                    width: '6%'
                  },
                //sort: true,
            }, 
            {
                dataField: 'cdg_int',
                text: 'Código',
                headerStyle: {
                    width: '10%'
                  },
                sort: true,
            }, 
            {
                dataField: 'nombre',
                text: 'Nombre',
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
            {
                dataField: 'actions',
                text: 'Acciones',
                formatter:this.actionsFormater.bind(this),
                headerStyle: {
                    width: '5%'
                }
            },    
        ];
          this.setState({
            loading:false,
            headData: columns,
        });
    }
    handleChangeI = e =>{
        this.setState({
            [e.target.name] : e.target.value
        });
        const { name, value } = e.target;
        let errors = this.state.errorsForm;
        switch (name) {
            case 'name': 
                errors.name ='';
                if(value===''){
                    errors.name ='El nombre de la Sección es requerido';
                }
            break;
            case 'numero': 
                errors.numero ='';
                this.getNumeroSesiones(value);
                if(this.state.sesionesNumeroData.length['id']){
                    if(!this.state.editSesionEstate){
                        errors.number ='El número de la Sección ya existe';
                    }
                }                
                if(value===''){
                    errors.number ='El número de la Sección es requerido';
                }
            break;
            case 'descripcion': 
                errors.descripcion ='';
                if(value===''){
                    errors.descripcion ='La Descripción de la Sección es requerido';
                }
            break;
            default:
              break;
          }
        this.setState({errors, [name]: value});
    }
    async validateFormPreSubmit(){
        let errors = this.state.errorsForm;
        errors.name =''; 
        errors.number ='';
        errors.descripcion ='';
        
        if(this.state.name===''){
            errors.name ='El nombre de la Sección es requerido!';
        }
        if(this.state.number===''){
           errors.number ='El número  de la Sección es requerido!';
        }else{
            await this.getNumeroSesiones(this.state.number);
            if(this.state.sesionesNumeroData['id']){
                if(!this.state.editSesionEstate){
                    errors.number ='El número de la Sección ya existe';
                }
            }
        }
        if(this.state.descripcion===''){
            errors.descripcion ='La Descripción de la Sección es requerido!';
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
    deleteVariables = e =>{
        this.setState({
            modalIsopen:false,
            modalCreateTitle:'Created Sala',
            modalTitle:'Crear Sección',
            number:'',
            name:'',
            descripcion:'',
            sesionesDetailsData: {},
            sesionesNumeroData:{},
            editSesionEstate:false,
            errorsForm: {
                name: '',
                number:'',
                descripcion:''
            },
            
        });
    }
    handleCloseModal = e =>{
        this.setState({modalIsopen:false})
    }
    handleClickBs = e =>{
        console.log('boton precionDO');
    }
    getNumeroSesiones = async function(NumeroSesion){
        this.setState({loading:true , error: null})
        await AdminServices.getNumeroSesiones(NumeroSesion).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, sesionesNumeroData: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }
    handleSubmitBs = async e =>{
        e.preventDefault();
        await this.validateFormPreSubmit();
        if(this.validateForm(this.state.errorsForm)) {
            if(!this.state.editSesionEstate){
                swal({
                    title: "Esta seguro de Guardar la Sección?",
                    text: "La Sección se habilitara para todas las salas!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        this.createSesion()
                    }
                });
            }else{
                swal({
                    title: "Esta seguro que desea Actualizar la Sección?",
                    text: "La Sección se habilitara para todas las salas!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        this.updateSesion()
                    }
                });
            }
        }else{
            return
        }       
    }
    sesionesFormater (cell){
        //let namesCad = cell.map(cad => cad.nombre)
        let namesCad = cell.nombre
        return namesCad;
    }
    newOrEditSesiones = async (sesion) =>{
        if(sesion === 0){
            this.setState({modalIsopen:true});
        }else{
            this.setState({modalIsopen:true , modalTitle:'Editar Sección' , loadingModalEdit:true});
                await this.getDetailsSesiones(sesion);
                await this.setVarEditSesiones();
            this.setState({loadingModalEdit:false});
        }
    }
    createSesion = async function(){        
        let newSesion = ({
            descripcion:this.state.descripcion,
            nombre:this.state.name,
            numero:this.state.number,
        });
        this.setState({
            formAlldate : newSesion
        })
        try{
            this.setState({loading:true , error: null})
            AdminServices.storeSesiones(newSesion).then((data) => {
                console.log('esto es le retornoooooooooooooooooooo' ,data)
                if(!data.hasOwnProperty('errorInfo')){
                    swal({
                        title: `Sección registrada con Éxito!`,
                        //text: "!",
                        icon: "success",
                        button: "Ok!",
                    });
                    this.trasfData();
                    this.getSesionesActive();
                    this.getSesionesInactive();
                    this.getSesionesDelete(); 
                }else{
                    swal({
                        title: `Error ${data.errorInfo.toString()} `,
                        text: "!",
                        icon: "error",
                        button: "Ok!",
                    });
                }
            })
            $('.modal-backdrop').remove();
            this.deleteVariables();
            await this.trasfData();
            await this.getSesionesActive();
            await this.getSesionesInactive();
            await this.getSesionesDelete();     
            this.setState({loading:false , error: null})
        } catch(error){
            this.setState({loading:false , error: error})
        }
    }
    getDetailsSesiones = async function(SesionesId){
        this.setState({loading:false , error: null})
        await AdminServices.getSesionesDetail(SesionesId).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, sesionesDetailsData: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }
    setVarEditSesiones = async () =>{
        this.setState(
            {
                modalTitle:'Editar Sección',
                editSesionEstate:true,
                name:this.state.sesionesDetailsData.nombre,
                number:this.state.sesionesDetailsData.numero,
                descripcion:this.state.sesionesDetailsData.descripcion,           
            })
        this.setState({modalIsopen:true})
    }
    updateSesion = async function(){ 
        this.setState({loading:true})
        let UpdateSesion = ({            
            nombre:this.state.name,
            descripcion: this.state.descripcion,
            numero: this.state.number,
        });
        this.setState({
            formAlldate : UpdateSesion
        })
        try{
            this.setState({loading:true , error: null})
            AdminServices.updateSesion(UpdateSesion, this.state.sesionesDetailsData.id).then((data) => {
                console.log('esto es le retornoooooooooooooooooooo' ,data)
                if(!data.hasOwnProperty('errorInfo')){
                    swal({
                        title: `¡Sección Actualizada con Éxito!`,
                        //text: "!",
                        icon: "success",
                        button: "Ok!",
                    });
                    this.trasfData();
                    this.getSesionesActive();
                    this.getSesionesInactive();
                    this.getSesionesDelete();  
                }else{
                    swal({
                        title: `Error ${data.errorInfo.toString()} `,
                        text: "!",
                        icon: "error",
                        button: "Ok!",
                    });
                }
            })
            $('.modal-backdrop').remove();
            this.deleteVariables();
            await this.trasfData();
            await this.getSesionesActive();
            await this.getSesionesInactive();
            await this.getSesionesDelete();     
            this.setState({loading:false , error: null})
        } catch(error){
            this.setState({loading:false , error: error})
        }
    }
    statusSesion = async (sesion) =>{
        swal({
            title: "Esta seguro que desea Desactivar la Sección ?",
            text: "La Sección no podrá ser usada en el sistema!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                try{
                    let statusSesion = ({
                        id:sesion
                    });
                    console.log(statusSesion)
                    this.setState({
                        formAlldate : statusSesion
                    })
                    this.setState({loading:true , error: null})
                    AdminServices.statusSesion(statusSesion).then((data) => {
                        console.log('esto es le retornoooooooooooooooooooo' ,data)
                        if(!data.hasOwnProperty('errorInfo')){
                            swal({
                                title: `¡Sección Desactivada con Éxito!`,
                                //text: "!",
                                icon: "success",
                                button: "Ok!",
                            });
                            this.getSesionesActive();
                            this.getSesionesInactive();
                            this.getSesionesDelete();  
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
                } catch(error){
                    this.setState({loading:false , error: error})
                }
            }
        });
    }
    InactivestatusSesion = async (sesion) =>{
        swal({
            title: "Esta seguro que desea Activar la Sección ?",
            text: "La Sección podrá ser usada en el sistema!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                try{
                    let statusSesion = ({
                        id:sesion
                    });
                    this.setState({
                        formAlldate : statusSesion
                    })
                    this.setState({loading:true , error: null})
                    AdminServices.statusSesion(statusSesion).then((data) => {
                        console.log('esto es le retornoooooooooooooooooooo' ,data)
                        if(!data.hasOwnProperty('errorInfo')){
                            swal({
                                title: `¡Sección Activada con Éxito!`,
                                //text: "!",
                                icon: "success",
                                button: "Ok!",
                            });
                            this.getSesionesActive();
                            this.getSesionesInactive();
                            this.getSesionesDelete();   
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
                } catch(error){
                    this.setState({loading:false , error: error})
                }
            }
        });
    }
    deleteSesion = async function(sesion){
        swal({
            title: "Esta seguro que desea eliminar la sección ?",
            text: "La sección no podrá ser usada en el sistema!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {           
                let deleteSesion = ({
                    id:sesion
                });
                console.log(deleteSesion)
                this.setState({
                    formAlldate : deleteSesion
                })
                try{
                    this.setState({loading:true , error: null})
                    AdminServices.deleteSesion(deleteSesion).then((data) => {
                        if (data instanceof Error) {
                            let errorMessage = '';
                            if (data.response.status === 400) {
                              errorMessage = data.response.data;
                            } else {
                              errorMessage = `Error ${data.response.data.toString()}`;
                            }
                            swal({
                              title: errorMessage,
                              icon: "error",
                              button: "Ok!",
                            });
                          } else {
                            swal({
                              title: `Sección eliminada con éxito`,
                              icon: "success",
                              button: "Ok!",
                            });
                          }
                        });
                    //this.deleteVariables();
                    this.deleteVariables();
                    //await this.trasfData();
                    this.setState({modalIsopen:false})
                    this.setState({loading:false , error: null})
                } catch(error){
                    this.setState({loading:false , error: error})
                }
            }
        });
    }
    showSesion = async (sala) =>{
        this.setState({modalIsopen:true , modalTitle:'Detalle Sección', loadingModalShow:true});
            await this.getDetailsSesiones(sala);
            await this.setVarShowSesion();
        this.setState({loadingModalShow:false});
    }
    setVarShowSesion = async () =>{
        this.setState(
        {
            modalTitle:'Detalles Sección',
            editSesionEstate:false,
            name:this.state.sesionesDetailsData.nombre,
            number:this.state.sesionesDetailsData.numero,
            descripcion:this.state.sesionesDetailsData.descripcion,
            
        })
        this.setState({modalIsopen:true})
    }
    actionsFormater(cell , row){
        if(row.id_estatus_secciones ===1 && row.deleted_at === null){
            return(
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">     
                        {hasPermission([115]) &&
                            <button  title="Ver detalles" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"  onClick={() => {this.showSesion(row.id)}}><FontAwesomeIcon icon={faEye}/> Ver detalles</button>
                        }     
                        {hasPermission([110]) &&
                            <button  title="Editar" className="dropdown-item" data-toggle="modal" data-target="#modal-lg"  onClick={() => {this.newOrEditSesiones(row.id)}}><FontAwesomeIcon icon={faPencilAlt}/> Editar</button>
                        }          
                        {hasPermission([111]) &&
                            <button   title="Desactivar" className="dropdown-item"   onClick={() => {this.statusSesion(row.id)}}> <FontAwesomeIcon icon={faThumbsDown} /> Desactivar</button>
                        }
                        {hasPermission([112]) &&
                            <button  title="Eliminar"   className="dropdown-item  btn-delete" onClick={() => {this.deleteSesion(row.id)}}> <FontAwesomeIcon icon={faTrashAlt} /> Eliminar</button>
                        }
                    </div>
                </div>
            )
        }
        if(row.id_estatus_secciones ===2 && row.deleted_at === null){
            return(
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">    
                        {hasPermission([111]) &&
                            <button   title="Activar" className="dropdown-item"   onClick={() => {this.InactivestatusSesion(row.id)}}> <FontAwesomeIcon icon={faThumbsUp} /> Activar</button>
                        }
                        {hasPermission([110]) &&
                            <button  title="Editar" className="dropdown-item" data-toggle="modal" data-target="#modal-lg"  onClick={() => {this.newOrEditSesiones(row.id)}}><FontAwesomeIcon icon={faPencilAlt}/> Editar</button>
                        }
                        {hasPermission([115]) &&
                            <button  title="Ver detalles" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"  onClick={() => {this.showSesion(row.id)}}><FontAwesomeIcon icon={faEye}/> Ver detalles</button>
                        }
                        {hasPermission([112]) &&
                            <button  title="Eliminar"   className="dropdown-item  btn-delete" onClick={() => {this.deleteSesion(row.id)}}> <FontAwesomeIcon icon={faTrashAlt} /> Eliminar</button>
                        }
                    </div>
                </div>
            )
        }
        if(row.deleted_at != null){
            return(
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">
                        {hasPermission([115]) &&
                            <button  title="Ver detalles" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"  onClick={() => {this.showSesion(row.id)}}><FontAwesomeIcon icon={faEye}/> Ver detalles</button>
                        }
                    </div>
                </div>
            )
        }
    }    
    render() {
        return (           
            <Sesiones
            state = {this.state}
            modalIsopen={this.state.modalIsopen}            
            newOrEditSesiones={this.newOrEditSesiones}
            onCloseModal={this.handleCloseModal}
            onOpenModal={this.handleOpenModal}
            handleChangeI={this.handleChangeI}
            deleteVariables = {this.deleteVariables}
            handleSubmitBs={this.handleSubmitBs}
            modalTitle={this.state.modalTitle}
            >
            </Sesiones>           
        )
    }

}
import React, { Component } from 'react';
import Cadena from '../Cadena/Cadena';
import AdminServices from '../../../services/AdminServices';
import swal from 'sweetalert';
import $ from "jquery";
import { faPencilAlt , faEye , faTrashAlt, faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../styles/users.css';
import {hasPermission} from '../../../util/auth';

export default class CadenaContainer extends Component {
    state = {
        modalIsopen:false,
        modalCreateTitle:'Created Cadena',
        modalTitle:'Crear Cadena',
        dataActive:[],
        dataInactive: [],
        dataDeleted: [],
        error: null,
        errorsForm: {
            name: '',
            descripcion:'',
        },
        headData:[{
            dataField: '',
            text: ''
        }],
        name:'',
        descripcion:'',
        cadenaDetailsData: {},
        cadenaNameData: {},
    }
    /*constructor(){
        super(); 
    }*/
    async componentDidMount(){
        await this.trasfData();
        await this.getCadenaActive();
        await this.getCadenaInactive();
        await this.getCadenaDelete();        
    }
    getCadenaActive = async function(){        
        this.setState({loading:true , error: null})
        await AdminServices.getCadenaActivas().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, dataActive: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }
    getCadenaInactive = async function(){
        this.setState({loading:true , error: null})
        await AdminServices.getCadenaInactive().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, dataInactive: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }    
    getCadenaDelete = async function(){
        this.setState({loading:true , error: null})
        await AdminServices.getCadenaDelete().then((data) => {
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
                dataField: 'nombre',
                sort: true,
                text: 'Nombre',
                headerStyle: {
                    width: '6%'
                  },
                //sort: true,
            }, 
            {
                dataField: 'descripción',
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
    newOrEditCAdena = async (cadena) =>{
        this.setState({loading:false});
        if(cadena === 0){
            this.setState({modalIsopen:true});
        }else{            
            this.setState({modalIsopen:true , modalTitle:'Editar Cadena', loadingModalEdit:true});
                await this.getDetailsCadena(cadena);
                await this.setVarEditCadena();
            this.setState({loadingModalEdit:false});
        }
    }
    getDetailsCadena = async function(CadenaId){
        this.setState({loading:false , error: null})
        await AdminServices.getCadenaDetail(CadenaId).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, cadenaDetailsData: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }
    getCadenaName = async function(CadenaName){
        this.setState({loading:false , error: null})
        await AdminServices.getCadenaName(CadenaName).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, cadenaNameData: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }
    showCadena = async (CadenaId) =>{
        this.setState({modalIsopen:true , modalTitle:'Detalle de Cadena', loadingModalShow:true});
            await this.getDetailsCadena(CadenaId);
            await this.setVarShowCadena();
        this.setState({loadingModalShow:false});
    }
    setVarShowCadena = async () =>{
        this.setState(
            {
               modalTitle:'Detalles de la Sala',
               editCadenaEstate:false,
               name:this.state.cadenaDetailsData.nombre,
               descripcion:this.state.cadenaDetailsData.descripcion,
               
            })
        this.setState({modalIsopen:true})
    }
    setVarEditCadena = async () =>{
        this.setState(
            {
                modalTitle:'Editar la Cadena',
                editCadenaEstate:true,
                name:this.state.cadenaDetailsData.nombre,
                descripcion:this.state.cadenaDetailsData.descripcion,   
                loading:false        
            })
        this.setState({modalIsopen:true})
    }
    handleCloseModal = e =>{
        this.setState({modalIsopen:false})
    }
    handleClickBs = e =>{
        console.log('boton precionDO');
    }
    deleteVariables = e =>{
        this.setState({
            modalIsopen:false,
            modalCreateTitle:'Created Cadena',
            modalTitle:'Crear CAdena',
            name:'',
            descripcion:'',
            editCadenaEstate:false,
            cadenaNameData:{},
            loading:false, 
            errorsForm: {
                name: '',
                descripcion:'',
            }
        });
    }
    handleSubmitBs = async e =>{
        e.preventDefault();
        await this.validateFormPreSubmit();
        if(this.validateForm(this.state.errorsForm)) {
            if(!this.state.editCadenaEstate){
                swal({
                    title: "Esta seguro que desea Crear la Cadena ?",
                    text: "La sesión podrá ser usada en el sistema!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        this.createCadena();
                    }
                });
            }else{
                swal({
                    title: "Esta seguro que desea Actualizar la Cadena ?",
                    text: "La sesión podrá ser usada en el sistema!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        this.updateCadena();
                    }
                });
            }
        }else{
           return
        }
       
    }
    cadenaFormater (cell){
        //let namesCad = cell.map(cad => cad.nombre)
        let namesCad = cell.nombre
        return namesCad;
    }
    createCadena = async function(){        
        let newCadena = ({
            descripcion:this.state.descripcion,
            nombre:this.state.name,
        });
        this.setState({
            formAlldate : newCadena
        })
        try{
            AdminServices.storeCadena(newCadena).then((data) => {
                console.log('esto es le retornoooooooooooooooooooo' ,data)
                if(!data.hasOwnProperty('errorInfo')){
                    swal({
                        title: `¡Cadena registrada con Éxito!`,
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
            $('.modal-backdrop').remove();
            this.deleteVariables();
            await this.trasfData();
            await this.getCadenaActive();
            await this.getCadenaInactive();
            await this.getCadenaDelete();  
            this.setState({loading:false , error: null})
        } catch(error){
            this.setState({loading:false , error: error})
        }
    }
    updateCadena = async function(){ 
        this.setState({loading:true})
        let UpdateCadena = ({            
            nombre:this.state.name,
            descripcion: this.state.descripcion,
        });
        this.setState({
            formAlldate : UpdateCadena
        })
        try{
            AdminServices.updateCadena(UpdateCadena, this.state.cadenaDetailsData.id).then((data) => {
                //console.log('esto es le retornoooooooooooooooooooo' ,data)
                if(!data.hasOwnProperty('errorInfo')){
                    swal({
                        title: `¡Cadena Actualizada con Éxito!`,
                        //text: "!",
                        icon: "success",
                        button: "Ok!",
                    });
                    this.getCadenaActive();
                    this.getCadenaInactive();
                    this.getCadenaDelete();
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
            await this.getCadenaActive();
            await this.getCadenaInactive();
            await this.getCadenaDelete();  
            this.setState({loading:false , error: null})
        } catch(error){
            this.setState({loading:false , error: error})
        }
    }
    deleteCadena = async function(cadena){
        swal({
            title: "Esta seguro que desea Eliminar la Cadena ?",
            text: "La cadena no podrá ser usada en el sistema!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            let deleteCadena = ({
                id:cadena
            });
            this.setState({
                formAlldate : deleteCadena
            })
            if (willDelete) {
                try{
                    AdminServices.deleteCadena(deleteCadena).then((data) => {
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
                              title: `Cadena eliminada con éxito`,
                              icon: "success",
                              button: "Ok!",
                            });
                          }
                        });
                    this.deleteVariables();
                    this.setState({loading:false , error: null})
                } catch(error){
                    this.setState({loading:false , error: error})
                }
            }
        });
    }
    statusCadena = async function(cadena){
        swal({
            title: "Esta seguro que desea Desactivar la Cadena ?",
            text: "La cadena no podrá ser usada en el sistema!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                let statusCadena = ({
                    id:cadena
                });
                this.setState({
                    formAlldate : statusCadena
                })
                try{
                    AdminServices.statusCadena(statusCadena).then((data) => {
                        console.log('esto es le retornoooooooooooooooooooo' ,data)
                        if(!data.hasOwnProperty('errorInfo')){
                            swal({
                                title: `¡Cadena fue Desactivada con Éxito!`,
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
                    this.getCadenaActive();
                    this.getCadenaInactive();
                    this.getCadenaDelete();
                    this.deleteVariables();
                    this.setState({loading:false , error: null})
                } catch(error){
                    this.setState({loading:false , error: error})
                }
            }
        });
    }
    InactivestatusCadena = async function(cadena){
        swal({
            title: "Esta seguro que desea Activar la Cadena ?",
            text: "La cadena podrá ser usada en el sistema!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                let statusCadena = ({
                    id:cadena
                });
                this.setState({
                    formAlldate : statusCadena
                })
                try{
                    AdminServices.statusCadena(statusCadena).then((data) => {
                        console.log('esto es le retornoooooooooooooooooooo' ,data)
                        if(!data.hasOwnProperty('errorInfo')){
                            swal({
                                title: `¡Cadena fue Activada con Éxito!`,
                                //text: "!",
                                icon: "success",
                                button: "Ok!",
                            });
                            this.getCadenaActive();
                            this.getCadenaInactive();
                            this.getCadenaDelete();
                        }else{
                            swal({
                                title: `Error ${data.errorInfo.toString()} `,
                                text: "!",
                                icon: "error",
                                button: "Ok!",
                            });
                        }
                    })
                    this.deleteVariables();
                    this.setState({loading:false , error: null})
                } catch(error){
                    this.setState({loading:false , error: error})
                }
            }
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
                this.getCadenaName(value);
                if(this.state.cadenaNameData['id']){
                    if(!this.state.editCadenaEstate){
                        errors.name =' El nombre de la cadena ya existe';
                    }
                }                
                if(value===''){
                    errors.name ='El nombre de la sesión es requerido';
                }
            break;
            case 'descripcion': 
                errors.descripcion ='';
                if(value===''){
                    errors.descripcion ='La Descripción es requerido';
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
        errors.descripcion ='';       
        if(this.state.name===''){
            errors.name ='El nombre de la cadena es requerido!';
        }else{
            await this.getCadenaName(this.state.name);
            if(this.state.cadenaNameData['id']){
                if(!this.state.editCadenaEstate){
                    errors.name =' El nombre de la cadena ya existe';
                }
            }
        }        
        if(this.state.descripcion===''){
            errors.descripcion ='La Descripción es requerido!';
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
    actionsFormater(cell , row){
        if(row.id_estatus_cadenas ===1 && row.deleted_at === null){
            return(
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">    
                        {hasPermission([102]) &&
                            <button  title="Ver detalles" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"  onClick={() => {this.showCadena(row.id)}}><FontAwesomeIcon icon={faEye}/> Ver detalles</button>
                        }
                        {hasPermission([101]) &&
                            <button  title="Editar" className="dropdown-item" data-toggle="modal" data-target="#modal-lg"  onClick={() => {this.newOrEditCAdena(row.id)}}><FontAwesomeIcon icon={faPencilAlt}/> Editar</button>
                        }              
                        {hasPermission([103]) &&
                            <button   title="Desactivar" className="dropdown-item"   onClick={() => {this.statusCadena(row.id)}}> <FontAwesomeIcon icon={faThumbsDown} /> Desactivar</button>
                        }
                        {hasPermission([104]) &&
                            <button  title="Eliminar"   className="dropdown-item btn-delete" onClick={() => {this.deleteCadena(row.id)}}> <FontAwesomeIcon icon={faTrashAlt} /> Eliminar</button>
                        }
                    </div>
                </div>
            )
        }
        if(row.id_estatus_cadenas ===2 && row.deleted_at === null){
            return(
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">
                        {hasPermission([102]) &&
                            <button  title="Ver detalles" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"  onClick={() => {this.showCadena(row.id)}}><FontAwesomeIcon icon={faEye}/> Ver detalles</button>
                        }
                        {hasPermission([101]) &&
                            <button  title="Editar" className="dropdown-item" data-toggle="modal" data-target="#modal-lg"  onClick={() => {this.newOrEditCAdena(row.id)}}><FontAwesomeIcon icon={faPencilAlt}/> Editar</button>
                        }                
                        {hasPermission([103]) &&
                            <button   title="Activar" className="dropdown-item"   onClick={() => {this.InactivestatusCadena(row.id)}}> <FontAwesomeIcon icon={faThumbsUp} /> Activar</button>
                        }
                        {hasPermission([104]) &&
                            <button  title="Eliminar"   className="dropdown-item btn-delete" onClick={() => {this.deleteCadena(row.id)}}> <FontAwesomeIcon icon={faTrashAlt} /> Eliminar</button>
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
                        {hasPermission([104]) &&
                            <button  title="Ver detalles" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"  onClick={() => {this.showCadena(row.id)}}><FontAwesomeIcon icon={faEye}/> Ver detalles</button>
                        }
                    </div>
                </div>
            )
        }
    }
    render() {
        return (           
            <Cadena
            state = {this.state}
            newOrEditCAdena={this.newOrEditCAdena}
            modalIsopen={this.state.modalIsopen}
            onCloseModal={this.handleCloseModal}
            onOpenModal={this.handleOpenModal}
            handleChangeI={this.handleChangeI}
            deleteVariables = {this.deleteVariables}
            onSelectCadenas={this.onSelectCadenas}
            onRemoveCadenas={this.onRemoveCadenas}
            onSelectRegiones = {this.onSelectRegiones}
            onRemoveRegiones = {this.onRemoveRegiones}
            onSelectProvincias = {this.onSelectProvincias}
            onRemoveProvincias = {this.onRemoveProvincias}
            onSelectComuna = {this.onSelectComuna}
            onRemoveComuna ={this.onRemoveComuna}
            handleSubmitBs={this.handleSubmitBs}
            modalTitle={this.state.modalTitle}
            >
            </Cadena>           
        )
    }
}

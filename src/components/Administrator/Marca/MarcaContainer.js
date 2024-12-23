import React, { Component } from 'react';
import Marca from '../Marca/Marca';
import AdminServices from '../../../services/AdminServices';
import swal from 'sweetalert';
import $ from "jquery";
import { faPencilAlt , faEye , faTrashAlt, faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../styles/users.css';
import {hasPermission} from '../../../util/auth';

export default class MarcaContainer extends Component {
    state = {
        modalIsopen:false,
        modalCreateTitle:'Created Marcas',
        modalTitle:'Crear Marcas',
        dataActive:[],
        dataInactive: [],
        dataDeleted: [],
        dataEspera:[],
        error: null,
        errorsForm: {
            name: '',
            representante:'',
            telefono:'',
            email:'',
            comentario:'',
        },
        headData:[{
            dataField: '',
            text: ''
        }],
        name:'',
        representante:'',
        telefono:'',
        email:'',
        comentario:'',
        marcaDetailsData: {},
        cadenaNameData: {},
    }
    /*constructor(){
        super(); 
    }*/
    async componentDidMount(){
        await this.trasfData();
        await this.getMarcaEspera();
        await this.getMarcaActive();
        await this.getMarcaInactive();
        await this.getMarcaDelete();        
    }
    getMarcaEspera = async function(){        
        this.setState({loading:true , error: null})
        await AdminServices.getMarcasEspera().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, dataEspera: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }
    getMarcaActive = async function(){        
        this.setState({loading:true , error: null})
        await AdminServices.getMarcasActivas().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, dataActive: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }
    getMarcaInactive = async function(){
        this.setState({loading:true , error: null})
        await AdminServices.getMarcasInactivas().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, dataInactive: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }    
    getMarcaDelete = async function(){
        this.setState({loading:true , error: null})
        await AdminServices.getMarcasDelete().then((data) => {
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
                dataField: 'representante',
                text: 'Representante',
                headerStyle: {
                    width: '5%'
                  },
                sort: true,
            }, 
            {
                dataField: 'telefono',
                text: 'Teléfono',
                headerStyle: {
                    width: '10%'
                  },
                sort: true,
            },
            {
                dataField: 'email',
                text: 'Email',
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
    newOrEditMarca = async (marca) =>{
        this.setState({loading:false});
        if(marca === 0){
            this.setState({modalIsopen:true});
        }else{            
            this.setState({modalIsopen:true , modalTitle:'Editar Marca', loadingModalEdit:true});
                await this.getDetailsMarca(marca);
                await this.setVarEditMarca();
            this.setState({loadingModalEdit:false});
        }
    }
    getDetailsMarca = async function(MarcaId){
        this.setState({loading:false , error: null})
        await AdminServices.getMarcaDetail(MarcaId).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, marcaDetailsData: data.data});
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
    showMarca = async (MarcaId) =>{
        this.setState({modalIsopen:true , modalTitle:'Detalle de Marca', loadingModalShow:true});
            await this.getDetailsMarca(MarcaId);
            await this.setVarShowMarca();
        this.setState({loadingModalShow:false});
    }
    setVarShowMarca = async () =>{
        this.setState(
            {
                modalTitle:'Detalles de la Marca',
                editCadenaEstate:false,
                name:this.state.marcaDetailsData.nombre,
                representante:this.state.marcaDetailsData.representante,
                telefono:this.state.marcaDetailsData.telefono,
                email:this.state.marcaDetailsData.email,
                comentario:this.state.marcaDetailsData.comentario,
                estado:this.state.marcaDetailsData.estado.nombre
               
               
            })
        this.setState({modalIsopen:true})
    }
    setVarEditMarca = async () =>{
        this.setState(
            {
                modalTitle:'Editar la Marca',
                editCadenaEstate:true,
                name:this.state.marcaDetailsData.nombre,
                representante:this.state.marcaDetailsData.representante,
                telefono:this.state.marcaDetailsData.telefono,
                email:this.state.marcaDetailsData.email,
                comentario:this.state.marcaDetailsData.comentario, 
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
            modalCreateTitle:'Created Cndena',
            modalTitle:'Crear Cadena',
            name:'',
            representante:'',
            telefono:'',
            email:'',
            comentario:'',
            editCadenaEstate:false,
            cadenaNameData:{},
            loading:false, 
            errorsForm: {
                name: '',
                representante:'',
                telefono:'',
                email:'',
                comentario:'',
            }
        });
    }
    handleSubmitBs = async e =>{
        e.preventDefault();
        await this.validateFormPreSubmit();
        if(this.validateForm(this.state.errorsForm)) {
            if(!this.state.editCadenaEstate){
                swal({
                    title: "Esta seguro que desea Crear la Marca ?",
                    text: "La Marca podrá ser usada en el sistema!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        this.createMarca();
                    }
                });
            }else{
                swal({
                    title: "Esta seguro que desea Actualizar la Marca ?",
                    text: "La Marca podrá ser usada en el sistema!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        this.updateMarca();
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
    createMarca = async function(){        
        let newMarca = ({
            nombre:this.state.name,
            representante:this.state.representante,
            telefono:this.state.telefono,
            email:this.state.email,
            comentario: this.state.comentario,
        });
        this.setState({
            formAlldate : newMarca
        })
        try{
            AdminServices.storeMarca(newMarca).then((data) => {
                console.log('esto es le retornoooooooooooooooooooo' ,data)
                if(!data.hasOwnProperty('errorInfo')){
                    swal({
                        title: `¡Marca ${data.nombre} registrada con Éxito!`,
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
            this.getMarcaEspera();
            await this.getMarcaActive();
            await this.getMarcaInactive();
            await this.getMarcaDelete();  
            this.setState({loading:false , error: null})
        } catch(error){
            this.setState({loading:false , error: error})
        }
    }
    updateMarca = async function(){ 
        this.setState({loading:true})
        let updateMarca = ({            
            nombre:this.state.name,
            representante:this.state.representante,
            telefono:this.state.telefono,
            email:this.state.email,
            comentario: this.state.comentario,
        });
        this.setState({
            formAlldate : updateMarca
        })
        try{
            AdminServices.updateMarca(updateMarca, this.state.marcaDetailsData.id).then((data) => {
                console.log('esto es le retornoooooooooooooooooooo' ,data)
                if(!data.hasOwnProperty('errorInfo')){
                    swal({
                        title: `¡Marca ${data.nombre} Actualizada con Éxito!`,
                        //text: "!",
                        icon: "success",
                        button: "Ok!",
                    });
                    this.getMarcaActive();
                    this.getMarcaInactive();
                    this.getMarcaDelete();
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
            this.getMarcaEspera();
            await this.getMarcaActive();
            await this.getMarcaInactive();
            await this.getMarcaDelete();  
            this.setState({loading:false , error: null}) 
        } catch(error){
            this.setState({loading:false , error: error})
        }
    }
    deleteMarca = async function(marca){
        swal({
            title: "Esta seguro que desea Eliminar la Marca ?",
            text: "La Marca no podrá ser usada en el sistema!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            let deleteMarca = ({
                id:marca
            });
            this.setState({
                formAlldate : deleteMarca
            })
            if (willDelete) {
                try{
                    AdminServices.deleteMarca(deleteMarca).then((data) => {

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
                            this.getMarcaEspera();
                            this.getMarcaActive();
                            this.getMarcaInactive();
                            this.getMarcaDelete();
                          } else {
                            swal({
                              title: `Marca eliminada con éxito`,
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
    desactivateMarca = async function(cadena){
        swal({
            title: "Esta seguro que desea Desactivar la Marca ?",
            text: "La Marca no podrá ser usada en el sistema!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                let statusMarca = ({
                    id:cadena,
                    estado:3
                });
                this.setState({
                    formAlldate : statusMarca
                })
                try{
                    AdminServices.statusMarca(statusMarca).then((data) => {
                        console.log('esto es le retornoooooooooooooooooooo' ,data)
                        if(!data.hasOwnProperty('errorInfo')){
                            swal({
                                title: `Marca Desactivada con Éxito!`,
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
                    this.getMarcaEspera();
                    this.getMarcaActive();
                    this.getMarcaInactive();
                    this.getMarcaDelete();
                    this.deleteVariables();
                    this.setState({loading:false , error: null})
                } catch(error){
                    this.setState({loading:false , error: error})
                }
            }
        });
    }
    AprobateMarca = async function(marca){
        swal({
            title: "Esta seguro que desea Aprobar la Marca ?",
            text: "La Marca podar ser usada en el sistema!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                let statusMarca = ({
                    id:marca,
                    estado:2
                });
                this.setState({
                    formAlldate : statusMarca
                })
                try{
                    AdminServices.statusMarca(statusMarca).then((data) => {
                        console.log('esto es le retornoooooooooooooooooooo' ,data)
                        if(!data.hasOwnProperty('errorInfo')){
                            swal({
                                title: `¡La Marca fue Aprobada con Éxito!`,
                                //text: "!",
                                icon: "success",
                                button: "Ok!",
                            });
                            this.getMarcaEspera();
                            this.getMarcaActive();
                            this.getMarcaInactive();
                            this.getMarcaDelete();
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
    ActivateMarca = async function(marca){
        swal({
            title: "Esta seguro que desea Activar la Marca ?",
            text: "La Marca podrá ser usada en el sistema!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                let statusMarca = ({
                    id:marca,
                    estado:2
                });
                this.setState({
                    formAlldate : statusMarca
                })
                try{
                    AdminServices.statusMarca(statusMarca).then((data) => {
                        console.log('esto es le retornoooooooooooooooooooo' ,data)
                        if(!data.hasOwnProperty('errorInfo')){
                            swal({
                                title: `¡La Marca fue Aprobada con Éxito!`,
                                //text: "!",
                                icon: "success",
                                button: "Ok!",
                            });
                            this.getMarcaEspera();
                            this.getMarcaActive();
                            this.getMarcaInactive();
                            this.getMarcaDelete();
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
                        errors.name =' El nombre de la marca ya existe';
                    }
                }                
                if(value===''){
                    errors.name ='El nombre de la marca es requerido';
                }
            break;
            case 'representante': 
                errors.representante ='';
                if(value===''){
                    errors.representante ='El represente es requerido';
                }
            break;
            case 'telefono': 
                errors.telefono ='';
                if(value===''){
                    errors.telefono ='El Teléfono es requerido';
                }
            break;
            case 'email': 
                errors.email ='';
                if(value===''){
                    errors.email ='El Email es requerido';
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
        if(this.state.representante===''){
            errors.representante ='El Representante es requerido!';
        }
        
        if(this.state.telefono===''){
            errors.telefono ='El Teléfono es requerido';
        }
        if(this.state.email===''){
            errors.email ='El Email es requerido';
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
        if(row.id_estatus_marca ===1 && row.deleted_at === null){
            return(
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">
                        {hasPermission([216]) &&
                            <button  title="Ver detalles" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"  onClick={() => {this.showMarca(row.id)}}><FontAwesomeIcon icon={faEye}/> Ver detalles</button>
                        }
                        {hasPermission([213]) &&
                            <button  title="Editar" className="dropdown-item" data-toggle="modal" data-target="#modal-lg"  onClick={() => {this.newOrEditMarca(row.id)}}><FontAwesomeIcon icon={faPencilAlt}/> Editar</button>
                        }             
                        {hasPermission([214]) &&
                            <button   title="Activar" className="dropdown-item"   onClick={() => {this.AprobateMarca(row.id)}}> <FontAwesomeIcon icon={faThumbsUp} /> Activar</button>
                        }
                        {hasPermission([218]) &&
                            <button  title="Eliminar"   className="dropdown-item btn-delete" onClick={() => {this.deleteMarca(row.id)}}> <FontAwesomeIcon icon={faTrashAlt} /> Eliminar</button>
                        }
                    </div>
                </div>
            )
        }
        if(row.id_estatus_marca ===2 && row.deleted_at === null){
            return(
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">
                        {hasPermission([216]) &&
                            <button  title="Ver detalles" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"  onClick={() => {this.showMarca(row.id)}}><FontAwesomeIcon icon={faEye}/> Ver detalles</button>
                        }
                        {hasPermission([213]) &&
                            <button  title="Editar" className="dropdown-item" data-toggle="modal" data-target="#modal-lg"  onClick={() => {this.newOrEditMarca(row.id)}}><FontAwesomeIcon icon={faPencilAlt}/> Editar</button>
                        }                
                        {hasPermission([215]) &&
                            <button   title="Desactivar" className="dropdown-item"   onClick={() => {this.desactivateMarca(row.id)}}> <FontAwesomeIcon icon={faThumbsDown} /> Desactivar</button>
                        }
                        {hasPermission([218]) &&
                            <button  title="Eliminar"   className="dropdown-item btn-delete" onClick={() => {this.deleteMarca(row.id)}}> <FontAwesomeIcon icon={faTrashAlt} /> Eliminar</button>
                        }
                    </div>
                </div>
            )
        }
        if(row.id_estatus_marca ===3 && row.deleted_at === null){
            return(
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">  
                        {hasPermission([216]) &&
                            <button  title="Ver detalles" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"  onClick={() => {this.showMarca(row.id)}}><FontAwesomeIcon icon={faEye}/> Ver detalles</button>
                        }
                        {hasPermission([213]) &&
                            <button  title="Editar" className="dropdown-item" data-toggle="modal" data-target="#modal-lg"  onClick={() => {this.newOrEditMarca(row.id)}}><FontAwesomeIcon icon={faPencilAlt}/> Editar</button>
                        }                  
                        {hasPermission([214]) &&
                            <button   title="Activar" className="dropdown-item"   onClick={() => {this.ActivateMarca(row.id)}}> <FontAwesomeIcon icon={faThumbsUp} /> Activar</button>
                        }
                        {hasPermission([218]) &&
                            <button  title="Eliminar"   className="dropdown-item btn-delete" onClick={() => {this.deleteMarca(row.id)}}> <FontAwesomeIcon icon={faTrashAlt} /> Eliminar</button>
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
                        {hasPermission([216]) &&
                            <button  title="Ver detalles" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"  onClick={() => {this.showMarca(row.id)}}><FontAwesomeIcon icon={faEye}/> Ver detalles</button>
                        }
                    </div>
                </div>
            )
        }
    }
    render() {
        return (           
            <Marca
            state = {this.state}
            newOrEditMarca={this.newOrEditMarca}
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
            </Marca>           
        )
    }
}

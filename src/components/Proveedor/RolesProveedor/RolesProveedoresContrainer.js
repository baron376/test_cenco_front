import React, { Component } from 'react'
import RolesProveedores from '../RolesProveedor/RolesProveedores';
import ProveedorServices from '../../../services/ProveedorServices';
import '../../styles/roles.css';
import swal from 'sweetalert';
import $ from "jquery";
import { faPencilAlt , faEye , faTrashAlt ,faThumbsDown , faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {hasPermission} from '../../../util/auth';
import {getFirtsEmentArray } from '../../../util/formats';
export default class RolesProveedoresContrainer extends Component {

    state = {
        loadingModalEdit:false,
        loadingRoles:false,
        dataActive:[{id:0}],
        dataInactive:[],
        dataDeleted:[],
        rollDetailsData:{},
        listaPermisosSeleccion:[],
        listaPermisosSeleccionados:[],
        error:null,
        loading:false,
        modalIsopen:false,
        modalTitle:'',
        headData:[{
            dataField: '',
            text: ''
          }],
          errorsForm: {
            name: '',
            description:'',
            type_permissions:'',
            permissions:''
        },
        name:'',
        description:'',
        selectTypePermissions:[
           // {nombre:'Todos' , value:'1'},
            {nombre:'Personalizados' , value:'0'}
        ],
        seletedtypePermissions:[],
        habPermissions:false,
        typePermissionsSelected:[],
        checkedallPermissions:false,
        editRolEstate:false,
        formAlldate:{},
        rolDetailsData:{},
        permissionsShow:[]
    }
    constructor(){
        super(); 
        console.log('1 constructor');
    }

    async componentDidMount(){
        await this.trasfData();
        await this.getRolesActive();
        await this.getRolesInactivos();
        await this.getRolesDeleted();
        await this.getPermissionsForCreate();

    }
   
    getPermissionsForCreate= async function(){
        this.setState({loading:true , error: null , loadingRoles:true})
        await ProveedorServices.getPermissions().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, listaPermisosSeleccion: data.data , loadingRoles:false});
            }else{
                this.setState({ loading:false , error : data.error , loadingRoles:false})
            }
        })
    }
    getRolesActive = async function(){
        this.setState({loading:true , error: null , loadingRoles:true , dataActive:[]})
        await ProveedorServices.getRolesActive().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, dataActive: data.data , loadingRoles:false});
            }else{
                this.setState({ loading:false , error : data.error , loadingRoles:false})
            }
        })
    }
    getRolesInactivos = async function(){
        this.setState({loading:true , error: null , loadingRoles:true})
        await ProveedorServices.getRolesInactive().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, dataInactive: data.data , loadingRoles:false});
            }else{
                this.setState({ loading:false , error : data.error , loadingRoles:false})
            }
        })
    }
    getRolesDeleted = async function(){
        this.setState({loading:true , error: null})
        await ProveedorServices.getRolesDeleted().then((data) => {
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
                dataField: 'id',
                text: 'N°',
                headerStyle: {
                    width: '2%'
                  },
                  sort: true,
            }, 
            {
                dataField: 'nombre',
                text: 'Nombre',
                headerStyle: {
                    width: '12%'
                  },
                sort: true,
          }, 
          {
                dataField: 'descripcion',
                text: 'Descripción',
                headerStyle: {
                    width: '21%'
                  },
                sort: true,
          }, 
         /*  {
                dataField: 'permisos',
                text: 'Permisos',
                headerStyle: {
                    width: '12%',
                  },
                formatter:this.permisionsFormater,   
          }, */
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
    permisionsFormater (cell){
        let namesPerm = cell.map(per => per.nombre)
        return namesPerm.toString();
    }
    actionsFormater(cell , row){
        if(row.id_estatus_roles ===1 && !row.deleted_at){
            return(
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">    
                        {hasPermission([512]) &&
                            <button  title="Ver detalles" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"  onClick={() => {this.showRol(row.id)}}><FontAwesomeIcon icon={faEye}/> Ver detalles</button>
                        }   
                        {hasPermission([509]) &&
                            <button  title="Editar" className="dropdown-item" data-toggle="modal" data-target="#modal-lg"  onClick={() => {this.newOrEditRol(row.id)}}><FontAwesomeIcon icon={faPencilAlt}/> Editar</button>
                        }             
                        {hasPermission([511]) &&
                            <button   title="Desactivar" className="dropdown-item"   onClick={() => {this.desactivateRol(row.id)}}> <FontAwesomeIcon icon={faThumbsDown} /> Desactivar</button>
                        } 
                        {hasPermission([510]) &&
                        <button  title="Eliminar" className="dropdown-item btn-delete" onClick={() => {this.deleteRol(row.id)}}> <FontAwesomeIcon icon={faTrashAlt} /> Eliminar</button>
                        }
                    </div>
                </div>
            )
        }
        if(row.id_estatus_roles ===2  && !row.deleted_at){
            return(
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">  
                        {hasPermission([512]) &&
                            <button  title="Ver detalles" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"  onClick={() => {this.showRol(row.id)}}><FontAwesomeIcon icon={faEye}/> Ver detalles</button>
                        }                  
                        {hasPermission([511]) &&
                            <button   title="Activar" className="dropdown-item"   onClick={() => {this.activateRol(row.id)}}> <FontAwesomeIcon icon={faThumbsUp} /> Activar</button>
                        }
                        {hasPermission([510]) &&
                            <button  title="Eliminar"   className="dropdown-item btn-delete" onClick={() => {this.deleteRol(row.id)}}> <FontAwesomeIcon icon={faTrashAlt} /> Eliminar</button>
                        }
                    </div>
                </div>
            )
        }
        if(row.deleted_at){
            return(
                <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                    Seleccionar
                </button>
                <div className="dropdown-menu">  
                    {/*  <button   title="restaurar" className="btn btn-success"   onClick={() => {this.restoreRol(row.id)}}> <FontAwesomeIcon icon={faThumbsUp} /></button> */}
                    {hasPermission([512]) &&
                        <button  title="Ver detalles" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"  onClick={() => {this.showRol(row.id)}}><FontAwesomeIcon icon={faEye}/> Ver detalles</button>
                    }
                </div>
            </div>
            )
        }
    }
    handleCloseModal = e =>{
        this.setState({modalIsopen:false})
    }
    handleOpenModal = e =>{
        this.setState({modalIsopen:true})
    }
    newOrEditRol = async (rol) =>{
        if(rol === 0){
            this.setState({loadingModalEdit:true});
            await this.setVarCleanTocreate();
            this.setState({modalIsopen:true , modalTitle:'Crear rol'});
            this.setState({loadingModalEdit:false});
        }else{
           
            this.setState({modalIsopen:true , modalTitle:'Editar rol' , loadingModalEdit:true});
            await this.getDetailsRols(rol).then((data) => {
                this.setVarEditRol().then((data2) => {
                    this.setState({loadingModalEdit:false});
                });
            });
            
            console.log('holaaaaaaaaaaaaaaa')
        }
    }
    setVarCleanTocreate = async function(){
        let objectLocal = this.state.listaPermisosSeleccion;
        let mapPer = {};
        objectLocal.forEach(modulos => {
            mapPer = modulos.permisosproveedor.map(permiso => ({
                ...permiso,
                isChecked: false,
            })) 
            modulos.isChecked = false;
            modulos.permisosproveedor = mapPer;
            mapPer = {};
        })
        this.setState({ 
            name:'', 
            description:'',
            listaPermisosSeleccion:objectLocal,
        });   
    }
    getDetailsRols = async function(rolId){
        this.setState({loading:true , error: null})
        await ProveedorServices.getRolesDetail(rolId).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, rollDetailsData: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }
    setVarEditRol = async () =>{
        let permissionRolLocal = this.state.rollDetailsData.permisosproveedor;
        let permissionsAll = this.state.listaPermisosSeleccion;
        let seletedtype =  this.state.rollDetailsData.administrador;
        let SeletedTypeObj =[];
        let habpermi = false;
                permissionsAll.forEach(modulo => {
                    modulo.permisosproveedor.forEach(permiso=>{
                        (permissionRolLocal.find(permisoEdit =>permisoEdit.id ===permiso.id))?permiso.isChecked = true: permiso.isChecked = false;
                    })
                })

        if(Number(seletedtype) === 1){
            SeletedTypeObj = [{nombre:'Todos' , value:'1'}];
            habpermi = false;
        }else{
            SeletedTypeObj = [{nombre:'Personalizados' , value:'0'}];
            habpermi = true;
        }
        this.setState(
            {
               modalTitle:'Editar Rol',
               editRolEstate:true,
               name:this.state.rollDetailsData.nombre ,
               description:this.state.rollDetailsData.descripcion,
               listaPermisosSeleccion:permissionsAll,
               typePermissionsSelected:SeletedTypeObj,
               habPermissions:habpermi
            })

        this.setState({modalIsopen:true})
    }
    onSelectTypePermisssions = (selectedList, selectedItem) =>{
        this.setState({typePermissionsSelected:selectedList})
        Number(selectedItem.value)===0?this.setState({habPermissions:true}):this.setState({habPermissions:false})
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  type_permissions: 'Debe seleccionar tipo de permiso'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  type_permissions: ''
                }
              });
        }
    }
    onRemoveTypePermisions  = (selectedList, selectedItem) =>{
        this.setState({seletedtypePermissions:selectedList})
        Number(selectedItem.value===0)?this.setState({habPermissions:true}):this.setState({habPermissions:false})
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  type_permissions: 'Debe seleccionar tipo de permiso'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  type_permissions: ''
                }
              });
        }
    }
    handleAllCheckedPermissionsModule= e =>{
        let modulosLocal = this.state.listaPermisosSeleccion;
        let boleantIscheck = false;
        modulosLocal.forEach(modulo => {
            if (Number(modulo.id) === Number(e.target.value)){ 
                if(modulo.isChecked){
                    modulo.isChecked  =false;
                }else{
                    modulo.isChecked  =true;
                }
            }
            modulo.permisosproveedor.forEach(permiso=>{
                if (Number(permiso.id_modulo) === Number(e.target.value)){ 
                    if(permiso.isChecked){
                        permiso.isChecked  =false;
                    }else{
                        permiso.isChecked  =true;
                    }
                }
            })
        })
        
        modulosLocal.forEach(modulo => {
            modulo.permisosproveedor.forEach(permiso=>{
                    if(permiso.isChecked){
                        boleantIscheck =true;
                    }
            })
        })

        if(!boleantIscheck){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  permissions: 'Debe seleccionar al menos un permiso'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  permissions: ''
                }
              });
        }


        this.setState({listaPermisosSeleccion:modulosLocal})
        this.setState({listaPermisosSeleccionados:modulosLocal})
        
    }
    handleCheckChieldElement= e =>{
        let modulosLocal = this.state.listaPermisosSeleccion;
        let boleantIscheck = false;
        modulosLocal.forEach(modulo => {
            modulo.permisosproveedor.forEach(permiso=>{
                if (Number(permiso.id) === Number(e.target.value)){ 
                    if(permiso.isChecked){
                        permiso.isChecked  =false;
                    }else{
                        permiso.isChecked  =true;
                    }
                }
            })
        })
        modulosLocal.forEach(modulo => {
            modulo.permisosproveedor.forEach(permiso=>{
                    if(permiso.isChecked){
                        boleantIscheck =true;
                    }
            })
        })

        if(!boleantIscheck){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  permissions: 'Debe seleccionar un permiso'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  permissions: ''
                }
              });
        }
        this.setState({listaPermisosSeleccion:modulosLocal})
        this.setState({listaPermisosSeleccionados:modulosLocal})

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
                    if(value.length<3){
                        errors.name ='El nombre del rol nombre debe tener mas de 3 caracteres!';
                    } 
                    if(value===''){
                        errors.name =' El nombre del rol es requerido';
                    }
                break;
                case 'description': 
                    errors.description ='';
                    if(value.length<3){
                        errors.description ='La descripción del rol debe tener mas de 3 caracteres!';
                    }
                    if(value===''){
                        errors.description ='La descripción del rol es requerido';
                    }
                break;
                default:
                break;
        }
        this.setState({errors, [name]: value});
    }
    onlyLetter = e =>{
        if (!((e.keyCode >= '64' && e.keyCode <= '91') || (Number(e.keyCode) === Number('32')) || (Number(e.keyCode) === Number('8')) || (Number(e.keyCode) === Number('192')))) {
            e.preventDefault()
         }
    }
    handleSubmitBs = async e =>{
        e.preventDefault();
        await this.validateFormPreSubmit();
        if(this.validateForm(this.state.errorsForm)) {
            console.info('Valid Form')
            if(!this.state.editRolEstate){
                this.createRol();
            }else{
                this.updateRol();
            } 
        }else{
            console.error('Invalid Form')
        }
    }
    async validateFormPreSubmit(){
        let errors = this.state.errorsForm;
        errors.name =''; 
        errors.description ='';
        errors.type_permissions ='';
        errors.permissions ='';

        if(this.state.name.length<3){
             errors.name  ='El del usuario nombre debe tener mas de 3 caracteres!';
        }
        if(this.state.name===''){
            errors.name ='El nombre del usuario es requerido!';
        }
        if(this.state.description.length<3){
            errors.description  ='La descripción del rol debe tener mas de 3 caracteres!';
        }
        if(this.state.description===''){
           errors.description ='La descripción del rol es requerida!';
        }
        console.log("Algoooooooooooo",this.state.typePermissionsSelected)
        if(this.state.typePermissionsSelected.length<1){
            errors.type_permissions ='Debe seleccionar un tipo de permiso!';
        }
        /*
        if(Number(seletedtype) === 1){
            SeletedTypeObj = [{nombre:'Todos' , value:'1'}];
            habpermi = false;
        }else{
            SeletedTypeObj = [{nombre:'Personalizados' , value:'0'}];
            habpermi = true;
        }
        */

        if(this.state.listaPermisosSeleccion.length<1){
            errors.permissions ='Debe seleccionar al menos un permiso!';
        }
        if(this.state.typePermissionsSelected.length>0){
            console.log('entra en el 1' , getFirtsEmentArray(this.state.typePermissionsSelected).value)
            if(Number (getFirtsEmentArray(this.state.typePermissionsSelected).value) ===0){
                console.log('entra en el 2')
                if(this.state.listaPermisosSeleccionados.length<1){
                    console.log('entra en la 3n')
                    errors.permissions ='Debe seleccionar al menos un permiso!';
                }
            }
        }
        if(this.state.typePermissionsSelected.length>0){
            let boleantIscheck = false;
            console.log('asmdklnsakldnajskndbjasnbd' ,this.state.listaPermisosSeleccionados)
            if(Number (getFirtsEmentArray(this.state.typePermissionsSelected).value) ===0){
                this.state.listaPermisosSeleccionados.forEach(modulos=>{
                    modulos.permisosproveedor.forEach(permiso=>{
                            if(permiso.isChecked){
                                boleantIscheck =true;
                            }
                    })
                })
                if(!boleantIscheck){
                    errors.permissions ='Debe seleccionar al menos un permiso!';
                }
            }
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
    createRol = async function(){
        console.log('pruebas pruebas pruebas' , this.state.typePermissionsSelected)
        this.setState({loading:true})
        let newRol = ({
            name:this.state.name,
            description: this.state.description,
            administrator: this.state.typePermissionsSelected[0].value,
            modulos: this.state.listaPermisosSeleccionados
        });
        this.setState({formAlldate : newRol})
        console.log('antes de enviar' , newRol);
        try{
            ProveedorServices.storeRol(newRol).then((data) => {
                console.log('esto es le retornoooooooooooooooooooo' ,data)
                if(!data.hasOwnProperty('errorInfo')){
                    swal({
                        title: `Rol registrado con éxito`,
                        text: "!",
                        icon: "success",
                        button: "Ok!",
                    });
                }else{
                    swal({
                        title: `Error ${data.data.errorInfo.toString()} `,
                        text: "!",
                        icon: "error",
                        button: "Ok!",
                    });
                }
            })
            $('.modal-backdrop').remove();
            this.setState({modalIsopen:false})
            this.getRolesActive();
            this.getRolesInactivos();
            this.getRolesDeleted();
            this.deleteVariables();
            this.setState({loading:false , error: null})
        } catch(error){
            this.setState({loading:false , error: error})
        }
    }
    desactivateRol = async (rol) =>{
        swal({
            title: "Esta seguro que desea desactivar el rol?",
            text: "los usuarios perderán privilegios dentro del sistema!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                try{
                    ProveedorServices.desactivateRol(rol).then((data) => {
                        console.log('esto es le retornoooooooooooooooooooo' ,data)
                        if(!data.hasOwnProperty('errorInfo')){
                            swal({
                                title: `rol desactivado con éxito`,
                                text: "!",
                                icon: "success",
                                button: "Ok!",
                            });
                            
                            this.getRolesInactivos();
                            this.getRolesDeleted();
                            }else{
                                swal({
                                    title: `Error ${data.errorInfo.toString()} `,
                                    text: "!",
                                    icon: "error",
                                    button: "Ok!",
                                });
                            }
                    });
                    this.setState({loading:false , error: null})
                } catch(error){
                    this.setState({loading:false , error: error})
                }
            }
        }).then((datann)=>{
            this.getRolesActive();
        });
    }
    showRol = async (rol) =>{
        this.setState({modalIsopen:true , modalTitle:'Detalle de Rol' , loadingModalShow:true});
        await this.getDetailsRol(rol);
        await this.setVarShowRol();
        this.setState({loadingModalShow:false});
    }
    deleteRol = async (rolId) =>{
        swal({
            title: "Esta seguro que desea Eliminar el rol?",
            text: "Los usuarios perderán privilegios en el sistema!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                try{
                    ProveedorServices.deleteRol(rolId).then((data) => {
                        console.log('esto es le retornoooooooooooooooooooo' ,data)
                        if(!data.hasOwnProperty('errorInfo')){
                            swal({
                                title: `Rol eliminado con éxito`,
                                text: "!",
                                icon: "success",
                                button: "Ok!",
                            });
                        }else{
                            swal({
                                title: `Error ${data.data.errorInfo.toString()} `,
                                text: "!",
                                icon: "error",
                                button: "Ok!",
                            });
                        }
                    })
                    $('.modal-backdrop').remove();
                    this.setState({modalIsopen:false})
                    this.getRolesActive();
                    this.getRolesInactivos();
                    this.getRolesDeleted();
                    this.deleteVariables();
                    this.setState({loading:false , error: null})
                } catch(error){
                    this.setState({loading:false , error: error})
                }
            }
        });
    }
    restoreRol = async (rolId) =>{
        swal({
            title: "Esta seguro que desea restaurar el usuario?",
            text: "El usuario podrá iniciar sesión en el sistema nuevamente!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                try{
                    ProveedorServices.restoreUser(rolId).then((data) => {
                        console.log('esto es le retornoooooooooooooooooooo' ,data)
                        if(!data.hasOwnProperty('errorInfo')){
                            swal({
                                title: `Rol restaurado con éxito`,
                                text: "!",
                                icon: "success",
                                button: "Ok!",
                            });
                        }else{
                            swal({
                                title: `Error ${data.data.errorInfo.toString()} `,
                                text: "!",
                                icon: "error",
                                button: "Ok!",
                            });
                        }
                    })
                    this.getRolesActive();
                    this.getRolesInactivos();
                    this.getRolesDeleted();
                    this.getPermissionsForCreate();
                    this.setState({loading:false , error: null})
                } catch(error){
                    this.setState({loading:false , error: error})
                }
            }
        });
    }
    getDetailsRol = async function(rolId){
        this.setState({loading:true , error: null})
        await ProveedorServices.getRolDetail(rolId).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, rolDetailsData: data.data});
                //this.setState({seletedtypePermissions: data.data['permisos']});
                
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
        //console.log('estooooooooooooooo',this.seletedtypePermissions);
    }
    setVarShowRol = async () =>{
        let seletedtype =  this.state.rollDetailsData.administrador;
        let habpermi = false;
        if(Number(seletedtype) ===1){
            habpermi = false;
        }else{
            habpermi = true;
        }
        this.setState(
            {
               modalTitle:'Detalle del Rol',
               name:this.state.rolDetailsData.nombre ,
               description:this.state.rolDetailsData.descripcion,
               habPermissions:habpermi,
               permissionsShow:this.state.rolDetailsData.permisosproveedor,
            })
        this.setState({modalIsopen:true})
    }
    activateRol = async (rol) =>{
        swal({
            title: "Esta seguro que desea activar el rol?",
            text: "El rol estará disponible para el sistema nuevamente!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                try{
                    let data = ProveedorServices.activateRol(rol);
                    if(!data.hasOwnProperty('errorInfo')){
                    swal({
                        title: `Rol activado con éxito`,
                        text: "!",
                        icon: "success",
                        button: "Ok!",
                    });
                    this.getRolesActive();
                    this.getRolesInactivos();
                    this.getRolesDeleted();
                    }else{
                        swal({
                            title: `Error ${data.errorInfo.toString()} `,
                            text: "!",
                            icon: "error",
                            button: "Ok!",
                        });
                    }
                    this.setState({loading:false , error: null})
                } catch(error){
                    this.setState({loading:false , error: error})
                }
            }
        });
    }
    updateRol = async function(){ 
        this.setState({loading:true})
        let UpdatedRol = ({
            name:this.state.name,
            description: this.state.description,
            administrator: this.state.seletedtypePermissions.value,
            modulos: this.state.listaPermisosSeleccionados
        });
        this.setState({formAlldate : UpdatedRol})
        try{
            ProveedorServices.updateRoles(UpdatedRol, this.state.rollDetailsData.id).then((data) => {
                console.log('esto es le retornoooooooooooooooooooo' ,data)
                if(!data.hasOwnProperty('errorInfo')){
                    swal({
                        title: `Rol Actualizado con éxito`,
                        text: "!",
                        icon: "success",
                        button: "Ok!",
                    });
                }else{
                    swal({
                        title: `Error ${data.data.errorInfo.toString()} `,
                        text: "!",
                        icon: "error",
                        button: "Ok!",
                    });
                }
            })
            $('.modal-backdrop').remove();
            this.setState({modalIsopen:false})
            this.getRolesActive();
            this.getRolesInactivos();
            this.getRolesDeleted();
            this.deleteVariables();
            this.setState({loading:false , error: null})
        } catch(error){
            this.setState({loading:false , error: error})
        }
    }
    deleteVariables = e =>{
        this.setState({ 
            name:'',
            description:'',
            selectTypePermissions:[
             //   {nombre:'Todos' , value:'1'},
                {nombre:'Personalizados' , value:'0'}
            ],
            seletedtypePermissions:[],
            habPermissions:false,
            typePermissionsSelected:[],
            checkedallPermissions:false,
            editRolEstate:false,
            formAlldate:{},
            rolDetailsData:{},
            permissionsShow:[]
        });
    }
    render() {
        return (
            <RolesProveedores
                state = {this.state}
                modalTitle={this.state.modalTitle}
                modalIsopen={this.state.modalIsopen}
                onCloseModal={this.handleCloseModal}
                onOpenModal={this.handleOpenModal}
                newOrEditRol={this.newOrEditRol}
                onSelectTypePermisssions={this.onSelectTypePermisssions}
                onRemoveTypePermisions={this.onRemoveTypePermisions}
                handleAllCheckedPermissionsModule={this.handleAllCheckedPermissionsModule}
                handleCheckChieldElement={this.handleCheckChieldElement}
                handleChangeI={this.handleChangeI}
                onlyLetter={this.onlyLetter}
                handleSubmitBs={this.handleSubmitBs}
                deleteVariables= {this.deleteVariables}>
            </RolesProveedores>
        )
    }
}

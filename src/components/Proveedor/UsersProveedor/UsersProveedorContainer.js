import React, { Component } from 'react'
import ProveedorServices from '../../../services/ProveedorServices';
import AdminServices from '../../../services/AdminServices';
import swal from 'sweetalert';
import UsersProveedor from './UsersProveedor';
import bcrypt from 'bcryptjs'
import $ from "jquery";
import { faPencilAlt , faEye , faTrashAlt ,faThumbsDown , faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../styles/users.css';
import {hasPermission} from '../../../util/auth';
import {customFormatterToSent , getFirtsEmentArray } from '../../../util/formats';
export default class UserProveedorContainer extends Component {
    state = {
        loading:false,
        loadingUsers:false,
        loadingModalEdit:false,
        loadingModalShow:false,
        data:[],
        dataInactive:[],
        dataDeteted:[],
        error:null,
        errorsForm: {
            name: '',
            lastname:'',
            rut:'',
            dv:'',
            email: '',
            password: '',
            proveedores:'',
            salas:'',
            roles:''
        },
        modalIsopen:false,
        modalTitle:'Crear Usuario',
        nameForm :'formCreated',
        name:'',
        phone:'',
        formAlldate:{},
        lastname:'',
        rut:'',
        dv:'',
        email:'',
        password:'',
        proveedor:'',
        listaSelectRoles:[],
        listaRolesSeleccionados:[],
        listaSelectProveedor:[],
        listaProveedoresSeleccionados:[],
        listaSelecSalas:[],
        listaSalasSeleccionadas:[],
        listaSelectCadenas:[],
        newUser:0,
        editUser:1,
        edirUserRegister:{},
        userDetailsData:{},
        editUSerEstate:false,
        headData:[{
            dataField: '',
            text: ''
          }],
        checkedallSalas:true,
        hiddenPaswword: true,
    }
    constructor(){
        super();
        this.toggleShowPasswod = this.toggleShowPasswod.bind(this); 
    }
    getSalasForCreteUser = async function(){
        let data = [];
        this.setState({loading:true , error: null})
        /*let data = await AdminServices.getSalas();*/
        let salasLocalSeleccionadas = this.state.listaSalasSeleccionadas;
        await AdminServices.getSalas().then((data) => {
            data = data.map(element => ({
                ...element,
                isChecked: true
            }))
            console.log('salas' , data)
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({
                    loading:false,
                    listaSelecSalas: data,
                });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
        salasLocalSeleccionadas = data.filter(function (salas) {
        return  Boolean(salas.isChecked) === true;
        });
        this.setState({listaSalasSeleccionadas: salasLocalSeleccionadas});
    }
    hashPasswordConvert = async  (password) =>{
        const rounds = 10;
        let hash = await bcrypt.hash(password, rounds)
        hash = hash.replace("$2a$", "$2y$");
        return hash;
    }
    
    getRolesForCreteUser = async function(){
        this.setState({loading:true , error: null})
       await ProveedorServices.getRoles().then((data) => {
       if(!data.hasOwnProperty('errorInfo')){
            this.setState({
                loading:false,
                listaSelectRoles: data.data,
            });
        }else{
            this.setState({ loading:false , error : data.error})
        }
    });
    }
    getProveedoresForCreteUser = async function(){
        this.setState({loading:true , error: null})
        await ProveedorServices.getProveedores().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({
                    loading:false,

                    listaSelectProveedor: data.data,
                });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
    }
    getUSersActive = async function(){
        this.setState({loadingUsers:true , error: null, data:[]})
         await ProveedorServices.getUsersActive().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                    this.setState({loadingUsers:false, data: data.data});
                }else{
                    this.setState({ loadingUsers:false , error : data.error})
                }
        })
    }
    getUSersInactive = async function(){
        this.setState({loadingUsers:true , error: null})
        let data = await ProveedorServices.getUsersInactive().then((data) => {
        if(!data.hasOwnProperty('errorInfo')){
                this.setState({loadingUsers:false, dataInactive: data.data});
            }else{
                this.setState({loadingUsers:false , error : data.error})
            }
        })
    }
    getUSersDeleted = async function(){
        this.setState({loadingUsers:true , error: null})
        let data = await ProveedorServices.getUsersDeleted().then((data) => {
        if(!data.hasOwnProperty('errorInfo')){
                this.setState({ loadingUsers:false,dataDeteted: data.data});
            }else{
                this.setState({ loadingUsers:false , error : data.error})
            }
        })
    }

    getCadenasForCreteUser = async function(){
        this.setState({loading:true , error: null})
        await AdminServices.getCadenas().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({
                    loading:false,
                    listaSelectCadenas: data.data,
                });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        });
    }

    getSalasForCreteUserForCadena = async function(cadenas) {
        this.setState({ loading: true, error: null });
        let data = [];
        if (cadenas.length !== 0) {
          cadenas.forEach(element => {
            data = data.concat(element.salas_cadena);
          });
        } else {
          data = [];
        }
      
        const cadenaSeleccionada = cadenas.length > 0 ? cadenas[0].cadena : '';
        const listaSalasSeleccionadas = this.state.listaSalasSeleccionadas;
        
      
        data = data.map(element => ({
          ...element,
          isChecked:
            listaSalasSeleccionadas.some(sala => sala.id === element.id) ||
            listaSalasSeleccionadas.length === data.length 
        }));
        const existeTodas = data.some(element => element.id === 0);

        if (!existeTodas) {
        data.unshift({ id: 0, nombre_sap: 'Todas', display_nombre_sap: 'Todas' });
        }
      
        if (data.length < 1) {
          this.setState({
            errorsForm: {
              ...this.state.errorsForm,
              salas: 'Debe seleccionar al menos una sala!'
            }
          });
        } else {
          this.setState({
            errorsForm: {
              ...this.state.errorsForm,
              salas: ''
            }
          });
        }
      
        this.setState({
          loading: false,
          listaSelecSalas: data.filter(sala => sala.cadena === cadenaSeleccionada),
          listaSalasSeleccionadas: listaSalasSeleccionadas
        });
        
      };
      
      onRemoveCadenas = (selectedList, removedItem) => {
        const listaSalasSeleccionadas = this.state.listaSalasSeleccionadas;
        const idCadenaEliminada = removedItem.id;
        const salasFiltradas = listaSalasSeleccionadas.filter(sala => sala.id_cadena !== idCadenaEliminada);

        
        this.setState(
            {
              listaCadenasSeleccionadas: selectedList,
              listaSalasSeleccionadas: salasFiltradas
            },
            () => {
              this.getSalasForCreteUserForCadena(selectedList);
            }
          );
      
        if (selectedList.length < 1) {
          this.setState({
            errorsForm: {
              ...this.state.errorsForm,
              cadenas: 'Debe seleccionar al menos una cadena'
            }
          });
        } else {
          this.setState({
            errorsForm: {
              ...this.state.errorsForm,
              cadenas: ''
            }
          });
        }
      }
      
      

    onSelectCadenas = (selectedList, selectedItem) =>{
        this.setState({
            listaCadenasSeleccionadas : selectedList
        })
        this.getSalasForCreteUserForCadena(selectedList);
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  cadenas: 'Debe seleccionar al menos una cadena'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  cadenas: ''
                }
              });
        }   
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
                    width: '6%'
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
                dataField: 'email',
                text: 'Usuario',
                headerStyle: {
                    width: '21%'
                  },
                sort: true,
          }, 
          {
                dataField: 'rut',
                text: 'Rut',
                headerStyle: {
                    width: '12%'
                  },
                sort: true,
          },
          {
                dataField: 'proveedor',
                text: 'Proveedor',
                // formatter:this.proveedorFormater,
                headerStyle: {
                    width: '13%'
                  },
                  sort: true,
          },
          {
            dataField: 'roles',
            text: 'Roles',
            formatter:this.rolesFormater,
            headerStyle: {
                width: '25%'
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
    actionsFormater(cell , row){
        if(row.id_estatus_usuarios ===1 && !row.deleted_at){
            return(
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">                    
                        {hasPermission([507]) &&
                            <button  title="Ver detalles" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"  onClick={() => {this.showUSer(row.id)}}><FontAwesomeIcon icon={faEye}/> Ver detalles</button>
                        }
                        {hasPermission([501]) &&
                            <button  title="Editar" className="dropdown-item" data-toggle="modal" data-target="#modal-lg"  onClick={() => {this.newOrEditUSer(row.id)}}><FontAwesomeIcon icon={faPencilAlt}/> Editar</button>
                        }
                        {hasPermission([504]) &&
                            <button   title="Desactivar" className="dropdown-item"   onClick={() => {this.desactivateUser(row.id)}}> <FontAwesomeIcon icon={faThumbsDown} /> Desactivar</button>
                        }
                        {hasPermission([502]) &&
                            <button  title="Eliminar"   className="dropdown-item btn-delete" onClick={() => {this.deleteUser(row.id)}}> <FontAwesomeIcon icon={faTrashAlt} /> Eliminar</button>
                        }
                    </div>
                </div>
            )
        }
        if(row.id_estatus_usuarios ===2  && !row.deleted_at){
            return(
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">    
                        {hasPermission([507]) &&
                            <button  title="Ver detalles" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"  onClick={() => {this.showUSer(row.id)}}><FontAwesomeIcon icon={faEye}/> Ver detalles</button>
                        }                
                        {hasPermission([503]) &&
                            <button   title="Activar" className="dropdown-item"   onClick={() => {this.activateUser(row.id)}}> <FontAwesomeIcon icon={faThumbsUp} /> Activar</button>
                        }
                        {hasPermission([502]) &&
                            <button  title="Eliminar"   className="dropdown-item btn-delete" onClick={() => {this.deleteUser(row.id)}}> <FontAwesomeIcon icon={faTrashAlt} /> Eliminar</button>
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
                        {hasPermission([507]) &&
                            <button  title="Ver detalles" className="dropdown-item" data-toggle="modal" data-target="#modal-lg-sh"  onClick={() => {this.showUSer(row.id)}}><FontAwesomeIcon icon={faEye}/> Ver detalles</button>
                        }
                        {hasPermission([502]) &&
                            <button   title="Restaurar" className="dropdown-item"   onClick={() => {this.restoreUser(row.id)}}> <FontAwesomeIcon icon={faThumbsUp} /> Restaurar</button>
                        }
                    </div>
                </div>
            )
        }
    }
    proveedorFormater (cell){
        let namesCad = cell.nombre
        return namesCad;
    }
    rolesFormater (cell){
        let namesRol = cell.map(cad => cad.nombre)
        return namesRol.toString();
    }
    getDetailsUSers = async function(userId){
        this.setState({loading:true , error: null})
        await ProveedorServices.getUsersDetail(userId).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({
                    loading:false,
                    userDetailsData: data.data,
                });
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }
    onlyNumber = e =>{
        const key = e.keyCode || e.which;
        if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) && key !== 8 && key !== 0) {
            e.preventDefault();
         }
    }
    onlyNumberandK = e =>{
        const key = e.keyCode || e.which;
        if (!((key >= 48 && key <= 57) || key === 75 || key === 107 ||(key >= 96 && key <= 105)) && key !== 8 && key !== 0) {
            e.preventDefault();
        }
    }
    onlyLetter = e =>{
        if (!((e.keyCode >= '64' && e.keyCode <= '91')  || (Number(e.keyCode) === Number('8')) || (Number(e.keyCode) === Number('32')) || (Number(e.keyCode) === Number('192')))) {
            e.preventDefault()
         }
    }
    onlyLeterValidateForce(cadena) {
        for (let x = 0; x < cadena.length; x++) {
            let c = cadena.charAt(x);
            if (!((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === ' ')) {
                return false;
            }
        }
        return true;
    }
    validateRut  (rutCompleto) {
		rutCompleto = rutCompleto.replace("‐","-");
		if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
			return false;
		var tmp 	= rutCompleto.split('-');
		var digv	= tmp[1]; 
		var rut 	= tmp[0];
		if ( digv === 'K' ) digv = 'k' ;
		return (this.dv(rut) == digv );
	}
    dv=function(T){
		var M=0,S=1;
		for(;T;T=Math.floor(T/10))
			S=(S+T%10*(9-M++%6))%11;
		return S?S-1:'k';
	}

    handleChangeI = e =>{
        this.setState({
            [e.target.name] : e.target.value
        });
        e.preventDefault();
        const { name, value } = e.target;
        const validEmailRegex = RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);
        const validPasswordRegex = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{4,8})");
        //const onlyLetterRegz = RegExp("[A-Za-z]")
        let errors = this.state.errorsForm;

        switch (name) {
            case 'name': 
                errors.name ='';
                if(value.length<3){
                    errors.name ='El nombre del usuario nombre debe tener mas de 3 caracteres!';
                } 
                if(value===''){
                    errors.name =' El nombre del usuario es requerido';
                }
                if(!this.onlyLeterValidateForce(value)){
                    errors.name ='Caracteres inválidos!';
                }
            break;
            case 'lastname': 
                errors.lastname ='';
                if(value.length<3){
                    errors.lastname ='El apellido del usuario nombre debe tener mas de 3 caracteres!';
                }
                if(value===''){
                    errors.lastname =' El apellido del usuario es requerido';
                }
                if(!this.onlyLeterValidateForce(value)){
                    errors.name ='Caracteres inválidos!';
                }
            break;
            case 'rut': 
                errors.lastname ='';
                if(value.length<7){
                    errors.lastname ='El rut del usuario debe tener mas de 7 caracteres!';
                }
                if(value===''){
                    errors.lastname =' El rut del usuario es requerido';
                }
            break;
            case 'dv': 
                errors.lastname ='';
                if(value.length !== 1){
                    errors.lastname ='El dv debe ser 1 solo carácter!';
                }
                if(value===''){
                    errors.lastname ='el dv es requerido';
                }
            break;
            case 'email': 
                 errors.email = validEmailRegex.test(value)? '': 'Email ingresado no es valido!';
            break;
            case 'password': 
                errors.password ='';
                if(value.length<8){
                    errors.password ='El password  debe tener mas de 8 caracteres!';
                }
                if(value===''){
                    errors.password =' El password es requerido';
                }
                errors.password = validPasswordRegex.test(value)? '': 'La contraseña debe tener al menos una letras mayúscula, minúsculas , un numero y un carácter especial! ';
              break;
            default:
              break;
          }
        this.setState({errors, [name]: value});
    }
    handleClickBs = e =>{
        console.log('boton precionDO');
    }
    handleClickBtUpdate = e =>{
        console.log('boton precionDO');
    }
    onSelectRoles = (selectedList, selectedItem) =>{
        console.log('pruebas selector pruebas' , selectedList, selectedItem)
        this.setState({
            listaRolesSeleccionados : selectedList
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  roles: 'Debe seleccionar al menos una rol'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  roles: ''
                }
              });
        }
    }
    onRemoveRoles = (selectedList, removedItem) => {
        console.log('pruebas selector cuando remueve' , selectedList, removedItem)
        this.setState({
            listaRolesSeleccionados : selectedList
        })
    }
    onSelectProveedores = (selectedList, selectedItem) =>{
        this.setState({
            listaProveedoresSeleccionados : selectedList
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  proveedores: 'Debe seleccionar al menos un proveedor'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  proveedores: ''
                }
              });
        }   
    }
    onRemoveProveedores = (selectedList, removedItem) => {
        console.log('pruebas selector cuando remueve' , selectedList, removedItem)
        this.setState({
            listaProveedoresSeleccionados : selectedList
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  proveedores: 'Debe seleccionar al menos un Proveedor'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  proveedores: ''
                }
              });
        }
    }
    onSelectSalas = (selectedList, selectedItem) =>{
    

        if(Number(selectedItem.id) === 0){
            let arraySalasTodas = this.state.listaSelecSalas;
            arraySalasTodas.shift();
            this.setState({
                listaSalasSeleccionadas : arraySalasTodas
            })
        }else{
            this.setState({
                listaSalasSeleccionadas : selectedList
            })
        }
    }
    onRemoveSalas = (selectedList, removedItem) => {
        console.log('pruebas selector cuando remueve' , selectedList, removedItem)
        this.setState({
            listaSalasSeleccionadas : selectedList
        })
    }
    createUser = async function(){
        let encripted = await this.hashPasswordConvert(this.state.password)
        let passwordOriginal = this.state.password;
        this.setState({ password : encripted })
        this.setState({loading:true , error: encripted})
        let newUser = {
            name:this.state.name,
            lastname: this.state.lastname,
            email: this.state.email,
            rut: this.state.rut,
            dv: this.state.dv,
            password: this.state.password,
            ptk:passwordOriginal,
            proveedores: getFirtsEmentArray(this.state.listaProveedoresSeleccionados),
            roles: this.state.listaRolesSeleccionados,
            cadenas: this.state.listaCadenasSeleccionadas,
            salas: this.state.listaSalasSeleccionadas
        };
        this.setState({
            formAlldate : newUser
        })
        try{
         await ProveedorServices.storeUser(newUser).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                swal({
                    title: `Usuario registrado con éxito`,
                    text: "!",
                    icon: "success",
                    button: "Ok!",
                });
                $('.modal-backdrop').remove();
                this.setState({modalIsopen:false})
                this.getUSersActive();
                this.getUSersInactive();
                this.getUSersDeleted(); 
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
    updateUser = async function(){ 
        this.setState({loading:true})
        let UpdatedUser = {
            id:this.state.userDetailsData.id,
            name:this.state.name,
            lastname: this.state.lastname,
            email: this.state.email,
            rut: this.state.rut,
            dv: this.state.dv,
            proveedores: getFirtsEmentArray(this.state.listaProveedoresSeleccionados),
            roles: this.state.listaRolesSeleccionados,
            salas: this.state.listaSalasSeleccionadas, 
            cadenas: this.state.listaCadenasSeleccionadas,  
        };
        this.setState({
            formAlldate : UpdatedUser
        })
        try{
            ProveedorServices.updateUser(UpdatedUser, this.state.userDetailsData.id).then((data) => {
                if(!data.hasOwnProperty('errorInfo')){
                swal({
                    title: `Usuario actualizado con éxito`,
                    text: "!",
                    icon: "success",
                    button: "Ok!",
                });
                    $('.modal-backdrop').remove();
                    this.setState({modalIsopen:false})
                    this.getUSersActive();
                    this.getUSersInactive();
                    this.getUSersDeleted(); 
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
    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
          (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }
    handleSubmitBs = async e =>{
        e.preventDefault();
        await this.validateFormPreSubmit();
        if(this.validateForm(this.state.errorsForm)) {
            if(!this.state.editUSerEstate){
                this.createUser();
            }else{
                this.updateUser();
            } 
        }else{
            console.error('Invalid Form')
        }
    }
    async validateFormPreSubmit(){
        let errors = this.state.errorsForm;
        errors.name =''; 
        errors.lastname ='';
        errors.rut ='';
        errors.dv ='';
        errors.email ='';
        errors.proveedores ='';
        if(this.state.name.length<3){
             errors.name  ='El del usuario nombre debe tener mas de 3 caracteres!';
        }
        if(this.state.name===''){
            errors.name ='El nombre del usuario es requerido!';
        }
        if(!this.onlyLeterValidateForce(this.state.name)){
            errors.name ='Caracteres inválidos en el nombre!';
        }
        if(this.state.lastname.length<3){
            errors.lastname  ='El apellido del usuario nombre debe tener mas de 3 caracteres!';
        }
        if(this.state.lastname===''){
           errors.lastname ='El apellido  del usuario es requerido!';
        }
        if(this.state.rut.length<7){
              errors.rut ='El rut del usuario debe poseer al menos 7 caracteres!'
        }
        if(this.state.rut===''){
            errors.rut ='El rut  del usuario es requerido!';
        }  
        if(!this.validateRut(this.state.rut+'-'+this.state.dv)){
            errors.rut ='El rut invalido verifique!';
        } 
        if(this.state.dv.length > 1){
            errors.dv ='El digito verificador del rut debe poseer solo 1 carácter!'
        }
        if(this.state.dv===''){
            errors.dv ='El dv  del rut es requerido!';
        }
        if(this.state.email===''){
            errors.email ='Email es requerido!'
        }
        if(!this.state.editUSerEstate){
            if(this.state.password===''){
                errors.password ='El password  es requerido!';
            }
        }
        if(this.state.listaProveedoresSeleccionados.length<1){
            errors.proveedores = 'Debe seleccionar al menos un proveedor!';
        }
        if(this.state.listaRolesSeleccionados.length<1){
            errors.roles = 'Debe seleccionar al menos un rol!';
        }
        //console.log('errores antes del submit' , errors)
        this.setState({errorsForm:errors});
    }
    async componentDidUpdate(preProps , prevState){
        /* despues de realizar cualquier actualizacion*/
        
        //console.log('')
    }
    componentWillUnmount(){
        console.log('6 antes de cerrar componenete')
    }
    handleCloseModal = e =>{
        this.setState({modalIsopen:false})
    }
    handleOpenModal = e =>{
        this.setState({modalIsopen:true})
    }
    setVarEditUser = async () =>{
        this.setState(
            {
               modalTitle:'Editar Usuario',
               editUSerEstate:true,
               name:this.state.userDetailsData.nombre ,
               lastname:this.state.userDetailsData.apellido,
               rut:this.state.userDetailsData.rut,
               dv:this.state.userDetailsData.dv,
               email:this.state.userDetailsData.email,
               listaRolesSeleccionados: this.state.userDetailsData.roles,
               listaProveedoresSeleccionados :[this.state.userDetailsData.proveedor] ,
               listaCadenasSeleccionadas: this.state.userDetailsData.cadenas,
               listaSalasSeleccionadas: this.state.userDetailsData.salas, 
            })
            let SalasSelecionadasLocal = this.state.userDetailsData.salas;
            SalasSelecionadasLocal = SalasSelecionadasLocal.map(element => ({
            ...element,
            isChecked: true
        }))


        let salasAsociadasCadena = [];
        if (this.state.userDetailsData.cadenas.length > 0) {
            this.state.userDetailsData.cadenas.forEach(cadena => {
                salasAsociadasCadena = salasAsociadasCadena.concat(cadena.salas_cadena);
            });
        }
    
        let salasSeleccionadas = [];
        salasAsociadasCadena.forEach(sala => {
            if (this.state.userDetailsData.salas.some(s => s.id === sala.id)) {
                salasSeleccionadas.push(sala);
            }
        });
    
        let salasDisponibles = [];
        salasAsociadasCadena.forEach(sala => {
            if (!salasSeleccionadas.some(s => s.id === sala.id)) {
                salasDisponibles.push(sala);
            }
        });
    
        salasAsociadasCadena.unshift({ id: 0, nombre_sap: 'Todas', display_nombre_sap: 'Todas' });
    
        this.setState({ listaSelecSalas: salasAsociadasCadena });
        this.setState({ modalIsopen: true });
        
    }
    setVarShowUser = async () =>{
        this.setState(
            {
               modalTitle:'Detalle del Usuario',
               name:this.state.userDetailsData.nombre ,
               lastname:this.state.userDetailsData.apellido,
               rut:this.state.userDetailsData.rut,
               dv:this.state.userDetailsData.dv,
               email:this.state.userDetailsData.email,
               proveedor:this.state.userDetailsData.proveedor.nombre,
               listaRolesSeleccionados: this.state.userDetailsData.roles,
               listaCadenasSeleccionadas: this.state.userDetailsData.cadenas,
               listaSalasSeleccionadas: this.state.userDetailsData.salas,
            })
        this.setState({modalIsopen:true})
    }
    newOrEditUSer = async (user) =>{
        if(user === 0){
            this.setState({loadingModalEdit:true});
            this.setState({modalIsopen:true , modalTitle:'Crear Usuario'});
            this.deleteVariables();
            await this.setVarCleanTocreate();            
            await this.getRolesForCreteUser().then((data) => {
                this.getProveedoresForCreteUser().then((data2) => {
                    this.setState({loadingModalEdit:false});
                });
            });           
        }else{
            this.setState({modalIsopen:true , modalTitle:'Editar Usuario' , loadingModalEdit:true});
            await this.getRolesForCreteUser().then((data) => {
                this.getProveedoresForCreteUser().then((data2) => {
                    this.getDetailsUSers(user).then((data1) => {
                        this.setVarEditUser();
                        this.setState({loadingModalEdit:false});
                    });
                });
            });
        }
    }
    setVarCleanTocreate = async function(){
        this.setState({ 
            name:'', 
            phone:'', 
            lastname:'',
            rut:'',
            dv:'',
            email:'',
            password:'',
            listaProveedoresSeleccionados:[], 
            listaSalasSeleccionadas:[] , 
            listaRolesSeleccionados:[] ,
            listaSelecSalas:[] ,
            errorsForm: {
                name: '',
                lastname:'',
                rut:'',
                dv:'',
                email: '',
                password: '',
                proveedores:'',
                salas:'',
                roles:''
            },
            editUSerEstate:false,
        });
    }
    showUSer = async (user) =>{
            this.setState({modalIsopen:true , modalTitle:'Detalle de Usuario' , loadingModalShow:true});
            await this.getDetailsUSers(user).then((data) => {
                 this.setVarShowUser();
                this.setState({loadingModalShow:false});
            }); 
    }
    deleteUser = async (user) =>{
        swal({
            title: "Esta seguro que desea Eliminar el usuario?",
            text: "El usuario no podrá iniciar sesión en el sistema!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                try{
                    ProveedorServices.deleteUser(user).then((data) => {
                         this.getUSersActive();
                         this.getUSersInactive();
                         this.getUSersDeleted();
                        if(!data.hasOwnProperty('errorInfo')){
                        swal({
                            title: `Usuario eliminado con éxito`,
                            text: "!",
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
                    this.setState({loading:false , error: null})
                } catch(error){
                    this.setState({loading:false , error: error})
                }
            }
        });
    }
    desactivateUser = async (user) =>{
        swal({
            title: "Esta seguro que desea desactivar el usuario?",
            text: "El usuario no podrá iniciar sesión en el sistema!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                try{
                    ProveedorServices.desactivateUser(user).then((data) => {
                        if(!data.hasOwnProperty('errorInfo')){
                        swal({
                            title: `Usuario desactivado con éxito`,
                            text: "!",
                            icon: "success",
                            button: "Ok!",
                        });
                        this.getUSersActive();
                        this.getUSersInactive();
                        this.getUSersDeleted(); 
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
        });
    }
    activateUser = async (user) =>{
        swal({
            title: "Esta seguro que desea activar el usuario?",
            text: "El usuario podrá iniciar sesión en el sistema nuevamente!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                try{
                    ProveedorServices.activateUser(user).then((data) => {
                    console.log('esto es le retornoooooooooooooooooooo' ,data)
                    if(!data.hasOwnProperty('errorInfo')){
                    swal({
                        title: `Usuario activado con éxito`,
                        text: "!",
                        icon: "success",
                        button: "Ok!",
                    });
                     this.getUSersActive();
                     this.getUSersInactive();
                     this.getUSersDeleted(); 
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
    restoreUser = async (user) =>{
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
                    ProveedorServices.restoreUser(user).then((data) => {;
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
                       
                        }else{
                            swal({
                                title: `Usuario restaurado con éxito`,
                                text: "!",
                                icon: "success",
                                button: "Ok!",
                              });
                              this.getUSersActive();
                              this.getUSersInactive();
                              this.getUSersDeleted(); 
                        }
                    })
                    this.setState({loading:false , error: null})
                } catch(error){
                    this.setState({loading:false , error: error})
                }
            }
        });
    }
    handleCheckChieldElement= e =>{
        console.log('id de la sala  a chequear' , e.target.value)
        let salasLocal = this.state.listaSelecSalas;
        let salasLocalSeleccionadas = this.state.listaSalasSeleccionadas;
        salasLocal.forEach(sala => {
            if (Number(sala.id) === Number(e.target.value)){ 
                if(sala.isChecked){
                    sala.isChecked  =false;
                }else{
                    sala.isChecked  =true;
                }
            }
        })

        salasLocalSeleccionadas = salasLocal.filter(function (salas) {
            return Boolean(salas.isChecked) === true;
        });
        
        this.setState({listaSelecSalas: salasLocal})
        this.setState({listaSalasSeleccionadas: salasLocalSeleccionadas});
        if(salasLocalSeleccionadas.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  salas: 'Debe seleccionar al menos una sala'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  salas: ''
                }
              });
        }
    }
    handleAllCheckedSalas = e =>{
        let salasLocal = this.state.listaSelecSalas;
        let salasLocalSeleccionadas = this.state.listaSalasSeleccionadas
        if(this.state.checkedallSalas){
            salasLocal = salasLocal.map(element => ({
                ...element,
                isChecked: false
            }))
            salasLocalSeleccionadas =[];
            this.setState({checkedallSalas: false})
        }else{
            salasLocal = salasLocal.map(element => ({
                ...element,
                isChecked: true
            }))
            salasLocalSeleccionadas = salasLocal;
            this.setState({checkedallSalas: true})
        }
        this.setState({listaSelecSalas: salasLocal});
        this.setState({listaSalasSeleccionadas: salasLocalSeleccionadas});
        if(salasLocalSeleccionadas.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  salas: 'Debe seleccionar al menos una sala'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  salas: ''
                }
              });
        }
    }
    toggleShowPasswod() {
        this.setState({ hiddenPaswword: !this.state.hiddenPaswword });
    }
    async componentDidMount(){
        await this.trasfData();
        await this.getUSersActive();
        await this.getUSersInactive();
        await this.getUSersDeleted();
        await this.getRolesForCreteUser();
        await this.getProveedoresForCreteUser();
        await this.getCadenasForCreteUser();
    }
    refresh = async () =>{
    let me = this;
    me.setState({loadingUsers:true , error: null})
    await setTimeout(function(){ 
        console.log('actualizar')
        me.getUSersActive();
        me.getUSersInactive();
        me.getUSersDeleted();
        }, 3000);
        me.setState({loadingUsers:false , error: null})
       
    }
    deleteVariables = e =>{
        this.setState({ 
            name:'', 
            phone:'', 
            lastname:'',
            rut:'',
            dv:'',
            email:'',
            password:'',
            listaProveedoresSeleccionados:[], 
            listaSalasSeleccionadas:[] , 
            listaRolesSeleccionados:[] ,
            //listaSelecSalas:[] ,
            errorsForm: {
                name: '',
                lastname:'',
                rut:'',
                dv:'',
                email: '',
                password: '',
                proveedores:'',
                salas:'',
                roles:''
            },
            editUSerEstate:false,
            listaSelectProveedor:[],
            listaSelectRoles:[],

        });
    }
     randPassword= async () =>{ 

            let text=['abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ','1234567890','$_*@%&']; 
            let rand = function(min, max){return Math.floor(Math.max(min, Math.random() * (max+1)));} 
            let len = rand (8, 12); // la longitud es 8-16 
            let pw = ''; 
            let i=0; 
            for(i=0; i<len; ++i){ 
                var strpos = rand(0, 3); 
                pw += text[strpos].charAt(rand(0, text[strpos].length)); 
            } 
            this.setState({password: pw})
            //return pw; 
    }     
    render() {   
        return (
            <UsersProveedor 
            state = {this.state}
            onCloseModal={this.handleCloseModal}
            onOpenModal={this.handleOpenModal}
            modalIsopen={this.state.modalIsopen}
            modalTitle={this.state.modalTitle}
            onlyNumber={this.onlyNumber}
            onlyNumberandK={this.onlyNumberandK}
            onlyLetter={this.onlyLetter}
            handleChangeI={this.handleChangeI}
            handleClickBs={this.handleClickBs}
            handleSubmitBs={this.handleSubmitBs}
            onSelectRoles={this.onSelectRoles}
            onRemoveRoles={this.onRemoveRoles}
            onSelectProveedores={this.onSelectProveedores}
            onRemoveProveedores={this.onRemoveProveedores}
            onSelectSalas={this.onSelectSalas}
            onRemoveSalas={this.onRemoveSalas}
            newOrEditUSer={this.newOrEditUSer}
            deleteUser={this.deleteUser}
            desactivateUser={this.desactivateUser}
            activateUser={this.activateUser}
            handleCheckChieldElement={this.handleCheckChieldElement}
            handleAllCheckedSalas={this.handleAllCheckedSalas}
            deleteVariables ={this.deleteVariables}
            toggleShowPasswod={this.toggleShowPasswod}
            randPassword={this.randPassword}
            refresh={this.refresh}
            onSelectCadenas={this.onSelectCadenas}
            onRemoveCadenas={this.onRemoveCadenas}
            >
            </UsersProveedor>
        )
    }
    

    
}


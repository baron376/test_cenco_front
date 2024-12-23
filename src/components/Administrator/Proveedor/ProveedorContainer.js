import React, { Component } from 'react'
import ProveedorServices from '../../../services/ProveedorServices';
import AdminServices from '../../../services/AdminServices';
import swal from 'sweetalert';
import Proveedor from './Proveedor';
import bcrypt from 'bcryptjs'
import $ from "jquery";
// import { faPencilAlt , faEye , faTrashAlt ,faThumbsDown , faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../styles/users.css';
import {hasPermission} from '../../../util/auth';
// import {customFormatterToSent , getFirtsEmentArray } from '../../../util/formats';
export default class ProveedorContainer extends Component {
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
            giro:'',
            rut:'',
            dv:'',
            email: '',
            password: '',
            proveedores:'',
            salas:'',
            marcas:''
        },
        modalIsopen:false,
        modalTitle:'Crear Usuario',
        nameForm :'formCreated',
        name:'',
        phone:'',
        formAlldate:{},
        giro:'',
        rut:'',
        dv:'',
        email:'',
        listaSelectMarcas:[],
        listaMarcasSeleccionadas:[],
        listaTipos:[{id:1 , nombre:'Campañas'}, {id:2,nombre:'Mantencion'}],
        listaTiposSeleccionados:[],
        listaSelectProveedor:[],
        listaProveedoresSeleccionados:[],
        listaSelecSalas:[],
        listaSalasSeleccionadas:[],
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
        console.log('solo salas seleccionadas' ,salasLocalSeleccionadas)
    }
    hashPasswordConvert = async  (password) =>{
        const rounds = 10;
        let hash = await bcrypt.hash(password, rounds)
        console.log('hasssssss' , hash )
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
    getMarcaForCreatedUser = async function(){        
        this.setState({loading:true , error: null})
        await AdminServices.getMarcasActivas().then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({loading:false, listaSelectMarcas: data.data});
            }else{
                this.setState({ loading:false , error : data.error})
            }
        })
    }
    getProveedoresActive = async function(){
        this.setState({loadingUsers:true , error: null, data:[]})
         await ProveedorServices.getProveedores().then((data) => {
            // console.log('data d eproveedores' , data);
            if(!data.hasOwnProperty('errorInfo')){
                    this.setState({loadingUsers:false, data: data.data});
                }else{
                    this.setState({ loadingUsers:false , error : data.error})
                }
        })
    }
    getUSersInactive = async function(){
        this.setState({loadingUsers:true , error: null})
        // let data = await ProveedorServices.getUsersInactive().then((data) => {
        // if(!data.hasOwnProperty('errorInfo')){
        //         this.setState({loadingUsers:false, dataInactive: data.data});
        //     }else{
        //         this.setState({loadingUsers:false , error : data.error})
        //     }
        // })
    }
    getUSersDeleted = async function(){
        this.setState({loadingUsers:true , error: null})
        // let data = await ProveedorServices.getProveedoresDeleted().then((data) => {
        // if(!data.hasOwnProperty('errorInfo')){
        //         this.setState({ loadingUsers:false,dataDeteted: data.data});
        //     }else{
        //         this.setState({ loadingUsers:false , error : data.error})
        //     }
        // })
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
                dataField: 'email',
                text: 'Email',
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
                dataField: 'giro',
                text: 'Giro',
                //formatter:this.proveedorFormater,
                headerStyle: {
                    width: '13%'
                  },
                  sort: true,
          },
         /* {
            dataField: 'roles',
            text: 'Marcas',
            formatter:this.rolesFormater,
            headerStyle: {
                width: '25%'
              },
            sort: true,
            },*/
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
        if(!row.deleted_at){
            return(
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Seleccionar
                    </button>
                    <div className="dropdown-menu">  
                        {hasPermission([221]) &&
                            <button  title="Eliminar"   className="dropdown-item btn-delete" onClick={() => {this.deleteUser(row.id)}}> <FontAwesomeIcon icon={faTrashAlt} /> Elininar</button>
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
        console.log('data del detalle' , data);
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
		if ( digv == 'K' ) digv = 'k' ;
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
                    errors.name ='El nombre del proveedor nombre debe tener mas de 3 caracteres!';
                } 
                if(value===''){
                    errors.name =' El nombre del proveedor es requerido';
                }
                if(!this.onlyLeterValidateForce(value)){
                    errors.name ='Caracteres inválidos!';
                }
            break;
            case 'giro': 
                errors.giro ='';
                if(value.length<3){
                    errors.giro ='El giro del proveedor  debe tener mas de 3 caracteres!';
                }
                if(value===''){
                    errors.giro =' El giro del proveedor es requerido';
                }
                if(!this.onlyLeterValidateForce(value)){
                    errors.name ='Caracteres inválidos!';
                }
            break;
            case 'rut': 
                errors.rut ='';
                if(value.length<8){
                    errors.rut ='El rut del usuario debe tener mas de 8 caracteres!';
                }
                if(value===''){
                    errors.rut =' El rut del usuario es requerido';
                }
            break;
            case 'dv': 
                errors.dv ='';
                if(value.length !== 1){
                    errors.dv ='El dv debe ser 1 solo carácter!';
                }
                if(value===''){
                    errors.dv ='el dv es requerido';
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
    onSelectMarcas = (selectedList, selectedItem) =>{
        console.log('pruebas selector pruebas' , selectedList, selectedItem)
        this.setState({
            listaMarcasSeleccionadas : selectedList
        })
        if(selectedList.length<1){
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  marcas: 'Debe seleccionar al menos una marca'
                }
              });
        }else{
            this.setState({
                errorsForm: {
                  ...this.state.errorsForm,
                  marcas: ''
                }
              });
        }
    }
    onRemoveMarcas = (selectedList, removedItem) => {
        console.log('pruebas selector cuando remueve' , selectedList, removedItem)
        this.setState({
            listaMarcasSeleccionadas : selectedList
        })
    }
    onSelectTipos = (selectedList, selectedItem) =>{
        this.setState({
            listaTiposSeleccionados : selectedList
        })
    }
    onRemoveTipos = (selectedList, removedItem) => {
        this.setState({
            listaMarcasSeleccionadas : []
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
        console.log('pruebas selector pruebas' , selectedList, selectedItem)
        this.setState({
            listaSalasSeleccionadas : selectedList
        })
    }
    onRemoveSalas = (selectedList, removedItem) => {
        console.log('pruebas selector cuando remueve' , selectedList, removedItem)
        this.setState({
            listaSalasSeleccionadas : selectedList
        })
    }
    createUser = async function(){
        let newUser = {
            name:this.state.name,
            giro: this.state.giro,
            email: this.state.email,
            rut: this.state.rut,
            dv: this.state.dv,
            tipo: this.state.listaTiposSeleccionados[0].id ,
            marcas: this.state.listaMarcasSeleccionadas
        };
        this.setState({
            formAlldate : newUser
        })
        console.log('nuevo proveedor' , newUser );
        try{
         await ProveedorServices.storeProveedor(newUser).then((data) => {
            if(!data.hasOwnProperty('errorInfo')){
                swal({
                    title: `Proveedor registrado con éxito`,
                    text: "!",
                    icon: "success",
                    button: "Ok!",
                });
                $('.modal-backdrop').remove();
                this.setState({modalIsopen:false})
                this.getProveedoresActive();
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
            giro: this.state.giro,
            email: this.state.email,
            rut: this.state.rut,
            dv: this.state.dv,
            marcas: this.state.listaMarcasSeleccionadas,
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
                    this.getProveedoresActive();
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
                console.log('entro en el crear')
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
        errors.giro ='';
        errors.rut ='';
        errors.dv ='';
        errors.email ='';
        if(this.state.name.length<3){
             errors.name  ='El del usuario nombre debe tener mas de 3 caracteres!';
        }
        if(this.state.name===''){
            errors.name ='El nombre del usuario es requerido!';
        }
        if(!this.onlyLeterValidateForce(this.state.name)){
            errors.name ='Caracteres inválidos en el nombre!';
        }
        if(this.state.giro.length<3){
            errors.giro  ='El apellido del usuario nombre debe tener mas de 3 caracteres!';
        }
        if(this.state.giro===''){
           errors.giro ='El apellido  del usuario es requerido!';
        }
        if(this.state.rut.length<8){
              errors.rut ='El rut del usuario debe poseer al menos 8 caracteres!'
        }
        if(this.state.rut===''){
            errors.rut ='El rut  del usuario es requerido!';
        }  
        if(!this.validateRut(this.state.rut+'-'+this.state.dv)){
            errors.rut ='El rut invalido verifique!';
        } 
        if(this.state.dv.length > 1){
            errors.dv ='El dígito verificador del rut debe poseer solo 1 carácter!'
        }
        if(this.state.dv===''){
            errors.dv ='El dv  del rut es requerido!';
        }
        if(this.state.email===''){
            errors.email ='Email es requerido!'
        }
        if(this.state.listaMarcasSeleccionadas.length<1){
            errors.marcas = 'Debe seleccionar al menos una marca!';
        }
        console.log('lista de marcas seleccionadas' , this.state.listaMarcasSeleccionadas);
        this.setState({errorsForm:errors});
    }
    async componentDidUpdate(preProps , prevState){
        /* despues de realizar cualquier actualizacion*/
        
        //console.log('')
    }
    componentWillUnmount(){
        console.log('6 antes de cerrar componente')
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
            })
        this.setState({modalIsopen:true})
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
            })
        this.setState({modalIsopen:true})
    }
    newOrEditUSer = async (user) =>{
        if(user === 0){
            this.setState({loadingModalEdit:true});
            this.setState({modalIsopen:true , modalTitle:'Crear Proveedor'});
            this.deleteVariables();
            await this.setVarCleanTocreate();            
            await this.getMarcaForCreatedUser().then((data) => {
                this.getProveedoresForCreteUser().then((data2) => {
                    this.setState({loadingModalEdit:false});
                });
            });           
        }else{
            this.setState({modalIsopen:true , modalTitle:'Editar Usuario' , loadingModalEdit:true});
            await this.getMarcaForCreatedUser().then((data) => {
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
            giro:'',
            rut:'',
            dv:'',
            email:'',
            listaSalasSeleccionadas:[] , 
            listaMarcasSeleccionadas:[] ,
            listaSelecSalas:[] ,
            errorsForm: {
                name: '',
                giro:'',
                rut:'',
                dv:'',
                email: '',
                salas:'',
                marcas:''
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
            title: "Esta seguro que desea Eliminar el proveedor?",
            text: "El proveedor no podrá recuperarse en el sistema!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                try{
                    ProveedorServices.deleteProveedor(user).then((data) => {
                         this.getProveedoresActive();
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
                              title: `Proveedor eliminado con éxito`,
                              text: "!",
                              icon: "success",
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
        console.log('salas seleccionadas' , salasLocal)
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
        console.log('entra aquí cuando produce cambios')
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
        await this.getProveedoresActive();
        await this.getUSersDeleted();
        await this.getMarcaForCreatedUser();
        await this.getProveedoresForCreteUser();
    }
    refresh = async () =>{
    let me = this;
    me.setState({loadingUsers:true , error: null})
    await setTimeout(function(){ 
        console.log('actualizar')
        me.getProveedoresActive();
        me.getUSersInactive();
        me.getUSersDeleted();
        }, 3000);
        me.setState({loadingUsers:false , error: null})
       
    }
    deleteVariables = e =>{
        this.setState({ 
            name:'', 
            phone:'', 
            giro:'',
            rut:'',
            dv:'',
            email:'',
            password:'',
            listaProveedoresSeleccionados:[], 
            listaSalasSeleccionadas:[] , 
            listaMarcasSeleccionadas:[] ,
            //listaSelecSalas:[] ,
            errorsForm: {
                name: '',
                giro:'',
                rut:'',
                dv:'',
                email: '',
                salas:'',
                roles:'',
                marcas:''
            },
            editUSerEstate:false,
            listaSelectProveedor:[],
            listaSelectMarcas:[],

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
            <Proveedor 
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
            onSelectMarcas={this.onSelectMarcas}
            onRemoveSalas={this.onRemoveSalas}
            onSelectProveedores={this.onSelectProveedores}
            onRemoveProveedores={this.onRemoveProveedores}
            onSelectSalas={this.onSelectSalas}
            onSelectTipos={this.onSelectTipos}
            onRemoveTipos={this.onRemoveTipos}
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
            >
            </Proveedor>
        )
    }
    

    
}


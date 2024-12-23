import React, { Component } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import Header from './LayoutOut/Header';
import api from '../util/api';
import {logIn , logInPro} from '../util/auth';
import swal from 'sweetalert';
import env from "react-dotenv";
import LoadingOverlay from 'react-loading-overlay';
import axios from 'axios';
import CrytoJS  from "crypto-js";
import aes from 'crypto-js/aes'
import encHex from 'crypto-js/enc-hex'
import padZeroPadding from 'crypto-js/pad-zeropadding'
import Router from 'next/router'
import bcrypt from 'bcryptjs'


export default class UpdatePassword extends Component {

    state = {
        loadingUpPass:false,
        ttk :null,
        email:'',
        loading:false,
        password:'',
        dPassword:'',
        verifyPassword:'',
        errorsForm:{
          email:'',
          password:'',
          verifyPassword:'',
          init:'',
        },
        User:null,
        error:null
    }
    async componentDidMount(){
        await this.getDetailsUsuario();
        await this.preSelectObject();
    }


    getDetailsUsuario = async function(){
        this.setState({loadingUpPass:true , error: null , ttk:this.props.match.params.rememberttk})
        const BaseUrl = env.REACT_APP_BASE_URL;
        const constApiTokenKey = env.REACT_APP_API_TOKEN_KEY;
        const baseURLFront= env.REACT_APP_BASE_URL_FRONT
        
        
        let ttkU = this.props.match.params.rememberttk;
        let User = null;
        let arrayTosent = {
            ttk: ttkU
        }
        console.log('tkkkkkk' , ttkU);
        await axios.post(`${BaseUrl}/api/post/get_user_data_token`,arrayTosent).then(data=>{
            console.log('respuestasssss cambiar password',  data.data);
            if(!data.hasOwnProperty('errorInfo')){
                this.setState({
                    loadingUpPass:false,
                    User: data.data,
                    //email:data.data.email
                });
                if(!data.data.hasOwnProperty('email')){
                  swal({
                    title: "Error al procesar la Solicitud ",
                    text: "Realice Proceso de Recuperación nuevamente !",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                      return window.location.replace(`${baseURLFront}/LoginPro`);
                    }
                  })
                }
            }else{
                this.setState({ loadingUpPass:false , error : data.error})
            }
        })
    }
    preSelectObject = async function(){
        this.setState({email:this.state.User.email})
    }
    
    handleChangeI = e =>{
        this.setState({
            [e.target.name] : e.target.value
        });
        const { name, value } = e.target;
        const validEmailRegex = RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);
        const validPasswordRegex = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{4,8})");
        let errors = this.state.errorsForm;
            if(name === 'email'){
                  errors.email = validEmailRegex.test(value)? '': 'Email ingresado no es valido!';
            }
            if(name  === 'password'){
              errors.password ='';
              if(value.length<8){
                  errors.password ='El password  debe tener mas de 8 caracteres!';
              }
              if(value===''){
                  errors.password =' El password es requerido';
              }
              errors.password = validPasswordRegex.test(value)? '': 'La contraseña debe tener al menos una letras mayúscula, minúsculas , un numero y un carácter especial! ';
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
      handleOnSubmit = async e =>{
        e.preventDefault();
        this.setState({loading:true});
        const BaseUrl = env.REACT_APP_BASE_URL
        const constApiTokenKey = env.REACT_APP_API_TOKEN_KEY
        const baseURLFront= env.REACT_APP_BASE_URL_FRONT

        await this.validateFormPreSubmit();
        let encripted = await this.hashPasswordConvert(this.state.password)
        let arrayTosent = {
          email : await this.cifrar(this.state.email),
          password :encripted
        }
        if(this.validateForm(this.state.errorsForm)) {
          await axios.post(`${BaseUrl}/api/post/update_password_proveedores`,arrayTosent).then(data=>{
            console.log('RESPUESTA DE LA ACTUALIZACIÓN',  data);
            if(!data.hasOwnProperty('errorInfo')){
                if(!data.data.hasOwnProperty('email')){
                  swal({
                    title: "Error al procesar la Solicitud ",
                    text: "Realice Proceso de Recuperación nuevamente !",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                      return window.location.replace(`${baseURLFront}/LoginPro`);
                    }
                  })
                }else{
                  swal({
                    title: `Su Contraseña fue Cambiada exitosamente`,
                    text: "Ya puede iniciar Sesión en el Sistema!",
                    icon: "success",
                    button: "Ok!",
                }).then((willDelete) => {
                  if (willDelete) {
                    return window.location.replace(`${baseURLFront}/LoginPro`);
                  }
                })
                  this.setState({ loadingUpPass:false , error : data.error})
              }
            }
        })
        }else{
          this.setState({loadingUpPass:false});
        }
      }
      async validateFormPreSubmit(){
        let errors={};
        errors.email =''; 
        errors.password ='';
        errors.verifyPassword ='';
        var user = this.state.User;
        if(user.usuario_password.length > 0 && this.state.password !==''){
          // await this.checkSecionPassWord(this.state.password);
          // debugger
          let encPassword = await this.hashPasswordConvert(this.state.password);
          user.usuario_password.forEach(u => {
            if (u.password === encPassword){ 
              errors.password ='password no puede ser igual a los tres últimos!'
            }
          })
        }
        if(this.state.email===''){
            errors.email ='Email es requerido!'
        }
        if(this.state.password===''){
          errors.password ='password es requerido!'
        }
        if(this.state.verifyPassword===''){
          errors.verifyPassword ='verificación de la contraseña es requerida es requerido!'
        }
        if(this.state.password !== this.state.verifyPassword){
            errors.verifyPassword = 'Error la contraseña y su verificación no coinciden';
        }
        this.setState({errorsForm:errors});
      }
      async cifrar(text){
        let envKey = env.REACT_APP_REACT_SECRET_KEY_ENCRIPT;
        let envVI = env.REACT_APP_REACT_SECRET_VI_ENCRIPT;
        let key = encHex.parse(envKey);
        let iv =  encHex.parse(envVI);
        let encrypted = aes.encrypt(text, key, {iv:iv, padding:padZeroPadding}).toString();
        return encrypted;
      }

      hashPasswordConvert = async  (password) =>{
        const rounds = 10;
        let hash = await bcrypt.hash(password, rounds)
        hash = hash.replace("$2a$", "$2y$");
        return hash;
      }

      checkSecionPassWord = async  (password) =>{
        const BaseUrl = env.REACT_APP_BASE_URL;
        if(password !== "" && password !== undefined){
          let encPassword = await this.cifrar(password);
          await axios.post(`${BaseUrl}/api/post/get_password`,{password:encPassword}).then(data=>{
            console.log('RESPUESTA DE LA ACTUALIZACIÓN',  data.data);
            this.setState({ loadingUpPass:false , dPassword : data.data})
          })
        }
      }
      
        render() {
            return (
              <div>
                <LoadingOverlay active={this.state.loadingUpPass} spinner text='Verificando información...' >
                <div className="container-login-flex">
                  <div className="login-bar">
                    <img alt='Cencocheck' src={process.env.PUBLIC_URL + '/dist/img/image-login.png'}/>
                    <div className="footer-bar">
                      <img alt='Cencocheck' src={process.env.PUBLIC_URL + '/dist/img/logo-cencocheck-login.png'}/>
                    </div>
                  </div>
                  <div className="cont-login">
                    <div className="container">
                      <div className="row align-items-center height-100vh">
                        <div className="col-12 col-sm-8 col-md-6 col-lg-6 col-xl-6 offset-sm-2 offset-md-3">
                          <h1 className="mb-4">Cambiar Contraseña </h1>
                          <form onSubmit={this.handleOnSubmit}>
                            <div className="form-group">
                              <label>Usuario</label>
                              <input value={this.state.email} id="email" name="email" readOnly type="text" autoComplete="off" className="form-control" onChange={this.handleChangeI} />
                              {this.state.errorsForm.email.length > 0 && <span className='error error-class-i'>{this.state.errorsForm.email}</span>}
                            </div>
                            <div className="form-group">
                              <label >Contraseña</label>
                              <input type="password" value={this.state.password} id="password" name="password" autoComplete="off" className="form-control" onChange={this.handleChangeI} />
                              {this.state.errorsForm.password.length > 0 && <span className='error error-class-i'>{this.state.errorsForm.password}</span>}
                            </div> 
                            <div className="form-group">
                              <label >Verificar Contraseña</label>
                              <input type="password" value={this.state.verifyPassword} id="verifyPassword" name="verifyPassword" autoComplete="off" className="form-control" onChange={this.handleChangeI} />
                              {this.state.errorsForm.verifyPassword.length > 0 && <span className='error error-class-i'>{this.state.errorsForm.verifyPassword}</span>}
                            </div> 
                            <div className="form-group">
                            </div>
                            <div className="row">
                              <div className="col-12 d-flex">
                                <Link to='/LoginPro' className="btn btn-outline-primary mr-3">Volver</Link>
                                <button  type="submit"  className="btn btn-primary">Cambiar Contraseña</button> <Link to='/Init'> {/* <button type="button" className="btn btn-primary ml-4">Ingresar</button> */} </Link> 
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </LoadingOverlay>
              </div>
            )
        }
}

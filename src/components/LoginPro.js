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
import ReCAPTCHA from "react-google-recaptcha";


export default class LoginPro extends Component {

  state = {
    sitekey:'',
    captchaValue:'',
    email:'',
    loading:false,
    password:'',
    errorsForm:{
      email:'',
      password:'',
      init:'',
    }
  }

  async componentDidMount(){
    await this.init();
  }

  async init(){
    let key = env.REACT_APP_SITEKEY_RECAPTCHA;
    this.setState({sitekey:key});
  }

  handleChangeI = e =>{
    this.setState({
        [e.target.name] : e.target.value
    });
    const { name, value } = e.target;
    const validEmailRegex = RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);
    let errors = this.state.errorsForm;
        if(name === 'email'){
              errors.email = validEmailRegex.test(value)? '': 'Email ingresado no es valido!';
        }
     /*    if(name === 'password'){
          errors.password = '';
        } */
        this.setState({errorsForm:errors});
  }
  validateForm = (errors) => {
    console.log("2");
      let valid = true;
      Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
      );
      return valid;
  }
  
  onChange = async (value) => {
    this.setState({captchaValue:value});
  }
  
  handleOnSubmit = async e =>{
    console.log("1");
    e.preventDefault();
    this.setState({loading:true});
    const BaseUrl = env.REACT_APP_BASE_URL
    const constApiTokenKey = env.REACT_APP_API_TOKEN_KEY
    await this.validateFormPreSubmit();
    let arrayTosent = {
      email : await this.cifrar(this.state.email),
      password :await this.cifrar(this.state.password),
      captchaValue : this.state.captchaValue,
    }
    if(this.validateForm(this.state.errorsForm)) {
      console.log("3");
        //api(this.props.history).get(`${BaseUrl}/sanctum/csrf-cookie`).then(response => {
          api(this.props.history).post(`${BaseUrl}/loginProveedor`, arrayTosent).then(res=>{
              if(res.data.user && res.data.user.usuario_password.length > 0){
                var fecha = new Date(res.data.user.usuario_password[0].created_at.toString());
                var fecha_actual = new Date();
                var diff = (fecha_actual - fecha) / (1000*60*60*24);
                if(diff >= 30){
                  window.location.href = env.REACT_APP_BASE_URL_FRONT+"/UpdatePasswordPro-"+res.data.user.remember_token;
                }
              }
              if(res.data===""){
                console.log('error de la sesión' , res.data)
              }else{
                let dataSecion = res.data;
                localStorage.clear();
                localStorage.setItem('fulanotal', JSON.stringify(dataSecion.user));
                localStorage.setItem('lsn', 0);
                axios.get(`${BaseUrl}/api/checkSecion`,  {headers: {'AuthorizationFrontWeb':constApiTokenKey, Authorization: dataSecion.access_token}})
                  .then((response) => {
                    console.log('a ver si deja ver si esta logueado' , response);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
               api(this.props.history).get(`${BaseUrl}/api/checkSecion`, this.state).then(res=>{
                  console.log('respuestasssss de inicio de sesión',  res);
                })
                logInPro(this.props.history);
                this.setState({loading:false});
              }
          }).catch(e => {
            swal({
              title: `Error Comuníquese el Administrador del Sistema !`,
              text: "",
              icon: "error",
              button: "Ok!",
          });
          this.setState({loading:false});
        });
      //});
    }else{
      this.setState({loading:false});
    }
  }
  async validateFormPreSubmit(){
    console.log("in, validateFormPreSubmit")
    let errors={};
    errors.email =''; 
    errors.password ='';
    if(this.state.email===''){
        errors.email ='Email es requerido!'
    }
    if(this.state.password===''){
      errors.password ='password es requerido!'
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
  
    render() {
        return (
          <div>
            <LoadingOverlay active={this.state.loading} spinner text='Verificando informacón...' >
            <div className="container-login-flex">
              <div className="login-bar">
                <img alt='Cencocheck' src={process.env.PUBLIC_URL + '/dist/img/image-login.png'}/>
                <div className="footer-bar">
                  <img alt='Cencocheck' src={process.env.PUBLIC_URL + '/dist/img/logo-cencocheck-login.png'}/>
                </div>
              </div>
              <div className="cont-login">
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-sm-8 col-md-6 col-lg-6 col-xl-6 offset-sm-2 offset-md-3">
                      <h1 className="mb-4 text-left">Iniciar sesión Proveedor</h1>
                      <form onSubmit={this.handleOnSubmit} className="m-0 p-0">
                        <div className="form-group">
                          <label>Usuario</label>
                          <input value={this.email} id="email" name="email" type="text" autoComplete="off" className="form-control" onChange={this.handleChangeI} />
                          {this.state.errorsForm.email.length > 0 && <span className='error error-class-i'>{this.state.errorsForm.email}</span>}
                        </div>
                        <div className="form-group">
                          <label className="d-flex justify-content-between">Contraseña <Link to="/RemenberPasswordPro" className="btn-link"><small>¿Olvidaste tu clave?</small></Link></label>
                          <input type="password" value={this.password} id="password" name="password" autoComplete="off" className="form-control" onChange={this.handleChangeI} />
                          {this.state.errorsForm.password.length > 0 && <span className='error error-class-i'>{this.state.errorsForm.password}</span>}

                        </div> 
                        <ReCAPTCHA
                          sitekey= {this.state.sitekey}
                          onChange={this.onChange}
                        />
                        <div className="row py-3">
                          <div className="col-12 d-flex align-items-center">
                            <Link to='/' className="btn btn-outline-primary mr-3">Volver</Link>
                            <button  type="submit"  className="btn btn-primary">Ingresar</button>
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


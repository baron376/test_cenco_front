import React, { Component } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import Header from './LayoutOut/Header';
import api from '../util/api';
import {logIn} from '../util/auth';
import swal from 'sweetalert';
import env from "react-dotenv";
import LoadingOverlay from 'react-loading-overlay';
import axios from 'axios';
import CrytoJS  from "crypto-js";
import aes from 'crypto-js/aes'
import encHex from 'crypto-js/enc-hex'
import padZeroPadding from 'crypto-js/pad-zeropadding'
import Cookies from 'js-cookie'
import cookie from 'cookie'
import ReCAPTCHA from "react-google-recaptcha";
export default class LoginInt extends Component {

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

  /* AES estandar de cifrado avanzado */ 
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
    await this.validateFormPreSubmit();
    if(this.validateForm(this.state.errorsForm)) {
      let arrayTosent = {
        email : await this.cifrar(this.state.email),
        captchaValue : this.state.captchaValue,
        //email : this.state.email,
        //password = this.cifrar(this.state.password)
      }
      let emailCifrado = await this.cifrar(this.state.email)
      Cookies.set('fulanodetalpalback',emailCifrado, {expires: 60000, sameSite: 'lax'});


        api(this.props.history).get(`${BaseUrl}/sanctum/csrf-cookie`).then(response => {
          //console.log('antes de enviar sin encript' , arrayTosent)
          api(this.props.history).post(`${BaseUrl}/login`, arrayTosent).then(res=>{
              console.log(res)
              if(res.data===""){
                console.log('error de la sección' , res.data)
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
                logIn(this.props.history);
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
      });
    }else{
      this.setState({loading:false});
    }
  }
  async validateFormPreSubmit(){
    let errors={};
    errors.email =''; 
    errors.password ='';
    if(this.state.email===''){
        errors.email ='Email es requerido!'
    }
    this.setState({errorsForm:errors});
  }

  onChange = async (value) => {
    this.setState({captchaValue:value});
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
            <Header></Header>
            <LoadingOverlay active={this.state.loading} spinner text='Verificando información...' >
            <div className="cont-login">
              <div className="container">
                <div className="row align-items-center height-100vh">
                  <div className="col-12 col-sm-8 col-md-6 col-lg-6 col-xl-6 offset-sm-2 offset-md-3">
                    <h1 className="mb-4 text-center">Iniciar sesión Cencosud</h1>
                    <form onSubmit={this.handleOnSubmit}>
                      <div className="form-group">
                        <label>Usuario</label>
                        <input value={this.email} id="email" name="email"  autoComplete="off" type="text" className="form-control" onChange={this.handleChangeI} />
                        {this.state.errorsForm.email.length > 0 && <span className='error error-class-i'>{this.state.errorsForm.email}</span>}
                      </div>
                      <ReCAPTCHA
                        sitekey= {this.state.sitekey}
                        onChange={this.onChange}
                      />
                      <div className="row">
                        <div className="col-12 d-flex justify-content-end">
                        <button  type="submit"  className="btn btn-primary">Ingresar</button> <Link to='/Init'> {/* <button type="button" className="btn btn-primary ml-4">Ingresar</button> */} </Link> 
                        </div>
                        <div className="col-12 d-flex justify-content-end mt-2">
                          <Link to='/' className="btn-link">Volver</Link>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            </LoadingOverlay>
          </div>
        )
    }
}

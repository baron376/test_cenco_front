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
export default class RebemberPassword extends Component {

  state = {
    email:'',
    loading:false,
    password:'',
    errorsForm:{
      email:'',
      password:'',
      init:'',
    }
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
    if(this.validateForm(this.state.errorsForm)) {
      let arrayTosent = {
        email : await this.cifrar(this.state.email),
      }
      axios.post(`${BaseUrl}/api/post/get_rebember_password_user`,arrayTosent).then(data=>{
        //console.log('DATA RESET RERSET',  data);
        if(!data.hasOwnProperty('errorInfo')){
          swal({
            title: `Si el email ingresado es correcto `,
            text: "llegara un correo electrónico con las instrucciones para cambiar su contraseña!",
            icon: "success",
            button: "Ok!",
          }).then((willDelete) => {
          if (willDelete) {
            return window.location.replace(`${baseURLFront}/LoginPro`);//Esta es la linea que debo revisar
          }
        })

        }else{
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
        }





      })
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
            <LoadingOverlay active={this.state.loading} spinner text='Verificando información...' >
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
                      <h3 className="mb-4">Recodar Password Proveedor</h3>
                      <form onSubmit={this.handleOnSubmit}>
                        <div className="form-group">
                          <label>Usuario</label>
                          <input value={this.email} id="email" name="email" type="text" className="form-control" onChange={this.handleChangeI} />
                          {this.state.errorsForm.email.length > 0 && <span className='error error-class-i'>{this.state.errorsForm.email}</span>}
                        </div>
                        <div className="form-group">
                        </div>
                        <div className="row">
                          <div className="col-12 d-flex">
                            <Link to='/LoginPro' className="btn btn-outline-primary mr-3">Volver</Link>
                            <button  type="submit"  className="btn btn-primary">Recordar  Contraseña</button> <Link to='/Init'> </Link> 
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

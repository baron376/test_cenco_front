import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './GetErrors.css';


export default class GetErrosJs extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return {
        hasError: true,
      };
    }
  
    componentDidCatch(error, errorInfo) {
      console.log('errores' , errorInfo);
      this.setState({hasError: true });
    }
  
    render() {
      console.log('detecta los errores' ,this.state.hasError );
      if (this.state.hasError) {
      // if (true) {
        return <div className='error' ><h3> Ups!<br /> Tu sesion ha expirado. <br />Por favor vuelve a iniciar sesion</h3>
        <Link to='/'> <button type="button" className="btn btn-primary mt-3" data-dismiss="modal">Volver</button> </Link>
        </div>
      }
      return this.props.children; 

    }
}


import React, { Component } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import Cookies from 'js-cookie';
import cookie from 'cookie';
export default class Header extends Component {
    render() {
      document.querySelector('meta[name="csrf-token"]').setAttribute("content",  Cookies.get('XSRF-TOKEN')); 
        return (
            <header>
              <nav className="navbar navbar-light bg-light">
                <div className="container">
                  <div className="row">
                    <div className="col-4">
                      <Link className="navbar-brand" to="/">
                        <img alt='descripcion imagen' src={process.env.PUBLIC_URL + '/dist/img/logo-jumbo-santa-isabel-small.png'} width={150}/>
                      </Link>
                    </div>
                  </div>
                </div>
              </nav>
            </header>
        )
    }
}

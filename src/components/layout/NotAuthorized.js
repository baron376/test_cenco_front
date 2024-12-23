import React, { Component } from 'react'
import env from "react-dotenv";

export default class NotAuthorized extends Component {
    render() {
        return (
            <div>
                <center>
                <img  alt='descripcion de la imagen' src={env.PUBLIC_URL + '/dist/img/notauthorized.png'} width={500}  />
                </center>
            </div>
        )
    }
}

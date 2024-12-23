import React, { Component } from 'react'
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default class ShowIncidencias extends Component {
    
    render() {
        const dataAll = this.props.state;
        return (
            <div className="col-10 tabs cont-height">
            <LoadingOverlay active={dataAll.loadingCreate} spinner text='Cargando contenido...' >
            <h5 className="mt-4 mb-4 font-weight-bold pl-3">Detalles Incidencia </h5>
            <div className="modal-body">
                    <div className="form-group">
                    <div className="col-sm-1"></div>
                        <div className="col-sm-2">Cadena:</div>
                        <div className="col-sm-8">{dataAll.cadenaNombre}</div>
                    </div>
                    <div className="form-group">
                    <div className="col-sm-1"></div>
                        <div className="col-sm-2">Campaña:</div>
                        <div className="col-sm-8">{dataAll.campanaNombre}</div>
                    </div>
                    <div className="form-group">
                    <div className="col-sm-1"></div>
                        <div className="col-sm-2">Proveedor:</div>
                        <div className="col-sm-8">{dataAll.proveedorNombre}</div>
                    </div>
                    <div className="form-group">
                    <div className="col-sm-1"></div>
                        <div className="col-sm-2">Sección:</div>
                        <div className="col-sm-8">{dataAll.seccionNombre}</div>
                    </div>
                    <div className="form-group">
                    <div className="col-sm-1"></div>
                        <div className="col-sm-2">Descripción Incidencia:</div>
                        <div className="col-sm-8">{dataAll.description}</div>
                    </div>

                    <div className="form-group">&emsp; &emsp;</div>
                        <div className="form-group row" >
                        <div className="offset-sm-6 col-6 d-flex justify-content-between">
                        <Link to='/ProveedorIncidencias'> <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Volver</button> </Link>
                        </div>
                        </div>
            </div>
            </LoadingOverlay>
            </div>
        )
    }
}

import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Multiselect } from 'multiselect-react-dropdown';
import 'react-dropzone-uploader/dist/styles.css';
//import Dropzone from 'react-dropzone-uploader';
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../styles/campanas.css';
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import ElementoPOP from './ElementoPOP';
import Dropzone from 'react-dropzone-uploader';


export default class VerCampanaInterna extends Component {
    state = {
        datefrom:''
    }

    render() {
        const dataAll = this.props.state;
        const propsInt = this.props;
        return (            
                <div className="col-10 tabs cont-height">
                    <LoadingOverlay active={dataAll.loading} spinner text='Cargando contenido...' >
                    <h2 className="mt-4 mb-4 font-weight-bold pl-3">Ver Campaña Interna</h2>
                    <form  onSubmit={propsInt.handleSubmitBs}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Cadena:</label>
                                <div className="col-sm-6">
                                    <input type="text" onKeyDown={propsInt.onlyLetter}  value={dataAll.cadena} onChange={propsInt.handleChangeI} className="form-control" id="cadena" name="cadena" readOnly/>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Nombre:</label>
                                <div className="col-sm-6">
                                    <input type="text" onKeyDown={propsInt.onlyLetter}  value={dataAll.nombre} onChange={propsInt.handleChangeI} className="form-control" id="nombre" name="nombre" readOnly/>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Desde:</label>
                                <div className="col-sm-6">
                                    <input type="text" onKeyDown={propsInt.onlyLetter}  value={dataAll.desde} onChange={propsInt.handleChangeI} className="form-control" id="desde" name="desde" readOnly/>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Hasta:</label>
                                <div className="col-sm-6">
                                    <input type="text" onKeyDown={propsInt.onlyLetter}  value={dataAll.hasta} onChange={propsInt.handleChangeI} className="form-control" id="hasta" name="hasta" readOnly/>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Instalador:</label>
                                <div className="col-sm-6">
                                    <input type="text" onKeyDown={propsInt.onlyLetter}  value={dataAll.instalador} onChange={propsInt.handleChangeI} className="form-control" id="instalador" name="instalador" readOnly/>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Sala:</label>
                                <div className="col-sm-6">
                                     <textarea   value={dataAll.salas}  className="form-control" id="salas" name="salas" readOnly>
                                    </textarea>                              
  				</div>
                            </div>

                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Descripción:</label>
                                <div className="col-sm-6">
                                    <input type="text" onKeyDown={propsInt.onlyLetter}  value={dataAll.descripcion} onChange={propsInt.handleChangeI} className="form-control" id="descripcion" name="descripcion" readOnly/>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Material:</label>
                                <div className="col-sm-6">
                                    {!dataAll.changeFile &&
                                        <button type="button" onClick={propsInt.downloadMateriales} className="btn btn-info">Descargar Materiales</button>
                                    }
                                </div>
                            </div>
                            <br/>
                            <br/>
                            <br/>
                            <div className="form-group row" >
                                <div className="">
                                    <Link to='/CampanaInterna'> <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Volver</button> </Link>
                                </div>
                            </div>
                        </div>                   
                    </form>
                    </LoadingOverlay>
                </div>
                

        )
    }
}

import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Multiselect } from 'multiselect-react-dropdown';
import 'react-dropzone-uploader/dist/styles.css';
//import Dropzone from 'react-dropzone-uploader';
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../styles/campanas.css';
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import Dropzone from 'react-dropzone-uploader';

export default class VerCampana extends Component {
    state = {
        datefrom:''
    }

    render() {
        const dataAll = this.props.state;
        const propsInt = this.props;
        const Preview = ({ meta }) => {
        const { name, percent, status } = meta
          return (
            <span style={{ alignSelf: 'flex-start', margin: '10px 3%', fontFamily: 'Helvetica' }}>
              {name}, {Math.round(percent)}%, {status}
            </span>
          )
        }
        return (            
                <div className="col-10 tabs cont-height">
                    <LoadingOverlay active={dataAll.loading} spinner text='Cargando contenido...' >
                    <h2 className="mt-4 mb-4 font-weight-bold pl-3">Propuesta de Campaña {dataAll.name}</h2>
                    <form  onSubmit={propsInt.handleSubmitBs}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Estado:</label>
                                <div className="col-sm-6">
                                  <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.estado_descripcion_estado} />
                                </div>
                            </div> 

                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Etapa:</label>
                                <div className="col-sm-6">
                                  <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.etapa} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Cadena:</label>
                                <div className="col-sm-6">
                                  <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.cadena} />
                                </div>
                            </div> 

                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Nombre:</label>
                                <div className="col-sm-6">
                                  <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.name} />
                                </div>
                            </div> 

                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Vigencia:</label>
                                <div className="col-sm-6">
                                  <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.vigencia} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Proveedor:</label>
                                <div className="col-sm-6">
                                  <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.proveedor} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Sección:</label>
                                <div className="col-sm-6">
                                  <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.seccion} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Zona:</label>
                                <div className="col-sm-6">
                                <textarea readOnly className='form-control' value={dataAll.zonas}></textarea>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Salas:</label>
                                <div className="col-sm-6">
                                  <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.salas} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Descripción:</label>
                                <div className="col-sm-6">
                                <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.descripcion} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Espacio Exhibición:</label>
                                <div className="col-sm-6">
                                <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.espacio_exhibicion} />
                                </div>
                            </div>                       

                            <div className="row mt-3 mb-3" >
                              <div className="col-sm-2">
                                <label className="col-form-label" >Materiales agregados:</label>
                              </div>
                              <div className="col-sm-6">
                                <div className="card-deck">
                                {dataAll.carrucelImage64.map(({ name , medida , type, doc_64, name_archivo, url,extension} , i) =>(
                                  <div className="card">
                                    <div className="card-body">
                                      <h5>{name}</h5>
                                      <p className="card-text">Medidas: {medida}</p>
                                    </div>
                                    <div className="col-sm-8">  <button  title="Descargar archivo" className="btn btn btn-primary actions-icons-t" data-toggle="modal" data-target="#modal-lg"  onClick={() => {propsInt.downloadUrl(url)}}><FontAwesomeIcon icon={faFileDownload}/></button></div>
                                  </div>                                  
                                ))}
                                </div>
                              </div>
                            </div>

                <div className="form-group row ">
                              {/* <label htmlFor className="col-sm-2 col-form-label">Historial de Comentarios:</label> */}
                              <div className="col-sm-2">
                                <label className="col-form-label" >Comentarios Agregados:</label>
                              </div>
                              <div className="col-sm-6 cont-historial">
                                {/* Nuevo (incluye css para estilos lineas del 288 al 298) */}
                                {dataAll.campanaComentariosData.map(({ comentario , fecha , usuario} , i) =>(
                                  <div>
                                    <p className="mb-0"><strong>{usuario}  -  {fecha}</strong></p>
                                    <p>{comentario}</p>
                                    <br></br>
                                  </div>
                                 ))}
                              </div>
                            </div>                          

                            <div className="form-group">&emsp; &emsp;</div>
                            <div className="form-group row" >
                                <div className="">
                                    <Link to='/CampanasProv'> <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Volver</button> </Link>
                                </div>
                            </div>
                            </div>

                      
                            <div> 
                            
                        </div> 
                                          
                    </form>
                    </LoadingOverlay>
                </div>
                

        )
    }
}

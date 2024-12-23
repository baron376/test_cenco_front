import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Multiselect } from 'multiselect-react-dropdown';
import 'react-dropzone-uploader/dist/styles.css';
//import Dropzone from 'react-dropzone-uploader';
import { faFileDownload,faFileAlt } from "@fortawesome/free-solid-svg-icons";
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
                    <h2 className="mt-4 mb-4 font-weight-bold pl-3">Campaña {dataAll.name}</h2>
                    <form  onSubmit={propsInt.handleSubmitBs}>
                        <div className="modal-body">

                            <div className="form-group">
                              <div className="col-sm-5">
                                <label htmlFor="estado" className="col-sm-2 col-form-label"><strong>Estado:</strong></label>
                                  <div className="col-sm-6">
                                    <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.stado_descripcion_estado} />
                                  </div>
                                </div>
                          
                                <div className="col-sm-5">
                                  <label htmlFor="etapa" className="col-sm-2 col-form-label"><strong>Etapa:</strong></label>
                                  <div className="col-sm-6">
                                    <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.etapa} />
                                  </div>
                                </div>
                            </div>

                            <div className="form-group">
                              <div className="col-sm-5">
                                <label htmlFor="cadena" className="col-sm-2 col-form-label"><strong>Cadena:</strong></label>
                                <div className="col-sm-6">
                                  <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.cadena} />
                                </div>
                              </div>

                                <div className="col-sm-5">
                                  <label htmlFor="nombre" className="col-sm-2 col-form-label"><strong>Nombre:</strong></label>
                                  <div className="col-sm-6">
                                    <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.name} />
                                  </div>
                                </div>
                            </div> 

                            <div>
                              {dataAll.fechas && dataAll.fechas.map((fechasGrupo, index) => (
                                <div key={index}>
                                  {fechasGrupo && fechasGrupo.map((fecha, subIndex) => (
                                    <div className="form-group row" key={subIndex}>
                                      <div className="col-sm-5">
                                        <label htmlFor={`desde_${subIndex}`} className="col-sm-2 col-form-label"><strong>Desde:</strong></label>  
                                        <div className="col-sm-6">
                                          <input type="text" id={`desde_${subIndex}`} readOnly className="form-control-plaintext" defaultValue={fecha.dateFrom} />
                                        </div>
                                      </div>

                                      <div className="col-sm-5">
                                        <label htmlFor={`hasta_${subIndex}`} className="col-sm-2 col-form-label"><strong>Hasta:</strong></label>  
                                        <div className="col-sm-6">
                                          <input type="text" id={`hasta_${subIndex}`} readOnly className="form-control-plaintext" defaultValue={fecha.dateTo} />
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>


                            <div className="form-group">
                              <div className="col-sm-5">
                                  <label htmlFor="proveedor" className="col-sm-2 col-form-label"><strong>Proveedor:</strong></label>
                                  <div className="col-sm-6">
                                    <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.proveedor} />
                                  </div>
                              </div>

                              <div className="col-sm-5">
                                <label htmlFor="formato" className="col-sm-2 col-form-label"><strong>Formato:</strong></label>
                                <div className="col-sm-6">
                                  <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.formato} />
                                </div>
                              </div>
                            </div>

                            <div className="form-group">
                              <div className="col-sm-5">  
                                <label htmlFor="zona" className="col-sm-2 col-form-label"><strong>Zona:</strong></label>
                                <div className="col-sm-10">
                                  <textarea readOnly className='form-control' value={dataAll.zonas}></textarea>
                                </div>
                              </div>

                              <div className="col-sm-5">
                                <label htmlFor="local" className="col-sm-2 col-form-label"><strong>Local:</strong></label>
                                <div className="col-sm-10">  
                                  <textarea readOnly className='form-control' value={dataAll.salas}></textarea>
                                </div>
                              </div>
                            </div>

                            <div className="form-group">
                              <div className="col-sm-5">
                                <label htmlFor="seccion" className="col-sm-2 col-form-label"><strong>Gerencia:</strong></label>
                                <div className="col-sm-6"> 
                                  <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.espacio} />
                                </div>
                              </div>

                              <div className="col-sm-5">  
                                <label htmlFor="gerencia" className="col-sm-5 col-form-label"><strong>Sección:</strong></label>
                                <div className="col-sm-6">
                                  <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.seccion} />
                                </div>
                              </div>
                            </div>

                            <div className="form-group">
                              <div className="col-sm-5">
                                <label htmlFor="visibilidad_campana" className="col-sm-5 col-form-label"><strong>Visibilidad de Campana:</strong></label>
                                <div className="col-sm-6"> 
                                  <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.visibilidad} />
                                </div>
                              </div>  
                                                          
                              <div className="col-sm-5">  
                                <label htmlFor="tp_campana" className="col-sm-5 col-form-label"><strong>Tipo de Campana:</strong></label>
                                <div className="col-sm-6"> 
                                  <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.tp_campana} />
                                </div>
                              </div>
                            </div>

                            <div className="form-group">
                              <div className="col-sm-5">  
                                <label htmlFor="elementos_campana" className="col-sm-5 col-form-label"><strong>Elementos de Campana:</strong></label>
                                <div className="col-sm-10">  
                                  <textarea readOnly className='form-control' value={dataAll.elementos}></textarea>
                                </div>
                              </div>
                            </div>

                            <div className="form-group">
                              <div className="col-sm-5"> 
                              <label htmlFor="filenameMaterial" className="col-form-label"><strong>Material</strong></label> 
                                {dataAll.filenameMaterial && (   
                                  <div>
                                    <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '15px', fontSize: '30px' }} />
                                    <span onClick={() => {propsInt.downloadUrl(dataAll.filenameMaterial)}} style={{cursor: 'pointer'}}>
                                        {dataAll.filenameMaterial.split('/').pop()}
                                    </span>
                                    <hr style={{ borderColor: 'black' }} />
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="form-group">
                                <div className="col-sm-5">
                                    <label className="col-sm-5 col-form-label"><strong>Comentarios Agregados:</strong></label>
                                    <div className="col-sm-10 cont-historial">
                                    {dataAll.campanaComentariosData.map(({ comentario , fecha , usuario} , i) =>(
                                        <div key={i}>
                                        <p className="mb-0"><strong>{usuario}  -  {fecha}</strong></p>
                                        <p>{comentario}</p>
                                        <br></br>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div> 
                          <div className="form-group">&emsp; &emsp;</div>
                          <div className="form-group row" >
                              <div className="">
                                  <Link to='/CampanasProvNew'> <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Volver</button> </Link>
                              </div>
                          </div>
                        </div> 
                                          
                    </form>
                </div>
                

        )
    }
}

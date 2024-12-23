import React, { Component } from 'react'
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {faFilePdf , faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import {faFilePdf,faFileDownload } from "@fortawesome/free-solid-svg-icons";
export default class GestionarCampanaPromotoras extends Component {
    render() {
        const dataAll = this.props.state;
        const propsInt = this.props;

        return (
            <div className="col-10 tabs cont-height">
                    <LoadingOverlay active={dataAll.loading} spinner text='Cargando contenido...' >
                    <h5 className="mt-4 mb-4 font-weight-bold pl-3">Gestión de Campaña Promotora </h5>
                    <div className="modal-body">
                            <div className="form-group">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-2">Nombre:</div>
                                <div className="col-sm-8">{dataAll.nombreCampana}</div>
                            </div>
                            <div className="form-group">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-2">Cadena:</div>
                                <div className="col-sm-8">{dataAll.cadenaCampana}</div>
                            </div>
                            <div className="form-group">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-2">Vigencia :</div>
                                <div className="col-sm-8">desde : {dataAll.dateInitCampana} - hasta : {dataAll.dateFinishCampana} </div>
                            </div>
                            <div className="form-group">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-2">Proveedor:</div>
                                <div className="col-sm-8">{dataAll.proveedorCampana}</div>
                            </div>
                            <div className="form-group">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-2">Sección:</div>
                                <div className="col-sm-8">{dataAll.seccionCampana}</div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-1"></div>
                                <div className="col-sm-2">Salas:</div>
                                <div className="col-sm-8">
                                    <ul>
                                        {dataAll.listaSalas.map(({ id , nombre_sap , cdg_local} , i) =>(
                                            <li key={id}>
                                                {cdg_local}-{nombre_sap}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="form-group">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-2">Turno:</div>
                                <div className="col-sm-8">{dataAll.turnoCampana}</div>
                            </div>
                            <div className="form-group">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-2">Entrega Regalo:</div>
                                <div className="col-sm-8">{dataAll.entregaRegalo}</div>
                            </div>
                            <div className="form-group">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-2">Degustación:</div>
                                <div className="col-sm-8">{dataAll.degustacion}</div>
                            </div>
                            <div className="form-group">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-2">Mueble:</div>
                                <div className="col-sm-8">{dataAll.mueble}</div>
                            </div>
                            <div className="form-group">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-2">Concurso:</div>
                                <div className="col-sm-8">{dataAll.consurso}</div>
                            </div>
                            {(dataAll.consurso === 'SI') &&
                            <div className="form-group">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-2">Bases Legales:</div>
                                <div className="col-sm-8">  <button  title="Descargar Bases Legales" className="btn btn btn-danger actions-icons-t" data-toggle="modal" data-target="#modal-lg"  onClick={() => {propsInt.downloadFaldon()}}><FontAwesomeIcon icon={faFilePdf}/></button></div>
                            </div>
                            }
                            <div className="form-group">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-2">Descripción:</div>
                                <div className="col-sm-8">{dataAll.descripcion}</div>
                            </div>
                        </div>
                        <div className="form-group row ">
                              {/* <label htmlFor className="col-sm-2 col-form-label">Historial de Comentarios:</label> */}
                              <div className="col-sm-1"></div>
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
                        <div className="row mt-3 mb-3" >
                        <div className="col-sm-1"></div>
                              <div className="col-sm-2">
                                <label className="col-form-label" >Materiales agregados:</label>
                              </div>
                              {/* <div className="col-sm-6">
                                <div className="card-deck">
                                {dataAll.carrucelImage64.map(({ name , medida , type, doc_64} , i) =>(
                                  <div className="card">
                                    <div className="card-body">
                                      <h5>{name}</h5>
                                      <p className="card-text">Medidas: {medida}</p>
                                    </div>
                                    <img src={`data:${type};base64,${doc_64}`} className="card-img-top" alt="..." />
                                  </div>                                  
                                ))}
                                </div>
                              </div> */}
                            </div>
                            <div className="row mt-3 mb-3" >
                        <div className="col-sm-1"></div>
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
                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Comentario:</label>
                                <div className="col-sm-6">
                                    <input type="text"  value={dataAll.comentario_gestion} onChange={propsInt.handleChangeI} className="form-control" id="comentario_gestion" name="comentario_gestion" placeholder="Ingrese un Comentario" />
                                    {dataAll.errorsForm.comentario_gestion.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.comentario_gestion}</span>}
                                </div>
                            </div>
                            
                              
                            <div className="form-group">&emsp; &emsp;</div>
                          
                            <div className="">
                              <button type="button" onClick={() => {propsInt.AprobeCampana(dataAll.idCampanaPromotoraToEdit)}} className="btn btn-primary">Aprobar</button>
                              <button type="button" onClick={() => {propsInt.RechazarCampana(dataAll.idCampanaPromotoraToEdit)}} className="btn btn-warning">Rechazar</button>
                              <Link to='/CampanasPromotoras'><button type="button" className="btn btn-secondary" data-dismiss="modal">Volver</button></Link>
                            </div>   
                    </LoadingOverlay>
            </div>
        )
    }
}

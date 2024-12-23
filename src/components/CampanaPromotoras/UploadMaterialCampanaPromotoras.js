import React, { Component } from 'react'
import LoadingOverlay from 'react-loading-overlay';
import MaterialPop from './MaterialPop';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class UploadMaterialCampanaPromotoras extends Component {
    render() {
        const dataAll = this.props.state;
        const propsInt = this.props;
        return (
            <div className="col-10 tabs cont-height">
                    <LoadingOverlay active={dataAll.loading} spinner text='Cargando contenido...' >
                    <h5 className="mt-4 mb-4 font-weight-bold pl-3">Subir mueble Campaña Promotora </h5>
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
                        <MaterialPop
                            stateFather={propsInt.state}
                            isOpen={dataAll.modalIsopen} 
                            onClose={propsInt.onCloseModal}
                            handleSubmitBsMateriales = {propsInt.handleSubmitBsMateriales} 
                            modalTitle = {dataAll.modalTitle} 
                            getUploadParams = {propsInt.getUploadParams} 
                            handleChangeStatus = {propsInt.handleChangeStatus} 
                            handleSubmitFile = {propsInt.handleSubmitFile} 
                            handleChangeI = {propsInt.handleChangeI}
                            handleSubmitBsModal = {propsInt.handleSubmitBsModal}
                            clearVarModal = {propsInt.clearVarModal}
                          >                            
                          </MaterialPop>
                        <button onClick={propsInt.createMaterial.bind(this, 0)} type="button" data-toggle="modal" data-target="#modal-lg" className="btn btn-primary">+ Agregar material POP</button>
                        <span className="ml-2 text-danger font-weight-bold">¡Recuerda! Una vez aprobada la campaña debes implementar en el packaging de las degustaciones y sampling el código QR de la autorización.</span>
                    
                        <div className="row mt-3 mb-3" >
                              <div className="col-sm-2">
                                <label className="col-form-label" >Materiales agregados:</label>
                              </div>
                              <div className="col-sm-6">
                                    <div className="card-deck">
                                        {dataAll.carrucelImage64.map(({ name , medida , type, cdc64} , i) =>(
                                        <div className="card">
                                            <div className="card-body">
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true" onClick={() => {propsInt.InactivestaImage(i)}}>X</span>
                                                </button>
                                                <h5>{name}</h5>
                                                <p className="card-text">Medidas: {medida}</p>
                                            </div>
                                        </div>))}
                                    </div>
                                    <div className="card-deck">
                                        {dataAll.localImgs.map(({ name , medida , id, type, cdc64} , i) =>(
                                        <div className="card">
                                            <div className="card-body">
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true" onClick={() => {propsInt.RemoveImg(id, i)}}>X</span>
                                                </button>
                                                <h5>{name}</h5>
                                                <p className="card-text">Medidas: {medida}</p>
                                            </div>
                                        </div>))}
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
                            <form  onSubmit={propsInt.handleSubmitBs}>  
                            <div className="form-group">
                                <label for="" className="col-sm-2 col-form-label">Comentarios:</label>
                                <div className="col-sm-6">
                                  <input type="textarea" value={dataAll.comentario} onChange={propsInt.handleChangeI} className="form-control" id="comentario" name="comentario" placeholder="Ingrese Comentario" />
                                  {dataAll.errorsExterno.comentario.length > 0 && <span className='error error-class-i'>{dataAll.errorsExterno.comentario}</span>}
                                  {dataAll.errorsExterno.materiales.length > 0 && <span className='error error-class-i'>{dataAll.errorsExterno.materiales}</span>}
                                </div>
                            </div>
                            
                        <div className="form-group">&emsp; &emsp;</div>
                            <div className="form-group row" >
                                <div className="">
                                    <button type="submit" className="btn btn-primary">Guardar</button>
                                    <Link to='/CampanasPromotoras'> <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Volver</button> </Link>
                                </div>
                            </div>               
                            </form>   
                    </LoadingOverlay>
            </div>
        )
    }
}

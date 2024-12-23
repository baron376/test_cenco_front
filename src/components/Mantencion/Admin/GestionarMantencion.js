import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Multiselect } from 'multiselect-react-dropdown';
import 'react-dropzone-uploader/dist/styles.css';
//import Dropzone from 'react-dropzone-uploader';
import { faCalendar, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../styles/campanas.css';
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import ElementoPOP from './ElementoPOP';
import {hasPermission} from '../../../util/auth';

export default class GestionarMantencion extends Component {
    state = {
        datefrom:''
    }

    render() {
        const dataAll = this.props.state;
        const propsInt = this.props;
        return (            
                <div className="col-10 tabs cont-height">
                    <LoadingOverlay active={dataAll.loading} spinner text='Cargando contenido...' >
                    <h2 className="mt-4 mb-4 font-weight-bold pl-3">Gestionar Mantención</h2>
                    <form  onSubmit={propsInt.handleSubmitBs}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Cadena:</label>
                                <div className="col-sm-6">
                                    <input type="text" onKeyDown={propsInt.onlyLetter}  value={dataAll.cadena} onChange={propsInt.handleChangeI} className="form-control" id="asunto" name="asunto" readOnly/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Asunto:</label>
                                <div className="col-sm-6">
                                    <input type="text" onKeyDown={propsInt.onlyLetter}  value={dataAll.asunto} onChange={propsInt.handleChangeI} className="form-control" id="asunto" name="asunto" readOnly/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">sala:</label>
                                <div className="col-sm-6">
                                    <input type="text" onKeyDown={propsInt.onlyLetter}  value={dataAll.sala} onChange={propsInt.handleChangeI} className="form-control" id="asunto" name="asunto" readOnly/>
                                </div>
                            </div>
                            <div className="orm-group row" >
                                <div className="col-sm-2">
                                    <label className="col-form-label" ></label>
                                </div>
                                <div className="col-sm-6">
                            <div className="card-deck">
                                {dataAll.localImgs.map(({ nombre, id, medida, url }, i) => {
                                    const isImage = /\.(jpe?g|png|gif|bmp)$/i.test(nombre);
                                    return (
                                        <div className="card">
                                            <div className="card-body">
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"></button>
                                                <h5>{nombre}</h5>
                                                <p className="card-text">Medidas: {medida}</p>
                                            </div>
                                            {isImage ? (
                                                <a href={`${url}`} target="_blank">
                                                    <img src={`${url}`} className="card-img-top" alt="Descargar" />
                                                    <FontAwesomeIcon icon={faDownload} />
                                                </a>
                                            ) : (
                                                <a href={`${url}`} target="_blank">
                                                    Descargar
                                                    <FontAwesomeIcon icon={faDownload} />
                                                </a>
                                            )}
                                        </div>
                                    );
                                })}
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
                            {(dataAll.estado == 2 && hasPermission([713])) && 
                                <div className="form-group">
                                    <label htmlFor className="col-sm-2 col-form-label">Fecha implementación: </label>
                                    <div className="col-sm-8">
                                        <DatePicker className="input-datapiker" dateFormat="dd/MM/yyyy" selected={dataAll.fechaImplementacion.getTime() !== 0 ? dataAll.fechaImplementacion : new Date()} onChange={(date) => propsInt.setDate(date)} > </DatePicker>
                                        &emsp;<FontAwesomeIcon icon={faCalendar} />
                                    </div>
                                    {dataAll.errorsForm.fechaImplementacion.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.fechaImplementacion}</span>}
                                </div>
                            }
                            {(dataAll.estado == 2 && hasPermission([713])) &&
                                <div className="form-group">
                                    <label for="" className="col-sm-2 col-form-label">Monto cotización:</label>
                                    <div className="col-sm-6">
                                        <input type="number" value={dataAll.montoCootizacion} onChange={propsInt.handleChangeI} className="form-control" id="montoCootizacion" name="montoCootizacion" placeholder="Monto de cotización" />
                                        {dataAll.errorsForm.montoCootizacion.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.montoCootizacion}</span>}
                                    </div>
                                </div>
                            }
                            {(dataAll.estado == 2 && hasPermission([713])) &&
                                <div className="form-group">
                                    <label htmlFor className="col-sm-2 col-form-label">Proveedor:</label>
                                    <div className="col-sm-6">
                                        <Multiselect
                                            singleSelect
                                            options={dataAll.listaProveedores} 
                                            onSelect={propsInt.onSelectProveedor} 
                                            onRemove={propsInt.onRemovProveedor}
                                            selectedValues={dataAll.listProveedorSeleted} 
                                            displayValue="nombre"
                                        />
                                    </div>
                                    {dataAll.errorsForm.listProveedorSeleted.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.listProveedorSeleted}</span>}
                                </div>
                            }
                            <div className="form-group">
                                <label for="" className="col-sm-2 col-form-label">Comentarios:</label>
                                <div className="col-sm-6">
                                  <input type="textarea" value={dataAll.comentario} onChange={propsInt.handleChangeI} className="form-control" id="comentario" name="comentario" placeholder="Ingrese Comentario" />
                                  {dataAll.errorsForm.comentario.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.comentario}</span>}
                                </div>
                            </div>
                            <br/>
                            <div className="form-group row" >
                                <div className="">
                                    {(dataAll.estado == 1 && hasPermission([714])) && <button type="button" onClick={() => {propsInt.LiberarMantencion(dataAll.id_campana)}} className="btn btn-primary">Liberar</button>}
                                    {(dataAll.estado == 1 && hasPermission([714])) && <button type="button" onClick={() => {propsInt.DevolverMantencion(dataAll.id_campana)}} className="btn btn-warning">Devolver</button>}
                                    {(dataAll.estado == 2 && hasPermission([713])) && <button type="button" onClick={() => {propsInt.AprobeMantencion(dataAll.id_campana)}} className="btn btn-primary">Aprobar</button>}
                                    {(dataAll.estado == 2 && hasPermission([713])) && <button type="button" onClick={() => {propsInt.RechazarMantencion(dataAll.id_campana)}} className="btn btn-warning">Rechazar</button>}
                                    {(dataAll.estado == 5 && hasPermission([715])) && <button type="button" onClick={() => {propsInt.FinalizarMantencion(dataAll.id_campana)}} className="btn btn-primary">Finalizar</button>}
                                    <Link to='/Mantencion'> <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Volver</button> </Link>
                                </div>
                            </div>
                        </div>                   
                    </form>
                    </LoadingOverlay>
                        <ElementoPOP
                        stateFather={propsInt.state}
                        isOpen={dataAll.modalIsopen} 
                        onClose={propsInt.onCloseModal}
                        handleSubmitBsMateriales = {propsInt.handleSubmitBsMateriales} 
                        modalTitle = {propsInt.modalTitle} 
                        getUploadParams = {propsInt.getUploadParams} 
                        handleChangeStatus = {propsInt.handleChangeStatus} 
                        handleSubmitFile = {propsInt.handleSubmitFile} 
                        handleChangeI = {propsInt.handleChangeI}
                        handleSubmitBsModal = {propsInt.handleSubmitBsModal}
                        clearVarModal = {propsInt.clearVarModal}
                        solicitarMedidas = {propsInt.solicitarMedidas}
                        handleCheckboxChange = {propsInt.handleCheckboxChange}
                    >                            
                    </ElementoPOP>
                </div>
        )
    }
}

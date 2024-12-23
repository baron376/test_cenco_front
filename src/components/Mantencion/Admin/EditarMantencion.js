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

export default class EditarMantencion extends Component {
    state = {
        datefrom:''
    }

    render() {
        const dataAll = this.props.state;
        const propsInt = this.props;
        return (            
                <div className="col-10 tabs cont-height">
                    <LoadingOverlay active={dataAll.loading} spinner text='Cargando contenido...' >
                    <h2 className="mt-4 mb-4 font-weight-bold pl-3">Editar Mantención</h2>
                    <form  onSubmit={propsInt.handleSubmitBs}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">cadena:</label>
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
                            <div className="form-group row" >
                                <label htmlFor className="col-sm-2 col-form-label"></label>
                                <div className="col-sm-6 col-form-label">
                                    <button onClick={propsInt.createElement.bind(this, 0)} type="button" data-toggle="modal" data-target="#modal-lg" className="btn btn-primary">+ Completar información</button>
                                    {dataAll.errorsForm.objeto.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.objeto}</span>}
                                </div>
                            </div>
                            <div className="orm-group row" >
                                <div className="col-sm-2">
                                    <label className="col-form-label" ></label>
                                </div>
                                <div className="col-sm-6">
                                    <div className="card-deck">
                                        {dataAll.localImgs.map(({ nombre , id,medida, url } , i) =>(
                                            <div className="card">
                                                <div className="card-body">
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true" onClick={() => {propsInt.RemoveImg(id,i)}}>X</span>
                                                    </button>
                                                    <h5>{nombre}</h5>
                                                    <p className="card-text">Medidas: {medida}</p>
                                                </div>
                                            <img src={`${url}`} className="card-img-top" alt="..." />
                                        </div>))}
                                        {dataAll.carrucelImage64.map(({ name , medida , type, cdc64} , i) =>(
                                        <div className="card">
                                            <div className="card-body">
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true" onClick={() => {propsInt.InactivestaImage(i)}}>X</span>
                                                </button>
                                                <h5>{name}</h5>
                                                <p className="card-text">Medidas: {medida}</p>
                                            </div>
                                            <img src={`data:${type};base64,${cdc64}`} className="card-img-top" alt="..." />
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
                                    <button type="submit" className="btn btn-primary">Enviar</button>
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

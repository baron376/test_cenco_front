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

export default class CreatedMantencion extends Component {
    state = {
        datefrom:''
    }

    render() {
        const dataAll = this.props.state;
        const propsInt = this.props;
        return (            
                <div className="col-10 tabs cont-height">
                    <LoadingOverlay active={dataAll.loading} spinner text='Cargando contenido...' >
                    <h2 className="mt-4 mb-4 font-weight-bold pl-3">Crear Mantención</h2>
                    <form  onSubmit={propsInt.handleSubmitBs}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Cadena:</label>
                                <div className="col-sm-6">
                                    {dataAll.listaCadenasCreate.length > 1 && 
                                        <div className="form-check form-inline pt-1 pl-0" onChange={propsInt.handleCheckChieldCadena}>
                                            {dataAll.listaCadenasCreate.map(({ id , nombre , isChecked} , i) =>(
                                                <div className="form-inline">
                                                <input  name='cadena' id='cadena' className="form-check-input" type="radio" value={id} isChecked/>
                                                
                                                <label className="form-check-label" htmlFor>{nombre}</label>
                                                </div>
                                            ))}
                                        </div>
                                    }
                                    {dataAll.listaCadenasCreate.length == 1 && 
                                        <div className="form-check form-inline pt-1 pl-0" onChange={propsInt.handleCheckChieldCadena}>
                                            {dataAll.listaCadenasCreate.map(({ id , nombre , isChecked} , i) =>(
                                                <div className="form-inline">
                                                    <label className="form-check-label" htmlFor>{nombre}</label>
                                                </div>
                                            ))}
                                        </div>
                                    }
                                    {dataAll.errorsForm.cadena.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.cadena}</span>}
                                </div>
                            </div>  
                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Asunto:</label>
                                <div className="col-sm-6">
                                    <input type="text" onKeyDown={propsInt.onlyLetter}  value={dataAll.asunto} onChange={propsInt.handleChangeI} className="form-control" id="asunto" name="asunto" placeholder="Ingrese Asunto" />
                                </div>
                                {dataAll.errorsForm.asunto.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.asunto}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Zona:</label>
                                { (dataAll.listaZonas.length > 1 || dataAll.listaZonas.length < 1) && 
                                    <div className="col-sm-6">
                                        <Multiselect
                                            singleSelect
                                            options={dataAll.listaZonas} 
                                            onSelect={propsInt.onSelectZonas} 
                                            onRemove={propsInt.onRemovZonas}
                                            selectedValues={dataAll.listZonasSeleted} 
                                            displayValue="nombre"
                                        />
                                    </div>
                                }
                                {dataAll.listaZonas.length == 1 && 
                                    <div className="col-sm-6">
                                        <div className="form-check form-inline pt-1 pl-0 row" onChange={propsInt.handleCheckChieldCadena}>
                                            {dataAll.listaZonas.map(({ id , nombre , isChecked} , i) =>(
                                                <div className="form-inline col-sm-6">
                                                    <label className="form-check-label" htmlFor>{nombre}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                }
                                {dataAll.errorsForm.zona.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.zona}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Sala:</label>
                                {(dataAll.listaSalas.length > 1 || dataAll.listaSalas.length < 1) && 
                                    <div className="col-sm-6">
                                        <Multiselect
                                            singleSelect
                                            options={dataAll.listaSalas} 
                                            onSelect={propsInt.onSelectSalas} 
                                            onRemove={propsInt.onRemovSalas}
                                            selectedValues={dataAll.listSalasSeleted} 
                                            displayValue="display_nombre_sap"
                                        />
                                    </div>
                                }
                                {dataAll.listaSalas.length == 1 && 
                                    <div className="col-sm-6">
                                        <div className="form-check form-inline pt-1 pl-0 row" onChange={propsInt.handleCheckChieldCadena}>
                                            {dataAll.listaSalas.map(({ id , display_nombre_sap , isChecked} , i) =>(
                                                <div className="form-inline col-sm-6">
                                                    <label className="form-check-label" htmlFor>{display_nombre_sap}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                }
                                {dataAll.errorsForm.salas.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.salas}</span>}
                            </div>
                            <div className="form-group" >
                                <div className="col-sm-6">
                                    <button onClick={propsInt.createElement.bind(this, 0)} type="button" data-toggle="modal" data-target="#modal-lg" className="btn btn-primary">+ Ingresar Solicitud</button>
                                    {dataAll.errorsForm.objeto.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.objeto}</span>}
                                </div>
                            </div>
                            <div className="orm-group row" >
                                <div className="col-sm-2">
                                    <label className="col-form-label" ></label>
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
                                            <img src={`data:${type};base64,${cdc64}`} className="card-img-top" alt="..." />
                                        </div>))}
                                    </div>
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
                                    <Link to='/Mantencion'> <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Cancelar</button> </Link>
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

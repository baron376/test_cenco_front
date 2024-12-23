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

export default class RevisarCampanaInterna extends Component {
    state = {
        datefrom:''
    }

    render() {
        const dataAll = this.props.state;
        const propsInt = this.props;
        return (            
                <div className="col-10 tabs cont-height">
                    <LoadingOverlay active={dataAll.loading} spinner text='Cargando contenido...' >
                    <h2 className="mt-4 mb-4 font-weight-bold pl-3">Revisar Campaña Interna</h2>
                    <form  onSubmit={propsInt.handleSubmitBs}>
                        <div className="modal-body">
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
                                            {dataAll.listaSalas.map(({ id , nombre_sap , isChecked} , i) =>(
                                                <div className="form-inline col-sm-6">
                                                    <label className="form-check-label" htmlFor>{nombre_sap}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                }
                                {dataAll.errorsForm.salas.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.salas}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Comentario:</label>
                                <div className="col-sm-6">
                                    <input type="text" onKeyDown={propsInt.onlyLetter}  value={dataAll.comentario} onChange={propsInt.handleChangeI} className="form-control" id="comentario" name="comentario" placeholder="Ingrese un comentario" />
                                </div>
                                {dataAll.errorsForm.comentario.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.comentario}</span>}
                            </div>
                            <div className="form-group row" >
                                <label htmlFor className="col-sm-2 col-form-label"></label>
                                <div className="col-sm-6 col-form-label">
                                    <button onClick={propsInt.createElement.bind(this, 0)} type="button" data-toggle="modal" data-target="#modal-lg" className="btn btn-primary">+ Agregar material POP</button>
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
                                        </div>))}
                                    </div>
                                    <div className="card-deck">
                                        {dataAll.localImgs.map(({ name , medida , type, cdc64} , i) =>(
                                        <div className="card">
                                            <div className="card-body">
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true" onClick={() => {propsInt.RemoveImg(i)}}>X</span>
                                                </button>
                                                <h5>{name}</h5>
                                                <p className="card-text">Medidas: {medida}</p>
                                            </div>
                                        </div>))}
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="form-group row" >
                                <div className="">
                                    <button type="submit" className="btn btn-primary">Guardar</button>
                                    <Link to='/CampanaInterna'> <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Volver</button> </Link>
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
                    >                            
                    </ElementoPOP>
                </div>
        )
    }
}

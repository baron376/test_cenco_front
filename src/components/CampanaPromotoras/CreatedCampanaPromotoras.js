import React, { Component } from 'react'
import LoadingOverlay from 'react-loading-overlay';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Multiselect } from 'multiselect-react-dropdown';
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import swal from 'sweetalert';
import Dropzone from 'react-dropzone-uploader';

export default class CreatedCampanaPromotoras extends Component {
    render() {
        const dataAll = this.props.state;
        const propsInt = this.props;
        return (
            <div className="col-10 tabs cont-height">
                    <LoadingOverlay active={dataAll.loading} spinner text='Cargando contenido...' >
                    <LoadingOverlay active={dataAll.loadingCreated} spinner text='Validando Archivo ......' >
                    <h2 className="mt-4 mb-4 font-weight-bold pl-3">Crear Campaña Promotora</h2>
                    <form onKeyDown={propsInt.handleKeyDown}  onSubmit={propsInt.handleSubmitBs}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor className="col-sm-2 col-form-label">Cadena:</label>
                            <div className="col-sm-10">
                            <div className="form-check form-inline pt-1 pl-0" onChange={propsInt.handleCheckChieldElement}>
                                {dataAll.listaCadenasCreate.map(({ id , nombre , isChecked} , i) =>(
                                    <div className="form-check col-sm-2">
                                    <input  name='cadena' id='cadena' className="form-check-input" type="radio" value={id}/>
                                     
                                    <label className="form-check-label" htmlFor>{nombre}</label>
                                    </div>
                                ))}
                            </div>
                            {dataAll.errorsForm.cadenas.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.cadenas}</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor className="col-sm-2 col-form-label">Nombre Campana:</label>
                            <div className="col-sm-6">
                            <input type="text"   value={dataAll.name} onChange={propsInt.handleChangeI} className="form-control" id="name" name="name" placeholder="Ingrese Nombre de la Campaña" />
                            {dataAll.errorsForm.name.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.name}</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor className="col-sm-2 col-form-label">Desde:</label>
                            <div className="col-sm-3">
                            <DatePicker className="input-datapiker" dateFormat="dd/MM/yyyy" selected={dataAll.dateFrom} onChange={(date) => propsInt.setDateFrom(date)} > </DatePicker>
                            &emsp;<FontAwesomeIcon icon={faCalendar} />
                            </div>
                            {dataAll.errorsForm.datefrom.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.datefrom}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor className="col-sm-2 col-form-label">Hasta:</label>
                            <div className="col-sm-3">
                            <DatePicker className="input-datapiker" dateFormat="dd/MM/yyyy" selected={dataAll.dateTo} onChange={(date) => propsInt.setDateTo(date)} > </DatePicker>
                            &emsp;<FontAwesomeIcon icon={faCalendar} />
                            </div>
                            {dataAll.errorsForm.dateto.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.dateto}</span>}
                        </div>
                        <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Proveedor:</label>
                                <div className="col-sm-6">
                                    <Multiselect
                                        selectionLimit={1}
                                        options={dataAll.listaProveedores} 
                                        onSelect={propsInt.onSelectProveedor} 
                                        onRemove={propsInt.onRemovProveedor}
                                        selectedValues={dataAll.listProveedorSeleted} 
                                        displayValue="nombre" 
                                    />
                                </div>
                                {dataAll.errorsForm.proveedor.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.proveedor}</span>}
                            </div>
                        <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Sección:</label>
                                <div className="col-sm-6">
                                    <Multiselect
                                        selectionLimit={1}
                                        options={dataAll.listaSecciones} 
                                        onSelect={propsInt.onSelectSecciones} 
                                        onRemove={propsInt.onRemovSecciones}
                                        selectedValues={dataAll.listSeccionesSeleted} 
                                        displayValue="nombre"
                                    />
                                </div>
                                {dataAll.errorsForm.seccion.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.seccion}</span>}
                        </div>
                        <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Salas:</label>
                                <div className="col-sm-6">
                                    <Multiselect
                                        options={dataAll.listaSalas} 
                                        onSelect={propsInt.onSelectSalas} 
                                        onRemove={propsInt.onRemovSalas}
                                        selectedValues={dataAll.listSalasSeleted} 
                                        displayValue="display_nombre_sap"
                                    />
                                </div>
                                {dataAll.errorsForm.sala.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.sala}</span>}
                            </div>
                            <div className="form-group">
                            <label htmlFor className="col-sm-2 col-form-label">Turnos:</label>
                            <div className="col-sm-10">
                            <div className="form-check form-inline pt-1 pl-0 row" onChange={propsInt.handleCheckChieldElementTurnos}>
                                {dataAll.listaTurnosCreate.map(({ id , nombre , isChecked} , i) =>(
                                    <div className="form-inline col-sm-6">
                                    <input  name='turno' id='turno' className="form-check-input" type="radio" value={id}/>
                                    <label className="form-check-label" htmlFor>{nombre}</label>
                                    </div>
                                ))}
                            </div>
                            {dataAll.errorsForm.turnos.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.turnos}</span>}
                            </div>
                            </div>

                            <div className="form-group">
                            <label htmlFor className="col-sm-2 col-form-label">Entrega Regalo:</label>
                            <div className="col-sm-10">
                            <div className="form-check form-inline pt-1 pl-0 row" onChange={propsInt.handleCheckChieldElementEntregaRegalo}>
                                {dataAll.lista10.map(({ id , nombre , isChecked} , i) =>(
                                    <div className="form-inline col-sm-6">
                                    <input  name='entrega' id='entrega' className="form-check-input" type="radio" value={id}/>
                                    <label className="form-check-label" htmlFor>{nombre}</label>
                                    </div>
                                ))}
                            </div>
                            {dataAll.errorsForm.entrega.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.entrega}</span>}
                            </div>
                            </div>

                            <div className="form-group">
                            <label htmlFor className="col-sm-2 col-form-label">Degustación:</label>
                            <div className="col-sm-10">
                            <div className="form-check form-inline pt-1 pl-0 row" onChange={propsInt.handleCheckChieldElementDegustacion}>
                                {dataAll.lista10.map(({ id , nombre , isChecked} , i) =>(
                                    <div className="form-inline col-sm-6">
                                    <input  name='degustacion' id='degustacion' className="form-check-input" type="radio" value={id}/>
                                    <label className="form-check-label" htmlFor>{nombre}</label>
                                    </div>
                                ))}
                            </div>
                            {dataAll.errorsForm.degustacion.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.degustacion}</span>}
                            </div>
                            </div>

                            <div className="form-group">
                            <label htmlFor className="col-sm-2 col-form-label">Mueble Externo:</label>
                            <div className="col-sm-10">
                            <div className="form-check form-inline pt-1 pl-0 row" onChange={propsInt.handleCheckChieldElementMueble}>
                                {dataAll.lista10.map(({ id , nombre , isChecked} , i) =>(
                                    <div className="form-inline col-sm-6">
                                    <input  name='mueble' id='mueble' className="form-check-input" type="radio" value={id}/>
                                    <label className="form-check-label" htmlFor>{nombre}</label>
                                    </div>
                                ))}
                            </div>
                            {dataAll.errorsForm.mueble.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.mueble}</span>}
                            </div>
                            </div>

                            <div className="form-group">
                            <label htmlFor className="col-sm-2 col-form-label">Concurso Asociado:</label>
                            <div className="col-sm-10">
                            <div className="form-check form-inline pt-1 pl-0 row" onChange={propsInt.handleCheckChieldElementConcurso}>
                                {dataAll.lista10.map(({ id , nombre , isChecked} , i) =>(
                                    <div className="form-inline col-sm-6">
                                    <input  name='consurso' id='consurso' className="form-check-input" type="radio" value={id}/>
                                    <label className="form-check-label" htmlFor>{nombre}</label>
                                    </div>
                                ))}
                            </div>
                            {dataAll.errorsForm.concurso.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.concurso}</span>}
                            </div>
                            </div>
                            {(dataAll.listConsursoSelected)  &&
                            <div>
                                {(dataAll.listConsursoSelected.id ===1)  &&
                                    <div className="form-group">
                                    <label htmlFor className="col-sm-2 col-form-label">Base legal:</label>
                                    <div className="col-sm-6">
                                    <div className="custom-file">
                                        <Dropzone
                                            accept="*,.pdf"
                                            minSizeBytes="1"
                                            maxSizeBytes="1000000"
                                            maxFiles={1}
                                            multiple={false}
                                            inputContent="Arrastre o seleccione su documento de bases legales"
                                            getUploadParams={propsInt.getUploadParams}
                                            onChangeStatus={propsInt.handleChangeStatus}
                                            styles={{ dropzone: { minHeight: 100, maxHeight: 150 } }}
                                        />
                                    
                                    </div>
                                    </div>
                                    <div className="col-sm-4"></div>
                                    <div className="col-sm-12">
                                        <div className='row'>
                                        <div className='col-sm-2'>
                                        </div>
                                        <div className='col-sm-6'>
                                        {dataAll.errorsForm.file.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.file}</span>}
                                        </div>
                                        </div>
                                    </div>
                                </div>
                        }
                        </div>
                        }
                         {(dataAll.listConsursoSelected)  &&
                         <div>
                         {(dataAll.listConsursoSelected.id ===1)  &&
                            <div>
                                <div className="form-group">&emsp; &emsp;</div>
                                <div className="form-group">&emsp; &emsp;</div>
                            </div>
                         }
                         </div>
                        }
                            <div className="form-group">
                                        <label  className="col-sm-2 col-form-label">Descripción</label>
                                        <div className="col-sm-9">
                                            <div className="form-group">
                                            <textarea onKeyDown={propsInt.onlyLetter}  value={dataAll.description} onChange={propsInt.handleChangeI} className="form-control" id="description" name="description" placeholder="Descripción Campaña Promotora" />
                                            </div>
                                        {dataAll.errorsForm.description.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.description}</span>}
                                        </div>
                            </div>
                            <div className="form-group row" >
                                <div className="">
                                    <button type="submit" className="btn btn-primary">Guardar</button>
                                    <Link to='/CampanasPromotoras'> <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Volver</button> </Link>
                                </div>
                            </div>
                    </div>
                            
                    </form>
                    </LoadingOverlay>
                    </LoadingOverlay>
            </div>
        )
    }
}

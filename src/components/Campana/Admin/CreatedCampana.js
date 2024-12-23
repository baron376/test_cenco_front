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

export default class CreatedCampanas extends Component {
    state = {
        datefrom:''
    }

    render() {
        const dataAll = this.props.state;
        const propsInt = this.props;
        return (            
                <div className="col-10 tabs cont-height">
                    <LoadingOverlay active={dataAll.loading} spinner text='Cargando contenido...' >
                    <h2 className="mt-4 mb-4 font-weight-bold pl-3">Crear Campaña Proveedores</h2>
                    <form onKeyDown={propsInt.handleKeyDown}  onSubmit={propsInt.handleSubmitBs}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Cadena:</label>
                                <div className="col-sm-6">
                                <div className="form-check form-inline pt-1 pl-0" onChange={propsInt.handleCheckChieldCadena}>
                                    {dataAll.listaCadenasCreate.map(({ id , nombre , isChecked} , i) =>(
                                        <div className="form-inline">
                                        <input  name='cadena' id='cadena' className="form-check-input" type="radio" value={id}/>
                                        
                                        <label className="form-check-label" htmlFor>{nombre}</label>
                                        </div>
                                    ))}
                                </div>
                                {dataAll.errorsForm.cadena.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.cadena}</span>}
                                </div>
                            </div>  

                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Nombre:</label>
                                <div className="col-sm-6">
                                    <input type="text" pattern="^[a-zA-Z0-9ñÑ-_]+$" onKeyDown={propsInt.onlyLetter}  value={dataAll.name} onChange={propsInt.handleChangeI} className="form-control" id="name" name="name" placeholder="Ingrese Nombre de la Campaña" />
                                </div>
                                {dataAll.errorsForm.name.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.name}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Desde:</label>
                                <div className="col-sm-6">
        
                                    <DatePicker minDate={dataAll.minDateValue} className="input-datapiker" dateFormat="dd/MM/yyyy" selected={dataAll.dateFrom} onChange={(date) => propsInt.setDateFrom(date)} > </DatePicker>
                                    &emsp;<FontAwesomeIcon icon={faCalendar} />
                                </div>
                                {dataAll.errorsForm.desde.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.desde}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Hasta:</label>
                                <div className="col-sm-3">
                                    <DatePicker className="input-datapiker" dateFormat="dd/MM/yyyy" selected={dataAll.dateTo} onChange={(date) => propsInt.setDateTo(date)} > </DatePicker>
                                    &emsp;<FontAwesomeIcon icon={faCalendar} />
                                </div>
                                {dataAll.errorsForm.hasta.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.hasta}</span>}
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
                                <label htmlFor className="col-sm-2 col-form-label">Formato:</label>
                                <div className="col-sm-6">
                                    <Multiselect
                                        options={dataAll.listaTipoSalas} 
                                        onSelect={propsInt.onSelectTipoSalas} 
                                        onRemove={propsInt.onRemoveTipoSalas}
                                        selectedValues={dataAll.TipoSalaeleccionada} 
                                        displayValue="nombre"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Zona:</label>
                                <div className="col-sm-6">
                                    <Multiselect
                                        options={dataAll.listaZonas} 
                                        onSelect={propsInt.onSelectZonas} 
                                        onRemove={propsInt.onRemovZonas}
                                        selectedValues={dataAll.listZonasSeleted} 
                                        displayValue="nombre"
                                    />
                                </div>
                                {dataAll.errorsForm.zona.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.zona}</span>}
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
                                {dataAll.errorsForm.salas.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.salas}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Secciones:</label>
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
                                <label htmlFor className="col-sm-2 col-form-label">Espacio de Exhibición:</label>
                                <div className="col-sm-6">
                                <Multiselect
                                      selectionLimit={1}
                                      options={dataAll.espaciosDatas} 
                                      onSelect={propsInt.onSelectEspacios} 
                                      onRemove={propsInt.onRemoveEspacios}
                                      selectedValues={dataAll.espaciosSeleccionada} 
                                      displayValue="nombre" 
                                  />
                                </div>
                                {dataAll.errorsForm.espacio.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.espacio}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Zona de Exhibición:</label>
                                <div className="col-sm-6">
                                <Multiselect
                                      selectionLimit={1}
                                      options={dataAll.listaZonasExhibicion} 
                                      onSelect={propsInt.onSelectZonaExhibicion} 
                                      onRemove={propsInt.onRemoveZonaExhibicion}
                                      selectedValues={dataAll.listZonasExhibicionSeleted} 
                                      displayValue="nombre" 
                                  />
                                </div>
                                {dataAll.errorsForm.zonaExhibicion.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.zonaExhibicion}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Material POP a implementar:</label>
                                <div className="col-sm-6">
                                    <input type="text" onKeyDown={propsInt.onlyLetter}  value={dataAll.description} onChange={propsInt.handleChangeI} className="form-control" id="description" name="description" placeholder="Ingrese una Descripción" />
                                </div>
                                {dataAll.errorsForm.description.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.description}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label"></label>
                                <div className="col-sm-6">
                                <input  type="checkbox" onChange={propsInt.checkMaterial} value={dataAll.materialInt} checked={dataAll.material} /> Material Externo<br></br>
                                </div>
                            </div>
                            <div className="form-group">&emsp; &emsp;</div>
                            <div className="form-group row" >
                                <div className="">
                                    <button type="submit" className="btn btn-primary">Guardar</button>
                                    <Link to='/Campanas'> <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Volver</button> </Link>
                                </div>
                            </div>
                        </div>                   
                    </form>
                    </LoadingOverlay>
                </div>
                

        )
    }
}

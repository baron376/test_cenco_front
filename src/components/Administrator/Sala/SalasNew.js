import React, { Component } from 'react';
import ModalLg from '../../ModalLg';
import { Multiselect } from 'multiselect-react-dropdown';
import LoadingOverlay from 'react-loading-overlay';

export default class SalasNew extends Component {
    render() {
        const propsInt = this.props;
        const stateFather = this.props.stateFather;
        //stateFather.cadenaSeleccionada = [{id: 1, nombre: "JUMBO"}];

        return (
            <ModalLg  isOpen={propsInt.isOpen}  onClose={propsInt.onClose} modalTitle={propsInt.modalTitle}>
                <div className="modal fade" id="modal-lg" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title font-weight-bold">{propsInt.modalTitle}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span onClick={propsInt.deleteVariables} aria-hidden="true">×</span>
                        </button>
                    </div>                
                        <form onSubmit={propsInt.handleSubmitBs}>
                            <div className="modal-body">
                            <LoadingOverlay active={stateFather.loadingModalEdit} spinner text='Cargando contenido...' >
                                <div>
                                        <div className="form-group">
                                            <label className="col-sm-2 col-form-label">Cadena:</label>
                                            <div className="col-sm-9">
                                                <Multiselect
                                                    singleSelect
                                                    options={stateFather.dataCadena} 
                                                    onSelect={propsInt.onSelectCadenasModal} 
                                                    onRemove={propsInt.onRemoveCadenasModal}
                                                    selectedValues={stateFather.cadenaSeleccionada} 
                                                    displayValue="nombre" 
                                                />
                                                {stateFather.errorsForm.cadenas.length > 0 && <span className='error error-class-i'>{stateFather.errorsForm.cadenas}</span>}
                                            </div>
                                            
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-2 col-form-label">CDG SAP:</label>
                                            <div className="col-sm-9">                                       
                                                <input type="text" value={stateFather.cdg_sap} onChange={propsInt.handleChangeI} className="form-control" id="cdg_sap" name="cdg_sap" placeholder="Código de la Sala" />
                                                {stateFather.errorsForm.cdg_sap.length > 0 && <span className='error error-class-i'>{stateFather.errorsForm.cdg_sap}</span>}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-2 col-form-label">Nombre:</label>
                                            <div className="col-sm-9">
                                                <input type="text" value={stateFather.name} onChange={propsInt.handleChangeI} className="form-control" id="name" name="name" placeholder="Nombre Local" />
                                                {stateFather.errorsForm.name.length > 0 && <span className='error error-class-i'>{stateFather.errorsForm.name}</span>}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-2 col-form-label">Zona:</label>
                                            <div className="col-sm-9">
                                                <Multiselect
                                                    singleSelect
                                                    options={stateFather.listaZonasModal} 
                                                    onSelect={propsInt.onSelectZonasModal} 
                                                    onRemove={propsInt.onRemoveZonasModal}
                                                    selectedValues={stateFather.ZonaModalSeleccionada} 
                                                    displayValue="nombre" 
                                                />
                                                {stateFather.errorsForm.zona_err !== '' && <span className='error error-class-i'>{stateFather.errorsForm.zona_err}</span>}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-2 col-form-label">Formato:</label>
                                            <div className="col-sm-9">
                                                <Multiselect
                                                    singleSelect
                                                    options={stateFather.listaTipoSalas} 
                                                    onSelect={propsInt.onSelectTipoSalas} 
                                                    onRemove={propsInt.onRemoveTipoSalas}
                                                    selectedValues={stateFather.TipoSalaeleccionada} 
                                                    displayValue="nombre" 
                                                />
                                                {stateFather.errorsForm.tipo_err !== '' && <span className='error error-class-i'>{stateFather.errorsForm.tipo_err}</span>}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-2 col-form-label">Regiones:</label>
                                            <div className="col-sm-9">
                                                <Multiselect
                                                    singleSelect
                                                    options={stateFather.dataRegiones} 
                                                    onSelect={propsInt.onSelectRegiones} 
                                                    onRemove={propsInt.onRemoveRegiones}
                                                    selectedValues={stateFather.regionesSeleccionada} 
                                                    displayValue="region_nombre" 
                                                />
                                                {stateFather.errorsForm.region.length > 0 && <span className='error error-class-i'>{stateFather.errorsForm.region}</span>}
                                            </div>
                                        </div>
                                        {/* <div className="form-group">
                                            <label className="col-sm-2 col-form-label">Provincias:</label>
                                            <div className="col-sm-9">
                                                <Multiselect
                                                    singleSelect
                                                    options={stateFather.listaSelecProvincias} 
                                                    onSelect={propsInt.onSelectProvincias} 
                                                    onRemove={propsInt.onRemoveProvincias}
                                                    selectedValues={stateFather.provinciasSeleccionada} 
                                                    displayValue="provincia_nombre" 
                                                />
                                                {stateFather.errorsForm.provincia.length > 0 && <span className='error error-class-i'>{stateFather.errorsForm.provincia}</span>}
                                            </div>
                                        </div> */}
                                        <div className="form-group">
                                            <label className="col-sm-2 col-form-label">Comunas:</label>
                                            <div className="col-sm-9">
                                                <Multiselect
                                                    singleSelect
                                                    options={stateFather.dataComuna} 
                                                    onSelect={propsInt.onSelectComuna} 
                                                    onRemove={propsInt.onRemoveComuna}
                                                    selectedValues={stateFather.comunasSeleccionada} 
                                                    displayValue="comuna_nombre" 
                                                />
                                                {stateFather.errorsForm.comuna.length > 0 && <span className='error error-class-i'>{stateFather.errorsForm.comuna}</span>}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-2 col-form-label">Dirección</label>
                                            <div className="col-sm-9">                                        
                                                <input type="text" value={stateFather.direccion} onChange={propsInt.handleChangeI} className="form-control" id="direccion" name="direccion" placeholder="Ingrese Dirección" />
                                                {stateFather.errorsForm.direccion.length > 0 && <span className='error error-class-i'>{stateFather.errorsForm.direccion}</span>}
                                            </div>
                                        </div>                                    
                                        <div className="modal-footer row">
                                        <div className="col-12 d-flex justify-content-between">
                                            <button  type="submit" onClick={propsInt.handleClickBs} className="btn btn-primary">Guardar</button>
                                            <button type="button" onClick={propsInt.deleteVariables} className="btn btn-danger" data-dismiss="modal">Cerrar</button>
                                        </div>
                                        </div>
                                    </div>
                                </LoadingOverlay>
                            </div>
                        </form>
                </div>
                </div>
                </div>
               
            </ModalLg>
        )
    }
}

import React, { Component } from 'react'
import ModalLg from '../../ModalLg';
import '../../styles/users.css';
import { Multiselect } from 'multiselect-react-dropdown';
import LoadingOverlay from 'react-loading-overlay';
// import { faEye ,faKey } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class ProveedorNew extends Component {
    render() {
        const propsInt = this.props;
        const stateFather = this.props.stateFather;
        document.oncontextmenu = new Function("return false");
        return (
            <ModalLg  isOpen={propsInt.isOpen}  onClose={propsInt.onClose} modalTitle={propsInt.modalTitle}>
                <div className="modal fade" id="modal-lg"  aria-hidden="true">
                <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title font-weight-bold">{propsInt.modalTitle}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span onClick={propsInt.deleteVariables} aria-hidden="true">×</span>
                        </button>
                    </div>
                    <LoadingOverlay active={stateFather.loadingModalEdit} spinner text='Cargando contenido...' >
                    <form onSubmit={propsInt.handleSubmitBs}>
                        <div className="modal-body">
                                    <div className="form-group">
                                        <label  className="col-sm-2 col-form-label">Nombre</label>
                                        <div className="col-sm-9">
                                            <div className="form-group">
                                            <input type="text" onKeyDown={propsInt.onlyLetter}  value={stateFather.name} onChange={propsInt.handleChangeI} className="form-control" id="name" name="name" placeholder="Ingrese Nombre del Proveedor" />
                                            </div>
                                        {stateFather.errorsForm.name.length > 0 && <span className='error error-class-i'>{stateFather.errorsForm.name}</span>}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label  className="col-sm-2 col-form-label">Giro</label>
                                        <div className="col-sm-9">
                                            <div className="form-group">
                                            <input type="text" onKeyDown={propsInt.onlyLetter} value={stateFather.giro} onChange={propsInt.handleChangeI} className="form-control" id="giro" name="giro" placeholder="Giro del proveedor" />
                                            </div>
                                        {stateFather.errorsForm.giro.length > 0 && <span className='error error-class-i'>{stateFather.errorsForm.giro}</span>}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label  className="col-sm-2 col-form-label">Rut</label>
                                        <div className="col-sm-8">
                                            <div className="form-group">
                                            <input type="text" value={stateFather.rut} onKeyDown={propsInt.onlyNumber} onChange={propsInt.handleChangeI} oncopy="return false" onpaste="return false" className="form-control" id="rut" name="rut" placeholder="ingrese rut" />
                                            </div>
                                        {stateFather.errorsForm.rut.length > 0 && <span className='error error-class-i'>{stateFather.errorsForm.rut}</span>}&emsp;&emsp;
                                        {stateFather.errorsForm.dv.length > 0 && <span className='error error-class-i'>{stateFather.errorsForm.dv}</span>}
                                        </div>
                                        <div className="col-sm-1">
                                            <div className="form-group">
                                            <input type="text" value={stateFather.dv}  onKeyDown={propsInt.onlyNumberandK} onChange={propsInt.handleChangeI} className="form-control"  id="dv" name="dv" placeholder="DV" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label  className="col-sm-2 col-form-label">Email</label>
                                        <div className="col-sm-9">
                                            <div className="form-group">
                                                <input type="text" value={stateFather.email} onChange={propsInt.handleChangeI} className="form-control" id="email" name="email" placeholder="Ingrese email" />
                                            </div>
                                        {stateFather.errorsForm.email.length > 0 && <span className='error  error-class-i'>{stateFather.errorsForm.email}</span>}
                                        </div>
                                    </div>
                                   
                                    <div className="form-group">
                                        <label className="col-sm-2 col-form-label">Marcas</label>
                                        <div className="col-sm-9">
                                            <div className="form-group">
                                                <Multiselect
                                                options={stateFather.listaSelectMarcas} // Options to display in the dropdown 
                                                onSelect={propsInt.onSelectMarcas} // Function will trigger on select event
                                                onRemove={propsInt.onRemoveMarcas} // Function will trigger on remove event
                                                displayValue="nombre" // Property name to display in the dropdown options
                                                selectedValues={stateFather.listaMarcasSeleccionadas}
                                                />
                                            </div>
                                              {stateFather.errorsForm.marcas.length > 0 && <span className='error  error-class-i'>{stateFather.errorsForm.marcas}</span>} 
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 col-form-label">Tipo</label>
                                        <div className="col-sm-9">
                                            <div className="form-group">
                                                <Multiselect
                                                    singleSelect
                                                    options={stateFather.listaTipos} // Options to display in the dropdown 
                                                    onSelect={propsInt.onSelectTipos} // Function will trigger on select event
                                                    onRemove={propsInt.onRemoveTipos} // Function will trigger on remove event
                                                    displayValue="nombre" // Property name to display in the dropdown options
                                                    selectedValues={stateFather.listaTiposSeleccionados}
                                                    />
                                            </div>
                                              {stateFather.errorsForm.marcas.length > 0 && <span className='error  error-class-i'>{stateFather.errorsForm.marcas}</span>} 
                                        </div>
                                    </div>

                                    <div className="modal-footer row">
                                    <div className="col-10 d-flex justify-content-between">
                                        <button  type="submit" onClick={propsInt.handleClickBs}  className="btn btn-primary">Guardar</button>
                                        <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
                                    </div>
                                    </div>
                        </div>
                    </form>
                    </LoadingOverlay>
                </div>
                </div>
                </div>
            </ModalLg>
        )
    }
}

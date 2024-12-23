import React, { Component } from 'react';
import ModalLg from '../../ModalLg';
//import { Multiselect } from 'multiselect-react-dropdown';
import LoadingOverlay from 'react-loading-overlay';
export default class SesionesNew extends Component {
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
                    <LoadingOverlay active={stateFather.loadingModalEdit} spinner text='Cargando contenido...' >
                        <form onSubmit={propsInt.handleSubmitBs}>
                        <div className="modal-body">
                            <div>
                                    <div className="form-group">
                                        <label className="col-sm-2 col-form-label">Número:</label>
                                        <div className="col-sm-9">                                       
                                            <input type="number" value={stateFather.number} onChange={propsInt.handleChangeI} className="form-control" id="number" name="number" placeholder="Número Sección" />
                                            {stateFather.errorsForm.number.length > 0 && <span className='error error-class-i'>{stateFather.errorsForm.number}</span>}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 col-form-label">Nombre:</label>
                                        <div className="col-sm-9">                                       
                                            <input type="text" value={stateFather.name} onChange={propsInt.handleChangeI} className="form-control" id="name" name="name" placeholder="Nombre Sección" />
                                            {stateFather.errorsForm.name.length > 0 && <span className='error error-class-i'>{stateFather.errorsForm.name}</span>}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 col-form-label">Descripción:</label>
                                        <div className="col-sm-9">
                                            <input type="text" value={stateFather.descripcion} onChange={propsInt.handleChangeI} className="form-control" id="descripcion" name="descripcion" placeholder="Descripción" />
                                            {stateFather.errorsForm.descripcion.length > 0 && <span className='error error-class-i'>{stateFather.errorsForm.descripcion}</span>}
                                        </div>
                                    </div>                                    
                                    <div className="modal-footer row">
                                    <div className="col-12 d-flex justify-content-between">
                                        <button  type="submit" onClick={propsInt.handleClickBs} className="btn btn-primary">Guardar</button>
                                        <button type="button" onClick={propsInt.deleteVariables} className="btn btn-danger" data-dismiss="modal">Cerrar</button>
                                    </div>
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

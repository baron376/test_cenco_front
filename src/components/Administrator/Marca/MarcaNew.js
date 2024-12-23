import React, { Component } from 'react';
import ModalLg from '../../ModalLg';
import LoadingOverlay from 'react-loading-overlay';

export default class MarcaNew extends Component {
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
                                        <label className="col-sm-2 col-form-label">Nombre:</label>
                                        <div className="col-sm-9">                                       
                                            <input type="text" value={stateFather.name} onChange={propsInt.handleChangeI} className="form-control" id="name" name="name" placeholder="Nombre Marca" />
                                            {stateFather.errorsForm.name.length > 0 && <span className='error error-class-i'>{stateFather.errorsForm.name}</span>}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 col-form-label">Representante:</label>
                                        <div className="col-sm-9">
                                            <input type="text" value={stateFather.representante} onChange={propsInt.handleChangeI} className="form-control" id="representante" name="representante" placeholder="Representante" />
                                            {stateFather.errorsForm.representante.length > 0 && <span className='error error-class-i'>{stateFather.errorsForm.representante}</span>}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 col-form-label">Teléfono:</label>
                                        <div className="col-sm-9">
                                            <input type="text" value={stateFather.telefono} onChange={propsInt.handleChangeI} className="form-control" id="telefono" name="telefono" placeholder="Teléfono" />
                                            {stateFather.errorsForm.telefono.length > 0 && <span className='error error-class-i'>{stateFather.errorsForm.telefono}</span>}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 col-form-label">Email:</label>
                                        <div className="col-sm-9">
                                            <input type="text" value={stateFather.email} onChange={propsInt.handleChangeI} className="form-control" id="email" name="email" placeholder="Descripción" />
                                            {stateFather.errorsForm.email.length > 0 && <span className='error error-class-i'>{stateFather.errorsForm.email}</span>}
                                        </div>
                                    </div>  
                                    <div className="form-group">
                                        <label className="col-sm-2 col-form-label">Comentarios:</label>
                                        <div className="col-sm-9">
                                            <input type="text" value={stateFather.comentario} onChange={propsInt.handleChangeI} className="form-control" id="comentario" name="comentario" placeholder="Ingrese un Comentario" />
                                            {stateFather.errorsForm.comentario.length > 0 && <span className='error error-class-i'>{stateFather.errorsForm.comentario}</span>}
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

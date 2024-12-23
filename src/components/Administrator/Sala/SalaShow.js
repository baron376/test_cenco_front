import React, { Component } from 'react'
import ModalLg from '../../ModalLg';
import LoadingOverlay from 'react-loading-overlay';

export default class UsersShow extends Component {
    render() {
        const propsInt = this.props;
        const stateFather = this.props.stateFather;
        return (
            <ModalLg  isOpen={propsInt.isOpen}  onClose={propsInt.onClose} modalTitle={propsInt.modalTitle}>
            <div className="modal fade" id="modal-lg-sh"  aria-hidden="true">
                <div className="modal-dialog modal-lg">
            <LoadingOverlay active={stateFather.loadingModalShow} spinner text='Cargando contenido...' >
            <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title font-weight-bold">{propsInt.modalTitle}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span onClick={propsInt.deleteVariables} aria-hidden="true">×</span>
                        </button>
                    </div>                    
                        <div className="modal-body">
                        <div className="modal-body">
                <div className="form-group">
                  <label  className="col-sm-2 col-form-label">Cadena</label>
                  <div className="col-sm-10">
                    <input type="text" readOnly className="form-control-plaintext"  defaultValue={stateFather.cadenaName} />
                  </div>
                </div>
                <div className="form-group">
                  <label  className="col-sm-2 col-form-label">CDG SAP</label>
                  <div className="col-sm-10">
                    <input type="text" readOnly className="form-control-plaintext"  defaultValue={stateFather.cdg_sap} />
                  </div>
                </div>
                <div className="form-group">
                  <label  className="col-sm-2 col-form-label">Nombre</label>
                  <div className="col-sm-10">
                    <input type="text" readOnly className="form-control-plaintext"  defaultValue= {stateFather.name} />
                  </div>
                </div>
                <div className="form-group">
                  <label  className="col-sm-2 col-form-label">Región</label>
                  <div className="col-sm-10">
                    <input type="text" readOnly className="form-control-plaintext"  defaultValue={stateFather.regionesName} />
                  </div>
                </div>
                <div className="form-group">
                  <label  className="col-sm-2 col-form-label">Provincia</label>
                  <div className="col-sm-10">
                    <input type="text" readOnly className="form-control-plaintext"  defaultValue={stateFather.provinciaName} />
                  </div>
                </div>
                <div className="form-group">
                  <label  className="col-sm-2 col-form-label">Comuna</label>
                  <div className="col-sm-10">
                    <input type="text" readOnly className="form-control-plaintext"  defaultValue={stateFather.comunasName} />
                  </div>
                </div>
                <div className="form-group">
                  <label  className="col-sm-2 col-form-label">Dirección</label>
                  <div className="col-sm-10">
                    <input type="text" readOnly className="form-control-plaintext"  defaultValue={stateFather.direccion} />
                  </div>
                </div>
               
                <div className="modal-footer row">
                <div className="col-2 d-flex justify-content-between">
                    <button type="button" onClick={propsInt.deleteVariables} className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                </div>
                </div>
              </div>
               </div>
            </div>
            </LoadingOverlay>
            </div>
            </div>
            </ModalLg>
        )
    }
}

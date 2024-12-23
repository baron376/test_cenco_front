import React, { Component } from 'react'
import ModalLg from '../../ModalLg';
import LoadingOverlay from 'react-loading-overlay';

export default class RolesProveedorShow extends Component {
    render() {
        const propsInt = this.props;
        const stateFather = this.props.stateFather;
        return (
            <ModalLg  isOpen={propsInt.isOpen}  onClose={propsInt.onClose} modalTitle={propsInt.modalTitle}>
            <div className="modal fade" id="modal-lg-sh" aria-hidden="true">
                <div className="modal-dialog modal-lg">
            <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title font-weight-bold">{propsInt.modalTitle}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <LoadingOverlay active={stateFather.loadingModalShow} spinner text='Cargando contenido...' >
                        <div className="modal-body">
                            <div className="form-group">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-3">Nombre:</div>
                                <div className="col-sm-8">{stateFather.name}</div>
                            </div>
                            <div className="form-group">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-3">descripción:</div>
                                <div className="col-sm-8">{stateFather.description}</div>
                            </div>
                            <div className="form-group">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-3">Administrador:</div>
                                {!stateFather.habPermissions ? (
                                   <div className="col-sm-8">Si</div>
                                    ): (
                                        <div className="col-sm-8">No</div>
                                    )}
                            </div>
                            <div className="form-group">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-3">Permisos:</div>
                                <div className="col-sm-8">
                                    <ul>
                                    {stateFather.permissionsShow.map((permiso)=>(
                                        <li>
                                        {permiso.cdg}-{permiso.nombre}
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </LoadingOverlay>
            </div>
            </div>
            </div>
            </ModalLg>
        )
    }
}

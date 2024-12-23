import React, { Component } from 'react'
import ModalLg from '../../ModalLg';
import LoadingOverlay from 'react-loading-overlay';

export default class UsersShow extends Component {
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
                            <div className="row">
                                <div className="col-6 mb-2">
                                    <div className="col-sm-1"></div>
                                    <div className="col-sm-3"><strong>Nombre:</strong></div>
                                    <div className="col-sm-8">{stateFather.name}</div>
                                </div>
                                <div className="col-6 mb-2">
                                    <div className="col-sm-1"></div>
                                    <div className="col-sm-3"><strong>Apellido:</strong></div>
                                    <div className="col-sm-8">{stateFather.lastname}</div>
                                </div>
                                <div className="col-6 mb-2">
                                    <div className="col-sm-1"></div>
                                    <div className="col-sm-3"><strong>RUT:</strong></div>
                                    <div className="col-sm-8">{stateFather.rut}-{stateFather.dv}</div>
                                </div>
                                <div className="col-6 mb-2">
                                    <div className="col-sm-1"></div>
                                    <div className="col-sm-3"><strong>Email:</strong></div>
                                    <div className="col-sm-8">{stateFather.email}</div>
                                </div>
                                <div className="col-6 mb-2">
                                    <div className="col-sm-1"></div>
                                    <div className="col-sm-3"><strong>Roles:</strong></div>
                                    <div className="col-sm-8">
                                        <ul>
                                            {stateFather.listaRolesSeleccionados.map(({ id , nombre , descripcion} , i) =>(
                                                <li key={id}>
                                                    {id}-{nombre}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-6 mb-2">
                                    <div className="col-sm-1"></div>
                                    <div className="col-sm-3"><strong>Cadenas:</strong></div>
                                    <div className="col-sm-8">
                                        <ul>
                                            {stateFather.listaCadenasSeleccionadas.map(({ id , nombre , descripcion} , i) =>(
                                                <li key={id}>
                                                    {id}-{nombre}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-6 mb-2">
                                    <div className="col-sm-1"></div>
                                    <div className="col-sm-3"><strong>Salas:</strong></div>
                                    <div className="col-sm-8">
                                        <ul>
                                            {stateFather.listaSalasSeleccionadas.map(({ id , nombre_sap , cdg_local} , i) =>(
                                                <li key={id}>
                                                    {cdg_local}-{nombre_sap}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
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

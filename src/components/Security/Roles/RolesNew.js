import React, { Component } from 'react'
import ModalLg from '../../ModalLg';
import '../../styles/roles.css';
import { Multiselect } from 'multiselect-react-dropdown';
import LoadingOverlay from 'react-loading-overlay';
export default class RolNew extends Component {
    render() {
        const propsInt = this.props;
        const stateFather = this.props.stateFather;
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
                                            <input type="text" onKeyDown={propsInt.onlyLetter}  value={stateFather.name} onChange={propsInt.handleChangeI} className="form-control" id="name" name="name" placeholder="Ingrese Nombre del Rol" />
                                            </div>
                                        {stateFather.errorsForm.name.length > 0 && <span className='error error-class-i'>{stateFather.errorsForm.name}</span>}
                                        </div>
                                    </div> 
                                    <div className="form-group">
                                        <label  className="col-sm-2 col-form-label">Descripción</label>
                                        <div className="col-sm-9">
                                            <div className="form-group">
                                            <textarea onKeyDown={propsInt.onlyLetter}  value={stateFather.description} onChange={propsInt.handleChangeI} className="form-control" id="description" name="description" placeholder="Ingrese descripción del rol" />
                                            </div>
                                        {stateFather.errorsForm.description.length > 0 && <span className='error error-class-i'>{stateFather.errorsForm.description}</span>}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label  className="col-sm-2 col-form-label">Tipos de permisos</label>
                                        <div className="col-sm-9">
                                            <div className="form-group">
                                                    <Multiselect
                                                    singleSelect
                                                    options={stateFather.selectTypePermissions} 
                                                    onSelect={propsInt.onSelectTypePermisssions} 
                                                    onRemove={propsInt.onRemoveTypePermisions}
                                                    selectedValues={stateFather.typePermissionsSelected} 
                                                    displayValue="nombre" 
                                                    />
                                            </div>
                                            {stateFather.errorsForm.type_permissions.length > 0 && <span className='error  error-class-i'>{stateFather.errorsForm.type_permissions}</span>}
                                        </div>   
                                    </div>
                                    {stateFather.habPermissions ? (
                                    <div className="form-group">
                                        <label  className="col-sm-2 col-form-label">Permisos</label>
                                        <div className="col-sm-9">
                                        <div className="row">
                                                {stateFather.errorsForm.permissions.length > 0 && <span className='error  error-class-i'>{stateFather.errorsForm.permissions}</span>}<br></br>
                                            </div>
                                            <div className="form-group">
                                                {stateFather.listaPermisosSeleccion.map(({id , nombre ,isChecked, permisos} , i) =>(
                                                    <div>
                                                        <div className='row'>
                                                            <div className='col-sm-12'>   
                                                            <input key={id} onClick={propsInt.handleAllCheckedPermissionsModule} type="checkbox" checked={isChecked} value={id}/> {id}-{nombre}
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className="col-sm-1"></div>
                                                            <div className='col-sm-11'>  
                                                            <ul>
                                                                    {permisos.map((permiso)=>(
                                                                        <li>
                                                                        <input key={permiso.id} onClick={propsInt.handleCheckChieldElement} type="checkbox" checked={permiso.isChecked} value={permiso.id}/> {permiso.cdg}-{permiso.nombre}
                                                                        </li>
                                                                    ))}
                                                            </ul>
                                                            </div> 
                                                        </div> 
                                                    </div> 
                                                ))}
                                                
                                            </div>
                                        </div>   
                                    </div>
                                    ): (
                                        <div></div>
                                    )}
                                    <div className="modal-footer row">
                                    <div className="col-12 d-flex justify-content-between">
                                        <button  type="submit" onClick={propsInt.handleClickBs}  className="btn btn-primary">Guardar</button>
                                        <button type="button" onClick={propsInt.deleteVariables} className="btn btn-danger" data-dismiss="modal">Cerrar</button>
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

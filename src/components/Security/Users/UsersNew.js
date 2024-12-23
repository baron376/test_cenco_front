import React, { Component } from 'react'
import ModalLg from '../../ModalLg';
import '../../styles/users.css';
import { Multiselect } from 'multiselect-react-dropdown';
import LoadingOverlay from 'react-loading-overlay';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class UserNew extends Component {
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
                                        <label  className="col-sm-2 col-form-label">Nombres</label>
                                        <div className="col-sm-9">
                                            <div className="form-group">
                                            <input type="text" onKeyDown={propsInt.onlyLetter}  value={stateFather.name} onChange={propsInt.handleChangeI} className="form-control" id="name" name="name" placeholder="Ingrese Nombre del usuario" />
                                            </div>
                                        {stateFather.errorsForm.name.length > 0 && <span className='error error-class-i'>{stateFather.errorsForm.name}</span>}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label  className="col-sm-2 col-form-label">Apellidos</label>
                                        <div className="col-sm-9">
                                            <div className="form-group">
                                            <input type="text" onKeyDown={propsInt.onlyLetter} value={stateFather.lastname} onChange={propsInt.handleChangeI} className="form-control" id="lastname" name="lastname" placeholder="Ingrese Apellido del usuario" />
                                            </div>
                                        {stateFather.errorsForm.lastname.length > 0 && <span className='error error-class-i'>{stateFather.errorsForm.lastname}</span>}
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
                                   {/*  {!stateFather.editUSerEstate ? (
                                    <div className="form-group row ">
                                        <label  className="col-sm-2 col-form-label">Contraseña</label>
                                            <div className="col-sm-8">
                                                <div className="form-group">
                                                    <input type={stateFather.hiddenPaswword ? 'password' : 'text'} value={stateFather.password}  onChange={propsInt.handleChangeI} className="form-control" id="password" name="password" placeholder="Password" /> 
                                                </div>
                                                {stateFather.errorsForm.password.length > 0 && <span className='error  error-class-i'>{stateFather.errorsForm.password}</span>}
                                            </div>
                                            &emsp;&emsp;
                                            <div className='align-self-start'><FontAwesomeIcon onClick={propsInt.toggleShowPasswod} icon={faEye} /> </div>
                                    </div> 
                                    ) : (
                                        <div></div>
                                    )} */}
                                    <div className="form-group">
                                        <label className="col-sm-2 col-form-label">Roles</label>
                                        <div className="col-sm-9">
                                            <div className="form-group">
                                                <Multiselect
                                                options={stateFather.listaSelectRoles} // Options to display in the dropdown 
                                                onSelect={propsInt.onSelectRoles} // Function will trigger on select event
                                                onRemove={propsInt.onRemoveRoles} // Function will trigger on remove event
                                                displayValue="nombre" // Property name to display in the dropdown options
                                                selectedValues={stateFather.listaRolesSeleccionados}
                                                placeholder="Seleccionar roles"
                                                />
                                            </div>
                                            {stateFather.errorsForm.roles.length > 0 && <span className='error  error-class-i'>{stateFather.errorsForm.roles}</span>}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label  className="col-sm-2 col-form-label">Cadena</label>
                                        <div className="col-sm-9">
                                            <div className="form-group">
                                                    <Multiselect
                                                    options={stateFather.listaSelectCadenas} 
                                                    onSelect={propsInt.onSelectCadenas} 
                                                    onRemove={propsInt.onRemoveCadenas}
                                                    selectedValues={stateFather.listaCadenasSeleccionadas} 
                                                    displayValue="nombre" 
                                                    placeholder="Seleccionar cadenas"
                                                    />
                                            </div>
                                            {stateFather.errorsForm.cadenas.length > 0 && <span className='error  error-class-i'>{stateFather.errorsForm.cadenas}</span>}
                                        </div>   
                                    </div>
                                    <div className="form-group">
                                        <label  className="col-sm-2 col-form-label">Salas</label>
                                        <div className="col-sm-9">
                                            <div className="form-group">
                                          
                                            <Multiselect
                                        options={stateFather.listaSelecSalas} 
                                        onSelect={propsInt.onSelectSalas} 
                                        onRemove={propsInt.onRemoveSalas}
                                        selectedValues={stateFather.listaSalasSeleccionadas} 
                                        displayValue="display_nombre_sap"
                                        placeholder="Seleccionar salas"
                                    /> 
                                            {/* <input  type="checkbox" onClick={propsInt.handleAllCheckedSalas} onChange={propsInt.handleAllCheckedSalas} value={stateFather.checkedallSalas} checked={stateFather.checkedallSalas} /> Seleccionar todas <br></br>
                                                <ul>
                                                    {stateFather.listaSelecSalas.map(({cdg_local , id , nombre_sap , isChecked} , i) =>(
                                                        <li key={id}>
                                                            <input key={id}  onChange={propsInt.handleCheckChieldElement} type="checkbox" checked={isChecked} value={id}/> {cdg_local}-{nombre_sap}
                                                        </li>
                                                    ))}
                                                </ul> */}
                                                <div className="row">
                                                {stateFather.errorsForm.salas.length > 0 && <span className='error  error-class-i'>{stateFather.errorsForm.salas}</span>}<br></br>
                                            </div>
                                            </div>
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

import React, { Component } from 'react'
import { Multiselect } from 'multiselect-react-dropdown';
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import swal from 'sweetalert';

export default class CreatedIncidencias extends Component {
    state = {
        datefrom:''
    }
    render() {
        const dataAll = this.props.state;
        const propsInt = this.props;
        return (
            
                <div className="col-10 tabs cont-height">
                    <h5 className="mt-4 mb-4 font-weight-bold pl-3">Crear incidencia </h5>
                    
                    <form  onSubmit={propsInt.handleSubmitBs}>
                    <div className="modal-body">
                    <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Tipo campaña:</label>
                                <div className="col-sm-8">
                                    <Multiselect
                                        selectionLimit="1"
                                        options={dataAll.listaTipoCampanaCreated} 
                                        onSelect={propsInt.onSelectTipoCampana}  
                                        onRemove={propsInt.onRemoveTipoCampana}
                                        selectedValues={dataAll.tipoCampanaSeleccionada} 
                                        displayValue="nombre"
                                    />
                                </div>
                                {dataAll.errorsForm.tipoCampana.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.tipoCampana}</span>}
                    </div>
                    {dataAll.tipoCampanaSelectAuxiliar === 2 &&
                        <div className="form-group">
                                    <label htmlFor className="col-sm-2 col-form-label">Campaña proveedor:</label>
                                    <div className="col-sm-8">
                                        <Multiselect
                                            sselectionLimit="1"
                                            options={dataAll.dataCampanaProvvedor} 
                                            onSelect={propsInt.onSelectCampanaProveedor}  
                                            onRemove={propsInt.onRemoveCampanaProveedor}
                                            selectedValues={dataAll.campanaProveedorSeleccionada} 
                                            displayValue="nombre_completo"
                                        />
                                    </div>
                                    {dataAll.errorsForm.campanaProvvedor.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.campanaProvvedor}</span>}
                        </div>
                    }
                    {dataAll.tipoCampanaSelectAuxiliar === 1 &&
                        <div className="form-group">
                                    <label htmlFor className="col-sm-2 col-form-label">Campana promotora:</label>
                                    <div className="col-sm-8">
                                        <Multiselect
                                            selectionLimit="1"
                                            options={dataAll.dataCampanaPromotora} 
                                            onSelect={propsInt.onSelectCampanaPromotora}  
                                            onRemove={propsInt.onRemoveCampanaPromotora}
                                            selectedValues={dataAll.campanaPromotoraSeleccionada} 
                                            displayValue="nombre_completo"
                                        />
                                    </div>
                                    {dataAll.errorsForm.campanaPromotora.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.campanaPromotora}</span>}
                        </div>
                    }
                    <div className="form-group">
                        <label  className="col-sm-2 col-form-label">Cadena</label>
                        <div className="col-sm-8">
                            <input type="text" readOnly className="form-control"  defaultValue={dataAll.cadenaNombre} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label  className="col-sm-2 col-form-label">Campaña</label>
                        <div className="col-sm-8">
                            <input type="text" readOnly className="form-control"  defaultValue={dataAll.campanaNombre} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label  className="col-sm-2 col-form-label">Proveedor</label>
                        <div className="col-sm-8">
                            <input type="text" readOnly className="form-control"  defaultValue={dataAll.proveedorNombre} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label  className="col-sm-2 col-form-label">Sección</label>
                        <div className="col-sm-8">
                            <input type="text" readOnly className="form-control"  defaultValue={dataAll.seccionNombre} />
                        </div>
                    </div>
                    <div className="form-group">
                                        <label  className="col-sm-2 col-form-label">Descripción</label>
                                        <div className="col-sm-8">
                                            <div className="form-group">
                                            <textarea  value={dataAll.description} onChange={propsInt.handleChangeI} className="form-control" id="description" name="description" placeholder="descripción de la incidencia" />
                                            </div>
                                        {dataAll.errorsForm.description.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.description}</span>}
                                        </div>
                     </div>
                     <div className="form-group">&emsp; &emsp;</div>
                        <div className="form-group row" >
                        <div className="">
                        <button type="submit" className="btn btn-primary">Guardar</button>
                        <Link to='/Incidencias'> <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Volver</button> </Link>
                        </div>
                        </div>
                        </div>
                        </form>
                    
                    
                </div>
                

        )
    }
}
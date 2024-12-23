import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Multiselect } from 'multiselect-react-dropdown';
import 'react-dropzone-uploader/dist/styles.css';
//import Dropzone from 'react-dropzone-uploader';
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../styles/campanas.css';
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faUpload,faFileAlt,faTrash,faTimes,faPlus } from '@fortawesome/free-solid-svg-icons';

export default class EditarCampana extends Component {
    state = {
        datefrom:'',
        cadenaInfoVisible: false,
        nameInfoVisible: false,
        desdeInfoVisible: false,
        hastaInfoVisible: false,
        proveedorInfoVisible: false,
        formatoInfoVisible: false,
        zonaInfoVisible: false,
        localInfoVisible: false,
        gerenciaInfoVisible: false,
        seccionInfoVisible: false,
        tipodecampanaInfoVisible: false,
        visibilidaddecampanaInfoVisible: false,
        elementosdecampanaInfoVisible: false,
        cuposInfoVisible: false,
        fileNameAreaComercial:[],
        fileNameBasesLegales:[],
        fileAreaComercial:'',
        dataAll: {
            fileNameBasesLegales: ''
        },
        filenameareacomercialok: null,
        fechas: [{ id: 0, dateFrom: null, dateTo: null }],
    }

    toggleCadenaInfo = () => {
        this.setState((prevState) => ({
          cadenaInfoVisible: !prevState.cadenaInfoVisible,
        }));
      };

    toggleNameInfo = () => {
        this.setState((prevState) => ({
          nameInfoVisible: !prevState.nameInfoVisible,
        }));
      };

    toggleDesdeInfo = () => {
        this.setState((prevState) => ({
            desdeInfoVisible: !prevState.desdeInfoVisible,
        }));
      };

      toggleHastaInfo = () => {
        this.setState((prevState) => ({
            hastaInfoVisible: !prevState.hastaInfoVisible,
        }));
      };

      toggleproveedorInfo = () => {
        this.setState((prevState) => ({
            proveedorInfoVisible: !prevState.proveedorInfoVisible,
        }));
      };

      toggleformatoInfo = () => {
        this.setState((prevState) => ({
            formatoInfoVisible: !prevState.formatoInfoVisible,
        }));
      };

      togglezonaInfo = () => {
        this.setState((prevState) => ({
            zonaInfoVisible: !prevState.zonaInfoVisible,
        }));
      };

      togglelocalInfo = () => {
        this.setState((prevState) => ({
            localInfoVisible: !prevState.localInfoVisible,
        }));
      };

      togglegerenciaInfo = () => {
        this.setState((prevState) => ({
            gerenciaInfoVisible: !prevState.gerenciaInfoVisible,
        }));
      };

      toggleseccionInfo = () => {
        this.setState((prevState) => ({
            seccionInfoVisible: !prevState.seccionInfoVisible,
        }));
      };

      toggletipodecampanaInfo = () => {
        this.setState((prevState) => ({
            tipodecampanaInfoVisible: !prevState.tipodecampanaInfoVisible,
        }));
      };

      togglevisibilidaddecampanaInfo = () => {
        this.setState((prevState) => ({
            visibilidaddecampanaInfoVisible: !prevState.visibilidaddecampanaInfoVisible,
        }));
      };

      toggleelementosdecampanaInfo = () => {
        this.setState((prevState) => ({
            elementosdecampanaInfoVisible: !prevState.elementosdecampanaInfoVisible,
        }));
      };

      togglecuposInfo = () => {
        this.setState((prevState) => ({
            cuposInfoVisible: !prevState.cuposInfoVisible,
        }));
      };

      agregarFecha = () => {
        const nuevasFechas = [...this.state.fechas];
        nuevasFechas.push({ id: nuevasFechas.length, dateFrom: null, dateTo: null });
        this.setState({ fechas: nuevasFechas });
        this.props.setFechasAr(nuevasFechas);
        console.log("Algo alante ----- ",this.state.fechas);
    }

    // Función para eliminar una pareja de fechas
    eliminarFecha = (id) => {
        const nuevasFechas = this.state.fechas.filter(fecha => fecha.id !== id);
        this.setState({ fechas: nuevasFechas });
        this.props.setFechasAr(nuevasFechas);
    }

    handleChangeDateFrom = (date, index) => {
        const nuevasFechas = [...this.state.fechas];
        nuevasFechas[index].dateFrom = date;
        this.setState({ fechas: nuevasFechas });
        this.props.setFechasAr(nuevasFechas);
        
    }

    handleChangeDateTo = (date, index) => {
        const nuevasFechas = [...this.state.fechas];
        nuevasFechas[index].dateTo = date;
        this.setState({ fechas: nuevasFechas });
        this.props.setFechasAr(nuevasFechas);
    }
    async setFechasHijo(){
        let fechasint = this.props.state;
        this.setState({ fechas: this.props.state.fechas });
    }
    render() {
        const dataAll = this.props.state;
        const propsInt = this.props;
        const currentDate = new Date();
        //const { fechas } = this.props.state.fechas;
            this.state.fechas= this.props.state.fechas;
            const { fechas } = this.state;
        //this.setFechasHijo();
        return (   
                     
                <div className="col-10 tabs cont-height">
                    <h2 className="mt-4 mb-4 font-weight-bold pl-3">Editar Campaña Proveedores</h2>
                    <form onKeyDown={propsInt.handleKeyDown} onSubmit={propsInt.handleSubmitBs}>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label htmlFor="cadena" className="col-sm-4 col-form-label"><strong>Cadena:</strong></label>
                                        <div className="col-sm-8">
                                            <input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll?.campanaDetailsData?.cadena?.nombre || ''} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="formato" className="col-sm-4 col-form-label"><strong>Formato:</strong></label>
                                        <div className="col-sm-8">
                                            <input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll?.campanaDetailsData?.formato[0]?.nombre || ''} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="zona" className="col-sm-4 col-form-label"><strong>Zona:</strong></label>
                                        <div className="col-sm-8">
                                            <textarea readOnly className="form-control" value={dataAll?.campanaDetailsData?.zonas ? dataAll.campanaDetailsData.zonas.map(zona => zona.nombre).join('\n') : ''} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="local" className="col-sm-4 col-form-label"><strong>Locales:</strong></label>
                                        <div className="col-sm-8">
                                            <textarea readOnly className="form-control" value={dataAll?.campanaDetailsData?.salas_disponibles ? dataAll.campanaDetailsData.salas_disponibles.map(sala => sala.display_nombre_sap).join('\n') : ''} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="seccion" className="col-sm-4 col-form-label"><strong>Sección:</strong></label>
                                        <div className="col-sm-8">
                                            <input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll?.campanaDetailsData?.espacio?.nombre || ''} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="gerencia" className="col-sm-4 col-form-label"><strong>Sub-sección:</strong></label>
                                        <div className="col-sm-8">
                                            <input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll?.campanaDetailsData?.sesion?.nombre || ''} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="visibilidad_campana" className="col-sm-4 col-form-label"><strong>Visibilidad Campaña:</strong></label>
                                        <div className="col-sm-8">
                                            <input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll?.campanaDetailsData?.visibilidad?.name || ''} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="tp_campana" className="col-sm-4 col-form-label"><strong>Tipo de Campana:</strong></label>
                                        <div className="col-sm-8">
                                            <input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll?.campanaDetailsData?.tp_campana?.name || ''} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="elementos_campana" className="col-sm-4 col-form-label"><strong>Elementos de Campaña:</strong></label>
                                        <div className="col-sm-8">
                                            <textarea readOnly className="form-control" value={dataAll?.elementos || ''}></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-sm-4 col-form-label"><strong>Nombre Campaña</strong></label>
                                        <div className="col-sm-8">
                                            <input
                                                type="text"
                                                onKeyDown={propsInt.onlyLetter}
                                                value={dataAll.name}
                                                onChange={propsInt.handleChangeI}
                                                className="form-control"
                                                id="name"
                                                name="name"
                                                placeholder="Ingrese Nombre de la Campaña"
                                            />
                                            {this.state.nameInfoVisible && (
                                                <small>Ingrese el nombre de la campaña. Este campo es obligatorio.</small>
                                            )}
                                            {dataAll.errorsForm.name.length > 0 && (
                                                <span className='error error-class-i'>{dataAll.errorsForm.name}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="proveedor" className="col-sm-4 col-form-label"><strong>Proveedor</strong></label>
                                        <div className="col-sm-8">
                                            <Multiselect
                                                selectionLimit={1}
                                                options={dataAll.listaProveedores}
                                                onSelect={propsInt.onSelectProveedor}
                                                onRemove={propsInt.onRemovProveedor}
                                                selectedValues={dataAll.listProveedorSeleted}
                                                displayValue="nombre"
                                                placeholder="Seleccionar"
                                            />
                                            {this.state.proveedorInfoVisible && (
                                                <small>Ingrese el nombre del Proveedor. Este campo es obligatorio.</small>
                                            )}
                                            {dataAll.errorsForm.proveedor.length > 0 && (
                                                <span className='error error-class-i'>{dataAll.errorsForm.proveedor}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="box-doc">
                                            <div className="row align-items-center">
                                                <label htmlFor="area_comercial" className="col-sm-5 m-0"><strong>Visto bueno área comercial</strong></label>
                                                <div>
                                                    <label htmlFor="area_comercial" className="btn btn-outline-primary m-0">
                                                        <input type="file" className="custom-file-input" id="area_comercial" style={{ display: 'none' }} onChange={propsInt.setFileAreaComercial} />
                                                        <FontAwesomeIcon icon={faUpload} /> <span>Cargar Archivo</span>
                                                    </label>
                                                    <div className="doc-list">
                                                        {propsInt.filenameareacomercialok && (
                                                            <div>
                                                                <span>{propsInt.filenameareacomercialok}</span>
                                                                <FontAwesomeIcon icon={faTrash} style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }} onClick={propsInt.removeFileAreaComercial} />
                                                            </div>
                                                        )}
                                                        {dataAll.filenameAreaComercial && (
                                                            <div>
                                                                <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px', fontSize: '16px' }} />
                                                                <span onClick={() => { propsInt.downloadUrl(dataAll.filenameAreaComercial) }} style={{ cursor: 'pointer' }}>
                                                                    {dataAll.filenameAreaComercial.split('/').pop()}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="box-doc">
                                            <div className="row align-items-center">
                                                <label htmlFor="orden_compra" className="col-sm-5 m-0"><strong>Orden de compra y/o cotización</strong></label>
                                                <div>
                                                    <label htmlFor="orden_compra" className="btn btn-outline-primary m-0">
                                                        <input type="file" className="custom-file-input" id="orden_compra" style={{ display: 'none' }} onChange={propsInt.setFileOrdenCompra} />
                                                        <FontAwesomeIcon icon={faUpload} /> <span>Cargar Archivo</span>
                                                    </label>
                                                    <div className="doc-list">
                                                        {propsInt.filenameordencompra && (
                                                            <div>
                                                                <span>{propsInt.filenameordencompra}</span>
                                                                <FontAwesomeIcon icon={faTrash} style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }} onClick={propsInt.removeFileOrdenCompra} />
                                                            </div>
                                                        )}
                                                        {dataAll.filenameOrdenCompra && (
                                                            <div>
                                                                <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px', fontSize: '16px' }} />
                                                                <span onClick={() => { propsInt.downloadUrl(dataAll.filenameOrdenCompra) }} style={{ cursor: 'pointer' }}>
                                                                    {dataAll.filenameOrdenCompra.split('/').pop()}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="box-doc">
                                            <div className="row align-items-center">
                                                <label htmlFor="bases_legales" className="col-sm-5 m-0"><strong>Bases legales</strong></label>
                                                <div>
                                                    <label htmlFor="bases_legales" className="btn btn-outline-primary m-0">
                                                        <input type="file" className="custom-file-input" id="bases_legales" style={{ display: 'none' }} onChange={propsInt.setFileBasesLegales} />
                                                        <FontAwesomeIcon icon={faUpload} /> <span>Cargar Archivo</span>
                                                    </label>
                                                    <div className="doc-list">
                                                        {propsInt.filenamebaselegal && (
                                                            <div>
                                                                <span>{propsInt.filenamebaselegal}</span>
                                                                <FontAwesomeIcon icon={faTrash} style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }} onClick={propsInt.removeFileBasesLegales} />
                                                            </div>
                                                        )}
                                                        {dataAll.filenameBasesLegales && (
                                                            <div>
                                                                <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px', fontSize: '16px' }} />
                                                                <span onClick={() => { propsInt.downloadUrl(dataAll.filenameBasesLegales) }} style={{ cursor: 'pointer' }}>
                                                                    {dataAll.filenameBasesLegales.split('/').pop()}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="filenameMaterial" className="col-sm-4 col-form-label"><strong>Material</strong></label>
                                        <div className="col-sm-8">
                                            {dataAll.filenameMaterial && (
                                                <div>
                                                    <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px', fontSize: '16px' }} />
                                                    <span onClick={() => { propsInt.downloadUrl(dataAll.filenameMaterial) }} style={{ cursor: 'pointer' }}>
                                                        {dataAll.filenameMaterial.split('/').pop()}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label htmlFor="comentarios_campana" className="col-sm-4 col-form-label"><strong>Comentarios:</strong></label>
                                        <div className="col-sm-8">
                                            <div className="cont-historial">
                                                {dataAll.campanaComentariosData.map(({ comentario, fecha, usuario }, i) => (
                                                <div key={i}>
                                                    <p className="mb-0"><strong>{usuario}  -  {fecha}</strong></p>
                                                    <p>{comentario}</p>
                                                </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="form-group row mt-3">
                                <div className="col-sm-12 d-flex gap-10 justify-content-end">
                                    <Link to='/CampanasProveedoresNew'>
                                        <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Volver</button>
                                    </Link>
                                    <button type="submit" className="btn btn-primary">Guardar</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
                

        )
    }
}

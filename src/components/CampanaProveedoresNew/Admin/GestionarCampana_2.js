import React, { Component } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import 'react-dropzone-uploader/dist/styles.css';
import '../../styles/campanas.css';
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faFileDownload, faFileAlt } from "@fortawesome/free-solid-svg-icons";
export default class GestionarCampana extends Component {
  state = {
    datefrom: '',
    fechas: [],
  }

  render() {
    const dataAll = this.props.state;
    const propsInt = this.props;
    const Preview = ({ meta }) => {
      const { name, percent, status } = meta
      return (
        <span style={{ alignSelf: 'flex-start', margin: '10px 3%', fontFamily: 'Helvetica' }}>
          {name}, {Math.round(percent)}%, {status}
        </span>
      )
    }
    return (
      <div className="col-10 tabs cont-height gestionar-campana">
        <div>
          <h2 className="mt-4 mb-4 font-weight-bold pl-3">Gestionar Campaña {dataAll.name}</h2>
          <form onSubmit={propsInt.handleSubmitBs}>
            <div className="modal-body" >
              <div className="form-group">
                <div className="col-sm-6">
                  <label htmlFor="cadena" className="col-form-label"><strong>Cadena:</strong></label>
                  <input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.cadena} />
                </div>

                <div className="col-sm-6">
                  <label htmlFor="nombre" className="col-form-label"><strong>Nombre campaña:</strong></label>
                  <input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.name} />
                </div>
              </div>

              <div>
                {dataAll.fechas && dataAll.fechas.map((fechasGrupo, index) => (
                  <div key={index}>
                    {fechasGrupo && fechasGrupo.map((fecha, subIndex) => (
                      <div className="form-group row" key={subIndex}>
                        <div className="col-sm-6">
                          <label htmlFor={`desde_${subIndex}`} className="col-form-label"><strong>Desde:</strong></label>
                          <input type="text" id={`desde_${subIndex}`} readOnly className="form-control-plaintext" defaultValue={fecha.dateFrom} />
                        </div>
                        <div className="col-sm-6">
                          <label htmlFor={`hasta_${subIndex}`} className="col-form-label"><strong>Hasta:</strong></label>
                          <input type="text" id={`hasta_${subIndex}`} readOnly className="form-control-plaintext" defaultValue={fecha.dateTo} />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>


              <div className="form-group">
                <div className="col-sm-6">
                  <label htmlFor="Proveedor" className="col-form-label"><strong>Proveedor:</strong></label>
                  <input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.proveedor} />
                </div>

                <div className="col-sm-6">
                  <label htmlFor="formato" className="col-form-label"><strong>Formato:</strong></label>
                  <input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.formato} />
                </div>
              </div>

              <div className="form-group">
                <div className="col-sm-6 ">
                  <label htmlFor="Zona" className="col-form-label"><strong>Zona:</strong></label>
                  <textarea readOnly className='form-control' value={dataAll.zonas}></textarea>
                </div>

                <div className="col-sm-6 ">
                  <label htmlFor="local" className="col-form-label"><strong>Local:</strong></label>
                  <textarea readOnly className='form-control' value={dataAll.salas}></textarea>
                </div>
              </div>

              <div className="form-group">
                <div className="col-sm-6">
                  <label htmlFor="seccion" className="col-form-label"><strong>Gerencia:</strong></label>
                  <input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.espacio} />
                </div>

                <div className="col-sm-6">
                  <label htmlFor="gerencia" className="col-form-label"><strong>Sección:</strong></label>
                  <input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.seccion} />
                </div>
              </div>

              <div className="form-group">
                <div className="col-sm-6">
                  <label htmlFor="visibilidad_campana" className="col-form-label"><strong>Visibilidad de Campana:</strong></label>
                  <input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.visibilidad} />
                </div>

                <div className="col-sm-6">
                  <label htmlFor="tp_campana" className="col-form-label"><strong>Tipo de Campana:</strong></label>
                  <input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.tp_campana} />
                </div>

              </div>

              <div className="form-group">
                <div className="col-sm-6">
                  <label htmlFor="elementos_campana" className="col-form-label"><strong>Elementos de Campana:</strong></label>
                  <textarea readOnly className='form-control' value={dataAll.elementos}></textarea>
                </div>
              </div>

              <div className="form-group">
                <div className="col-sm-6">

                  <label htmlFor="filenameAreaComercial" className="col-form-label"><strong>Area Comercial</strong></label>
                  {dataAll.filenameAreaComercial && (
                    <div>
                      <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '15px', fontSize: '30px' }} />
                      <span onClick={() => { propsInt.downloadUrl(dataAll.filenameAreaComercial) }} style={{ cursor: 'pointer' }}>
                        {dataAll.filenameAreaComercial.split('/').pop()}
                      </span>
                      <hr style={{ borderColor: 'black' }} />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <div className="col-sm-6">
                  <label htmlFor="filenameOrdenCompra" className="col-form-label"><strong>Orden Compra</strong></label>
                  {dataAll.filenameOrdenCompra && (
                    <div>
                      <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '15px', fontSize: '30px' }} />
                      <span onClick={() => { propsInt.downloadUrl(dataAll.filenameOrdenCompra) }} style={{ cursor: 'pointer' }}>
                        {dataAll.filenameOrdenCompra.split('/').pop()}
                      </span>
                      <hr style={{ borderColor: 'black' }} />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <div className="col-sm-6">
                  <label htmlFor="filenameBasesLegales" className="col-form-label"><strong>Bases Legales</strong></label>
                  {dataAll.filenameBasesLegales && (
                    <div>
                      <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '15px', fontSize: '30px' }} />
                      <span onClick={() => { propsInt.downloadUrl(dataAll.filenameBasesLegales) }} style={{ cursor: 'pointer' }}>
                        {dataAll.filenameBasesLegales.split('/').pop()}
                      </span>
                      <hr style={{ borderColor: 'black' }} />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <div className="col-sm-6">
                  <label htmlFor="filenameMaterial" className="col-form-label"><strong>Material</strong></label>
                  {dataAll.filenameMaterial && (
                    <div>
                      <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '15px', fontSize: '30px' }} />
                      <span onClick={() => { propsInt.downloadUrl(dataAll.filenameMaterial) }} style={{ cursor: 'pointer' }}>
                        {dataAll.filenameMaterial.split('/').pop()}
                      </span>
                      <hr style={{ borderColor: 'black' }} />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <div className="col-sm-6">
                  <label className="col-form-label"><strong>Comentarios Agregados:</strong></label>
                  <div className="cont-historial">
                    {dataAll.campanaComentariosData.map(({ comentario, fecha, usuario }, i) => (
                      <div key={i}>
                        <p className="mb-0"><strong>{usuario}  -  {fecha}</strong></p>
                        <p>{comentario}</p>
                        <br></br>
                      </div>
                    ))}
                  </div>
                </div>
              </div>


              <div className="form-group">
                <div className="col-sm-6">
                  <textarea
                    value={dataAll.comentario_gestion}
                    onChange={propsInt.handleChangeI}
                    className="form-control input-custom"
                    id="comentario_gestion"
                    name="comentario_gestion"
                    placeholder="Ingrese un Comentario"
                    rows="3" // Puedes ajustar el número de filas según sea necesario
                  />
                  {dataAll.errorsForm.comentario_gestion.length > 0 && <span className='error error-class-i'>{dataAll.errorsForm.comentario_gestion}</span>}
                </div>
              </div>


              <div className="form-group">&emsp; &emsp;</div>

              <div className="">
                <button type="button" onClick={() => { propsInt.AprobeCampana(dataAll.id_campana) }} className="btn btn-primary">Aprobar</button>
                <button type="button" onClick={() => { propsInt.RechazarCampana(dataAll.id_campana) }} className="btn btn-warning">Rechazar</button>
                <Link to='/CampanasProveedoresNew'><button type="button" className="btn btn-secondary" data-dismiss="modal">Volver</button></Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

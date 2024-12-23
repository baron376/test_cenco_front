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
import MateriaPOP from './MateriaPOP';
import Dropzone from 'react-dropzone-uploader';
import { withRouter } from 'react-router-dom';


export default withRouter(class SubirPropuesta extends Component {
  state = {
    datefrom: ''
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
      <div className="col-10 tabs cont-height">
        <LoadingOverlay active={dataAll.loading} spinner text='Cargando contenido...' >
          <h2 className="mt-4 mb-4 font-weight-bold pl-3">Subir Campaña {dataAll.name}</h2>
          <form onSubmit={propsInt.handleSubmitBs}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor className="col-sm-2 col-form-label">Cadena:</label>
                <div className="col-sm-6">
                  <input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.cadena} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor className="col-sm-2 col-form-label">Nombre:</label>
                <div className="col-sm-6">
                  <input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.name} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor className="col-sm-2 col-form-label">Vigencia:</label>
                <div className="col-sm-6">
                  <input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.vigencia} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor className="col-sm-2 col-form-label">Proveedor:</label>
                <div className="col-sm-6">
                  <input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.proveedor} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor className="col-sm-2 col-form-label">Sección:</label>
                <div className="col-sm-6">
                  <input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.seccion} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor className="col-sm-2 col-form-label">Zona:</label>
                <div className="col-sm-6">
                  <textarea readOnly className='form-control' value={dataAll.zonas}></textarea>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor className="col-sm-2 col-form-label">Salas:</label>
                <div className="col-sm-6">
                  <input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.salas} />
                </div>
              </div>


              <div className="form-group">
                <label htmlFor className="col-sm-2 col-form-label">Descripción:</label>
                <div className="col-sm-6">
                  <input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.descripcion} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor className="col-sm-2 col-form-label">Espacio Exhibición:</label>
                <div className="col-sm-6">
                  <input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.espacio_exhibicion} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor className="col-sm-2 col-form-label">Zona Exhibición:</label>
                <div className="col-sm-6">
                  <input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.listZonasExhibicionSeleted} />
                </div>
              </div>

              <div className="col-sm-12 col-form-label">
                <button onClick={propsInt.createMaterial.bind(this, 0)} type="button" data-toggle="modal" data-target="#modal-lg" className="btn btn-primary">+ Agregar material POP</button>
                <span className="ml-2 text-danger font-weight-bold">¡Recuerda! Una vez aprobada la campaña debes implementar en el POP el código QR de la autorización.</span>
                {dataAll.errorsExterno.materiales.length > 0 && <span className='error error-class-i'>{dataAll.errorsExterno.materiales}</span>}
              </div>


              <div className="row mt-3 mb-3" >
                <div className="col-sm-2">
                  <label className="col-form-label" >Materiales agregados:</label>
                </div>
                <div className="col-sm-6">
                  <div className="card-deck">
                    {dataAll.carrucelImage64.map(({ name, medida, type, cdc64 }, i) => (
                      <div className="card">
                        <div className="card-body">
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" onClick={() => { propsInt.InactivestaImage(i) }}>X</span>
                          </button>
                          <h5>{name}</h5>
                          <p className="card-text">Medidas: {medida}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>


            <div>

              <div className="form-group row ">
                {/* <label htmlFor className="col-sm-2 col-form-label">Historial de Comentarios:</label> */}
                <div className="col-sm-2">
                  <label className="col-form-label" >Comentarios Agregados:</label>
                </div>
                <div className="col-sm-6 cont-historial">
                  {/* Nuevo (incluye css para estilos lineas del 288 al 298) */}
                  {dataAll.campanaComentariosData.map(({ comentario, fecha, usuario }, i) => (
                    <div>
                      <p className="mb-0"><strong>{usuario}  -  {fecha}</strong></p>
                      <p>{comentario}</p>
                      <br></br>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label for="" className="col-sm-2 col-form-label">Comentarios:</label>
                <div className="col-sm-6">
                  <input type="textarea" value={dataAll.comentario} onChange={propsInt.handleChangeI} className="form-control" id="comentario" name="comentario" placeholder="Ingrese Comentario" />
                  {dataAll.errorsExterno.comentario.length > 0 && <span className='error error-class-i'>{dataAll.errorsExterno.comentario}</span>}
                </div>
              </div>

              <div className="form-group">&emsp; &emsp;</div>
              <div className="form-group row" >
                <div className="">
                  <button type="submit" className="btn btn-primary" onClick="this.props.history.goBack(); console.log('check')" >Guardar</button>
                  <Link to='/CampanasProv'> <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Volver</button> </Link>
                </div>
              </div>
            </div>

          </form>
          <MateriaPOP
            stateFather={propsInt.state}
            isOpen={dataAll.modalIsopen}
            onClose={propsInt.onCloseModal}
            handleSubmitBsMateriales={propsInt.handleSubmitBsMateriales}
            modalTitle={propsInt.modalTitle}
            getUploadParams={propsInt.getUploadParams}
            handleChangeStatus={propsInt.handleChangeStatus}
            handleSubmitFile={propsInt.handleSubmitFile}
            handleChangeI={propsInt.handleChangeI}
            handleSubmitBsModal={propsInt.handleSubmitBsModal}
            clearVarModal={propsInt.clearVarModal}
            onSelectMaterial={propsInt.onSelectMaterial}
            onRemoveMaterial={propsInt.onRemoveMaterial}
          >
          </MateriaPOP>
        </LoadingOverlay>
      </div>
    )
  }
});

import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Multiselect } from 'multiselect-react-dropdown';
import 'react-dropzone-uploader/dist/styles.css';
//import Dropzone from 'react-dropzone-uploader';
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../styles/campanas.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import MateriaPOP from './MateriaPOP';
import { faUpload,faTrash, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import Dropzone from 'react-dropzone-uploader';

export default class SubirPropuesta extends Component {
    state = {
        datefrom:'',
        fechas: []      
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
                    <h2 className="mt-4 mb-4 font-weight-bold pl-3">Subir Campaña {dataAll.name}</h2>
                    <form  onSubmit={propsInt.handleSubmitBs}>
                        <div className="modal-body">
                            
                          <div className="form-group">
                            <div className="col-sm-5">
                              <label htmlFor="cadena" className="col-form-label"><strong>Cadena:</strong></label>
                              <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.cadena} />
                            </div>  

                            <div className="col-sm-5">
                              <label htmlFor="nombre" className="col-form-label"><strong>Nombre campaña:</strong></label>
                              <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.name} />
                            </div> 
                          </div>

                          <div>
                            {dataAll.fechas && dataAll.fechas.map((fechasGrupo, index) => (
                              <div key={index}>
                                {fechasGrupo && fechasGrupo.map((fecha, subIndex) => (
                                  <div className="form-group row" key={subIndex}>
                                    <div className="col-sm-5">
                                      <label htmlFor={`desde_${subIndex}`} className="col-form-label"><strong>Desde:</strong></label>  
                                      <input type="text" id={`desde_${subIndex}`} readOnly className="form-control-plaintext" defaultValue={fecha.dateFrom} />
                                    </div>
                                    <div className="col-sm-5">
                                      <label htmlFor={`hasta_${subIndex}`} className="col-form-label"><strong>Hasta:</strong></label>  
                                      <input type="text" id={`hasta_${subIndex}`} readOnly className="form-control-plaintext" defaultValue={fecha.dateTo} />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>

                            <div className="form-group">
                              <div className="col-sm-5">
                                <label htmlFor="Proveedor" className="col-form-label"><strong>Proveedor:</strong></label>
                                <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.proveedor} />
                              </div>       

                              <div className="col-sm-5">
                                <label htmlFor="formato" className="col-form-label"><strong>Formato:</strong></label>
                                  <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.formato} />
                              </div>
                            </div>

                            <div className="form-group">                      
                                <div className="col-sm-5">
                                  <label htmlFor="Zona" className="col-form-label"><strong>Zona:</strong></label>
                                  <textarea readOnly className='form-control' value={dataAll.zonas}></textarea>
                                </div>

                                <div className="col-sm-12">
                                <label htmlFor="local" className="col-form-label"><strong>Local:</strong></label>
                                  <textarea readOnly className='form-control' value={dataAll.salas} rows="8"></textarea>
                              </div>
                            </div>

                            <div className="form-group">
                              <div className="col-sm-5">
                                <label htmlFor="seccion" className="col-form-label"><strong>Gerencia:</strong></label>
                                <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.espacio} />
                              </div>  
                              <div className="col-sm-5" style={{ display: 'flex', flexDirection: 'column' }}>
                              <label htmlFor="gerencia" className="col-form-label"><strong>Sección:</strong></label>
                              <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                                <input
                                  type="text"
                                  readOnly
                                  className="form-control-plaintext"
                                  defaultValue={dataAll.seccion}
                                  style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', border: 'none' }}
                                />
                              </div>
                            </div>
                              <div className="col-sm-5">
                                <label htmlFor="seccion" className="col-form-label"><strong>Categoría:</strong></label>
                                <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.sub_sesion} />
                              </div> 
                            </div>

                            <div className="form-group">
                              <div className="col-sm-5">  
                                <label htmlFor="tp_campana" className="col-form-label"><strong>Tipo de Campana:</strong></label>
                                <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.tp_campana} />
                              </div>

                              <div className="col-sm-5">
                                <label htmlFor="visibilidad_campana" className="col-form-label"><strong>Visibilidad de Campana:</strong></label>
                                <input type="text" readOnly className="form-control-plaintext"  defaultValue= {dataAll.visibilidad} />
                              </div>
                              
                            </div>

                            <div className="form-group">
                              <div className="col-sm-12">  
                                <label htmlFor="elementos_campana" className="col-form-label"><strong>Elementos de Campana:</strong></label>                              
                                <textarea readOnly className='form-control' value={dataAll.elementos} rows="8"></textarea>
                              </div>
                            </div>  

                            <hr />    

                            <div className="form-group">
                                <div className="col-sm-5">
                                    <label htmlFor="material" className="col-form-label"><strong>Material (Solo archivos .PDF)</strong></label>
                                    <div className="col-form-label">
                                        <label htmlFor="material" className="btn custom-btn" style={{ backgroundColor: 'black', borderRadius: 0 }}>
                                            <input type="file"  accept="application/pdf" className="custom-file-input" id="material" style={{ display: 'none' }} onChange={propsInt.setFileMaterial} />
                                            <FontAwesomeIcon icon={faUpload} style={{ color: 'white' }} /> <span style={{ color: 'white' }}>Cargar Archivo</span>
                                        </label>
                                        <br />
                                        {dataAll.filenamematerial && ( // Muestra el nombre del archivo si existe
                                         <div>
                                            <span>{dataAll.filenamematerial}</span>
                                            <FontAwesomeIcon icon={faTrash} style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }} onClick={propsInt.removeFileMaterial} />
                                        </div>
                                        )}
                                        <br />
                                        {dataAll.filenameMaterial && (
                                           <div>
                                           <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '15px', fontSize: '30px' }} />
                                           <span onClick={() => {propsInt.downloadUrl(dataAll.filenameMaterial)}} style={{cursor: 'pointer'}}>
                                               {dataAll.filenameMaterial.split('/').pop()}
                                           </span>
                                           <hr style={{ borderColor: 'black' }} />
                                         </div>
                                        )}
                                    </div>
                                </div>
                            </div>       

                            <div className="form-group">
                                <div className="col-sm-5">
                                    <label className="col-form-label"><strong>Comentarios Agregados:</strong></label>
                                    <div className="cont-historial">
                                    {dataAll.campanaComentariosData.map(({ comentario , fecha , usuario} , i) =>(
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
                                <div className="col-sm-5">
                                  <textarea 
                                      value={dataAll.comentario} 
                                      onChange={propsInt.handleChangeI} 
                                      className="form-control input-custom" 
                                      id="comentario" 
                                      name="comentario" 
                                      placeholder="Ingrese un Comentario" 
                                      rows="3" // Puedes ajustar el número de filas según sea necesario
                                  />
                                  {dataAll.errorsExterno.comentario.length > 0 && <span className='error error-class-i'>{dataAll.errorsExterno.comentario}</span>}
                                </div>
                            </div>

                            <div className="form-group">&emsp; &emsp;</div>
                            <div className="form-group row" >
                                <div className="">
                                    <button type="submit" className="btn btn-primary">Subir Campaña</button>
                                    <Link to='/CampanasProvNew'> <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Volver</button> </Link>
                                </div>
                            </div>
                        </div> 
                                          
                    </form>
                    <MateriaPOP
                            stateFather={propsInt.state}
                            isOpen={dataAll.modalIsopen} 
                            onClose={propsInt.onCloseModal}
                            handleSubmitBsMateriales = {propsInt.handleSubmitBsMateriales} 
                            modalTitle = {propsInt.modalTitle} 
                            getUploadParams = {propsInt.getUploadParams} 
                            handleChangeStatus = {propsInt.handleChangeStatus} 
                            handleSubmitFile = {propsInt.handleSubmitFile} 
                            handleChangeI = {propsInt.handleChangeI}
                            handleSubmitBsModal = {propsInt.handleSubmitBsModal}
                            clearVarModal = {propsInt.clearVarModal}
                            onSelectMaterial = {propsInt.onSelectMaterial}
                            onRemoveMaterial = {propsInt.onRemoveMaterial}
                          >                            
                    </MateriaPOP>
                </div>
                

        )
    }
}

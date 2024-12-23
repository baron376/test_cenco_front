import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Multiselect } from 'multiselect-react-dropdown';
import 'react-dropzone-uploader/dist/styles.css';
//import Dropzone from 'react-dropzone-uploader';
import { faFileDownload, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../styles/campanas.css';
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import Dropzone from 'react-dropzone-uploader';

export default class VerCampana extends Component {
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
      <div className="col-10 tabs cont-height">
        <form onSubmit={propsInt.handleSubmitBs}>
          <div className="modal-body">
            <table className="style-tables-campanas">
              <thead>
                <tr>
                  <td colspan="2"><h2 className="mt-2 mb-3 font-weight-bold">Campaña {dataAll.name}</h2></td>
                </tr>
              </thead>
              <div className="space-table"></div>
              <tbody>

                <tr>
                  <td className="td-campanas"><label htmlFor="estado" className="col-form-label"><strong>Estado:</strong></label></td>
                  <td><input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.stado_descripcion_estado} /></td>
                </tr>
                <tr>
                  <td><label htmlFor="etapa" className="col-form-label"><strong>Etapa:</strong></label></td>
                  <td> <input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.etapa} /></td>
                </tr>
                <tr>
                  <td><label htmlFor="cadena" className="col-form-label"><strong>Cadena:</strong></label></td>
                  <td><input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.cadena} /></td>
                </tr>
                <tr>
                  <td><label htmlFor="nombre" className="col-form-label"><strong>Nombre:</strong></label></td>
                  <td><input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.name} /></td>
                </tr>
                {dataAll.fechas && dataAll.fechas.map((fechasGrupo, index) => (
                  <tr key={index}>
                    {fechasGrupo && fechasGrupo.map((fecha, subIndex) => (
                      // <>
                      //   <td key={subIndex}>
                      //     <label htmlFor={`desde_${subIndex}`} className="col-form-label"><strong>Desde:</strong></label>
                      //   </td>
                      //   <td key={subIndex}>
                      //     <input type="text" id={`desde_${subIndex}`} readOnly className="form-control-plaintext" defaultValue={fecha.dateFrom} />
                      //   </td>
                      // </>
                      <React.Fragment key={subIndex}>
                      <td>
                        <label htmlFor={`desde_${index}_${subIndex}`} className="col-form-label"><strong>Desde:</strong></label>
                        <input type="text" id={`desde_${index}_${subIndex}`} readOnly className="form-control-plaintext" defaultValue={fecha.dateFrom} />
                      </td>
                      <td>
                        <label htmlFor={`hasta_${index}_${subIndex}`} className="col-form-label"><strong>Hasta:</strong></label>
                        <input type="text" id={`hasta_${index}_${subIndex}`} readOnly className="form-control-plaintext" defaultValue={fecha.dateTo} />
                      </td>
                    </React.Fragment>
                    ))}
                  </tr>
                ))}
               
                <tr>
                  <td><label htmlFor="proveedor" className="col-form-label"><strong>Proveedor:</strong></label></td>
                  <td> <input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.proveedor} /></td>
                </tr>
                <tr>
                  <td><label htmlFor="formato" className="col-form-label"><strong>Formato:</strong></label></td>
                  <td> <input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.formato} /></td>
                </tr>
                <tr>
                  <td><label htmlFor="zona" className="col-form-label"><strong>Zona:</strong></label></td>
                  <td><textarea readOnly className='form-control' value={dataAll.zonas}></textarea></td>
                </tr>
                <tr>
                  <td><label htmlFor="local" className="col-form-label"><strong>Local:</strong></label></td>
                  <td><textarea readOnly className='form-control' value={dataAll.salas}></textarea></td>
                </tr>
                <tr>
                  <td><label htmlFor="seccion" className="col-form-label"><strong>Gerencia:</strong></label></td>
                  <td><input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.espacio} /></td>
                </tr>
                <tr>
                  <td><label htmlFor="gerencia" className="col-form-label"><strong>Sección</strong></label></td>
                  <td><input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.seccion} /></td>
                </tr>
                <tr>
                  <td><label htmlFor="gerencia" className="col-form-label"><strong>Categoría</strong></label></td>
                  <td><input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.sub_sesion} /></td>
                </tr>
                <tr>
                  <td><label htmlFor="visibilidad_campana" className="col-form-label"><strong>Visibilidad de Campana:</strong></label></td>
                  <td><input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.visibilidad} /></td>
                </tr>
                <tr>
                  <td><label htmlFor="tp_campana" className="col-form-label"><strong>Tipo de Campana:</strong></label></td>
                  <td><input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.tp_campana} /></td>
                </tr>
                <tr>
                  <td><label htmlFor="elementos_campana" className="col-form-label"><strong>Elementos de Campana:</strong></label></td>
                  <td><textarea readOnly className='form-control' value={dataAll.elementos}></textarea></td>
                </tr>
                <tr>
                  <td><label htmlFor="filenameAreaComercial" className="col-form-label"><strong>Area Comercial</strong></label></td>
                  <td>
                    {dataAll.filenameAreaComercial && (
                      <div>
                        <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '15px', fontSize: '30px' }} />
                        <span onClick={() => { propsInt.downloadUrl(dataAll.filenameAreaComercial) }} style={{ cursor: 'pointer' }}>
                          {dataAll.filenameAreaComercial.split('/').pop()}
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td><label htmlFor="filenameOrdenCompra" className="col-form-label"><strong>Orden Compra</strong></label></td>
                  <td>{dataAll.filenameOrdenCompra && (
                    <div>
                      <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '15px', fontSize: '30px' }} />
                      <span onClick={() => { propsInt.downloadUrl(dataAll.filenameOrdenCompra) }} style={{ cursor: 'pointer' }}>
                        {dataAll.filenameOrdenCompra.split('/').pop()}
                      </span>
                    </div>
                  )}</td>
                </tr>
                <tr>
                  <td><label htmlFor="filenameBasesLegales" className="col-form-label"><strong>Bases Legales</strong></label></td>
                  <td>{dataAll.filenameBasesLegales && (
                    <div>
                      <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '15px', fontSize: '30px' }} />
                      <span onClick={() => { propsInt.downloadUrl(dataAll.filenameBasesLegales) }} style={{ cursor: 'pointer' }}>
                        {dataAll.filenameBasesLegales.split('/').pop()}
                      </span>
                    </div>

                  )}</td>
                </tr>
                <tr>
                  <td><label htmlFor="filenameMaterial" className="col-form-label"><strong>Material</strong></label> </td>
                  <td>{dataAll.filenameMaterial && (
                    <div>
                      <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '15px', fontSize: '30px' }} />
                      <span onClick={() => { propsInt.downloadUrl(dataAll.filenameMaterial) }} style={{ cursor: 'pointer' }}>
                        {dataAll.filenameMaterial.split('/').pop()}
                      </span>
                    </div>
                  )}</td>
                </tr>
                <tr className="border-none">
                  <td>
                    <label className="col-form-label"><strong>Comentarios Agregados:</strong></label>
                  </td>
                  <td><div className="cont-historial">
                    {dataAll.campanaComentariosData.map(({ comentario, fecha, usuario }, i) => (
                      <div key={i}>
                        <p className="mb-0"><strong>{usuario}  -  {fecha}</strong></p>
                        <p>{comentario}</p>
                        <br></br>
                      </div>
                    ))}
                  </div></td>
                </tr>
              </tbody>
            </table>




          </div>
          <div>
            <div className="form-group">&emsp; &emsp;</div>
            <div className="form-group row" >
              <div className="">
                <Link to='/CampanasProveedoresNew'> <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Volver</button> </Link>
              </div>
            </div>
          </div>

        </form>
      </div>


    )
  }
}

import React, { Component } from 'react';
import env from 'react-dotenv';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import LoadingOverlay from 'react-loading-overlay';

export default class ShowFaldonesExpress extends Component {
    render() {
        const dataAll = this.props.state;
        const propsInt = this.props;
        const BaseUrl = env.REACT_APP_BASE_URL;
        return (
            <React.Fragment>
                <div className="col-10 tabs">
                    <h2 className="mt-4 mb-4">Faldón</h2>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a
                                className="nav-link active"
                                id="eliminados-tab"
                                data-toggle="tab"
                                href="#eliminados"
                                role="tab"
                                aria-controls="eliminados"
                                aria-selected="false"
                            >
                                Detalles Faldón
                            </a>
                        </li>
                        <div className="d-flex col justify-content-end pr-0">
                            <Link to="/FaldonesExpress">
                                <button
                                    type="button"
                                    data-toggle="modal"
                                    data-target="#modal-lg"
                                    className="btn btn-danger"
                                >
                                    Volver
                                </button>
                            </Link>
                        </div>
                    </ul>
                    <LoadingOverlay active={dataAll.loadingFaldones} spinner text="Cargando contenido...">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="eliminados" role="tabpanel" aria-labelledby="eliminados-tab">
                                <div className="modal-body">

                                <table className="style-tables-campanas">
                                    <thead>
                                    </thead>
                                    <div className="space-table"></div>
                                    <tbody>
                                        <tr>
                                            <td className="td-campanas"><label htmlFor="estado" className="col-form-label"><strong>Estado:</strong></label></td>
                                            <td><input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.estadoFaldon} /></td>
                                        </tr>
                                        <tr>
                                            <td className="td-campanas"><label htmlFor="cadena" className="col-form-label"><strong>Cadena:</strong></label></td>
                                            <td><input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.cadenaFaldon} /></td>
                                        </tr>
                                        <tr>
                                            <td className="td-campanas"><label htmlFor="plantilla" className="col-form-label"><strong>Plantilla:</strong></label></td>
                                            <td><input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.plantillaFaldon} /></td>
                                        </tr>
                                        <tr>
                                            <td className="td-campanas"><label htmlFor="plantilla" className="col-form-label"><strong>Formato:</strong></label></td>
                                            <td><input type="text" readOnly className="form-control-plaintext" defaultValue={dataAll.formatoFaldon} /></td>
                                        </tr>
                                    </tbody>
                                </table>
                                
                                {dataAll.faldones && dataAll.faldones.length > 0 && (
                                    dataAll.faldones.map((faldon, index) => (
                                        <React.Fragment key={index}>
                                            <h1 className="faldon-title">Faldón {index + 1}</h1>
                                            <table className="style-tables-campanas">
                                                <thead></thead>
                                                <div className="space-table"></div>
                                                    <tbody>
                                                        <tr>
                                                            <td className="td-campanas">
                                                                <label htmlFor="cuotas" className="col-form-label"><strong>Financiamiento:</strong></label>
                                                            </td>
                                                            <td><input type="text" readOnly className="form-control-plaintext" defaultValue={faldon.financiamiento ? "Si" : "No"} /></td>
                                                        </tr>

                                                        {faldon.financiamiento && (
                                                            <>
                                                                <tr>
                                                                    <td className="td-campanas">
                                                                        <label htmlFor="cuotas" className="col-form-label"><strong>Cuotas:</strong></label>
                                                                    </td>
                                                                    <td><input type="text" readOnly className="form-control-plaintext" defaultValue={faldon.cuotas} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="td-campanas">
                                                                        <label htmlFor="cae" className="col-form-label"><strong>CAE:</strong></label>
                                                                    </td>
                                                                    <td><input type="text" readOnly className="form-control-plaintext" defaultValue={faldon.cae} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="td-campanas">
                                                                        <label htmlFor="valor_cuota" className="col-form-label"><strong>Valor Cuota:</strong></label>
                                                                    </td>
                                                                    <td><input type="text" readOnly className="form-control-plaintext" defaultValue={faldon.valor_cuota} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="td-campanas">
                                                                        <label htmlFor="costo_total" className="col-form-label"><strong>Costo Total:</strong></label>
                                                                    </td>
                                                                    <td><input type="text" readOnly className="form-control-plaintext" defaultValue={faldon.costo_total} /></td>
                                                                </tr>
                                                            </>
                                                        )}
                                                        <tr>
                                                            <td className="td-campanas">
                                                                <label htmlFor="nombre" className="col-form-label"><strong>Nombre genérico oferta:</strong></label>
                                                            </td>
                                                            <td><input type="text" readOnly className="form-control-plaintext" defaultValue={faldon.nombre} /></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="td-campanas">
                                                                <label htmlFor="cod_barra" className="col-form-label"><strong>SAP código de barra:</strong></label>
                                                            </td>
                                                            <td><input type="text" readOnly className="form-control-plaintext" defaultValue={faldon.cod_barra} /></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="td-campanas">
                                                                <label htmlFor="umb" className="col-form-label"><strong>UMB:</strong></label>
                                                            </td>
                                                            <td><input type="text" readOnly className="form-control-plaintext" defaultValue={faldon.umb} /></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="td-campanas">
                                                                <label htmlFor="precio_referencia" className="col-form-label"><strong>Precio Referencia:</strong></label>
                                                            </td>
                                                            <td><input type="text" readOnly className="form-control-plaintext" defaultValue={faldon.precio_referencia} /></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="td-campanas">
                                                                <label htmlFor="tipo_promo" className="col-form-label"><strong>Tipos Promo:</strong></label>
                                                            </td>
                                                            <td><input type="text" readOnly className="form-control-plaintext" defaultValue={faldon.tipo_promo} /></td>
                                                        </tr>
                                                        {faldon.pack && ( // Verificar si pack es true
                                                            <tr>
                                                                <td className="td-campanas">
                                                                    <label htmlFor="combinacionFaldon" className="col-form-label"><strong>Combinación:</strong></label>
                                                                </td>
                                                                <td><input type="text" readOnly className="form-control-plaintext" defaultValue={faldon.combinacion} /></td>
                                                            </tr>
                                                        )}
                                                        <tr>
                                                            <td className="td-campanas">
                                                                <label htmlFor="tmp" className="col-form-label"><strong>Tmp:</strong></label>
                                                            </td>
                                                            <td><input type="text" readOnly className="form-control-plaintext" defaultValue={faldon.tmp} /></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="td-campanas">
                                                                <label htmlFor="tc" className="col-form-label"><strong>TC:</strong></label>
                                                            </td>
                                                            <td><input type="text" readOnly className="form-control-plaintext" defaultValue={faldon.tc} /></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="td-campanas">
                                                                <label htmlFor="desde" className="col-form-label"><strong>Desde:</strong></label>
                                                            </td>
                                                            <td><input type="text" readOnly className="form-control-plaintext" defaultValue={faldon.fechaInicioPromoFaldon} /></td>
                                                        </tr>

                                                        <tr>
                                                            <td className="td-campanas">
                                                                <label htmlFor="hasta" className="col-form-label"><strong>Hasta:</strong></label>
                                                            </td>
                                                            <td><input type="text" readOnly className="form-control-plaintext" defaultValue={faldon.fechaTerminoFaldon} /></td>
                                                        </tr>
                                                    </tbody>
                                            </table>
                                        </React.Fragment>
                                    ))
                                )}
                                </div>
                            </div>
                        </div>
                    </LoadingOverlay>
                </div>
            </React.Fragment>
        );
    }
}

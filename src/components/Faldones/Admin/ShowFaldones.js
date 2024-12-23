import React, { Component } from 'react'

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { faFileExcel} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import env from "react-dotenv";

export default class ShowFaldones extends Component {
    render() {
        const { SearchBar } = Search;
        const dataAll = this.props.state;
        const propsInt = this.props;
        const BaseUrl = env.REACT_APP_BASE_URL;
        const optionsProductos = {
            custom: true,
            paginationSize: 3,
            pageStartIndex: 1,
            firstPageText: 'Primera',
            prePageText: 'Anterior',
            nextPageText: 'Siguiente',
            lastPageText: 'Ultima',
            nextPageTitle: 'Primera PAgina',
            prePageTitle: 'Pagina Anterior',
            firstPageTitle: 'Pagina Siguiente',
            lastPageTitle: 'Ultima PAgina',
            totalSize: dataAll.productos.length,
            sizePerPageList :[ {
                text: '5', value: 5
              }, {
                text: '10', value: 10
              }, {
                text: 'All', value: dataAll.productos.length
              } ]
        };
        const optionsAlertas = {
            custom: true,
            paginationSize: 3,
            pageStartIndex: 1,
            firstPageText: 'Primera',
            prePageText: 'Anterior',
            nextPageText: 'Siguiente',
            lastPageText: 'Ultima',
            nextPageTitle: 'Primera PAgina',
            prePageTitle: 'Pagina Anterior',
            firstPageTitle: 'Pagina Siguiente',
            lastPageTitle: 'Ultima PAgina',
            totalSize: dataAll.alertasArchivoCampana.length,
            sizePerPageList :[ {
                text: '5', value: 5
              }, {
                text: '10', value: 10
              }, {
                text: 'All', value: dataAll.alertasArchivoCampana.length
              } ]
        };
        const optionsRechazos = {
            custom: true,
            paginationSize: 3,
            pageStartIndex: 1,
            firstPageText: 'Primera',
            prePageText: 'Anterior',
            nextPageText: 'Siguiente',
            lastPageText: 'Ultima',
            nextPageTitle: 'Primera PAgina',
            prePageTitle: 'Pagina Anterior',
            firstPageTitle: 'Pagina Siguiente',
            lastPageTitle: 'Ultima PAgina',
            totalSize: dataAll.rechazosArchivoCampana.length,
            sizePerPageList :[ {
                text: '5', value: 5
              }, {
                text: '10', value: 10
              }, {
                text: 'All', value: dataAll.rechazosArchivoCampana.length
              } ]
        };
        const contentTableProducto = ({ paginationProps, paginationTableProps }) => (
            <div>
              <ToolkitProvider keyField="id" columns={ dataAll.headData } data={ dataAll.productos } search >
                {toolkitprops => (
                    <div>
                      <SearchBar { ...toolkitprops.searchProps }  placeholder='Buscar' />
                      <BootstrapTable striped hover { ...toolkitprops.baseProps } { ...paginationTableProps }/>
                    </div>
                  )
                }
              </ToolkitProvider>
              <PaginationListStandalone { ...paginationProps } />
            </div>
        );
        const contentTableAlertas = ({ paginationProps, paginationTableProps }) => (
            <div>
              <ToolkitProvider keyField="id" columns={ dataAll.headDataAlertas } data={ dataAll.alertasArchivoCampana } search >
                {toolkitprops => (
                    <div>
                      <SearchBar { ...toolkitprops.searchProps }  placeholder='Buscar' />
                      <BootstrapTable striped hover { ...toolkitprops.baseProps } { ...paginationTableProps }/>
                    </div>
                  )
                }
              </ToolkitProvider>
              <PaginationListStandalone { ...paginationProps } />
            </div>
        )
        const contentTableRechazos = ({ paginationProps, paginationTableProps }) => (
            <div>
              <ToolkitProvider keyField="id" columns={ dataAll.headDataRechazos } data={ dataAll.rechazosArchivoCampana } search >
                {toolkitprops => (
                    <div>
                      <SearchBar { ...toolkitprops.searchProps }  placeholder='Buscar' />
                      <BootstrapTable striped hover { ...toolkitprops.baseProps } { ...paginationTableProps }/>
                    </div>
                  )
                }
              </ToolkitProvider>
              <PaginationListStandalone { ...paginationProps } />
            </div>
        )
        return (
            <React.Fragment>
             
                <div className="col-10 tabs">
                    <h2 className="mt-4 mb-4">Campaña {dataAll.nombreCampana}</h2>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="activos-tab" data-toggle="tab" href="#activos" role="tab" aria-controls="activos" aria-selected="true">Productos</a>
                        </li>
                        <li className="nav-item" role="presentation">
                        <a className="nav-link" id="eliminados-tab" data-toggle="tab" href="#eliminados" role="tab" aria-controls="eliminados" aria-selected="false">Detalles Campaña</a>
                        </li>
                        {dataAll.boleanExistAlertasArchivoCampana &&
                        <li className="nav-item" role="presentation">
                        <a className="nav-link" id="alertas-tab" data-toggle="tab" href="#alertas" role="tab" aria-controls="alertas" aria-selected="false">Alertas productos</a>
                        </li>
                        }
                        {dataAll.boleanExistRechazosArchivoCampana &&
                        <li className="nav-item" role="presentation">
                        <a className="nav-link" id="rechazos-tab" data-toggle="tab" href="#rechazos" role="tab" aria-controls="rechazos" aria-selected="false">Rechazos productos</a>
                        </li>
                        }
                        <div className="d-flex col justify-content-end pr-0">
                         <Link to='/Faldones'> <button  type="button" data-toggle="modal" data-target="#modal-lg" className="btn btn-danger">Volver</button> </Link>
                        </div>
                    </ul>
                    <LoadingOverlay active={dataAll.loadingFaldones} spinner text='Cargando contenido...' >
                    <LoadingOverlay active={dataAll.loadingDescarga} spinner text='Descargando Archivo por favor espere...' >
                    <div className="tab-content" id="myTabContent">                    
                  
                        <div className="tab-pane fade" id="eliminados" role="tabpanel" aria-labelledby="eliminados-tab">  
                        <div className="modal-body">
                            <div className="form-group mb-4">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-3 fw-600">Nombre:</div>
                                <div className="col-sm-8">{dataAll.nombreCampana}</div>
                            </div>
                            <div className="form-group mb-4">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-3 fw-600">Archivo excel campaña:</div>
                                <div className="col-sm-8"> <a target="_blank" href={`${BaseUrl}/${dataAll.urlArchivoExcel}`}><button  title="Descargar Excel" className="btn btn btn-success actions-icons-t" data-toggle="modal" data-target="#modal-lg"  ><FontAwesomeIcon icon={faFileExcel}/></button></a></div>
                            </div>
                            <div className="form-group mb-4">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-3 fw-600">Estado:</div>
                                <div className="col-sm-8">{dataAll.stateCampana}</div>
                            </div>
                            <div className="form-group mb-4">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-3 fw-600">Cadena:</div>
                                <div className="col-sm-8">{dataAll.cadenaCampana}</div>
                            </div>
                            <div className="form-group mb-4">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-3 fw-600">Formato:</div>
                                <div className="col-sm-8">{dataAll.formatCampana}</div>
                            </div>
                            <div className="form-group mb-4">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-3 fw-600">Plantilla:</div>
                                <div className="col-sm-8">{dataAll.plantillaCampana}</div>
                            </div>
                            <div className="form-group mb-4">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-3 fw-600">Tipo Campaña:</div>
                                <div className="col-sm-8">{dataAll.typeCampana}</div>
                            </div>
                            <div className="form-group mb-4">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-3 fw-600">QR:</div>
                                <div className="col-sm-8">{dataAll.qr}</div>
                            </div>
                            <div className="form-group mb-4">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-3 fw-600">Fecha de creación de la campaña:</div>
                                <div className="col-sm-8">{dataAll.dateCreatedCampana}</div>
                            </div>
                            <div className="form-group mb-4">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-3 fw-600">Usuario Creador Campaña:</div>
                                <div className="col-sm-8">{dataAll.userCreatedCampana}</div>
                            </div>
                            <div className="form-group mb-4">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-3 fw-600">Fecha ultima actualización Campaña:</div>
                                <div className="col-sm-8">{dataAll.dateLastUpdateCampana}</div>
                            </div>
                            <div className="form-group mb-4">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-3 fw-600">Ultimo usuario actualizo Campaña:</div>
                                <div className="col-sm-8">{dataAll.userUpdateCampana}</div>
                            </div>
                            <div className="form-group mb-4">
                            <div className="col-sm-1"></div>
                                <div className="col-sm-3 fw-600">Vigencia de la campaña:</div>
                                <div className="col-sm-8">desde : {dataAll.dateInitCampana} - hasta : {dataAll.dateFinishCampana} </div>
                            </div>
                        </div>
                        </div>
                        {dataAll.boleanExistAlertasArchivoCampana &&
                        <div className="tab-pane fade" id="alertas" role="tabpanel" aria-labelledby="alertas-tab">
                            <PaginationProvider pagination={paginationFactory(optionsAlertas)}>
                                { contentTableAlertas }
                            </PaginationProvider>
                        </div>
                        }
                        {dataAll.boleanExistRechazosArchivoCampana &&
                        <div className="tab-pane fade" id="rechazos" role="tabpanel" aria-labelledby="rechazos-tab">
                        <PaginationProvider pagination={paginationFactory(optionsRechazos)}>
                                { contentTableRechazos }
                            </PaginationProvider>
                        </div>
                        }
                    </div>
                    </LoadingOverlay>
                    </LoadingOverlay>
                  </div>
            </React.Fragment>
        )
    }
}

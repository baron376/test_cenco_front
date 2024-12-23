import React, { Component } from 'react'

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {hasPermission} from '../../../util/auth';
import NotAuthorized from '../../layout/NotAuthorized';
export default class AdminMantencion extends Component {
    render() {
        const { SearchBar } = Search;
        const dataAll = this.props.state;
        const propsInt = this.props;

        const optionsActive = {
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
            totalSize: dataAll.dataActive.length,
            sizePerPageList :[ {
                text: '10', value: 10
              }, {
                text: '5', value: 5
              }, {
                text: 'All', value: dataAll.dataActive.length
              } ]
        };
        const optionsDeleted = {
            custom: true,
            paginationSize: 3,
            pageStartIndex: 1,
            firstPageText: 'First',
            prePageText: 'Anterior',
            nextPageText: 'Siguiente',
            lastPageText: 'Last',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
            totalSize: dataAll.dataDeteted.length,
            sizePerPageList :[ {
                text: '10', value: 10
              }, {
                text: '5', value: 5
              }, {
                text: 'All', value: dataAll.dataDeteted.length
              } ]
        };
        const optionsUp = {
          custom: true,
          paginationSize: 3,
          pageStartIndex: 1,
          firstPageText: 'First',
          prePageText: 'Anterior',
          nextPageText: 'Siguiente',
          lastPageText: 'Last',
          nextPageTitle: 'First page',
          prePageTitle: 'Pre page',
          firstPageTitle: 'Next page',
          lastPageTitle: 'Last page',
          totalSize: dataAll.dataUp.length,
          sizePerPageList :[ {
              text: '10', value: 10
            }, {
              text: '5', value: 5
            }, {
              text: 'All', value: dataAll.dataUp.length
            } ]
        };
        const optionsAprove = {
          custom: true,
          paginationSize: 3,
          pageStartIndex: 1,
          firstPageText: 'First',
          prePageText: 'Anterior',
          nextPageText: 'Siguiente',
          lastPageText: 'Last',
          nextPageTitle: 'First page',
          prePageTitle: 'Pre page',
          firstPageTitle: 'Next page',
          lastPageTitle: 'Last page',
          totalSize: dataAll.dataUp.length,
          sizePerPageList :[ {
              text: '10', value: 10
            }, {
              text: '5', value: 5
            }, {
              text: 'All', value: dataAll.dataUp.length
            } ]
        };
        const optionsRefuse = {
          custom: true,
          paginationSize: 3,
          pageStartIndex: 1,
          firstPageText: 'First',
          prePageText: 'Anterior',
          nextPageText: 'Siguiente',
          lastPageText: 'Last',
          nextPageTitle: 'First page',
          prePageTitle: 'Pre page',
          firstPageTitle: 'Next page',
          lastPageTitle: 'Last page',
          totalSize: dataAll.dataUp.length,
          sizePerPageList :[ {
              text: '10', value: 10
            }, {
              text: '5', value: 5
            }, {
              text: 'All', value: dataAll.dataUp.length
            } ]
        };
        const optionsEnded = {
          custom: true,
          paginationSize: 3,
          pageStartIndex: 1,
          firstPageText: 'First',
          prePageText: 'Anterior',
          nextPageText: 'Siguiente',
          lastPageText: 'Last',
          nextPageTitle: 'First page',
          prePageTitle: 'Pre page',
          firstPageTitle: 'Next page',
          lastPageTitle: 'Last page',
          totalSize: dataAll.dataUp.length,
          sizePerPageList :[ {
              text: '10', value: 10
            }, {
              text: '5', value: 5
            }, {
              text: 'All', value: dataAll.dataUp.length
            } ]
        };
        const contentTableActive = ({ paginationProps, paginationTableProps }) => (
            <div>
              <ToolkitProvider keyField="id" columns={ dataAll.headData } data={ dataAll.dataActive } search >
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
        const contentTableDeleted = ({ paginationProps, paginationTableProps }) => (
            <div>
              <ToolkitProvider keyField="id" columns={ dataAll.headData } data={ dataAll.dataDeteted } search >
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
        const contentTableUp = ({ paginationProps, paginationTableProps }) => (
          <div>
            <ToolkitProvider keyField="id" columns={ dataAll.headData } data={ dataAll.dataUp } search >
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

        const contentTableliberadas = ({ paginationProps, paginationTableProps }) => (
          <div>
            <ToolkitProvider keyField="id" columns={ dataAll.headData } data={ dataAll.dataLiveradas } search >
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

        const contentTableDevueltas = ({ paginationProps, paginationTableProps }) => (
          <div>
            <ToolkitProvider keyField="id" columns={ dataAll.headData } data={ dataAll.dataDevueltas } search >
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

        const contentTableAprobe = ({ paginationProps, paginationTableProps }) => (
          <div>
            <ToolkitProvider keyField="id" columns={ dataAll.headData } data={ dataAll.dataAprobe } search >
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

        const contentTableRefuse = ({ paginationProps, paginationTableProps }) => (
          <div>
            <ToolkitProvider keyField="id" columns={ dataAll.headData } data={ dataAll.dataRefuse } search >
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

        const contentTableEnded = ({ paginationProps, paginationTableProps }) => (
          <div>
            <ToolkitProvider keyField="id" columns={ dataAll.headData } data={ dataAll.dataEnded } search >
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
        return (
            <React.Fragment>
             
                <div className="col-10 tabs">
                  {hasPermission([700,707,708,709,710,711,712,716]) ?
                    <div >
                      <h2 className="d-flex justify-content-between mt-4 mb-4">Mantenciones
                        {hasPermission([701]) &&
                          <Link to='/CrearMantencion'> <button  type="button" data-toggle="modal" data-target="#modal-lg" className="btn btn-primary">Crear Mantenciones</button> </Link>
                        }
                      </h2>
                      <ul className="nav nav-tabs" id="myTab" role="tablist">
                          {hasPermission([700]) &&
                            <li className="nav-item" role="presentation">
                              <a className="nav-link active" id="activos-tab" data-toggle="tab" href="#activos" role="tab" aria-controls="activos" aria-selected="true">Todas</a>
                            </li>
                          }
                          {(hasPermission([707]) && !hasPermission([700])) &&
                            <li className="nav-item" role="presentation">
                              <a className="nav-link active" id="subidas-tab" data-toggle="tab" href="#subidas" role="tab" aria-controls="subidas" aria-selected="false">En revisión</a>
                            </li>
                          }
                          {(hasPermission([707]) && hasPermission([700])) &&
                            <li className="nav-item" role="presentation">
                              <a className="nav-link" id="subidas-tab" data-toggle="tab" href="#subidas" role="tab" aria-controls="subidas" aria-selected="false">En revisión</a>
                            </li>
                          }
                          {hasPermission([708]) &&
                            <li className="nav-item" role="presentation">
                              <a className="nav-link" id="liveradas-tab" data-toggle="tab" href="#liveradas" role="tab" aria-controls="liveradas" aria-selected="false">En cotización</a>
                            </li>
                          }
                          {hasPermission([709]) &&
                            <li className="nav-item" role="presentation">
                              <a className="nav-link" id="devueltas-tab" data-toggle="tab" href="#devueltas" role="tab" aria-controls="devueltas" aria-selected="false">Devueltas</a>
                            </li>
                          }
                          {hasPermission([710]) &&
                            <li className="nav-item" role="presentation">
                              <a className="nav-link" id="aceptados-tab" data-toggle="tab" href="#aceptados" role="tab" aria-controls="aceptados" aria-selected="false">Aprobadas</a>
                            </li>
                          }
                          {hasPermission([711]) &&
                            <li className="nav-item" role="presentation">
                              <a className="nav-link" id="rechazados-tab" data-toggle="tab" href="#rechazados" role="tab" aria-controls="rechazados" aria-selected="false">Rechazadas</a>
                            </li>
                          }
                          {hasPermission([712]) &&
                            <li className="nav-item" role="presentation">
                              <a className="nav-link" id="finalizados-tab" data-toggle="tab" href="#finalizados" role="tab" aria-controls="finalizados" aria-selected="false">Finalizadas</a>
                            </li>
                          }
                          {hasPermission([716]) &&
                            <li className="nav-item" role="presentation">
                              <a className="nav-link" id="eliminadas-tab" data-toggle="tab" href="#eliminadas" role="tab" aria-controls="eliminadas" aria-selected="false">Eliminadas</a>
                            </li>
                          }
                      </ul>
                      <LoadingOverlay active={dataAll.loadingFaldones} spinner text='Cargando contenido...' >
                        <div className="tab-content" id="myTabContent">
                            {hasPermission([700]) &&
                              <div className="tab-pane fade show active" id="activos" role="tabpanel" aria-labelledby="activos-tab">
                                <PaginationProvider pagination={paginationFactory(optionsActive)}>
                                  { contentTableActive }
                                </PaginationProvider>
                              </div>
                            }
                            {(hasPermission([707]) && !hasPermission([700])) &&
                              <div className="tab-pane fade show active" id="subidas" role="tabpanel" aria-labelledby="subidas-tab">
                                <PaginationProvider pagination={paginationFactory(optionsUp)}>
                                  { contentTableUp }
                                </PaginationProvider>
                              </div>
                            }
                            {(hasPermission([707]) && hasPermission([700])) &&
                              <div className="tab-pane fade" id="subidas" role="tabpanel" aria-labelledby="subidas-tab">
                                <PaginationProvider pagination={paginationFactory(optionsUp)}>
                                  { contentTableUp }
                                </PaginationProvider>
                              </div>
                            }
                            {hasPermission([708]) &&
                              <div className="tab-pane fade" id="liveradas" role="tabpanel" aria-labelledby="liveradas-tab">
                                <PaginationProvider pagination={paginationFactory(optionsUp)}>
                                  { contentTableliberadas }
                                </PaginationProvider>
                              </div>
                            }
                            {hasPermission([709]) &&
                              <div className="tab-pane fade" id="devueltas" role="tabpanel" aria-labelledby="devueltas-tab">
                                <PaginationProvider pagination={paginationFactory(optionsUp)}>
                                  { contentTableDevueltas }
                                </PaginationProvider>
                              </div>
                            }
                            {hasPermission([710]) &&
                            <div className="tab-pane fade" id="aceptados" role="tabpanel" aria-labelledby="aceptados-tab">
                              <PaginationProvider pagination={paginationFactory(optionsAprove)}>
                                { contentTableAprobe }
                              </PaginationProvider>
                            </div>
                            }
                            {hasPermission([711]) &&
                              <div className="tab-pane fade" id="rechazados" role="tabpanel" aria-labelledby="rechazados-tab">
                                <PaginationProvider pagination={paginationFactory(optionsRefuse)}>
                                  { contentTableRefuse }
                                </PaginationProvider>
                              </div>
                            }
                            {hasPermission([712]) &&
                              <div className="tab-pane fade" id="finalizados" role="tabpanel" aria-labelledby="finalizados-tab">
                                <PaginationProvider pagination={paginationFactory(optionsEnded)}>
                                  { contentTableEnded }
                                </PaginationProvider>
                              </div>
                            }
                            {hasPermission([716]) &&
                              <div className="tab-pane fade" id="eliminadas" role="tabpanel" aria-labelledby="eliminadas-tab">
                                <PaginationProvider pagination={paginationFactory(optionsDeleted)}>
                                  { contentTableDeleted }
                                </PaginationProvider>
                              </div>
                            }
                        </div>
                      </LoadingOverlay>
                    </div>
                    :<NotAuthorized></NotAuthorized>
                  }
                </div>
            </React.Fragment>
        )
    }
}

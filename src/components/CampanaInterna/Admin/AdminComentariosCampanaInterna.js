import React, { Component } from 'react'

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {hasPermission} from '../../../util/auth';
//import SubirPropuesta from './SubirPropuesta';
import NotAuthorized from '../../layout/NotAuthorized';
export default class AdminComentariosCampanaInterna extends Component {
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
        return (
            <React.Fragment>
             
                <div className="col-10 tabs">
                {hasPermission([800]) ?
                  <div >
                    <h2 className="mt-4 mb-4">Comentarios</h2>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="activos-tab" data-toggle="tab" href="#activos" role="tab" aria-controls="activos" aria-selected="true">Todos</a>
                        </li>
                        {/* <li className="nav-item" role="presentation">
                        <a className="nav-link" id="subidas-tab" data-toggle="tab" href="#subidas" role="tab" aria-controls="subidas" aria-selected="false">Subidas</a>
                        </li> */}
                        <li className="nav-item" role="presentation">
                        <a className="nav-link" id="eliminados-tab" data-toggle="tab" href="#eliminados" role="tab" aria-controls="eliminados" aria-selected="false">Eliminados</a>
                        </li>
                        <div className="d-flex col justify-content-end pr-0">
                          <Link to='/CampanaInterna'> <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Volver</button> </Link>
                        </div>
                    </ul>
                    <LoadingOverlay active={dataAll.loadingFaldones} spinner text='Cargando contenido...' >
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="activos" role="tabpanel" aria-labelledby="activos-tab">
                                <PaginationProvider pagination={paginationFactory(optionsActive)}>
                                { contentTableActive }
                                </PaginationProvider>
                        </div>
                        <div className="tab-pane fade show subidas" id="subidas" role="tabpanel" aria-labelledby="subidas-tab">
                                <PaginationProvider pagination={paginationFactory(optionsUp)}>
                                { contentTableUp }
                                </PaginationProvider>
                        </div>
                        <div className="tab-pane fade" id="eliminados" role="tabpanel" aria-labelledby="eliminados-tab">
                                <PaginationProvider pagination={paginationFactory(optionsDeleted)}>
                                { contentTableDeleted }
                                </PaginationProvider>
                        </div>
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

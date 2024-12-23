import React, { Component } from 'react'

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import env from "react-dotenv";
import {hasPermission} from '../../../util/auth';

export default class FaldonesExpress extends Component {
    render() {
        const { SearchBar } = Search;
        const dataAll = this.props.state;

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
        return (
            <React.Fragment>
            <div className="col-10 tabs">
            <LoadingOverlay active={dataAll.loadingDescarga} spinner text='Descargando archivo por favor espere ...' >
                <h2 className="d-flex justify-content-between mt-4 mb-4">Faldones Express 
                  {hasPermission([402]) &&
                      <Link to='/CrearFaldonExpress'> <button  type="button" data-toggle="modal" data-target="#modal-lg" className="btn btn-primary">Crear Faldones</button> </Link>
                  }

                </h2>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                    <a className="nav-link active" id="activos-tab" data-toggle="tab" href="#activos" role="tab" aria-controls="activos" aria-selected="true">Todos</a>
                    </li>
                    <li className="nav-item" role="presentation">
                    <a className="nav-link" id="eliminados-tab" data-toggle="tab" href="#eliminados" role="tab" aria-controls="eliminados" aria-selected="false">Eliminados</a>
                    </li>
                </ul>
                <LoadingOverlay active={dataAll.loadingFaldones} spinner text='Cargando contenido...' >
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="activos" role="tabpanel" aria-labelledby="activos-tab">
                            <PaginationProvider pagination={paginationFactory(optionsActive)}>
                            { contentTableActive }
                            </PaginationProvider>
                    </div>
                    <div className="tab-pane fade" id="eliminados" role="tabpanel" aria-labelledby="eliminados-tab">
                            <PaginationProvider pagination={paginationFactory(optionsDeleted)}>
                            { contentTableDeleted }
                            </PaginationProvider>
                    </div>
                </div>
                </LoadingOverlay>
                </LoadingOverlay>
              </div>
        </React.Fragment> 
        )
    }
}

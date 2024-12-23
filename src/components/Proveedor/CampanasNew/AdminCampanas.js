import React, { Component } from 'react'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import LoadingOverlay from 'react-loading-overlay';
export default class AdminCampanas extends Component {
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
            totalSize: dataAll.dataPendiente.length,
            sizePerPageList :[ {
                text: '10', value: 10
              }, {
                text: '5', value: 5
              }, {
                text: 'All', value: dataAll.dataPendiente.length
              } ]
        };
        const optionsSubidas = {
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

        const optionsAll = {
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
	const optionsAprobadas = {
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
          totalSize: dataAll.dataAprobada.length,
          sizePerPageList :[ {
              text: '10', value: 10
            }, {
              text: '5', value: 5
            }, {
              text: 'All', value: dataAll.dataActive.length
            } ]
      };
	const optionsRechazadas = {
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
          totalSize: dataAll.dataRechazada.length,
          sizePerPageList :[ {
              text: '10', value: 10
            }, {
              text: '5', value: 5
            }, {
              text: 'All', value: dataAll.dataActive.length
            } ]
      };
        const contentTableActive = ({ paginationProps, paginationTableProps }) => (
            <div>
              <ToolkitProvider keyField="id" columns={ dataAll.headData } data={ dataAll.dataPendiente } search >
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
        const contentTableSubidas = ({ paginationProps, paginationTableProps }) => (
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
        const contentTableAll = ({ paginationProps, paginationTableProps }) => (
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
	const contentTableAprobadas = ({ paginationProps, paginationTableProps }) => (
            <div>
              <ToolkitProvider keyField="id" columns={ dataAll.headData } data={ dataAll.dataAprobada } search >
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

	const contentTableRechazadas = ({ paginationProps, paginationTableProps }) => (
            <div>
              <ToolkitProvider keyField="id" columns={ dataAll.headData } data={ dataAll.dataRechazada } search >
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
                    <h2 className="mt-4 mb-4">Campañas Proveedor 2</h2>
                    
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="all-tab" data-toggle="tab" href="#all" role="tab" aria-controls="all" aria-selected="true">Todas</a>
                        </li>
                        <li className="nav-item" role="presentation">
                        <a className="nav-link" id="activos-tab" data-toggle="tab" href="#activos" role="tab" aria-controls="activos" aria-selected="false">Pendientes</a>
                        </li>
                        <li className="nav-item" role="presentation">
                        <a className="nav-link" id="subidas-tab" data-toggle="tab" href="#subidas" role="tab" aria-controls="subidas" aria-selected="false">Subidas</a>
                        </li>
			                  <li className="nav-item" role="presentation">
                        <a className="nav-link" id="subidas-tab" data-toggle="tab" href="#aprobadas" role="tab" aria-controls="subidas" aria-selected="false">Aprobadas</a>
                        </li>
			                  <li className="nav-item" role="presentation">
                        <a className="nav-link" id="all-tab" data-toggle="tab" href="#rechazadas" role="tab" aria-controls="all" aria-selected="false">Rechazadas</a>
                        </li>
                       
                        
                    </ul>

                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade" id="activos" role="tabpanel" aria-labelledby="activos-tab">
                                <PaginationProvider pagination={paginationFactory(optionsActive)}>
                                { contentTableActive }
                                </PaginationProvider>
                        </div>
                        <div className="tab-pane fade" id="subidas" role="tabpanel" aria-labelledby="subidas-tab">
                                <PaginationProvider pagination={paginationFactory(optionsSubidas)}>
                                { contentTableSubidas }
                                </PaginationProvider>
                        </div>
                        <div className="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="all-tab">
                                <PaginationProvider pagination={paginationFactory(optionsAll)}>
                                { contentTableAll }
                                </PaginationProvider>
                        </div>
			<div className="tab-pane fade" id="aprobadas" role="tabpanel" aria-labelledby="all-tab">
                                <PaginationProvider pagination={paginationFactory(optionsAprobadas)}>
                                { contentTableAprobadas }
                                </PaginationProvider>
                        </div>
			<div className="tab-pane fade" id="rechazadas" role="tabpanel" aria-labelledby="all-tab">
                                <PaginationProvider pagination={paginationFactory(optionsRechazadas)}>
                                { contentTableRechazadas }
                                </PaginationProvider>
                        </div>

                    </div>

                  </div>
            </React.Fragment>
        )
    }
}

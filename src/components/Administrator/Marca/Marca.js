import React, { Component } from 'react';
import MarcaNew from './MarcaNew';
import MarcaShow from './MarcaShow';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import LoadingOverlay from 'react-loading-overlay';
import {hasPermission} from '../../../util/auth';
import NotAuthorized from '../../layout/NotAuthorized';
export default class Marca extends Component {º
    render() {
        const dataAll = this.props.state;
        const propsInt = this.props;
        const { SearchBar } = Search;
        //const headerSortingStyle = { backgroundColor: '#c8e6c9' };
        const optionsEspera = {
            custom: true,
            paginationSize: 5,
            pageStartIndex: 1,
            firstPageText: 'Primera Página',
            prePageText: 'Anterior',
            nextPageText: 'Siguiente',
            lastPageText: 'Final',
            nextPageTitle: 'Inicio Página',
            prePageTitle: 'Página Anterior',
            firstPageTitle: 'Siguiente Página',
            lastPageTitle: 'Anterior Página',
            totalSize: dataAll.dataEspera.length,
            sizePerPageList :[ {
                text: '10', value: 10
                }, {
                text: '5', value: 5
                }, {
                text: 'All', value: dataAll.dataEspera.length
                }
            ]
        };
        const optionsActive = {
            custom: true,
            paginationSize: 5,
            pageStartIndex: 1,
            firstPageText: 'Primera Página',
            prePageText: 'Anterior',
            nextPageText: 'Siguiente',
            lastPageText: 'Final',
            nextPageTitle: 'Inicio Página',
            prePageTitle: 'Página Anterior',
            firstPageTitle: 'Siguiente Página',
            lastPageTitle: 'Anterior Página',
            totalSize: dataAll.dataActive.length,
            sizePerPageList :[ {
                text: '10', value: 10
                }, {
                text: '5', value: 5
                }, {
                text: 'All', value: dataAll.dataActive.length
                }
            ]
        };
        const optionsAInactive = {
            custom: true,
            paginationSize: 5,
            pageStartIndex: 1,
            firstPageText: 'Primera Página',
            prePageText: 'Anterior',
            nextPageText: 'Siguiente',
            lastPageText: 'Final',
            nextPageTitle: 'Inicio Página',
            prePageTitle: 'Página Anterior',
            firstPageTitle: 'Siguiente Página',
            lastPageTitle: 'Anterior Página',
            totalSize: dataAll.dataInactive.length,
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
            paginationSize: 5,
            pageStartIndex: 1,
            firstPageText: 'Primera Página',
            prePageText: 'Anterior',
            nextPageText: 'Siguiente',
            lastPageText: 'Final',
            nextPageTitle: 'Inicio Página',
            prePageTitle: 'Página Anterior',
            firstPageTitle: 'Siguiente Página',
            lastPageTitle: 'Anterior Página',
            totalSize: dataAll.dataDeleted.length,
            sizePerPageList :[ {
                text: '10', value: 10
                }, {
                text: '5', value: 5
                }, {
                text: 'All', value: dataAll.dataActive.length
                } ]
        };
        const contentTableEspera = ({ paginationProps, paginationTableProps }) => (
            <div>
                <ToolkitProvider keyField="id" columns={ dataAll.headData } data={ dataAll.dataEspera } search >
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
        const contentTableInactive = ({ paginationProps, paginationTableProps }) => (
            <div>
              <ToolkitProvider keyField="id" columns={ dataAll.headData } data={ dataAll.dataInactive } search >
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
              <ToolkitProvider keyField="id" columns={ dataAll.headData } data={ dataAll.dataDeleted } search >
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
            {hasPermission([217]) ?
                  <div>
                <h2 className="d-flex justify-content-between mt-4 mb-4">Marcas
                    {hasPermission([212]) &&
                        <button onClick={propsInt.newOrEditMarca.bind(this, 0)} type="button" data-toggle="modal" data-target="#modal-lg" className="btn btn-primary">Crear Marca</button>
                    }
                        <MarcaNew
                            stateFather={propsInt.state}
                            isOpen={propsInt.modalIsopen} 
                            onClose={propsInt.onCloseModal}
                            modalCreateTitle = {propsInt.modalCreateTitle}
                            handleChangeI={propsInt.handleChangeI}
                            handleSubmitBs={propsInt.handleSubmitBs}
                            modalTitle={propsInt.modalTitle}
                            deleteVariables = {propsInt.deleteVariables}
                            
                        >                            
                        </MarcaNew>
                </h2>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link espera" id="espera-tab" data-toggle="tab" href="#espera" role="tab" aria-controls="espera" aria-selected="true">Espera</a>
                    </li>
                    <li className="nav-item" role="presentation">
                    <a className="nav-link active" id="activos-tab" data-toggle="tab" href="#activos" role="tab" aria-controls="activos" aria-selected="false">Activos</a>
                    </li>
                    <li className="nav-item" role="presentation">
                    <a className="nav-link" id="inactivos-tab" data-toggle="tab" href="#inactivos" role="tab" aria-controls="inactivos" aria-selected="false">Inactivos</a>
                    </li>
                    <li className="nav-item" role="presentation">
                    <a className="nav-link" id="eliminados-tab" data-toggle="tab" href="#eliminados" role="tab" aria-controls="eliminados" aria-selected="false">Eliminados</a>
                    </li>
                </ul>  
                <div className="tab-content" id="myTabContent">
                    <LoadingOverlay active={dataAll.loading} spinner text='Cargando contenido...' >
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show eliminado" id="espera" role="tabpanel" aria-labelledby="espera-tab">
                                <PaginationProvider pagination={paginationFactory(optionsEspera)}>
                                { contentTableEspera }
                                </PaginationProvider>
                        </div>
                        <div className="tab-pane fade show active" id="activos" role="tabpanel" aria-labelledby="activos-tab">
                                <PaginationProvider pagination={paginationFactory(optionsActive)}>
                                { contentTableActive }
                                </PaginationProvider>
                        </div>
                        <div className="tab-pane fade" id="inactivos" role="tabpanel" aria-labelledby="profile-tab">
                                <PaginationProvider pagination={paginationFactory(optionsAInactive)}>
                                { contentTableInactive }
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

                </div>
                        :<NotAuthorized></NotAuthorized>
                    }
                <div>                
                </div>             
                <MarcaShow                    
                    stateFather={propsInt.state}
                    isOpen={propsInt.modalIsopen} 
                    onClose={propsInt.onCloseModal}
                    modalCreateTitle = {propsInt.modalCreateTitle}
                    handleChangeI={propsInt.handleChangeI}
                    handleSubmitBs={propsInt.handleSubmitBs}
                    modalTitle={propsInt.modalTitle}
                    deleteVariables = {propsInt.deleteVariables}
                    
                    >
                </MarcaShow>
            </div>
            </React.Fragment>
        )
    }
}
import React, { Component } from 'react'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import RolProveedorNew from '../RolesProveedor/RolesProveedorNew';
import RolesProveedorShow from './RolesProveedorShow';
import LoadingOverlay from 'react-loading-overlay';
import {hasPermission} from '../../../util/auth';
import NotAuthorized from '../../layout/NotAuthorized';

export default class RolesProveedores extends Component {
    render() {
        const dataAll = this.props.state;
        const propsInt = this.props;
        const { SearchBar } = Search;
        const optionsActive = {
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
            totalSize: dataAll.dataActive.length,
            sizePerPageList :[ {
                text: '5', value: 5
              }, {
                text: '10', value: 10
              }, {
                text: 'All', value: dataAll.dataActive.length
              } ]
        };
        const optionsAInactive = {
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
            totalSize: dataAll.dataInactive.length,
            sizePerPageList :[ {
                text: '5', value: 5
              }, {
                text: '10', value: 10
              }, {
                text: 'All', value: dataAll.dataInactive.length
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
            totalSize: dataAll.dataDeleted.length,
            sizePerPageList :[ {
                text: '5', value: 5
              }, {
                text: '10', value: 5510
              }, {
                text: 'All', value: dataAll.dataDeleted.length
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
                <div className="col-10 tabs">
                  <div>
                    <h2 className="d-flex justify-content-between mt-4 mb-4">Roles Proveedor
                      {hasPermission([201]) &&
                        <button onClick={propsInt.newOrEditRol.bind(this, 0)} type="button" data-toggle="modal" data-target="#modal-lg" className="btn btn-primary">Crear Rol</button>
                      }
                      <RolProveedorNew
                                  isOpen={propsInt.modalIsopen}
                                  modalTitle={propsInt.modalTitle} 
                                  onClose={propsInt.onCloseModal}
                                  //modalTitle={propsInt.modalTitle}
                                  stateFather={propsInt.state}
                                  onSelectTypePermisssions={propsInt.onSelectTypePermisssions}
                                  onRemoveTypePermisions={propsInt.onRemoveTypePermisions}
                                  handleAllCheckedPermissionsModule={propsInt.handleAllCheckedPermissionsModule}
                                  handleCheckChieldElement={propsInt.handleCheckChieldElement}
                                  handleChangeI={propsInt.handleChangeI}
                                  onlyLetter={propsInt.onlyLetter}
                                  handleSubmitBs={propsInt.handleSubmitBs}
                                  deleteVariables = {propsInt.deleteVariables}
                                  >
                      </RolProveedorNew>
                    </h2>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="activos-tab" data-toggle="tab" href="#activos" role="tab" aria-controls="activos" aria-selected="true">Activos</a>
                        </li>
                        <li className="nav-item" role="presentation">
                        <a className="nav-link" id="inactivos-tab" data-toggle="tab" href="#inactivos" role="tab" aria-controls="inactivos" aria-selected="false">Inactivos</a>
                        </li>
                        <li className="nav-item" role="presentation">
                        <a className="nav-link" id="eliminados-tab" data-toggle="tab" href="#eliminados" role="tab" aria-controls="eliminados" aria-selected="false">Eliminados</a>
                        </li>
                    </ul>
                    
                        <LoadingOverlay active={dataAll.loadingRoles} spinner text='Cargando contenido...' >
                          <div className="tab-content" id="myTabContent">
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
                      
                    
                    <RolesProveedorShow
                        isOpen={propsInt.modalIsopen} 
                        onClose={propsInt.onCloseModal}
                        modalTitle={propsInt.modalTitle}
                        stateFather={propsInt.state}
                    >
                    </RolesProveedorShow> 
                    </div>

           
        )
    }
}

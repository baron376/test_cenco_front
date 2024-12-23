import React, { Component } from 'react';
import UsersNew from './UsersNew';
import UsersShow from './UsersShow';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import LoadingOverlay from 'react-loading-overlay';
import {hasPermission} from '../../../util/auth';
import NotAuthorized from '../../layout/NotAuthorized';

export default class Users extends Component {
  
    /*constructor(){
      super();
    }*/
  

    render() {
        const dataAll = this.props.state;
        const propsInt = this.props;
        const { SearchBar } = Search;
        const dataActiveLocal = this.props.state.data;
        const headLocal = this.props.state.headData;
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
            totalSize: dataAll.data.length,
            sizePerPageList :[ {
                text: '10', value: 10
              }, {
                text: '20', value: 20
              }, {
                text: 'All', value: dataAll.data.length
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
                text: '10', value: 10
              }, {
                text: '20', value: 20
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
            totalSize: dataAll.dataDeteted.length,
            sizePerPageList :[ {
                text: '10', value: 10
              }, {
                text: '20', value: 20
              }, {
                text: 'All', value: dataAll.dataDeteted.length
              } ]
        };
        const contentTableActive = ({ paginationProps, paginationTableProps }) => (
            <div>
              <ToolkitProvider keyField="id" columns={ headLocal } data={ dataActiveLocal } search >
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
        
        if(dataAll.error){
            return `Error ${this.props.state.error} `;
        }
        return (
            <React.Fragment>
                <div className="col-10 tabs">
                {hasPermission([210]) ?
                  <div>
                    <h2 className="d-flex justify-content-between mt-4 mb-4">Usuarios
                      {hasPermission([200]) &&
                        <button onClick={propsInt.newOrEditUSer.bind(this, 0)} type="button" data-toggle="modal" data-target="#modal-lg" className="btn btn-primary">Crear Usuario</button>
                      }
                      <UsersNew
                                  isOpen={propsInt.modalIsopen} 
                                  onClose={propsInt.onCloseModal}
                                  modalTitle={propsInt.modalTitle}
                                  handleChangeI={propsInt.handleChangeI}
                                  handleClickBs={propsInt.handleClickBs}
                                  handleSubmitBs={propsInt.handleSubmitBs}
                                  stateFather={propsInt.state}
                                  onSelectRoles={propsInt.onSelectRoles}
                                  onRemoveRoles={propsInt.onRemoveRoles}
                                  onSelectCadenas={propsInt.onSelectCadenas}
                                  onRemoveCadenas={propsInt.onRemoveCadenas}
                                  onSelectSalas={propsInt.onSelectSalas}
                                  onRemoveSalas={propsInt.onRemoveSalas}
                                  onlyNumber={propsInt.onlyNumber}
                                  onlyNumberandK={propsInt.onlyNumberandK}
                                  onlyLetter={propsInt.onlyLetter}
                                  handleCheckChieldElement={propsInt.handleCheckChieldElement}
                                  handleAllCheckedSalas={propsInt.handleAllCheckedSalas}
                                  deleteVariables={propsInt.deleteVariables}
                                  toggleShowPasswod={propsInt.toggleShowPasswod}
                                  >
                      </UsersNew>
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
                    
                        <LoadingOverlay active={dataAll.loadingUsers} spinner text='Cargando contenido...' >
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
                        :<NotAuthorized></NotAuthorized>
                    }
                    <UsersShow
                        isOpen={propsInt.modalIsopen} 
                        onClose={propsInt.onCloseModal}
                        modalTitle={propsInt.modalTitle}
                        stateFather={propsInt.state}
                    >
                    </UsersShow> 
                  </div>
            </React.Fragment>
        )
    }
}

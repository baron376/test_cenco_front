import React, { Component } from 'react';
import SalasNew from './SalasNew';
import SalaShow from './SalaShow';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import LoadingOverlay from 'react-loading-overlay';
import {hasPermission} from '../../../util/auth';
import NotAuthorized from '../../layout/NotAuthorized';
import { Multiselect } from 'multiselect-react-dropdown';
export default class Salas extends Component {º
    render() {
        const dataAll = this.props.state;
        const propsInt = this.props;
        const { SearchBar } = Search;
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
            {hasPermission([114]) ?
                <div>
                <h2 className="mt-4 mb-4">Salas</h2>
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
                    <div className="d-flex col justify-content-end pr-0">
                        <label htmlFor className="col-form-label">Cadena:</label>
                        <div className="col-sm-3">  
                            <Multiselect
                                singleSelect
                                options={dataAll.dataCadena} 
                                onSelect={propsInt.onSelectCadenas} 
                                onRemove={propsInt.onRemoveCadenas}
                                selectedValues={dataAll.cadenaSeleccionada} 
                                displayValue="nombre"
                            />
                        </div>
                        <label htmlFor className="col-form-label">Zona:</label>
                        <div className="col-sm-3"> 
                            <Multiselect
                                singleSelect
                                options={dataAll.listaZonas} 
                                onSelect={propsInt.onSelectZonas} 
                                onRemove={propsInt.onRemoveZonas}
                                selectedValues={dataAll.ZonaSeleccionada} 
                                displayValue="nombre"
                            />
                        </div>
                        <button onClick={propsInt.limpiarFiltros} type="button" data-toggle="modal" data-target="#modal-lg" className="btn btn-info">limpiar</button>
                        &nbsp;
                    {hasPermission([105]) &&
                        <button onClick={propsInt.newOrEditSala.bind(this, 0)} type="button" data-toggle="modal" data-target="#modal-lg" className="btn btn-primary">Crear Sala</button>
                    }
                        <SalasNew
                            stateFather={propsInt.state}
                            isOpen={propsInt.modalIsopen} 
                            onClose={propsInt.onCloseModal}
                            modalCreateTitle = {propsInt.modalCreateTitle}
                            handleChangeI={propsInt.handleChangeI}
                            onSelectCadenas={propsInt.onSelectCadenas}
                            onRemoveCadenas={propsInt.onRemoveCadenas}
                            onSelectCadenasModal={propsInt.onSelectCadenasModal}
                            onRemoveCadenasModal={propsInt.onRemoveCadenasModal}
                            onSelectZonasModal={propsInt.onSelectZonasModal}
                            onRemoveZonasModal={propsInt.onRemoveZonasModal}
                            onSelectRegiones={propsInt.onSelectRegiones}
                            onRemoveRegiones={propsInt.onRemoveRegiones}
                            onSelectProvincias = {propsInt.onSelectProvincias}
                            onRemoveProvincias = {propsInt.onRemoveProvincias}
                            onSelectTipoSalas = {propsInt.onSelectTipoSalas}
                            onRemoveTipoSalas = {propsInt.onRemoveTipoSalas}
                            onSelectComuna = {propsInt.onSelectComuna}
                            onRemoveComuna = {propsInt.onRemoveComuna}
                            handleSubmitBs={propsInt.handleSubmitBs}
                            modalTitle={propsInt.modalTitle}
                            deleteVariables = {propsInt.deleteVariables}
                        >                            
                        </SalasNew>
                    </div>
                </ul>
                <LoadingOverlay active={dataAll.loading} spinner text='Cargando contenido...' >
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
                <SalaShow
                    isOpen={propsInt.modalIsopen} 
                    onClose={propsInt.onCloseModal}
                    modalTitle={propsInt.modalTitle}
                    stateFather={propsInt.state}
                    //stateFather={propsInt.state}
                    //isOpen={propsInt.modalIsopen} 
                    //onClose={propsInt.onCloseModal}
                    modalCreateTitle = {propsInt.modalCreateTitle}
                    handleChangeI={propsInt.handleChangeI}
                    onSelectCadenas={propsInt.onSelectCadenas}
                    onRemoveCadenas={propsInt.onRemoveCadenas}
                    onSelectRegiones={propsInt.onSelectRegiones}
                    onRemoveRegiones={propsInt.onRemoveRegiones}
                    onSelectProvincias = {propsInt.onSelectProvincias}
                    onRemoveProvincias = {propsInt.onRemoveProvincias}
                    onSelectComuna = {propsInt.onSelectComuna}
                    onRemoveComuna = {propsInt.onRemoveComuna}
                    handleSubmitBs={propsInt.handleSubmitBs}
                    //modalTitle={propsInt.modalTitle}
                    deleteVariables = {propsInt.deleteVariables}
                    >
                </SalaShow>
            </div>
            </React.Fragment>
        )
    }
}

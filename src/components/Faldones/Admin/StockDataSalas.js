import React, { Component } from 'react'
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Multiselect } from 'multiselect-react-dropdown';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
export default class StockDataSalas extends Component {
    render() {
        const dataAll = this.props.state;
        const propsInt = this.props;
        const { SearchBar } = Search;

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
            totalSize: dataAll.dataStockSala.length,
            sizePerPageList :[ {
                text: '7', value: 7
              }, {
                text: '14', value: 14
              }, {
                text: 'All', value: dataAll.dataStockSala.length
              } ]
        };
        const contentTableProducto = ({ paginationProps, paginationTableProps }) => (
            <div>
              <ToolkitProvider keyField="id" columns={ dataAll.headData } data={ dataAll.dataStockSala } search >
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
                    <h2 className="mt-4 mb-4">Campaña {dataAll.nombreCampana}</h2>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="activos-tab" data-toggle="tab" href="#activos" role="tab" aria-controls="activos" aria-selected="true">Stock Productos</a>
                        </li>
                        <div className="d-flex col justify-content-end pr-0">
                         <Link to='/Faldones'> <button  type="button" data-toggle="modal" data-target="#modal-lg" className="btn btn-danger">Volver</button> </Link>
                        </div>
                    </ul>
                    <LoadingOverlay active={dataAll.loading} spinner text='Cargando contenido...' >
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="activos" role="tabpanel" aria-labelledby="activos-tab">
                                <div className="form-group">
                                <label htmlFor className="col-sm-2 col-form-label">Salas:</label>
                                    <div className="col-sm-6">
                                    <Multiselect
                                        singleSelect
                                        options={dataAll.listSalasUser} 
                                        onSelect={propsInt.onSelectSalas} 
                                        onRemove={propsInt.onRemoveSalas}
                                        selectedValues={dataAll.listSalasSeleted} 
                                        displayValue="display_nombre_sap" 
                                    />
                                    </div>
                                    <div className="col-sm-6">
                                    { dataAll.dataStockSala.length>0 &&
                                    <button  title="Descargar Stock Sala"   className="btn btn-success" onClick={() => {propsInt.downloadExcelStock(dataAll.idCampanaFaldon , dataAll.salaSelectId )}}> Descargar Excel </button>
                                    }
                                    </div>
                                </div>
                            <LoadingOverlay active={dataAll.loadingStock} spinner text='Cargando contenido...' >
                            <PaginationProvider pagination={paginationFactory(optionsProductos)}>
                                { contentTableProducto }
                                </PaginationProvider>
                            </LoadingOverlay>
                        </div>
                    </div>
                    
                    </LoadingOverlay>
                  </div>
            </React.Fragment>
        )
    }
}
